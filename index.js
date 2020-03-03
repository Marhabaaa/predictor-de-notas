const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';
var AUTHURL = null;

var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/webform'));

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

//-------------------------------------------------------------

app.get('/', function (req, res) {
	console.log('Ingreso')
	fs.readFile(CREDENTIALS_PATH, (err) => {
		if (err) {
			res.redirect('noCredentialsError');
		}
		else {
			fs.readFile(TOKEN_PATH, (err, token) => {
				if (err) {
					res.redirect('authorization');
				}
				else {
					res.redirect('predictSheet');
				}
			});
		}
	});
});

app.get('/authorization', function (req, res) {
	loadToken().then(() => {
		console.log('Autorización Ok');
		res.render('authorizationOk');
	}).catch(function (err) {
		console.log('Autorización');
		res.render('authorization');
		getAuthorizationUrl();
	});
});

app.post('/authorize', function (req, res) {
	console.log('Autorizando...')
	getNewToken(req.body.code).then((flag) => {
		res.render('authorizationOk')
	}).catch(function (err) {
		console.log('errorrrrrrrrrrrrrrrrr');
	});
});

app.get('/getCode', function (req, res) {
	console.log('Obteniendo código...')
	res.redirect(AUTHURL);
});

app.get('/predictSheet', function (req, res) {
	loadToken().then(() => {
		console.log('Predecir')
		res.render('predictSheet')
	}).catch( function (err) {
		console.log('errorrrrrrrr');
		res.redirect('/');
	});
});

app.get('/noCredentialsError', function (req, res) {
	console.log('Sin credenciales')
	res.render('noCredentialsError');
});

app.get('*', function (req, res) {
	console.log('Error')
	res.render('error');
});

//-------------------------------------------------------------

const server = app.listen(3000, function () {
	console.log(`Express running → PORT ${server.address().port}`)
});

function enableAPI(credentials) {
	const { client_id } = credentials.installed;
	id = client_id.split("-", 1);
	console.log("https://console.developers.google.com/apis/api/sheets.googleapis.com/overview?project=" + id[0]);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('', (code) => {
		rl.close();
		return setToken(oAuth2Client, code, callback)
	});
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
	const sheets = google.sheets({ version: 'v4', auth });
	sheets.spreadsheets.values.get({
		//spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
		spreadsheetId: '13V41dtZPkOYc_ST9k2jWF_Ez2jYGw3FkVk0TVHWnLTg',
		range: 'Resumen!B4:S',
	}, (err, res) => {
		if (err) return console.log('The API returned an error: ' + err);
		const rows = res.data.values;
		if (rows.length) {
			console.log(rows.length)
			// Print columns A and E, which correspond to indices 0 and 4.
			rows.map((row) => {
				var names = row[0]
			});
		} else {
			console.log('No data found.');
		}
	});
}


function getAuthorizationUrl() {
	fs.readFile(CREDENTIALS_PATH, (err, content) => {
		const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
		const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
		AUTHURL = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		});
	});
}

function getNewToken(code) {
	return new Promise(function (resolve, reject) {
		fs.readFile(CREDENTIALS_PATH, (err, content) => {
			const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
			const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
				
			oAuth2Client.getToken(code, (err, token) => {
				if (err) {
					reject(false);
					return console.error('Error while trying to retrieve access token', err);
				}
				oAuth2Client.setCredentials(token);
	
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
					if (err) {
						reject(false);
					}
					console.log('Token stored to', TOKEN_PATH);
					resolve(true);
				});
			});
		});
	});
}

function loadToken() {
	return new Promise(function (resolve, reject) {
		fs.readFile(CREDENTIALS_PATH, (err, content) => {
			const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
			const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	
			fs.readFile(TOKEN_PATH, (err, token) => {
				if (err) reject(false);
				else {
					oAuth2Client.setCredentials(JSON.parse(token));
					resolve(true);
				}
			});
		});
	});
}