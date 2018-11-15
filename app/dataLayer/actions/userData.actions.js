export const userDataActionsNames = {
  updateScenarios: 'USER_DATA/UPDATE/SCENARIOS',
  addScenario: 'USER_DATA/ADD/SCENARIOS',
  updateBrokers: 'USER_DATA/UPDATE/BROKERS',
  addBroker: 'USER_DATA/ADD/BROKER',
  updateStatus: 'USER_DATA/UPDATE/STATUS',
  updateSavePath: 'USER_DATA/UPDATE/SAVE_PATH',
  getSavePath: 'USER_DATA/GET/SAVE_PATH',
  getUserData: 'USERS_DATA/GET/DATA'
}

const {
  updateScenarios,
  updateBrokers,
  addScenario,
  addBroker,
  updateStatus,
  updateSavePath,
  getSavePath,
  getUserData
} = userDataActionsNames

export function userDataUpdateScenarios(simulations) {
  return {
    type: updateScenarios,
    simulations
  }
}

export function userDataUpdateBrokers(brokers) {
  return {
    type: updateBrokers,
    brokers
  }
}

export function userDataAddScenario(scenario) {
  return {
    type: addScenario,
    scenario
  }
}

export function userDataAddBroker(broker) {
  return {
    type: addBroker,
    broker
  }
}

export function userDataUpdateStatus(userDataStatus) {
  return {
    type: updateStatus,
    userDataStatus
  }
}

export function userDataUpdateSavePath(savePath) {
  return {
    type: updateSavePath,
    savePath
  }
}

export function userDataGetSavePath() {
  return {
    type: getSavePath
  }
}

export function userDataGetData(userData) {
  return {
    type: getUserData,
    userData
  }
}
