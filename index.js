const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 3000


app.get('/', urlencodedParser, (req, res) => {
  LoggingUtil('logs_POST.txt', req.body)
})

app.post('/', urlencodedParser, (req, res) => {
  LoggingUtil('logs_GET.txt', req.body)
})


app.listen(process.env.PORT || 5000, () => console.log(`App listening on port ${port}`))

function LoggingUtil(file, content) {
	fs.appendFile(file, content + '\n', (err) => {
		if (err) throw err;
	}) 
}