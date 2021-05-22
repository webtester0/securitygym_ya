const express = require('express');
const sqlite3 = require('sqlite3');
const crypto = require('crypto');
const bodyParser = require('body-parser')
const app = express();

const sql = `
    CREATE TABLE IF NOT EXISTS memes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service TEXT,
      contents TEXT)`

let db = new sqlite3.Database(':memory:');
db.run(sql);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.post('/api/v1/private_meme/upload', (req, res) => {
    var token = req.header('X-Meme-Service-Token');
    var hashed_token = crypto.createHash('sha256').update(String(token)).digest('hex');
    console.log(hashed_token);
    db.run(`INSERT INTO memes (service, contents) VALUES (?, ?)`, [hashed_token, req.body.contents]);
    res.send('done');
});


app.get('/api/v1/private_meme/view/:memeId', (req, res) => {
    var memeId = req.params.memeId;
    var token = req.header('X-Meme-Service-Token');
    var hashed_token = crypto.createHash('sha256').update(String(token)).digest('hex');
    console.log(hashed_token);
    db.get('SELECT contents FROM memes WHERE id = ? and service = ?', [memeId, hashed_token], (err, result) => {
        if (err) {
            res.send('error');
        } else {
            if (result) {
                res.send(result);
            } else {
                res.send("not found");
            }
        }
    })
});

app.listen(8000, function () {
    console.log('Listening to Port 8000');
  });