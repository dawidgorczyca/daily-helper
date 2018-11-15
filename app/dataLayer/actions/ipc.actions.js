export const ipcActionsNames = {
  updateEvents: 'IPC/UPDATE/EVENTS',
  addResponse: 'IPC/ADD/RESPONSE',
  clearResponses: 'IPC/CLEAR/RESPONSES',
  callEvent: 'IPC/CALL'
}

const {
  updateEvents,
  addResponse,
  clearResponses,
  callEvent
} = ipcActionsNames

export function ipcUpdateEvents(events) {
  return {
    type: updateEvents,
    events
  }
}

export function ipcAddResponse(response) {
  return {
    type: addResponse,
    response
  }
}

export function ipcClearResponses() {
  return {
    type: clearResponses
  }
}

export function ipcCallEvent(eventName, eventId, eventData) {
  return {
    type: callEvent,
    eventName,
    eventId,
    eventData
  }
}
