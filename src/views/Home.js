import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Home = ({userData, authenticated}) =>{
    return (
    <div className="Home">
        <div className='container'>
            <div className='jumbotron flex'>
                {authenticated?
                (<div>
                    <h1>You are Signed in as {userData.displayName?
                     `${userData.displayName} (${userData.email})`:
                    userData.email
                     }</h1>
                     </div>):
                     (<div>
                         <h1>You are not signed in</h1>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Sign Up</Link>
                    </div>)   
            }
                
            </div>
        </div>
        <Footer/>
    </div>
    )
}

const mapStateToProps = state =>({
    authenticated: state.auth.authenticated,
    userData: state.auth.userData
})
export default connect(mapStateToProps)(Home)