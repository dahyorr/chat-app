import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {PrivateRoute, PublicRoute} from './RouteTypes'
import {connect} from 'react-redux'
import Nav from './Nav'
import Home from '../views/Home'
import Chat from '../views/Chat'
import Signup from '../views/Signup'
import Login from '../views/Login'
import {checkLoginState, signIn, signOut} from '../actions/actions'
import Loader from './Loader'

class App extends React.Component{

  componentDidMount(){
    this.props.checkLoginState()
  }
  
  render(){
      return (
    <div className="App">
            {this.props.loading ?
             <Loader/>:
             <BrowserRouter>
              <Nav/>
             <Switch>
             <Route exact path='/' component={Home}/>
            <PrivateRoute path='/chat' component={Chat} authenticated={this.props.authenticated}/>
            <PublicRoute path='/login' component={Login} authenticated={this.props.authenticated}/>
            <PublicRoute path='/signup' component={Signup} authenticated={this.props.authenticated}/>
             </Switch>
             </BrowserRouter>
             }
    </div>
  );
  } 
}

const mapStateAsProps = state => {
  return {
    authenticated: state.auth.authenticated,
    loading: state.auth.loading
  }
}

export default connect(mapStateAsProps, {checkLoginState, signIn, signOut})(App);
