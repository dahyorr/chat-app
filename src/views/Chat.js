import React from 'react'
import {connect} from 'react-redux'
import {setupChat, sendMessage} from '../actions/actions'
import ChatInput from '../components/ChatInput'
import ListMessages from '../components/ListMessages'

class Chat extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            input: ''
        } 
    }
    componentDidMount(){
        this.props.setupChat()
    }

    onChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    handleSubmit = () =>{
        const input = this.state.input.trim()
        this.props.sendMessage(input)
        this.setState({input: ''})
    }

    render(){
        return (
            <div className="Chat">
                <div className='container chatbox flex'>
                    <ListMessages/>
                    <ChatInput input={this.state.input} onInputChange={this.onChange} handleSubmit={this.handleSubmit}/>
                </div>
            </div>
        )
    }
}
export default connect(null, {setupChat, sendMessage})(Chat)