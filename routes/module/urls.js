const router = require('express').Router()
const model = require('../../models/index')

router
  .route('/')
  .post(async (req, res) => {
    const { originalUrl } = req.body
    res.json(await model.returnUrl(originalUrl))
  })

module.exports = router
