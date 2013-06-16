/**
 * Expose `InfrastructureError`
 */
 
module.exports = InfrastructureError;

/**
 * Create a new `InfrastructureError`
 * @constructor
 * 
 * @return {InfrastructureError}
 * @api private
 */
 
function InfrastructureError(message){
   Error.call(this);
   Error.captureStackTrace(this,arguments.callee);
   this.name = 'InfrastructureError';
   var errorReason = '';
   this.message = message;
}

InfrastructureError.prototype.__proto__ = Error.prototype;
