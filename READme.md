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

## faq

##### Storeonize just swaps Redux with Storeon. How can I start coding in Storeon style?

First of all, you can use your own modules passing them to `applyMiddlware`.
I suggest you to start rewriting code in this way: reducers, then middlewares. 


## todo

* [ ] typings
* [ ] other redux-stuff
