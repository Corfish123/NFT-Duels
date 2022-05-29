import React from 'react'
import '../Styles/css/style.css'
import disableLike from '../Images/icons/disableLike.svg'

function Message(props) {
  return (
    <div className='message-div'>
      <div className='chat-box'>
        <p className='chat-title'>{props.user} <span className='chat-time'>{props.time}</span></p>
        <p className='chat-body'>{props.text}</p>
      </div>
      <img src={disableLike} className="chat-Likebtn" alt="" />
    </div>
  )
}

export default Message