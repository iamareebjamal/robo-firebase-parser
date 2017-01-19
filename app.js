var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyB375ZkbrouviVJ1YG7_3n8K3jAhIXlsOU",
    databaseURL: "https://amu-roboclub.firebaseio.com"
};

firebase.initializeApp(config);
var database = firebase.database();

function write_data(node, data, call) {
	firebase.database()
		.ref(node)
		.set(data, function(error) {
			call(data, error);
		});
}

/*write_data('downloads', {'test' : true}, function(data, error) {
	if(error) {
		console.log('error');
	} else {
		console.log('Written Successfully');
	}
});*/
