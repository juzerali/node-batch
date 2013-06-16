/**
 * Expose `BatchError`
 */
 
module.exports = BatchError;

/**
 * Create a new `BatchError`
 * @constructor
 * 
 * @return {BatchError}
 * @api private
 */
 
function BatchError(message){
   Error.call(this);
   Error.captureStackTrace(this,arguments.callee);
   this.name = 'BatchError';
   var errorReason = '';
   this.message = message;
}

BatchError.prototype.__proto__ = Error.prototype;
