import { ipcRenderer } from 'electron'
import { ipcActionsNames } from '../actions/ipc.actions'

export default store => next => (action) => {
  if (action.type === ipcActionsNames.updateEvents) {
    const eventsObj = {}
    action.events.forEach((item) => {
      eventsObj[item] = item
    })
    action.events = eventsObj
  }
  if (action.type === ipcActionsNames.callEvent) {
    ipcRenderer.send(
      action.eventName,
      action.eventId,
      action.eventData
    )
  }
  next(action)
}
