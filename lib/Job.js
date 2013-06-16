/**
 * Module dependencies.
 */

var fs = require('fs')
,	util = require('util')
,	inherits = util.inherits
,	EventEmitter = require('events').EventEmitter
,	Infrastructure = require("./Infrastructure");


/**
 * Expose `Job()`.
 */

exports = module.exports = Job;


/**
 * Create a Job Object
 *
 * @param {Object} options
 * @param {Object} [options.input] - Input type and source.
 * @param {String} [options.input.type] - One of the node-batch ResourceTypes (Ex: 'Mongo').
 * @param {String} [options.input.uri] - Default location of input resource (Ex: 'localhost/test' for Mongo).
 * @param {Object} [options.output] - Output type and source.
 * @param {String} [options.output.type] - One of the node-batch ResourceTypes (Ex: 'Mongo').
 * @param {String} [options.input.uri] - Default location of resource (Ex: 'localhost/test' for Mongo).
 *
 * @return {Job}
 * @api public
 */
 

function Job(options) {
	var self = this;
	self.options = options || {};

	//Configure Input/Output
	if(!options || !options.input || !options.input.type || !options.input.uri){
		throw new Error("Input not specified properly");
	}

	if(!options || !options.output || !options.output.type || !options.output.uri){
		throw new Error("Output not specified properly");
	}

	self.indatasource = Infrastructure.getInputDatasource(options.input.type, options.input.uri)
	self.outdatasource = Infrastructure.getOutputDatasource(options.output.type, options.output.uri)
}

inherits(Job, EventEmitter);

Job.prototype.run = function(fn) {
	var self = this;
	self.fn = fn;

	self.indatasource.read();
	self.indatasource.on("data", function(infraErr, row){
		if(infraErr)
			return	//TODO: update job error table
		var data = new Data(row);
		var programErr = null;
		try{
			fn.call(data);
		} catch(e){
			programErr = e;
			return;	//TODO: update job error table
		}
		var writable = "";
		if(self._beforeWrite){
			writable = self._beforeWrite(data.data);
		} else {
			writable = data.data;
		}
		self.outdatasource.write(writable);
	});

	self.indatasource.on("end", function(){
		self.outdatasource.close();
		if(self._done)
			self._done();
	});
};

Job.prototype.beforeWrite = function(fn){
	ensureFunction(fn);
	this._beforeWrite = fn;
}

Job.prototype.done = function(fn){
	ensureFunction(fn);
	this._done = fn;
};

function Data(data, fn) {
	var self = this;
	self.data = data;
}

function ensureFunction(fn){
	if(!typeof fn === "function")
		throw new Error("Expected function but got " + typeof fn);
}