import { ipcRenderer } from 'electron'
import * as ipcActions from '../dataLayer/actions/ipc.actions'
import { userDataGetSavePath } from '../dataLayer/actions/userData.actions'

export default function ipcFrontend(dispatch) {
  dispatch(userDataGetSavePath())

  ipcRenderer.on('eventsList', (event, message) => {
    dispatch(ipcActions.ipcUpdateEvents(message))
  })

  // ipcRenderer.on('diskEvents/READ_DIR/RESPONSE', (event, message) => {
  //   console.log('diskEvents/READ_DIR/RESPONSE', message)
  // })

  // ipcRenderer.on('diskEvents/REMOVE_DIR/RESPONSE', (event, message) => {
  //   console.log('diskEvents/REMOVE_DIR/RESPONSE', message)
  // })

  // ipcRenderer.on('diskEvents/READ_FILE/RESPONSE', (event, message) => {
  //   console.log('diskEvents/READ_FILE/RESPONSE', message)
  // })
}
