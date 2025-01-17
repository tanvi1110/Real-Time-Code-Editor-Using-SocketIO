import React, { useEffect, useRef, useState } from 'react'
import Clients from '../components/Clients'
import Editor from '../components/Editor'
import { initSocket } from '../socket'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import ACTIONS from '../Action'

const EditorPage = () => {

  const socketRef = useRef(null)
  const codeRef = useRef(null)
  const location = useLocation()
  const reactNavigator = useNavigate()
  const {roomId} = useParams()
  
  const [clients, setClients] = useState([
    { socketId: 1, username: 'Tanvi Shah' },
    { socketId: 2, username: 'Sachin Rajawat' },
    { socketId: 3, username: 'Sid Asati' },
    { socketId: 4, username: 'Subhi Jain' }
  ])

  useEffect(() => {
    const init = async () => {
       socketRef.current = await initSocket();
       socketRef.current.on('connect_error', (err) => handleErrors(err))
       socketRef.current.on('connect_failed', (err) => handleErrors(err))

       function handleErrors(err) {
        console.log('socket error ', err)
        toast.error('An error occured. Please try again later')
        reactNavigator('/')
       }
       
       socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username
       })


       socketRef.current.on(ACTIONS.JOINED, ({clients, username, socketId}) => {
        if(username != location.state.username) {
          toast.success(`${username} joined`)
          console.log(`${username} joined`)
        }

        setClients(clients)
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId
        })
      })

      // listen for disconnection

      socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, username}) => {
         toast.success(`${username} left`)
         setClients((prev) => {
          return prev.filter(
            (client) => client.socketId !== socketId
          )
         })
        })
      }

    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [])

  


  if(!location.state) {
    return <Navigate to='/' />
  }


  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy room ID')
      console.error('Failed to copy room ID', err)      
    }

  }

  function leaveRoom() {
    reactNavigator('/')
  }



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
               ( <Clients 
               key={client.socketId} 
               username={client.username} 
                
               />))
          }
        </div>
       </div>
       <button className='btn copyBtn' onClick={copyRoomId}>Copy Room ID</button>
       <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
      </div>
      <div className='editorWrap'>
         <Editor 
         socketRef={socketRef} 
         roomId={roomId} 
         onCodeChange={(code) => {
          codeRef.current = code
        }}/>
      </div>
    </div>
  )
}

export default EditorPage