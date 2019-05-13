'use strict'

const { connect, getState, setState } = require('./state')
const renderAt = require('./render')
const { createData, DATA } = require('./data')

const mount = function (component, getStateSlice, props, dom, canRender) {
  connect(getStateSlice, makeHandler(component, props, dom, canRender))
}

const makeHandler = function (component, props, dom, canRender) {
  return state => {
    if (canRender(state)) {
      renderAt(component(methodsToValues(props)), dom)
    }
    // otherwise, do nothing
  }
}

const methodsToValues = function (obj) {
  return Object.fromEntries(callEntries(obj))
}

const callEntries = function (obj) {
  return Object.entries(obj).map(entry => {
    return [ entry[0], entry[1]() ]
  })
}

module.exports = {
  mount,
  getState,
  setState,
  createData,
  DATA
}
