import {connect} from 'react-redux'
import Message from './Message'



const ListMessages = ({messages}) => {
    
    const renderedMessages = messages.map((message, index) => 
        <Message key={index} message={message}/>
    )
    
    return(
        <div className='ListMessages flex'>
            {renderedMessages}
        </div>
    )
}

const mapStateAsProps= state => {
    return{
        messages: state.chat.chats,
    }
}

export default connect(mapStateAsProps)(ListMessages)