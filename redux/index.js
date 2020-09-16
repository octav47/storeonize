import { createStoreon } from 'storeon'

import { morphReducer } from '../core'

const combineReducers = reducersMap => {
  const reducersKeys = Object.keys(reducersMap)

  return reducersKeys.map(reducerName => {
    const [reducer, actions] = reducersMap[reducerName]

    return morphReducer(reducerName, reducer, actions)
  })
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

export { combineReducers, createStore, applyMiddleware }
