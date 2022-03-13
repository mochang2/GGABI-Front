import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga" // Creates a Redux middleware and connects the Sagas to the Redux Store

import rootReducer from "./reducers"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // input: The functions to compose. output: The final function obtained by composing the given functions from right to left

const store = createStore(
  rootReducer, // reducing function
  composeEnhancers(applyMiddleware(sagaMiddleware)) // Middleware lets you wrap the store's dispatch method for fun and profit.
)
sagaMiddleware.run(rootSaga)

export default store
