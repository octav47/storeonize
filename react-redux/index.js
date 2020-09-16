import React from 'react'
import { StoreContext, useStoreon } from 'storeon/react'
import { customDispatcher } from '../core'

const Provider = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

const connect = (mapStateToProps, mapDispatchToProps, mergeProps) => Target => {
  return props => {
    const { store, dispatch: storeonDispatcher } = useStoreon('store')
    const dispatch = customDispatcher(storeonDispatcher, store)
    const mapStateToPropsValues = mapStateToProps(store, props)
    const mapDispatchToPropsValues = mapDispatchToProps
      ? mapDispatchToProps(dispatch, props)
      : { dispatch }
    const mergePropsValues = mergeProps
      ? mergeProps(mapStateToPropsValues, mapDispatchToPropsValues, props)
      : null

    if (mergePropsValues) {
      return <Target {...props} {...mergePropsValues} />
    }

    if (mapDispatchToPropsValues) {
      return <Target {...props} {...mapDispatchToPropsValues} />
    }

    return <Target {...props} {...mapStateToPropsValues} />
  }
}

export { Provider, connect }
