
var Infrastructure = {};
var FileInfrastructure = require("./batch-infrastructure-file")
,	BatchError = require("../errors/BatchError");

module.exports = Infrastructure;

Infrastructure.getInputDatasource = function(type, uri) {
	var moduleName = "batch-infrastructure-" + type;
	if(type === "file"){
		return FileInfrastructure.getInputDatasource(uri);
	}
	
	try{
		var infra = require(moduleName);	
	} catch(e){
		throw new BatchError("Unable to require " + moduleName + " make sure the required dependencies are installed");
	}
	infra.getInputDatasource(uri);
}

Infrastructure.getOutputDatasource = function(type, uri) {
	var moduleName = "batch-infrastructure-" + type;
	if(type === "file"){
		return FileInfrastructure.getOutputDatasource(uri);
	}
	
	try{
		var infra = require(moduleName);	
	} catch(e){
		throw new BatchError("Unable to require " + moduleName + " make sure the required dependencies are installed");
	}
	infra.getOutputDatasource(uri);
}