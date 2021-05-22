const express = require('express');
const bodyParser = require('body-parser');
const escapeHtml = require('escape-html');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/hello', (req, res) => {
    let username = escapeHtml(req.body.username);
    let global_settings = {'username': username};
    res.send(`
    <html>
        <head>
            <title>Hello Page</title>
            <script>
               var global_settings = ${JSON.stringify(global_settings)};
            </script>
        </head>
        <body>
            <h1>Hello, ${username}</h1>
            <form action="/hello" method="POST">
                <input type="text" name="username" value="${username}"/>
                <input type="submit" value="submit">
            </form>
        </body>
    </html>
    `);
});

app.listen(8000, function () {
    console.log('Listening to Port 8000');
  });