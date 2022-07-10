import {createStore , combineReducers, applyMiddleware} from 'redux';
import {coursesReducer} from './courses/reducer';
import {authorsReducer} from './authors/reducer';
import {userReducer} from './user/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {configureStore} from "@reduxjs/toolkit";



export const rootReducer = combineReducers({
    courses: coursesReducer,
    authors: authorsReducer,
    user: userReducer,
});
 
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const createReduxStore = (initialState = {}) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    })
}
