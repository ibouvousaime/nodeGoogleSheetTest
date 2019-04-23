const main = require('./main');
const fs = require('fs');
const {google} = require('googleapis');

var docID;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(`Quelle est l'id de votre document google sheet? `, (id) => {
    docID = id;
    start();
    readline.close()
})

function start () {
    fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    main.authorize(JSON.parse(content), writeInJs);
    });
}
function factorial(n) {
    if (n <= 1) return 1;
    else return factorial(n-1) * n;
}

function getFactorialTable() {
    let result = new Array();
    for (let i =0; i < 10; i++) {
        let r = new Array();
        for (let j =0; j < 10; j++) {
            r[j] = (factorial(i+j));
        }
        result.push(r);
    }
    return result;
}
var body = {
  values: getFactorialTable()
};

valueInputOption = 'USER_ENTERED'

function writeInJs(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.update({
   spreadsheetId: docID,
   range: 'A1:J10',
   valueInputOption:valueInputOption,
   resource: body
});
}
