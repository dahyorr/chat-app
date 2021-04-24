import {combineReducers} from 'redux'
import { CHECK_LOGIN_STATE, AUTH_ERROR, USER_DETAILS, READ_ERROR, SETUP_CHATS, WRITE_ERROR } from './actions/actionTypes'

const authReducer = (state={authenticated: false, loading: true, error: null}, action) =>{
    switch(action.type){
        case CHECK_LOGIN_STATE:
            return {...state, ...action.payload}
        case AUTH_ERROR:
            return {...state, error: action.payload}
        case USER_DETAILS:
            return {...state, userData: action.payload}
        default:
            return state
    }
}

const chatsReducer = (state={chats: [], readError: null, writeError: null}, action) =>{
    switch(action.type){
        case READ_ERROR:
            return {readError: action.payload}
        case WRITE_ERROR:
            return {writeError: action.payload}
        case SETUP_CHATS:
            return {chats: [...action.payload]}
        default:
            return state
    }
}

export default combineReducers({
    auth: authReducer,
    chat: chatsReducer
})