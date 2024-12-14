import React, { useState } from 'react'
import { v4 } from 'uuid';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")

  const [roomId, setRoomId] = useState("")

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = v4()
    setRoomId(id)
    toast.success("New room created successfully")
  }
  const joinRoom = (e) => {
    if(!roomId || !username) {
        toast.error("Please fill all the fields")
        return;
    }

    // redirect to editor page
    navigate(`/editor/${roomId}`, {
        state: {
            username
    }} )
    // ek route se dusre route me data pass krne ke liye we use state in react router 


  }
  const handleInputEnter = (e) => {
    if(e.key === "Enter") {
        joinRoom()
    }
  }

  return (
    <div className="homePageWrapper">
    <div className="formWrapper">
        <img
            className="homePageLogo"
            src="/code-sync.png"
            alt="code-sync-logo"
        />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
            <input
                type="text"
                className="inputBox"
                placeholder="ROOM ID"
                onChange={(e) => setRoomId(e.target.value)}
                onKeyUp={handleInputEnter}
                value={roomId}
            />
            <input
                type="text"
                className="inputBox"
                placeholder="USERNAME"
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={handleInputEnter}
                value={username}
            />
            <button className="btn joinBtn" 
            onClick={joinRoom}
            >
                Join
            </button>
            <span className="createInfo">
                If you don't have an invite then create &nbsp;
                <a
                    onClick={createNewRoom}
                    href=""
                    className="createNewBtn"
                >
                    new room
                </a>
            </span>
        </div>        
    </div>
    <footer>
        <h4>
            Built with 💛 &nbsp; by &nbsp; Tanvi 
               </h4>
    </footer>
</div>
  )
}

export default Home
