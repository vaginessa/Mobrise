// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { middleware as pack } from 'redux-pack'
import { multiActionsMiddleware as multiActions, injectMiddleware as inject } from './utils'
import navigation from './navigation/navigationReducer'
import type { State as NavigationState } from './navigation/navigationReducer'
import connection from './connection/connectionReducer'
import type { State as ConnectionState } from './connection/connectionReducer'
import dashboard from './dashboard/dashboardReducer'
import type { State as DashboardState } from './dashboard/dashboardReducer'
import BitriseClient from './services/BitriseClient'

export type State = {
  navigation: NavigationState,
  connection: ConnectionState,
  dashboard: DashboardState,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle

// $FlowFixMe
export default () => {
  const store = createStore(combineReducers({
    navigation,
    connection,
    dashboard,
  }), composeEnhancers(applyMiddleware(
    multiActions,
    inject({ bitrise: new BitriseClient(), dispatch: (action: any) => store.dispatch(action), getState: () => store.getState() }),
    pack,
  )))
  return store
}
