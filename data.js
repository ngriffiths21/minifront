'use strict'

let DATA = {}

const createData = function (key, map) {
  DATA[key] = { ...DATA[key], ...map }
  console.log(DATA)
}

module.exports = {
  createData,
  DATA
}
