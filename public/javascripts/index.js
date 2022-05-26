const BODY = document.getElementsByTagName('BODY')[0]
const icon = document.getElementsByTagName('i')[0]
const submitButton = document.querySelector('button[type="submit"]')
const app = document.querySelector('.app')
const model = {
  currentState: 'awaiting',
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
}

window.addEventListener('load', () => {
  submitButton.addEventListener('mouseenter', becomeFocus)
  submitButton.addEventListener('mouseleave', leaveFocus)
  submitButton.addEventListener('click', submitURL)
  console.log('GREAT! ~ URL Shortener is loaded')
})

function becomeFocus (e) {
  BODY.classList.add(model.classStore.backgroundGray)
  icon.classList.add(model.classStore.rotate)
}

function leaveFocus (e) {
  BODY.classList.remove(model.classStore.backgroundGray)
  icon.classList.remove(model.classStore.rotate)
}

function submitURL (e) {
  model.currentState = model.stateStore.processing
  
  icon.classList.remove(model.classStore.rotate)
  icon.classList.add(model.classStore.roll)

  submitButton.removeEventListener('mouseenter', becomeFocus)
  submitButton.removeEventListener('mouseleave', leaveFocus)
  submitButton.setAttribute('disabled', true)
  submitButton.textContent = model.currentState
  submitButton.classList.add(model.classStore.processing)
}