// Require console so it can be mocked
const console = require('./console')

module.exports = Log

let types = ['silly', 'debug', 'info', 'warn', 'error']
let logLevel = process.env.LOG_LEVEL || 'silly'

let allowedTypes = types.slice(types.indexOf(logLevel))
  .reduce((acc, type) => Object.assign(acc, {[type]: 1}), {})

function Log (prefix) {
  return types.reduce((acc, type) => {
    acc[type] = function log (...args) {
      if (!(type in allowedTypes)) return
      console.log(
        `[${type}]`,
        `${prefix}:`,
        ...args
      )
    }
    return acc
  }, {})
}
