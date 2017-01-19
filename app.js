var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyB375ZkbrouviVJ1YG7_3n8K3jAhIXlsOU",
    databaseURL: "https://amu-roboclub.firebaseio.com"
};

firebase.initializeApp(config);
var database = firebase.database();

console.log('Hello');

firebase.database()
  .ref('downloads/')
  .set({'tara':true}, function(error) {
  	if(error) {
  		console.log('error');
  	} else {
  		console.log('Written Successfully');
  	}
  });
