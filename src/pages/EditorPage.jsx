import React, { useState } from 'react'
import Clients from '../components/Clients'
import Editor from '../components/Editor'

const EditorPage = () => {


  const [clients, setClients] = useState([
    { socketId: 1, username: 'Tanvi Shah' },
    { socketId: 2, username: 'Sachin Rajawat' },
    { socketId: 3, username: 'Sid Asati' },
    { socketId: 4, username: 'Subhi Jain' }
  ])
  return (
    <div className='mainWrap'>
      <div className='aside'>
       <div className='asideInner'>
        <div className='logo'>
          
          <img 
          src='/vite.png' 
          alt='code-sync-logo'
          className='logoImage' 
          />
        </div>
        <h3>People</h3>
        <div className='clientsList'>
          {
            clients.map(
              (client) => 
               ( <Clients key={client.socketId} username={client.username} />))
          }
        </div>
       </div>
       <button className='btn copyBtn'>Copy Room ID</button>
       <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
         <Editor />
      </div>
    </div>
  )
}

export default EditorPage
