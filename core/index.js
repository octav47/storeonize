const morphReducer = (reducerName, reducer, actions = []) => {
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

    actions.forEach(action => {
      store.on(action, ({ store }, payload) => {
        const newState = reducer(store, { type: action, ...payload })

        return {
          store: {
            ...store,
            [reducerName]: newState,
          },
        }
      })
    })
  }
}

const customDispatcher = (dispatch, store) => {
  const d = (...dispatchArgs) => {
    const [event] = dispatchArgs

    if (typeof event === 'function') {
      event(d, () => store)
    } else if (typeof event === 'object' && event.type) {
      const { type, ...restEventData } = event

      dispatch(event.type, restEventData)
    } else {
      dispatch(...dispatchArgs)
    }
  }

  return d
}

export { morphReducer, customDispatcher }
