/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-08-03 15:26:57
 * @LastEditors: Shentong
 * @LastEditTime: 2020-08-03 16:56:40
 */ 
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'


const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
  middlewares.push(require('redux-logger').createLogger())
}

/*
const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)
*/

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  return store
}
