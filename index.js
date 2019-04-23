const main = require('./main');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  main.authorize(JSON.parse(content), writeInJs);
});

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
   spreadsheetId: '1UJd79fPTQZ2TWh3y-bJC5Z2rQQSvjDCY2_N21OSXBlc',
   range: 'A1:J10',
   valueInputOption:valueInputOption,
   resource: body
});
}
