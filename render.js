'use strict'

module.exports = function (comp, elem) {
  if (elem === null) {
    return
  }

  const dom = document.getElementById(elem)
  if (!dom) {
    return console.log(`WARNING: ${elem} does not exist, couldn't mount component`)
  }
  if (!comp) {
    console.log(`component for ${elem} is null; element will be erased`)
  }

  document.getElementById(elem).innerHTML = ''
  if (comp) {
    document.getElementById(elem).appendChild(comp)
  }
}
