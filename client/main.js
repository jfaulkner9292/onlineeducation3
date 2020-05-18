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
		alert("In nameDB button");
		var textName = document.getElementById('textName').value;

		Meteor.call('query_Students_DOB', textName, function(err, res)
		{
			if (err) console.log("mongoDB Error");
			else console.log("Registration Successfull");
		});
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
