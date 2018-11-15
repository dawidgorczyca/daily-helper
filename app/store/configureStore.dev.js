import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'connected-react-router'
import { createLogger } from 'redux-logger'

// Reducers
import rootReducer from '../dataLayer/reducers'
// Middlewares
import ipcMiddleware from '../dataLayer/middlewares/ipc.middleware'
import userDataMiddleware from '../dataLayer/middlewares/userData.middleware'

// Actions
import * as userDataActions from '../dataLayer/actions/userData.actions'
import * as ipcActions from '../dataLayer/actions/ipc.actions'

const history = createHashHistory()

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [
    ipcMiddleware,
    userDataMiddleware
  ]
  const enhancers = []

  // Thunk Middleware
  middleware.push(thunk)

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  })

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger)
  }

  // Router Middleware
  const router = routerMiddleware(history)
  middleware.push(router)

  // Redux DevTools Configuration
  const actionCreators = {
    ...ipcActions,
    ...userDataActions,
    ...routerActions
  }
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept(
      '../dataLayer/reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../dataLayer/reducers').default)
    )
  }

  return store
}

export default { configureStore, history }
