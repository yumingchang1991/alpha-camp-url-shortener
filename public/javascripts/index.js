const HEAD = document.getElementsByTagName('HEAD')[0]
const BODY = document.getElementsByTagName('BODY')[0]
const icon = document.getElementsByTagName('i')[0]
const urlInput = document.querySelector('div.url')
const shortenButton = document.getElementById('shorten-button')
const completedButtonWrapper = document.getElementById('completed-button-wrapper')
const copyButton = document.getElementById('copy-button')
const backButton = document.getElementById('back-button')

const stringStore = {
  state: {
    AWAITING: 'awaiting',
    PROCESSING: 'processing',
    COMPLETED: 'completed'
  },

  class: {
    ROTATE: 'rotate-180',
    ROLL: 'roll',
    BACKGROUNDGRAY: 'background-gray',
    PROCESSING: 'processing',
    DISPLAYNONE: 'display-none'
  }
}

const utility = {
  isUrlValid() {
    return urlInput.textContent.trim().length > 0
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

  async fetchingData() {
    const path = '/urls'
    const APIEndpoint = window.location.origin + path
    let urlReturned = Object.create(null)
    await axios
      .post(APIEndpoint, { originalUrl: urlInput.textContent.trim() })
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
    urlInput.textContent = `${window.location.origin}/${model.urlReturned.shortenPath}`
    urlInput.setAttribute('contenteditable', false)
  },

  renderButtons(isShorten = true, isCompleted = true) {
    if (isShorten && !isCompleted) {
      shortenButton.classList.remove(stringStore.class.DISPLAYNONE)
      completedButtonWrapper.classList.add(stringStore.class.DISPLAYNONE)
      return
    }
    if (!isShorten && isCompleted) {
      shortenButton.classList.add(stringStore.class.DISPLAYNONE)
      completedButtonWrapper.classList.remove(stringStore.class.DISPLAYNONE)
      return
    }
    if (!isShorten && !isCompleted) {
      shortenButton.classList.remove(stringStore.class.DISPLAYNONE)
      completedButtonWrapper.classList.remove(stringStore.class.DISPLAYNONE)
      return
    }
    console.log('error: cannot display shorten button & completed buttons at the same time')
  },

  eventHandlers: {
    addFocusEffect(e) {
      BODY.classList.add(stringStore.class.BACKGROUNDGRAY)
      icon.classList.add(stringStore.class.ROTATE)
    },
    removeFocusEffect(e) {
      BODY.classList.remove(stringStore.class.BACKGROUNDGRAY)
      icon.classList.remove(stringStore.class.ROTATE)
    },
    submitURL(e) {
      if (!utility.isUrlValid()) {
        alert('Please enter a valid url')
        return
      }
      view.renderButtons(false, false)
      model.currentState = stringStore.state.PROCESSING
      controller.run(model.currentState)
    },
    copyToBoard(e) {
      navigator.clipboard.writeText(urlInput.textContent)
      alert('shortenPath is copied to clipboard!')
    },
    redirectToHome(e) {
      window.location.replace(window.location.origin)
    }
  },

  eventListeners: {
    addButtonListeners() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && model.currentState === stringStore.state.AWAITING) {
          view.eventHandlers.submitURL()
        }
      })
      shortenButton.addEventListener('click', view.eventHandlers.submitURL)
      shortenButton.addEventListener('mouseenter', view.eventHandlers.addFocusEffect)
      shortenButton.addEventListener('mouseleave', view.eventHandlers.removeFocusEffect)
      copyButton.addEventListener('click', view.eventHandlers.copyToBoard)
      backButton.addEventListener('click', view.eventHandlers.redirectToHome)
    }
  },

  toggleProcessingAnimation(isEnteringProcessing = true) {
    if (isEnteringProcessing) {
      // add animation
      icon.classList.remove(stringStore.class.ROTATE)
      icon.classList.add(stringStore.class.ROLL)
      // view when processing
      urlInput.disabled = true
      return
    }
    // remove animation
    icon.classList.remove(stringStore.class.ROLL)
    icon.classList.add(stringStore.class.ROTATE)
    // view when completed
    urlInput.disabled = false
  },
}

const controller = {
  initializeApp() {
    view.addCSSLinkToHead()
    view.eventListeners.addButtonListeners()
    console.log('Welcome to URL Shortener, designed by')
    console.log('%c Yu-Ming, Chang', 'font-size:3rem; color: orange')
    console.log('https://yumingchang1991.github.io/personal-portfolio/')
  },
  
  run(currentState) {
    switch (currentState) {
      case '':
      case stringStore.state.AWAITING:
        controller.runAwaiting()
        break
      case stringStore.state.PROCESSING: {
        controller.runProcessing()
        break
      }
      case stringStore.state.COMPLETED:
        controller.runCompleted()
        break
    }
  },

  runAwaiting() {
    urlInput.textContent = ''
    view.renderButtons(true, false)
  },

  async runProcessing() {
    view.toggleProcessingAnimation(true)
    model.urlReturned = await model.fetchingData()
    model.currentState = stringStore.state.COMPLETED
    controller.run(model.currentState)
  },

  runCompleted() {
    view.renderButtons(false, true)
    view.toggleProcessingAnimation(false)
    view.renderShortenPath(model.urlReturned)
    view.renderButtons(false)
  }
}

controller.initializeApp()
controller.run(model.currentState)