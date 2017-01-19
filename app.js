/** 
 * Roboclub firebase db upload tool
 * Parses xml and pushes data to Firebase database
 *
 * Author : Areeb Jamal
 */

 // Most code is synchronous because it is a command line tool

var firebase = require('firebase'),
	fs = require('fs'),
	parseString = require('xml2js').parseString;

var config = {
    apiKey: "AIzaSyB375ZkbrouviVJ1YG7_3n8K3jAhIXlsOU",
    databaseURL: "https://amu-roboclub.firebaseio.com"
};

firebase.initializeApp(config);
var database = firebase.database();

/* Asynchronously writes data and approprite node and provides a callback
   with writen data and error(if occured). */
function write_data(node, data, call) {
	firebase.database()
		.ref(node)
		.set(data, (error) => {
			call(data, error);
		});
}

/* Synchronously returns list of all files matching an extension from a directory */
function listFiles(dir, ext){
	console.log('Reading files...\n');
	var list = [];
	const files = fs.readdirSync('./'+dir+'/');

	for (i in files) {
		if(files[i].endsWith('.'+ext.toLowerCase()) || files[i].endsWith('.'+ext.toUpperCase()))
			list.push(files[i]);
	}

	return list;
}

/* Synchronously parses list of all files and converts to JSON list and returns */
function parseXML(list) {
	for (i in list) {
		console.log(list[i]);
	}
}

console.log('Starting Script...\n');

parseXML(listFiles('xml', 'xml'));

/*write_data('downloads', {'test' : true}, (data, error) => {
	if(error) {
		console.log('error');
	} else {
		console.log('Written Successfully');
	}
});*/
