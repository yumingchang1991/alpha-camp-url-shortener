const HEAD = document.getElementsByTagName('HEAD')[0]
const BODY = document.getElementsByTagName('BODY')[0]
const icon = document.getElementsByTagName('i')[0]
const inputUrl = document.querySelector('input[type="url"]')
const button = document.querySelector('button')

const utility = {
  isUrlValid() {
    return inputUrl.value.length > 0
  },

  isResponseValid(res) {
    const keysToHave = ['originalUrl', 'shortenPath']
    const keys = Object.keys(res.data)
    return keysToHave.reduce((result, keyToHave) => {
      return keys.some(key => key === keyToHave)
    }, true)
  }
}

const model = {
  currentState: 'awaiting',
  urlReturned: {},

  stateStore: {
    awaiting: 'awaiting',
    processing: 'processing',
    completed: 'completed'
  },

  classStore: {
    rotate: 'rotate-180',
    roll: 'roll',
    backgroundGray: 'background-gray',
    processing: 'processing'
  },

  async fetchingData() {
    const path = '/urls'
    const APIEndpoint = window.location.origin + path
    let urlReturned = Object.create(null)
    await axios
      .post(APIEndpoint, { originalUrl: inputUrl.value })
      .then(response => {
        if (!utility.isResponseValid(response)) {
          // error handling will go here
          return console.log('data returned from API is not complete')
        }
        Object.assign(urlReturned, response.data)
      })
      .catch(e => console.error(e))

    return urlReturned
  }
}

const view = {
  addCSSLinkToHead() {
    const id = 'index-css'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      HEAD.appendChild(link)
      link.href = '/stylesheets/index.css'
      link.type = 'text/css'
      link.rel = 'stylesheet'
    }
  },

  renderShortenPath(url) {

  },
  renderCopyButton() {

  },

  toggleProcessingAnimation(isEnteringProcessing = true) {
    if (isEnteringProcessing) {
      icon.classList.remove(model.classStore.rotate)
      icon.classList.add(model.classStore.roll)
      view.eventListeners.toggleFocusEffect(false)
      button.setAttribute('disabled', true)
      button.textContent = model.currentState
      button.classList.add(model.classStore.processing)
      return
    }
    icon.classList.remove(model.classStore.roll)
    view.eventListeners.toggleFocusEffect(true)
    button.setAttribute('disabled', false)
    button.textContent = 'Click to Copy'
    button.classList.remove(model.classStore.processing)
  },

  eventHandlers: {
    addFocusEffect(e) {
      BODY.classList.add(model.classStore.backgroundGray)
      icon.classList.add(model.classStore.rotate)
    },
    removeFocusEffect(e) {
      BODY.classList.remove(model.classStore.backgroundGray)
      icon.classList.remove(model.classStore.rotate)
    },
    submitURL(e) {
      if (!utility.isUrlValid()) {
        alert('Please enter a valid url')
        return
      }
      model.currentState = model.stateStore.processing
      controller.run(model.currentState)
    }
  },

  eventListeners: {
    addAwaitingListener() {
      view.eventListeners.toggleFocusEffect(true)
      button.addEventListener('click', view.eventHandlers.submitURL)
    },

    toggleFocusEffect(toBeAdded = true) {
      if (toBeAdded) {
        button.addEventListener('mouseenter', view.eventHandlers.addFocusEffect)
        button.addEventListener('mouseleave', view.eventHandlers.removeFocusEffect)
        return
      }
      button.removeEventListener('mouseenter', view.eventHandlers.addFocusEffect)
      button.removeEventListener('mouseleave', view.eventHandlers.removeFocusEffect)
    }
  }
}

const controller = {
  run(currentState) {
    switch (currentState) {
      case '':
      case model.stateStore.awaiting:
        controller.runAwaiting()
        break
      case model.stateStore.processing: {
        controller.runProcessing()
        break
      }
      case model.stateStore.completed:
        controller.runCompleted()
        break
      default:

    }
  },

  runAwaiting() {
    view.addCSSLinkToHead()
    view.eventListeners.addAwaitingListener()
    console.log(`GREAT! ~ URL Shortener is initialized to: ${model.currentState}`)
  },

  async runProcessing() {
    view.toggleProcessingAnimation(true)
    model.urlReturned = await model.fetchingData()
    model.currentState = model.stateStore.completed
    controller.run(model.currentState)
  },

  runCompleted() {
    view.toggleProcessingAnimation(false)
    view.eventListeners.toggleFocusEffect(true)
    view.renderShortenPath(model.urlReturned)
    view.renderCopyButton()
  }
}

controller.run(model.currentState)