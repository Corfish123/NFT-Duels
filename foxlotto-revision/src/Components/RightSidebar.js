import React from 'react'
import send from '../Images/icons/send.svg'
import chaticon from '../Images/icons/message.svg'
import settings from '../Images/icons/settings.svg'
import close from '../Images/icons/close.svg'
import disableLike from '../Images/icons/disableLike.svg'

function RightSidebar() {
    return (
        <div className='RightSidebar'>
            {/* head */}
            <div className='message-body'>
                {/* message div */}
                <div className='message-div'>
                    <div>
                        <p className='chat-title'>Connor <span className='chat-time'>19:04</span></p>
                        <p className='chat-body'>Just took a fat dub for the homies</p>
                    </div>
                    <img src={disableLike} className="chat-Likebtn" alt="" />
                </div>
                {/* message div */}
                <div className='message-div'>
                    <div>
                        <p className='chat-title'>Corwin <span className='chat-time'>19:06</span></p>
                        <p className='chat-body'>YOOOOO LETS GO</p>
                    </div>
                    <img src={disableLike} className="chat-Likebtn" alt="" />
                </div>
            </div>
            {/* body */}
            {/* footer */}
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