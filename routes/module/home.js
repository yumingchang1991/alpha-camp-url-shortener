const router = require('express').Router()
const model = require('../../models/index')

router
  .route('/')
  .get((req, res) => {
    res.render('index')
  })

router
  .route('/:shortenPath')
  .get(async (req, res) => {
    if (!req.params || req.params.shortenPath.length !== 5) {
      return res.render('index', { errorMsg: `What you enter is not a valid or active shortenPath` })
    }
    const urlFound = await model.returnUrlFromShortenPath(req.params.shortenPath)
    if (urlFound) {
      
      return res.redirect(urlFound.originalUrl)
    }
    return res.render('index', { errorMsg: `there is no active data matched your path` })
  })

module.exports = router