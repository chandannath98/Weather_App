import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherAppReducer from './reducers';

const rootReducer = combineReducers({ weatherAppReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));