import React, { useEffect, useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import CodeMirror from 'codemirror';
import ACTIONS from '../Action';

const Editor = ({ socketRef, roomId }) => {
  const textArea = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      if (!editorRef.current) {
        editorRef.current = CodeMirror.fromTextArea(textArea.current, {
          mode: { name: 'javascript' },
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        });

        // Add the 'change' event listener after initialization
        editorRef.current.on('change', (instance, changes) => {
          // console.log('changes', changes);
          const { origin } = changes;
          const code = instance.getValue();

          if (origin !== 'setValue') {
            console.log('working');
            socketRef?.current?.emit(ACTIONS.CODE_CHANGE, {
              roomId,
              code,
            });
          }
          // console.log(code);
        });


        


      }
    };

    init();

    // return () => {
    //   // Cleanup CodeMirror instance to prevent duplication
    //   if (editorRef.current) {
    //     editorRef.current.toTextArea(); // Convert back to textarea
    //     editorRef.current = null;
    //   }
    // };

  }, []);



  useEffect(() => {
    console.log('changing ref')

    if(socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({code}) => {
        console.log("here recieving")
        if(code !== null) {
          editorRef.current.setValue(code)
        }
      })
    }
   

  
  }, [socketRef.current])
  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <textarea
        id="realTimeEditor"
        ref={textArea}
        style={{ width: '100%', height: '100%' }}
      ></textarea>
    </div>
  );
};

export default Editor;
