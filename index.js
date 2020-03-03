const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';
var AUTHURL = 'holi'

const util = require('util')

var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/webform'));

const auth = util.promisify(authorize)

//-------------------------------------------------------------

app.get('/', function (req, res) {
	// Check if TOKEN already exists
	fs.readFile('credentials.json', (err) => {
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
					loadToken(token);
				}
			});
		}
	});
});

app.get('/authorization', function (req, res) {
	res.render('authorization');
	getAuthorizationUrl();
});

app.post('/authorize', function (req, res) {
	//console.log(req.body.code)
	res.render('error')
});

app.get('/getCode', function (req, res) {
	res.redirect(AUTHURL);
});

app.get('/predictSheet', function (req, res) {
	res.render('predictSheet');
});

app.get('/noCredentialsError', function (req, res) {
	res.render('noCredentialsError');
});

app.get('*', function (req, res) {
	res.render('error');
});

//-------------------------------------------------------------

const server = app.listen(3000, function () {
	console.log(`Express running → PORT ${server.address().port}`)
});

function init() {
	console.log('wiwiw');
	fs.readFile('credentials.json', (err, content) => {
		if (err) return console.log('Error al cargar credenciales:', err);

		authorize(JSON.parse(content))
	});
}

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

function authorize(credentials, callback) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getNewToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}

function getNewToken(oAuth2Client, callback) {
	console.log('new token');

	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	//console.log('Authorize this app by visiting this url:', authUrl);

	return askCode(oAuth2Client, authUrl, callback);
}

function askCode(oAuth2Client, authUrl, callback) {
	//console.log(authUrl)
	//return setToken(oAuth2Client, code, callback)

}

function setToken(oAuth2Client, code, callback) {
	console.log('Código recibido')
	oAuth2Client.getToken(code, (err, token) => {
		if (err) return console.error('Error al intentar adquirir token de acceso', err);
		oAuth2Client.setCredentials(token);
		// Store the token to disk for later program executions
		fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
			if (err) return console.error(err);
			console.log('Token guardado en', TOKEN_PATH);
		});
		callback(oAuth2Client);
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
	fs.readFile('credentials.json', (err, content) => {
		const {client_secret, client_id, redirect_uris} = JSON.parse(content).installed;
		const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
		AUTHURL = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		});
	});
}

function loadToken(token) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

	oAuth2Client.setCredentials(JSON.parse(token));
	callback(oAuth2Client);
}