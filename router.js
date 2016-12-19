
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};

function home(req, res){
	if( req.url === '/'){
		if(req.method.toLowerCase() === "get"){
			res.writeHead(200, commonHeaders);
			renderer.view("header",{}, res);
			renderer.view("search",{}, res);
			renderer.view("footer",{}, res);
			res.end();
		} else {
			//if the url == "/" && POST
			//get the post data from body
			req.on("data", function(postBody){
			//extract the username
			var query = querystring.parse(postBody.toString());
			//redirect to /:username
			res.writeHead(303,{"Location":"/" + query.username});
			res.end();
			});
		}
	}
}

function user(req, res){
	



	  	//get JSON from treehouse
	  	var studentProfile = new Profile(username);
	  	//on the end
	  	studentProfile.on("end", function(profileJSON){
	  		//show Profile

	  		//Store value which we need
	  		var values = {
	  			title: profileJSON.title,
	  			description: profileJSON.description,
	  			
	  		}

	  		//Simple response
		  	renderer.view("profile",values, res);
		  	renderer.view("footer",{}, res);
		  	res.end();


	  	});

	  	//on error
	  	studentProfile.on("error", function(error){
	  		//show error
        	renderer.view("error",{errorMessage: error.message}, res);
	  		renderer.view("search",{}, res);
			renderer.view("footer",{}, res);
			res.end();

		});
	}
}

module.exports.home = home;
module.exports.user = user;


