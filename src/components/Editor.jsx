import React, { useEffect, useRef } from 'react'
// import CodeMirror from 'codemirror';
// import 'codemirror/mode'
const Editor = () => {
  
  const textArea = useRef(null);

  // useEffect(() => {
  //    async function init() {
  //        CodeMirror.fromTextArea(textArea.current, {
  //         mode: javascript,
  //         theme: oneDark,
  //         tabSize: 2
  //        })
  //    }  
  // })
  
  
  return (
    <div>
      <textarea 
      // ref={inputTextArea}
      ></textarea>
    </div>
  )
}

export default Editor
