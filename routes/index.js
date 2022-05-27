const router = require('express').Router()
const home = require('./module/home')
const urls = require('./module/urls')

router.use('/', home)
router.use('/urls', urls)

module.exports = router