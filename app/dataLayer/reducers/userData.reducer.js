import update from 'immutability-helper'
import { userDataActionsNames } from '../actions/userData.actions'

const defaultUserData = {
  recentlyUsedScenarios: [],
  recentlyUsedBrokers: [],
  savePath: '',
  status: ''
}

export default function userData(state = defaultUserData, action) {
  switch (action.type) {
    case userDataActionsNames.updateScenarios:
      return update(state, {
        recentlyUsedScenarios: { $set: action.scenarios }
      })
    case userDataActionsNames.addScenario:
      return update(state, {
        recentlyUsedScenarios: { $push: action.scenario }
      })
    case userDataActionsNames.updateBrokers:
      return update(state, {
        recentlyUsedBrokers: { $set: action.brokers }
      })
    case userDataActionsNames.addBroker:
      return update(state, {
        recentlyUsedBrokers: { $push: action.broker }
      })
    case userDataActionsNames.updateStatus:
      return update(state, {
        status: { $set: action.userDataStatus }
      })
    case userDataActionsNames.updateSavePath:
      return update(state, {
        savePath: { $set: action.savePath }
      })
    default:
      return state;
  }
}
