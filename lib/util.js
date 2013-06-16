/**
 * Module dependencies.
 */

 var nodeutil = require('util');

 var util = function(){};

 util.prototype = nodeutil.prototype; 

 util.ensureFunction = function(fn){
	if(!typeof fn === "function")
		throw new Error(fn + ": Expected function but got " + typeof fn);
}

exports = module.exports = util;