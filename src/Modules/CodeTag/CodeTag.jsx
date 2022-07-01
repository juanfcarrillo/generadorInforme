import React, { useRef, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import theme from '../../Themes/oneDarkPro.json'

import getLaguageName from "../../Utils/getLanguage";

const CodeTag = (props) => {

    const editorRef = useRef(null)

    const editorDidMount = (editor, monaco) => {
        editorRef.current = editor

        monaco.editor.defineTheme('one-dark', theme)
        monaco.editor.setTheme('one-dark')

    }

    const getSelectionEditor = () => {
        const userSelection = editorRef.current.getModel().getValueInRange(editorRef.current.getSelection())
        
        if(userSelection.trim() != ""){
            props.handleSetCurrentComment({
                code: userSelection
            })
        }
    }

    return(
        <div className="editor-container">
            <button onClick={getSelectionEditor} className="button-styled vertical-centered">Comentar</button>
            <Editor
                defaultValue={props.editFile.content}
                defaultLanguage={getLaguageName(props.editFile.id)}
                theme="vs-dark"
                height="90%"
                onMount={editorDidMount}
            />
        </div>
    )
}

export default CodeTag