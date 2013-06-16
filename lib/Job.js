/**
 * Module dependencies.
 */

var fs = require('fs')
,	util = require('util')
,	selfutil = require("./util")
,	inherits = util.inherits
,	EventEmitter = require('events').EventEmitter
,	ensureFunction = selfutil.ensureFunction;


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
 

function Job(indatasource, outdatasource, options) {
	var self = this;
	self.options = options || {};
	self.indatasource = indatasource;
	self.outdatasource = outdatasource;
	self._fns = [];
}

inherits(Job, EventEmitter);

Job.prototype.run = function(fn) {
	var self = this;
	var indatasource = self.indatasource;

	if(fn && typeof fn === 'function'){
		fn.call(indatasource, indatasource.db, function(err, data){console.log(data)
			if(null != data)
			indatasource.read(err, data);
		});
	} else {
		indatasource.read();
	}
	indatasource.on("data", function(infraErr, row){
		if(infraErr)
			throw infraErr;	//TODO: update job error table
		var data = new Data(row);
		var programErr = null;
		try{
			self._fns.forEach(function(fn){
				fn.call(data);
			});
		} catch(e){
			programErr = e; throw e;
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

	indatasource.on("end", function(){
		self.outdatasource.close();
		if(self._done)
			self._done();
	});
};

Job.prototype.use = function(fn){
	ensureFunction(fn);
	this._fns.push(fn);
	return this;
}

Job.prototype.done = function(fn){
	ensureFunction(fn);
	this._done = fn;
};

function Data(data, fn) {
	var self = this;
	self.data = data;
}