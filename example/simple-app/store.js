import { createStore, applyMiddleware } from 'storeonize/redux'
import thunkMiddleware from 'storeonize/redux-thunk'
import { createLogger } from 'storeonize/redux-logger'
import { composeWithDevTools } from 'storeonize/redux-devtools-extension'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

export default preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
  )
