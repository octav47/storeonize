const React = require('react')
const { StoreContext, useStoreon } = require('storeon/react')

const Provider = props => (
  <StoreContext.Provider value={props.store}>
    {props.children}
  </StoreContext.Provider>
)

const customDispatcher = (...args) => {
  console.log(args)

  // TODO
}

const connect = (mapStateToProps, mapDispatchToProps, mergeProps) => Target => {
  const ConnectedComponent = props => {
    const { store } = useStoreon('store')
    const mstp = mapStateToProps(store)
    const mdtp = mapDispatchToProps ? mapDispatchToProps() : {} // TODO
    const mp = mergeProps
      ? mergeProps(mstp, { dispatch: (...args) => customDispatcher(...args) })
      : mstp

    return (
      <>
        <Target {...mp} />
      </>
    )
  }

  return ConnectedComponent
}

module.exports = { Provider, connect }
