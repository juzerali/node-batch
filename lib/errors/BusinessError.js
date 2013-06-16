/**
 * Expose `BusinessError`
 */
 
module.exports = BusinessError;

/**
 * Create a new `BusinessError`
 * @constructor
 * 
 * @return {BusinessError}
 * @api private
 */
 
function BusinessError(message){
   Error.call(this);
   Error.captureStackTrace(this,arguments.callee);
   this.name = 'BusinessError';
   var errorReason = '';
   this.message = message;
}

BusinessError.prototype.__proto__ = Error.prototype;
