import {connect} from 'react-redux'

const formatTimestamp = (timestamp) =>{
    const date = new Date(timestamp)
    if (date.toLocaleDateString() === new Date().toLocaleDateString()){
        return `Today ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }
    else
    return `${date.toLocaleDateString()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const Message = ({message, userData}) =>{
    if (userData.uid === message.uid) return (
        <div>
            <div className='message right' style={{float: 'right', borderRadius: '15px 0 0 15px'}}>
                <p className='user'>{'You'}</p>
                <p className='message-content'>
                    {message.content}
                </p>
                <p className='timestamp'>{formatTimestamp(message.timestamp)}</p>
            </div>
        </div>
    )
else return(
    <div >
            <div className='message left' style={{float: 'left', borderRadius: '0 15px 15px 0'}}>
                <p className='user'>{message.displayName ? message.displayName : message.email} <span>{message.displayName?` (${message.email})`: null}</span></p>
                <p className='message-content'>
                    {message.content}
                </p>
                <p className='timestamp'>{formatTimestamp(message.timestamp)}</p>
            </div>
        </div>
)
}

const mapStateAsProps = state => ({
    userData: state.auth.userData
})


export default connect(mapStateAsProps)(Message)