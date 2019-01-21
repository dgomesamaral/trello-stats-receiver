const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log(req)
  res.send("Received your message")
})

app.listen(process.env.PORT || 5000, () => console.log(`App listening on port ${port}`))