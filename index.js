const express = require('express')
const bodyParser = require('body-parser')
var fs = require('fs')

const app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 3000

  
app.use("/", (req, res, next) => {
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