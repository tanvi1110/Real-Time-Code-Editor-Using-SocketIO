import React, { useEffect, useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import CodeMirror from 'codemirror';

const Editor = () => {
  const textArea = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = CodeMirror.fromTextArea(textArea.current, {
        mode: { name: 'javascript' },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.toTextArea();
        editorInstance.current = null;
      }
    };
  }, []);

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
