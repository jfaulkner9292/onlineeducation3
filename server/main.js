import { Meteor } from 'meteor/meteor';

//Meteor.startup(() => {
Meteor.startup(function()
{
	var Future = Npm.require("fibers/future");
	Meteor.methods
	({

	//var future = new Future();													//line 10

	  // code to run on server at startup
		insert_CollectionStudents: function(textName, textAddress, textDOB)
		{
			console.log("in insert_CollectionStudents");
			
			var MongoClient = require('mongodb').MongoClient;

			if (MongoClient == null)
				console.log("Null");											//line 20

			var url = 'mongodb://localhost:27017'; //might be the wrong port. 27017 is the default
			
			MongoClient.connect(url, function(err, db)
			{
				if (err) throw err;
				var myobj = 
				{
					"textName": textName,
					"textAddress": textAddress,									//line 30
					"textDOB": textDOB
				}
				var dbo = db.db("myOnlineEducationDatabase")
				dbo.collection("Student").insertOne(myobj, function(err, res) 
				{
					if (err) throw err;
					console.log("1 record inserted");
					db.close();
				});//Student is the name of the collection
			});														//line 40
		},
		
		query_Students_DOB: function(textName)
		{
			console.log("in query_Students_DOB");
			var MongoClient = require('mongodb').MongoClient;

			if (MongoClient == null)
				console.log("Null");
																	//line 50
			var url = 'mongodb://localhost:27017'; //might be the wrong port. 27017 is the default

			var future = new Future();
			
			MongoClient.connect(url, function(err, db)
			{
				if (err) throw err;
				var myobj = 
				{
					"textName": textName
					
				}													//line 60
				var dbo = db.db("myOnlineEducationDatabase")								
				dbo.collection("Student").find(myobj).toArray(function(err, result)
				{
					if (err) throw err;
					var output = "";
					
					for (var entry in result)
					{
						output += result[entry] + "\n"
					}												//line 70
																	
					future.return(JSON.stringify(result));
					//console.log("Finished server side query: " + JSON.stringify(result));
					db.close();
				});//Student is the name of the collection
			});
			//console.log("was here");
			return future.wait();
		}






	});
});
	
