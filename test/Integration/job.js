var Job = require("../../lib/Job");

var options = {
	"input": {
		"type": "file"
		, "uri" : "./input.txt"	
	},
	"output": {
		"type": "file"
		, "uri": "./output.out"
	}
}
var job = new Job(options);

job.beforeWrite(function(row){
	return row;
})

job.run(function() {
	this.data += "processed";
})