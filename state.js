'use strict'

let state = {
  notes: {},
  draft: {},
  appLocation: {
    params: {}
  }
}

let handlerCreators = []

const subscribe = (handler) => {
  handlerCreators.push(handler)
}

const setState = function (newState) {
  const validHandlers = handlerCreators.map(createHandler => {
    return createHandler(newState)
  })
  state = newState
  callHandlers(validHandlers)
}

const callHandlers = function (handlers) {
  handlers.map(handler => {
    if (handler) {
      handler(state)
    }
  })
}

const getState = function () {
  return state
}

const connect = function (getSlice, handler) {
  const handleChange = newState => {
    if (getSlice(state) !== getSlice(newState)) {
      return handler
    }
  }

  subscribe(handleChange)
}

module.exports = {
  connect,
  setState,
  getState
}
