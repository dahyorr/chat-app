import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {authError, signIn, resetError, signInGoogle} from '../actions/actions'
import googleBtn from '../static/btn_google.png'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.props.resetError()
    }

    onChange = (e) =>{
        this.props.resetError()
        if (e.target.name === 'email') this.setState({
            email: e.target.value
        })
        else if (e.target.name === 'password') this.setState({
            password: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const email = this.state.email.trim()
        const password = this.state.password
        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){  
            this.props.authError("Email entered is invalid.");  
            return false;  
          }else if(password.length<8){  
            this.props.authError("Password must be at least 8 characters long.");  
            return false;  
            }
        this.props.signIn(email, password) 
    }
    
    render(){
        return (
    <div className="Login">

        <div>
            <h1 className='title'>Login</h1>
            <p className='info'>Fill in the form below to sign in</p>
            
            </div>
        <form onSubmit={this.onSubmit}>
            <p className='error'>{this.props.error}</p>
            <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.onChange}/>
            <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.onChange}/>
            <button type='submit'>Login</button>
        </form>
        <button className='google' onClick={this.props.signInGoogle}><img src={googleBtn} alt='google signIn'/></button>
        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
    </div>
    )
    }
    
}

const mapStateToProps = state =>{
    return{
        error: state.auth.error
    }
}

export default connect(mapStateToProps, {authError, signIn, resetError, signInGoogle})(Login)