var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var googleAuth = require('google-auth-library');
var base64url = require('base64url');


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

/**
 * returns oauth2client
 *
 */

module.exports.authorize = () => {
    return new Promise ((resolve, reject) => {
        // Load client secrets from a local file.
        fs.readFile('client_secret.json', function processClientSecrets(err, content) {
            if (err) {
                console.log('Error loading client secret file: ' + err);
                reject(new Error('Error loading client secret file: ' + err));
            }
            let credentials = JSON.parse(content);
            let clientSecret = credentials.installed.client_secret;
            let clientId = credentials.installed.client_id;
            let redirectUrl = credentials.installed.redirect_uris[0];
            let auth = new googleAuth();
            let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

            // Check if we have previously stored a token.
            fs.readFile(TOKEN_PATH, function(err, token) {
                if (err) {
                    getNewToken(oauth2Client).then((o2Client)=>{
                        resolve(o2Client);
                    });
                } else {
                    oauth2Client.credentials = JSON.parse(token);
                    resolve(oauth2Client);
                }
            });
        });
    });
}

/**
* Lists the labels in the user's account.
*
* @param {google.auth.OAuth2} auth An authorized OAuth2 client.
*/
module.exports.listLabels = (auth) => {
    return new Promise((resolve, reject)=>{
        var gmail = google.gmail('v1');
        gmail.users.labels.list({
            auth: auth,
            userId: 'me',
        }, function(err, response) {
            if (err) {
                reject('The API returned an error: ' + err);
            }
            var labels = response.labels;
            if (labels.length == 0) {
                resolve('No labels found.');
            } else {
                let labelStr = "Labels:";
                for (let i = 0; i < labels.length; i++) {
                    let label = labels[i];
                    console.log(`${label.name}`);
                    labelStr += `\n - ${label.name}`;
                }
                resolve(labelStr);
            }
        });
    });
}

module.exports.getAllEmails = (auth) => {
    return new Promise ((resolve, reject) => {
        let gmail = google.gmail('v1');
         gmail.users.messages.list({
             auth: auth,
             userId: 'me'
             //no query
             //no page token
         }, function(err, response){
             if (err) {
                 reject ('The API returned an error' + err);
             }

             let allEmailsPromises = [];

             //get all the promises for each email listed
             response.messages.forEach((message)=>{
                 allEmailsPromises.push(getEmail(auth, message.id));
             });

             //hit the api synchronously and get all the emails of the user
             Promise.all(allEmailsPromises)
             .then((responseList) => {
                 responseList[0].actionable = 'no';
                 responseList[1].actionable = 'no';
                 resolve(responseList);
             });
         })
    });
}

function getEmail(auth, messageId){
    return new Promise((resolve, reject) =>{
        let gmail = google.gmail('v1');
        gmail.users.messages.get({
            auth: auth,
            userId: 'me',
            id: messageId
        }, function (err, response){
            if (err) {
                reject ('The API returned an error' + err);
            }
            //need also subject, sender, text, receiver, cc, bcc
            let bodyText = base64url.decode(response.payload.parts[0].body.data);
            let date = response.payload.headers.find((header) => header.name === 'Date').value;
            let from = response.payload.headers.find((header) => header.name === 'From').value;
            let to = response.payload.headers.find((header) => header.name === 'To').value;
            let subject = response.payload.headers.find((header) => header.name === 'Subject').value;
            // console.log(response.payload.headers);
            //the object returned, each email with their data
            resolve({
                subject: subject,
                from: from,
                to: to,
                date: date,
                bodyText: bodyText,
                actionable: 'yes'
            });
        });
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    return new Promise((resolve, reject) => {
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function(code) {
            rl.close();
            oauth2Client.getToken(code, function(err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                storeToken(token);
                resolve(oauth2Client);
            });
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}
