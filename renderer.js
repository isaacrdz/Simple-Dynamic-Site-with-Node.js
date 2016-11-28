var fs = require("fs");

function mergeValues(values,content){
	//Cycle over the keys
	for(var key in values){
		//Replace all {{key}} with the values from the values objects
		content = content.replace("{{" + key + "}}",values[key]);
	}

	//Return merged content
	return content;
}

function view(templateName, values, response){
	//Read from templates files
	var fileContents = fs.readFileSync('./views/' + templateName + '.html',{encoding:"utf-8"})
	//Insert values in to the content
	fileContents = mergeValues(values,fileContents);
	//Write out the contents to the response

	response.write(fileContents);
}

module.exports.view = view;
