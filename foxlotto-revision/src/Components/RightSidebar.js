import React from 'react'
import send from '../Images/icons/send.svg'
import chaticon from '../Images/icons/message.svg'
import settings from '../Images/icons/settings.svg'
import close from '../Images/icons/close.svg'
import Message from './Message';

function RightSidebar() {
    return (
        <div className='RightSidebar'>
            {/* head */}
            <div className='message-body'>
                <Message
                    user="Connor"
                    time="19:04"
                    text="Hello, how are you?"
                />
                <Message
                    user="Corwin"
                    time="19:05"
                    text="YOOOO WHATS UP"
                />
            </div>
            <div className='RightSidebar-footer'>
                <div className='position-relative w-100'>
                    <img src={chaticon} className="chat-icon" alt="" />
                    <input
                        type="text"
                        className='msg-input-field'
                        placeholder='Type something...'
                    />
                    <img src={send} className="send-icon" alt="" />
                </div>
            </div>
        </div>
    )
}

export default RightSidebar