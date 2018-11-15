import { ipcRenderer, remote } from 'electron'
import uniqid from 'uniqid'
import {
  userDataActionsNames,
  userDataUpdateSavePath,
  userDataGetData
} from '../actions/userData.actions'
import { ipcCallEvent } from '../actions/ipc.actions'
import saveDirTemplate from '../../constants/saveData'

function getAppData(store) {
  const appDataPath = remote.app.getPath('userData')
  const { events } = store.getState().ipc
  const eventId = uniqid()

  store.dispatch(ipcCallEvent('diskEvents/READ_FILE', eventId, `${appDataPath}/iot-sim-config.json`))

  ipcRenderer.once('diskEvents/READ_FILE/RESPONSE', (event, message) => {
    const config = new TextDecoder('utf-8').decode(message.output)
    if (config.length) {
      store.dispatch(userDataUpdateSavePath(JSON.parse(config)))
      store.dispatch(userDataGetData())
    }
  })
}

function saveAppData(store, dataDir) {
  const appDataPath = remote.app.getPath('userData')
  const { ipc, userData } = store.getState()
  const eventId = uniqid()

  store.dispatch(ipcCallEvent(
    'diskEvents/WRITE_FILE',
    eventId,
    {
      path: `${appDataPath}/`,
      filename: 'iot-sim-config',
      filetype: 'json',
      data: JSON.stringify(userData.savePath)
    }
  ))
}

function saveUserData(store, dataDir) {
  const { ipc, userData } = store.getState()
  const eventId = uniqid()

  store.dispatch(ipcCallEvent(
    'diskEvents/WRITE_FILE',
    eventId,
    {
      path: `${dataDir}/${saveDirTemplate.userData}/`,
      filename: 'config',
      filetype: 'json',
      data: JSON.stringify(userData)
    }
  ))
}

function validateDataDirectory(store, dataDir) {
  const { events } = store.getState().ipc
  const eventId = uniqid()

  store.dispatch(ipcCallEvent('diskEvents/READ_DIR', eventId, dataDir))

  ipcRenderer.once('diskEvents/READ_DIR/RESPONSE', (event, message) => {
    const validation = []
    Object.values(saveDirTemplate).forEach((dir) => {
      validation.push(message.output.indexOf(dir))
    })
    validation.indexOf(-1) !== -1 && createSubDirs(store, dataDir)
    saveUserData(store, dataDir)
    saveAppData(store)
  })
}

function createSubDirs(store, dataDir) {
  const { ipc, userData } = store.getState()
  const eventId = uniqid()

  Object.values(saveDirTemplate).forEach((dir) => {
    store.dispatch(ipcCallEvent('diskEvents/CREATE_DIR', eventId, `${dataDir}/${dir}`))
  })
}

async function getSavedData(store) {
  const { savePath } = store.getState().userData
  const routesEventId = uniqid()
  const simulationsEventId = uniqid()
  const userDataEventId = uniqid()

  store.dispatch(ipcCallEvent('diskEvents/READ_DIR', routesEventId, `${savePath}/routes`))
  store.dispatch(ipcCallEvent('diskEvents/READ_DIR', simulationsEventId, `${savePath}/simulations`))
  store.dispatch(ipcCallEvent('diskEvents/READ_DIR', userDataEventId, `${savePath}/userData`))

  // Somehow mechanism below needs to be serialized, not written down for every case
  // Wait on event name,
  // check for callId,
  // dispatch action with the response accordingly,
  // remove listener
  ipcRenderer.on('diskEvents/READ_DIR/RESPONSE', (event, message) => {
    const { callId, output } = message
    if (callId === routesEventId) {
      console.log('routes', output)
    }
    if (callId === simulationsEventId) {
      console.log('simulations', output)
    }
    if (callId === userDataEventId) {
      console.log('userData', output)
    }
  })
}

export default store => next => (action) => {
  if (action.type === userDataActionsNames.updateSavePath) {
    validateDataDirectory(store, action.savePath)
  }
  if (action.type === userDataActionsNames.getSavePath) {
    getAppData(store)
  }
  if (action.type === userDataActionsNames.getUserData) {
    getSavedData(store)
  }
  next(action)
}
