import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {signOut} from '../actions/actions'

const Nav = ({authenticated, loading, signOut, email}) => {
    return (
        <div className='Nav'>
            <div className='container flex'>
                <h1 className='logo'><Link to='/'>chatApp</Link></h1>
                    {loading ? null : authenticated ?

                    (<ul>
                        <li className='user-email' style={{backgroundColor: 'transparent', cursor: 'default', fontSize: '1rem'}}>{email}</li>
                        <li><Link to='/chat'>Chat</Link></li>
                        <li onClick={signOut}>Sign out</li>
                        </ul>):
                    
                    (<ul><li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Sign Up</Link></li></ul>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
    authenticated: state.auth.authenticated,
    loading: state.auth.loading,
    email: state.auth.userData.email
    }
}

export default connect(mapStateToProps, {signOut})(Nav)