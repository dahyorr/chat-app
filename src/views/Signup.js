import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {authError, signUp, resetError, signInGoogle} from '../actions/actions'
import googleBtn from '../static/btn_google.png'

class Signup extends React.Component{
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
            this.props.authError("Email is invalid.");  
            return false;  
          }else if(password.length<8){  
            this.props.authError("Password must be at least 8 characters long.");  
            return false;  
            }
        this.props.signUp(email, password) 
    }
    
    render(){
        return (
    <div className="Signup Login">
        <div>
            <h1 className='title'>Sign Up</h1>
            <p className='info'>Fill in the form below to sign up</p>
            
            </div>
        <form onSubmit={this.onSubmit}>
            <p className='error'>{this.props.error}</p>
            <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.onChange}/>
            <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.onChange}/>
            <button type='submit'>Sign Up</button>
        </form>
        <button className='google' onClick={this.props.signInGoogle}><img src={googleBtn} alt='google signIn'/></button>
        <p>Have an account? <Link to='/login'>Log in</Link></p>
    </div>
    )
    }
}

const mapStateToProps = state =>{
    return{
        error: state.auth.error
    }
}

export default connect(mapStateToProps, {authError, signUp, resetError, signInGoogle})(Signup)