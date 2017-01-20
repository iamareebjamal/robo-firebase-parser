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

const extension = 'xml', folder = 'xml';

/* Asynchronously writes data and approprite node and provides a callback
   with writen data and error(if occured). */
function write_data(node, data, call) {
	console.log('Writing in database...\n');
	firebase.database()
		.ref(node)
		.set(data, (error) => {
			call(data, error);
		});
}

/* Synchronously returns list of all files matching an extension from a directory */
function listFiles(dir, ext){
	dir = dir || folder;
	ext = ext || extension;
	console.log('Reading files...\n');
	var list = [];
	const files = fs.readdirSync('./'+dir+'/');

	for (i in files) {
		if(files[i].endsWith('.'+ext.toLowerCase()) || files[i].endsWith('.'+ext.toUpperCase()))
			list.push(files[i]);
	}

	return list;
}

/* Asynchronously parses list of all files and converts to JSON list and calls */
function parseXML(list, call) {
	console.log('Parsing Files...\n');
	var parsed = [];
	for (i in list) {
		var data = fs.readFileSync('./xml/' + list[i]);
		console.log('Parsing ' + list[i]);
		parseString(data, (error, result) => {
			parsed.push(result);

			if(i == list.length - 1)
				call(parsed);
		});
	}
}

console.log('Starting Script...\n');

parseXML(listFiles(), (list) => {

	console.log('\n\nGenerated data :');
	console.log(JSON.stringify(list, null, 2));
	
	/*write_data('downloads', list, (data, error) => {
		if(error) {
			console.log('error');
		} else {
			console.log('Written Successfully');
		}
	});*/

	process.exit();
});