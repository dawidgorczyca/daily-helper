import update from 'immutability-helper'
import { ipcActionsNames } from '../actions/ipc.actions'

const defaultIpc = {
  events: [],
  responses: []
}

export default function ipc(state = defaultIpc, action) {
  switch (action.type) {
    case ipcActionsNames.updateEvents:
      return update(state, {
        events: { $set: action.events }
      })
    case ipcActionsNames.addResponse:
      return update(state, {
        responses: { $push: action.response }
      })
    case ipcActionsNames.clearResponses:
      return update(state, {
        responses: { $set: [] }
      })
    default:
      return state;
  }
}
