# storeonize

easy way to migrate from Redux to [Storeon](https://github.com/storeon/storeon)

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
  * [x] connect

## alert!

`combineReducers` is not the same as redux's

the only arguments is a map:

```
combineReducers({
  someReducerName: [reducerFunction, [array of connected actions]
})
```

## todo

* [ ] typings
* [ ] other redux-stuff
