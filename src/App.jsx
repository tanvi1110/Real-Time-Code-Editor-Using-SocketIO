import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditorPage from './pages/EditorPage';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
function App() {


  return (
   <>
   <div>
    <Toaster 
    position='top-left'
    toastOptions={{
      success: {
        theme: {
          primary: "green",
          secondary: "black",
        }
      }
    }}>

    </Toaster>
   </div>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor/:roomId" element={<EditorPage />} />
    </Routes>
   </BrowserRouter>
    
   </>
  )
}

export default App
