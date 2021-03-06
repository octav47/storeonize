import { storeonDevtools } from 'storeon/devtools'

const composeWithDevTools = applyMiddlewareResult => {
  return [
    ...applyMiddlewareResult,
    process.env.NODE_ENV !== 'production' && storeonDevtools,
  ]
}

export { composeWithDevTools }
