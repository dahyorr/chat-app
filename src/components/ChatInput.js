const ChatInput = ({input, onInputChange, handleSubmit}) => {
    return(
        <div className='ChatInput flex'>
            <textarea name='message' onChange={onInputChange} value={input} />
            <div onClick={handleSubmit}>
                            <i className='far fa-paper-plane fa-2x'></i>
                        </div>
        </div>
    )
}
export default ChatInput