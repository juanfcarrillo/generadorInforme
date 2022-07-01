import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import FileElement from "./FileElement/FileElement";

const InputRawFiles = (props) => {

    const [rawFilesInput, setRawFilesInput] = useState([])
    const [filesProcessed, setFilesProcessed ] = useState([])
    const [submitEnabled, setSubmitEnabled] = useState(false)

    const handleDelete = (name) => {

        const deletedFiles = rawFilesInput.filter( file => file.name !== name)

        setRawFilesInput(deletedFiles)
    }
    
    const handleNewFile = (e, files) => {
        
        if(files.length > 0){

            const nonDuplicatedFiles = Array.from(files).filter(file => !rawFilesInput.find(elem => elem.name == file.name))
            const updatedFiles = [...nonDuplicatedFiles].concat(rawFilesInput)

            setRawFilesInput(updatedFiles)
        }


        e.target.value = ""

    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        props.handleNewFiles(filesProcessed)

    }

    const setFilesContent = () => {

        let auxProccesedFiles = Array.from(filesProcessed)
        const nonDuplicatedRawFiles = Array.from(rawFilesInput.filter(file => !auxProccesedFiles.find(elem => elem.id == file.name)))
        !!nonDuplicatedRawFiles[0] && setSubmitEnabled(false)

        for(let rawFile of nonDuplicatedRawFiles){
            const reader = new FileReader()

            reader.onload = () => {
                const content = reader.result
                auxProccesedFiles.push({id: rawFile.name, content: content})
                if(auxProccesedFiles.length == rawFilesInput.length){
                    setFilesProcessed(auxProccesedFiles)
                    setSubmitEnabled(true)
                }
            }

            reader.readAsText(rawFile)
        }

    }

    useEffect(() => {
        setFilesContent()
    }, [rawFilesInput])

    useEffect(() => {
        submitBRef.current.disabled = !submitEnabled
        submitBRef.current.className =  submitEnabled?"button-styled":"button-styled-disabled"
    },[submitEnabled])

    const submitBRef = useRef(null)

    return(
        <form className="input-files" onSubmit={handleSubmit}>
                <div className="title-input">
                    <h3>Ingrese archivos</h3>
                    <p>Ingresar el codigo a comentar</p>
                </div>
                <div className="container-input-file">
                    <input type="file" id="input-file" onChange={e => handleNewFile(e, e.target.files)} multiple/>
                    <label htmlFor="input-file" className="button-styled">Seleccionar</label>
                    <button className="button-styled" ref={submitBRef}>Desplegar</button>
                </div>
            <div className="container-raw-files">
                <ul className="input-list-items">
                    {rawFilesInput.map(file => {
                        return(
                            <FileElement key={file.name} name={file.name} handleDelete={handleDelete}>
                                {file.name}
                            </FileElement>
                        )
                    })}
                </ul>
            </div>
        </form>
    )
}

export default InputRawFiles