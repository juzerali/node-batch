/**
 * Modules dependencies
 */
var chai = require('chai')
,	should = chai.should()
,	EventEmitter = require("events").EventEmitter;

 //Test Suite
 var Job = require('../lib/Job');

 describe('Job',function(){
	describe('new Job',function(){
		it('should be an EventEmitter', function(){
		  Job.should.be.an.EventEmitter;
		})
	});
});