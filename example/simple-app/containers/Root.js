import React, { Suspense, lazy } from 'react'
import { Provider } from 'storeonize/react-redux'
import configureStore from '../store'

const store = configureStore()

const LazyApp = lazy(() => import('./App'))

export default () => (
  <Provider store={store}>
    <Suspense fallback="Loading...">
      <LazyApp />
    </Suspense>
  </Provider>
)
