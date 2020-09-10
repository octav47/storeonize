const { storeonDevtools } = require('storeon/devtools')

const composeWithDevTools = applyMiddlewareResult => {
  return [
    ...applyMiddlewareResult,
    process.env.NODE_ENV !== 'production' && storeonDevtools,
  ]
}

module.exports = { composeWithDevTools }
