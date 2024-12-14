import React, { useEffect, useRef } from 'react'

// import 'codemirror/mode/javascript/javascript'
import '@codemirror/lang-javascript'
const Editor = () => {
  
  const textArea = useRef(null);

  useEffect(() => {
     async function init() {
         CodeMirror.fromTextArea(textArea.current, {
          mode: javascript,
          theme: 'dracula',
          tabSize: 2
         })
     }  
  })
  
  
  return (
    <div>
      <textarea 
      // ref={inputTextArea}
      ></textarea>
    </div>
  )
}

export default Editor
