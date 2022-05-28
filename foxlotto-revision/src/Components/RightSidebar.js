import React from 'react'
import send from '../Images/icons/send.svg'
import chaticon from '../Images/icons/message.svg'
import settings from '../Images/icons/settings.svg'
import close from '../Images/icons/close.svg'
import chatProfileImg from '../Images/random/chat-profile-img.png'
import disableLike from '../Images/icons/disableLike.svg'

function RightSidebar() {
    return (
        <div className='RightSidebar'>
            {/* head */}
            <div className='RightSidebar-top'>

            </div>
            {/* head */}
            {/* body */}
            <div className='message-body'>
                <div className='mb-icons-main'>
                    <img src={settings} className="settings-icon" alt="" />
                    <img src={close} className="close-icon" alt="" />
                </div>
                {/* message div */}
                <div className='message-div'>
                    <div>
                        <img src={chatProfileImg} className="chat-profile-img" alt="" />
                    </div>
                    <div>
                        <p className='chat-title'>Peralta <span className='chat-time'>19:04</span></p>
                        <p className='chat-body'>me sleep to la XD xD</p>
                    </div>
                    <img src={disableLike} className="chat-Likebtn" alt="" />
                </div>
                {/* message div */}
                {/* message div */}
                <div className='message-div'>
                    <div>
                        <img src={chatProfileImg} className="chat-profile-img" alt="" />
                    </div>
                    <div>
                        <p className='chat-title'>Peralta <span className='chat-time'>19:04</span></p>
                        <p className='chat-body'>me sleep to la XD xD</p>
                    </div>
                    <img src={disableLike} className="chat-Likebtn" alt="" />
                </div>
                {/* message div */}
                {/* message div */}
                <div className='message-div'>
                    <div>
                        <img src={chatProfileImg} className="chat-profile-img" alt="" />
                    </div>
                    <div>
                        <p className='chat-title'>Peralta <span className='chat-time'>19:04</span></p>
                        <p className='chat-body'>me sleep to la XD xD</p>
                    </div>
                    <img src={disableLike} className="chat-Likebtn" alt="" />
                </div>
                {/* message div */}
                {/* message div */}
                <div className='message-div'>
                    <div>
                        <img src={chatProfileImg} className="chat-profile-img" alt="" />
                    </div>
                    <div>
                        <p className='chat-title'>Peralta <span className='chat-time'>19:04</span></p>
                        <p className='chat-body'>me sleep to la XD xD</p>
                    </div>
                    <img src={disableLike} className="chat-Likebtn" alt="" />
                </div>
                {/* message div */}
                {/* message div */}
                <div className='message-div'>
                    <div>
                        <img src={chatProfileImg} className="chat-profile-img" alt="" />
                    </div>
                    <div>
                        <p className='chat-title'>Peralta <span className='chat-time'>19:04</span></p>
                        <p className='chat-body'>me sleep to la XD xD</p>
                    </div>
                    <img src={disableLike} className="chat-Likebtn" alt="" />
                </div>
                {/* message div */}

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