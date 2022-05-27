const Url = require('./url')
const letters = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '1234567890'
const randomList = [...(letters + letters.toUpperCase() + numbers)]

const model = {
  async returnUrl(originalUrl) {
    const urlFound = Object.create(null)
    await Url
      .findOneAndUpdate(
        { originalUrl },
        {
          $setOnInsert: {
            originalUrl: originalUrl,
            shortenPath: model.generateUniqueShortenPath()
          },
          $inc: { useCount: 1 }
        },
        {
          new: true,
          upsert: true,
        }
      )
      .lean()
      .then(url => Object.assign(urlFound, url))
    return urlFound
  },

  async returnUrlFromShortenPath(shortenPath) {
    const urlFound = Object.create(null)
    await Url
      .findOne({ shortenPath })
      .lean()
      .then(url => Object.assign(urlFound, url))
      .catch(e => console.error(e))
    return urlFound
  },

  generateUniqueShortenPath() {
    let uniqueShortenPath = model.generateShortenPath()
    const existingUrls = model.returnUrls() || []
    const existingShortenPaths = existingUrls.length > 0 ? existingUrls.map(url => url.shortenPath) : []
    while (existingShortenPaths.includes(uniqueShortenPath)) {
      uniqueShortenPath = model.generateShortenPath()
    }
    return uniqueShortenPath
  },

  generateShortenPath() {
    const newShortenPath = []
    while (newShortenPath.length < 5) {
      newShortenPath.push(
        randomList[Math.floor(Math.random() * randomList.length)]
      )
    }
    return newShortenPath.join('')
  },

  async returnUrls() {
    let result = []
    await Url
      .find()
      .lean()
      .then(data => result = data.slice())
    return result
  }
}

module.exports = model