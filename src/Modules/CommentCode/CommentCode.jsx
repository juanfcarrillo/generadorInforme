import React,{ useEffect, useState } from "react";
import { useRef } from "react";

const CommentCode = (props) => {

    const [currentComment, setCurrentComment] = useState({})
    const [nameComment, setNameComment] = useState('');
    const [valueTxtA, setValueTxtA] = useState('')

    const handleChange = event => setValue(event.target.value);

    const handleSubmit = e => {
        e.preventDefault()

        if(valueTxtA != "" && nameComment != ""){
            props.handleComment({
                ...currentComment,
                name: nameComment,
                content : valueTxtA
            })
        }
    }

    const handleDelete = () => {
        props.handleDeleteComment(currentComment.id)
    } 

    useEffect(() => {
        setValueTxtA(props.currentComment.content?props.currentComment.content:"")
        setNameComment(props.currentComment.name?props.currentComment.name:"")
        setCurrentComment(props.currentComment)
    },[])

    return(
        <div className="comment-container">
            <form className="comment-form" onSubmit={handleSubmit}> 
                <label>Nombre</label>
                <input className="styled-input" type="text" value={nameComment} onChange={(e) => setNameComment(e.target.value)} />
                <label >Comentario</label>
                <textarea className="styled-input" value={valueTxtA} onChange={e => setValueTxtA(e.target.value)} id="txtA-comment" required/>
                <div className="container-options">
                    <button className="button-styled vertical-centered" type="submit">Aceptar</button>
                    <button className="button-styled vertical-centered" onClick={() => setValueTxtA(currentComment.content)}>Cancelar</button>
                    {currentComment.name && <button className="button-styled vertical-centered" onClick={handleDelete}>Eliminar</button>}
                </div>
            </form>
        </div>
    )

}

export default CommentCode