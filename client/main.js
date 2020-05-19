/*import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/


import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './registrationNlogin.html';
import './nameDB.html';
//import '../js/jquery-3.2.1.min.js';

//Route.route('/registerNloginpage');

Router.route('/', function() {
    this.render('home');
});

Router.route('/registrationNlogin', function() {
    this.render('registerNloginpage');
});

Router.route('/nameDB', function() {
	this.render('nameDBpage');
});

Template.registerNloginpage.events({
	'click #buttonsubmitRegistrationForm':function(event)
	{
		console.log("In Button Registration");
		var textName = document.getElementById('textName').value;
		var textAddress = document.getElementById('textAddress').value;
		var textDOB = document.getElementById('textDOB').value;

		Meteor.call('insert_CollectionStudents', textName, textAddress, textDOB, function(err, res) 
		{
			if (err) console.log("mongoDB Error");
			else console.log("Registration Successfull");
		});	

	}
});

Template.nameDBpage.events({
	'click #buttonsubmitNameDB':function(event)
	{
		//alert("In nameDB button");
		var textName = document.getElementById('textName').value;
		//alert(textName);
		
		Meteor.call('query_Students_DOB', textName, function(err, res)
		{
			if (err) alert("mongoDB error"); //console.log("mongoDB Error");
			else console.log("Registration Successfull");

			//var returnedData = JSON.parse(res);
			//alert(returnedData.textDOB[0].sub);
			
			var count = (res.match(/textDOB/g) || []).length;
			//alert("Count: " + count);
			var DOBS = [count];
			var tempText = res;
			var startingIndex;
			var endingInxed;
			var output = "";
			var newOutput = "";
			//alert("size: " + DOBS.length);
			for (i = 0; i < count; i++)
			{
				
				startingIndex = tempText.indexOf("textDOB");
				endingIndex = tempText.indexOf("}");
				DOBS[i] = tempText.substring(startingIndex + 10, endingIndex - 1); 
				//alert("Dob: " + DOBS[i]);
				output = output.concat(DOBS[i] + ", ");
				tempText = tempText.substring(endingIndex + 1);
			}
			//newOutput = output.replace(/.$/,".");
			newOutput = output.substring(0, output.length - 2);
			if (newOutput.length != 0)			
				document.getElementById('textDateOfBirths').innerHTML = newOutput;
			else
				document.getElementById('textDateOfBirths').innerHTML = "No date of births found for '" + textName + "'.";
			//alert(returnedData[0]);
		});
		console.log("back in client");
		
	}
});
//

/*Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/
