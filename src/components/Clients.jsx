import React from 'react'
import Avatar from 'react-avatar'

const Clients = ({username}) => {
  return (
    <div className='client'>
      {/* // avatar and username */}
      <Avatar name={username} size={40} round="14px"/>
      <span className='userName'>
         {username}
      </span>
    </div>
  )
}

export default Clients
