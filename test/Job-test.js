/**
 * Modules dependencies
 */
var chai = require('chai')
,	should = chai.should();

 //Test Suite
 var Job = require('../lib/Job').Job;

 describe('Job',function(){
	describe('new Job({/* I/O params not specified* /})',function(){
		it('should throw I/O Error',function(done){
			(function(){
				new Job;
			})
			.should.Throw(Error);
			done();
		});
	});
});