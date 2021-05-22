const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ cookie: true })
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}), cookieParser());



app.get('/', csrfProtection, (req, res) => {
    res.send(`
      <form action="/entry" method="POST">
        <div>
          <label for="message">Enter a message</label>
          <input id="message" name="message" type="text" />
          <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    `);
  });

  app.post('/entry', csrfProtection, (req, res) => {
    res.send(`Message received: ${req.body.message}`);
  });

  app.listen(8000, function () {
    console.log('Listening to Port 8000');
  });