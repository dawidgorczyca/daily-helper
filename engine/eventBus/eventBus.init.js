const util = require('util')
const events = require('events')
const busEvents = require('./eventBus.config')

let Emitter = function (name, events) {
  this.name = name
  this.events = events
}
util.inherits(Emitter,events.EventEmitter)

let eventBusInterface = {}

function makePools(busEvents) {
  return Object.values(busEvents).map( (pool, index) => {
    return new Emitter(
      Object.keys(busEvents)[index],
      pool
    )
  })
}

function initPool(pool) {
  const eventNames = []

  Object.keys(pool.events).forEach((name, index) => {
    eventNames.push(name)
  })
  eventNames.forEach((name, index) => {
    pool.on(`${pool.name}/${name}`, async (...args) => {
      try {
        const eventMethod = pool.events[name]
        const methodOutput = await eventMethod(...args)
        methodOutput && pool.emit(`${pool.name}/${name}/RESPONSE`, methodOutput)
      } catch (e) {
        console.log('[ERROR]|eventBus|initPool| ', e)
      }
    });
  })
}

function generateInterfaceEvents(pools) {
  const output = {}
  pools.forEach((pool, index) => {
    output[pool.name] = pool
  })
  return output
}

function init() {
  const pools = makePools(busEvents)
  eventBusInterface.events = generateInterfaceEvents(pools)
  pools.forEach((pool, index) => {
    initPool(pool)
  })
}

// How to call the events
// interface.events.diskEvents.emit('READ_DIR','C:/')
// interface.events.diskEvents.emit('READ_FILE','C:/file')
module.exports.init = init
module.exports.interface = eventBusInterface
