import { Meteor } from 'meteor/meteor';

//Meteor.startup(() => {
Meteor.startup(function()
{
	Meteor.methods
	({
	  // code to run on server at startup
		insert_CollectionStudents: function(textName, textAddress, textDOB)
		{
			console.log("in insert_CollectionStudents");
			
			var MongoClient = require('mongodb').MongoClient;
			var url = 'mongodb://localhost:27017'; //might be the wrong port. 27017 is the default
			
			MongoClient.connect(url, function(err, db)
			{
				if (err) throw err;
				var myobj = 
				{
					"textName": textName,
					"textAddress": textAddress,
					"textDOB": textDOB
				}
				var dbo = db.db("myOnlineEducationDatabase")
				dbo.collection("Student").insertOne(myobj, function(err, res) 
				{
					if (err) throw err;
					console.log("1 record inserted");
					db.close();
				});//Student is the name of the collection
			});
		}
	});
});
	
