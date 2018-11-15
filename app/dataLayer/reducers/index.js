// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import ipc from './ipc.reducer'
import userData from './userData.reducer'

const rootReducer = combineReducers({
  ipc,
  userData
})

export default rootReducer
