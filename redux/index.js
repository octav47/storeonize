const { createStoreon } = require('storeon')

let __keys__ = []

const setGlobalKeys = keys => (__keys__ = keys)

const morphReducer = (reducerName, reducer) => {
  return store => {
    store.on('@init', s => {
      const newState = reducer(undefined, {})

      return {
        store: {
          ...s.store,
          [reducerName]: newState,
        },
      }
    })

    // store.on('@changed', (s, event) => {
    //   console.log(s, event)
    // })
  }
}

const combineReducers = reducersMap => {
  const reducersKeys = Object.keys(reducersMap)

  setGlobalKeys(reducersKeys)

  return reducersKeys.map(reducerName =>
    morphReducer(reducerName, reducersMap[reducerName])
  )
}

const createStore = (reducer, preloadedState = {}, middleware = []) => {
  const preloadedStateModule = store => {
    Object.keys(preloadedState).forEach(key => {
      store.on('@init', s => {
        return {
          store: {
            ...s.store,
            [key]: preloadedState[key],
          },
        }
      })
    })
  }

  return createStoreon([preloadedStateModule, ...reducer, ...middleware])
}

const applyMiddleware = (...args) => {
  return args
}

module.exports = {
  combineReducers,
  createStore,
  applyMiddleware,
  morphReducer,
  __keys__,
}
