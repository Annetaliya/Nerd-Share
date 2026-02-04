const express = require('express');
const { createTables } = require('./db')

const app = express();
const port = 8000;



createTables()

app.get('/', (req, res) => {
	res.send('Hello World')
	})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
	})