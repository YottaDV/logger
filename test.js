const test = require('tape')
const proxyquire = require('proxyquire')

let callCount = 0
let lastConsoleArgs

const getLogger = () => proxyquire('./', {
  './console': {
    log: (...args) => {
      callCount++
      lastConsoleArgs = args
    }
  }
})

test('should call console.log with message and prefix', (t) => {
  const log = getLogger()('prefix')
  log.info('message')
  const string = JSON.stringify(lastConsoleArgs)
  t.ok(/prefix/.test(string))
  t.ok(/message/.test(string))
  t.end()
})

test('it shouldnt call if log level is set', t => {
  callCount = 0
  process.env.LOG_LEVEL = 'debug'
  const log = getLogger()('prefix')
  log.silly('hi')
  t.equal(callCount, 0)
  log.debug('what')
  t.equal(callCount, 1)
  t.end()
})
