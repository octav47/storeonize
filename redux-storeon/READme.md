# storeonize

easy way to migrate to storeon

## how to

`npm i -S storeonize`

just add `storeonize` to your imports

```js
// before
import { createStore, applyMiddleware } from 'redux'

// after
import { createStore, applyMiddleware } from 'storeonize/redux'
```

## what things can be storeonized?

* redux
  * [x] createStore
  * [x] applyMiddleware
  * [x] combineReducers

* redux-logger
  * [x] createLogger

* redux-devtools-extension
  * [x] composeWithDevTools

* react-redux
  * [x] Provider
  * [ ] connect

reducers still have to be rewritten unfortunately :(
