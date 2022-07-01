import React, { useState } from "react";
import NavSecondary from "./NavSecondary/NavSecondary";

import { IoDocumentsOutline } from "react-icons/io5"
import { BsPencilSquare, BsInputCursorText, BsFillGearFill } from "react-icons/bs"
import { AiFillFile, AiOutlineCode } from "react-icons/ai";
import { VscDebugStart } from "react-icons/vsc"


const SideBar = (props) => {

    const handleOpenFile = (id) => {
        props.handleOpenFile(id)
    }

    const handleEditComment = (id) => {
        props.handleSetCurrentComment({id})
    }

    const handleOpenComponents = () => {
        let closedAll = object.keys(props.openComponents).map(elem => {elem : !props.openComponents[elem]})
        props.setOpenComponents(closedAll)
    }

    return(
        <div className="navbar-components">
            <div className="navbar-container">
                <div className="header-navbar navbar">
                    <ul className="side-ul">
                        <li className="side-item" onClick={() => props.setOpenComponents({sideArchives: !props.openComponents.sideArchives})}>
                            <IoDocumentsOutline className="hover-icon" color="#fafafa" size="1.7em"/>
                        </li>
                        <li className="side-item" onClick={() => props.setOpenComponents({sideCommentaries: !props.openComponents.sideCommentaries})}>
                            <BsPencilSquare className="hover-icon" color="#fafafa" size="1.7em"/>
                        </li>
                        <li className="side-item" onClick={() => props.setOpenComponents({inputRawFiles: !props.openComponents.inputRawFiles})}>
                            <BsInputCursorText className="hover-icon" color="#fafafa" size="1.7em"/>
                        </li>
                        <li className="side-item" onClick={() => props.setOpenComponents({makeReport: !props.openComponents.makeReport})}>
                            <VscDebugStart className="hover-icon" color="#fafafa" size="1.7em"/>
                        </li>
                    </ul>
                </div>
                <div className="footer-navbar navbar">
                    <ul>
                        <li className="side-item">
                            <BsFillGearFill className="hover-icon" color="#fafafa" size="1.7em"/>
                        </li>
                    </ul>
                </div>
            </div>
            {props.openComponents.sideArchives && <NavSecondary name="Archivos" items={props.files}  nameItem={"id"} handleComment={handleOpenFile} icon={AiFillFile}/>}
            {props.openComponents.sideCommentaries && <NavSecondary name="Comentarios" items={props.commentaries} nameItem={"name"} handleComment={handleEditComment} icon={AiOutlineCode}/>} 
        </div>
    )
}

export default SideBar