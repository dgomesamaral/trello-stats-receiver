const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 3000

app.get('/', urlencodedParser, (req, res) => {
  console.log("Name is ", req.body.action.data.card.name)
})

app.listen(process.env.PORT || 5000, () => console.log(`App listening on port ${port}`))