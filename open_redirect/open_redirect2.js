const express = require('express');
const app = express();


app.get('/redirect', async (request, response) => {
    const WHITELIST_TO_REDIRECT = new Set(["securitygym.ru"]);

    const redirect = request.query.url;
    console.log(url);
    console.log(url.parse(redirect));
    const targetUrl = url.parse(redirect);
    if (WHITELIST_TO_REDIRECT.has(targetUrl.host)) {
        return response.redirect(url);
    } 
})

app.listen(8000, function () {
    console.log('Listening to Port 8000');
  });