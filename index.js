const express = require('express')
const bodyParser = require('body-parser')
var fs = require('fs')

const app = express()

const port = 3000

// Allows us to easily read the payload from the webhook
app.use( bodyParser.json() );

app.use("/", (req, res, next) => {
  console.log(req.body.action.type);
  if(req.body.action.type === 'moveCardFromBoard' || req.body.action.type === 'moveCardToBoard' ) {
    console.log('Card moved');
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT || 5000, () => console.log(`App listening on port ${port}`))

function LoggingUtil(file, content) {
	fs.appendFile(file, content + '\n', (err) => {
		if (err) throw err;
	}) 
}