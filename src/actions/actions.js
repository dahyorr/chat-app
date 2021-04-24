import {auth, db} from '../services/firebase'
import {CHECK_LOGIN_STATE, AUTH_ERROR, USER_DETAILS, SETUP_CHATS, READ_ERROR, WRITE_ERROR} from './actionTypes'

export const checkLoginState = () => async dispatch =>{
    try{
        auth().onAuthStateChanged(user => {
            if(user){
                dispatch({
                    type: CHECK_LOGIN_STATE,
                    payload: {
                        authenticated: true,
                        loading: false,
                        error: null,
                        userData: auth().currentUser
                    }
                })
            }
            else dispatch({
                type: CHECK_LOGIN_STATE,
                payload: {authenticated: false, loading: false, userData: {}}
            }) 
        })
    }catch{
    }
}

export const signUp = (email, password) => async dispatch => {
    try{
    auth().createUserWithEmailAndPassword(email, password)
    .then(result => dispatch({
        type: USER_DETAILS,
        payload: auth().currentUser
    })
    ).catch(error => {   
            switch(error.code) {
                case 'auth/email-already-in-use':
                    dispatch({
                        type: AUTH_ERROR,
                        payload: 'User already exists'
                    })
                    break;
            default:
                return null
           }
         })
       }catch(err){
        dispatch({
            type: AUTH_ERROR,
            payload: 'An Unknown error occured'
        })
       }
}

export const signIn = (email, password) => async dispatch => {
    try{
    auth().signInWithEmailAndPassword(email, password)
    .then(result => dispatch({
        type: USER_DETAILS,
        payload: auth().currentUser
    })
    ).catch(error => {   
            switch(error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    dispatch({
                        type: AUTH_ERROR,
                        payload: 'Email/Password is invalid'
                    })
                    break;
            default:
                return null
           }
         })
       }catch(err){
        dispatch({
            type: AUTH_ERROR,
            payload: 'An Unknown error occured'
        })
       }
}

export const signInGoogle = () => async dispatch =>{
    const provider = new auth.GoogleAuthProvider()
    return auth().signInWithPopup(provider)
}

export const signOut = () => async dispatch => {
    auth().signOut()
}

export const authError = error => {
    return{
        type: AUTH_ERROR,
        payload: error
    }
}

export const resetError = () => {
    return{
        type: AUTH_ERROR,
        payload: null
    }
}

export const setupChat = () => async dispatch =>{
    try{
        db.ref("chats").on("value", snapshot =>{
            const chats = [];
            snapshot.forEach(snap => {chats.unshift(snap.val())})
            dispatch({
                type: SETUP_CHATS,
                payload: chats
            })
        })
    }catch(error){
        //TODO: display modal on error
        dispatch({
            type: READ_ERROR,
            payload: error.message
        })
    }
}

export const sendMessage = (message) => async dispatch => {
    const {uid, email, displayName} = auth().currentUser
    const timestamp = Date.now()
    try{
        db.ref("chats").push({
            uid, email, content: message, timestamp, displayName
        })
    }catch(error){
        dispatch({
            type: WRITE_ERROR,
            payload: error.message
        })
    }
}