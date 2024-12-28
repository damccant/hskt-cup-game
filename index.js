const HTTP_PORT = 8080;

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

app.listen(HTTP_PORT, () => {
	console.log('Listening on port ' + HTTP_PORT);
});