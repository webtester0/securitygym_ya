const express = require('express');
const app = express();


app.get('/redirect', async (request, response) => {
    const reg = /securitygym\.ru/gm;
    const url = request.query.url;
    if (url.match(reg)) {
        return response.redirect(url);
    } else {
        return null;
    }
})

app.listen(8000, function () {
    console.log('Listening to Port 8000');
  });