import React from "react";
import { AiFillFile } from "react-icons/ai";
import { FiTrash } from "react-icons/fi"
import getLaguageName from "../../../Utils/getLanguage";

const FileElement = ({children, ...props}) => {

    return(
        <li className="list-item separated">
            <div className="input-file-container">
                <AiFillFile className="file-icon"/>
                {children}
            </div>
            <button className="delete-button" onClick={() => props.handleDelete(props.name)}>
                <FiTrash className="hover-icon"/>
            </button>
        </li>
    )
}

export default FileElement