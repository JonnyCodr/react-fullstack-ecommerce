const express = require('express')
const app = express()
const port = 9000

const apiRoutes = require('./routes/apiRoutes')


app.get('/', (req, res) => {
  res.send('sup...')
})

app.use('/api', apiRoutes)


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
