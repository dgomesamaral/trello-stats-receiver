const express = require('express')
const bodyParser = require('body-parser')
var fs = require('fs')

const app = express()

const port = 3000

// Allows us to easily read the payload from the webhook
app.use( bodyParser.json() );

app.use("/analyzing", (req, res, next) => {
  console.log(req.body.action);
  console.log(req.body.model);
  res.sendStatus(200);
});

app.use("/developing", (req, res, next) => {
  console.log(req.body.action);
  console.log(req.body.model);
  res.sendStatus(200);
});

app.use("/testing-qua", (req, res, next) => {
  console.log(req.body.action);
  console.log(req.body.model);
  res.sendStatus(200);
});

app.use("/testing-acc", (req, res, next) => {
  console.log(req.body.action);
  console.log(req.body.model);
  res.sendStatus(200);
});

app.listen(process.env.PORT || 5000, () => console.log(`App listening on port ${port}`))

function registerActivity(file, content) {
	fs.appendFile(file, content + '\n', (err) => {
		if (err) throw err;
	}) 
}