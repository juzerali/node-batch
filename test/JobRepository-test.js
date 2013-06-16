/**
 * Modules dependencies
 */
var chai = require('chai')
,	should = chai.should();

 //Test Suite
 var jobRepo = new require('../lib/JobRepository');


 describe('JobRepository',function(){
	describe('new JobRepository()',function(){
		xit('should return a JobRepository object',function(){
			jobRepo.constructor.should.equal("JobRepository");
		});
	});
});