require('dotenv').config()
const express = require('express')
const { engine } = require('express-handlebars')

require('./config/mongoose')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use('/', express.urlencoded({ extended: false }))
app.use('/urls', express.json())
app.use('/urls', clientJsonErrors)
app.use(routes)

app.listen(PORT, () => console.log(`Express is listening on localhost:${PORT}`))

function clientJsonErrors(err, res, res, next) {
  const { originalUrl } = req.body
  if (!originalUrl) {
    return res.render('index', { errorMsg: 'No data was sent to server. Please refresh page and try again.' })
  }
  next()
}