import React, { useState } from "react";
import InputRawFiles from "./Modules/InputFiles/InputFiles";
import SideBar from "./Modules/SideBar/SideBar";
import CommentCode from "./Modules/CommentCode/CommentCode";
import CodeTag from "./Modules/CodeTag/CodeTag";
import MakeReport from "./Modules/MakeReport/MakeReport";

import axios from "axios";
import fileDownload  from 'js-file-download'

import { IconContext } from "react-icons";

import "./App.css"
import './index.css'

import { useEffect } from "react";

export const App = () => {

  const [files, setFiles] = useState([])
  const [commentaries, setCommentaries] = useState([])
  const [currentComment, setCurrentComment] = useState({})
  const [editFile, setEditFile] = useState({})
  const [openComponents, setOpenComponents] = useState({inputRawFiles : true, sideArchives: false, sideCommentaries: false, openComment: false, codeTag: false, makeReport: false})

  const baseUrl = "http://localhost:80/api/make-report"
  
  
  const downloadReport = async () => {

    const data = JSON.stringify({data : commentaries})

    const response = await axios({
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      responseType: 'blob',
      data: data
    })

    await fileDownload(response.data, "reporte.docx")

  }
  const makeReport = async () => {

    const data = JSON.stringify({data : commentaries})
    await downloadReport()

  }
  
  const handleNewFiles = (newFiles) => {

    
    if (newFiles.length > 0){
      const nonDuplicatedElements = newFiles.filter(file => !files.find(elem => elem.id == file.id))
      const auxNewFiles = [...nonDuplicatedElements].concat(files)

      setOpenComponents({...openComponents, inputRawFiles: false})
      setFiles(auxNewFiles)

    }

  }

  const handleOpenFile = (id) => {

    const editFile = files.find(file => file.id == id)
    setEditFile(editFile)
    setOpenComponents({...openComponents, codeTag: true})

  }

  const handleDeleteComment = (id) => {

    const deletedComment = commentaries.filter(elem => elem.id !== id)

    setCurrentComment({})
    setOpenComponents({...openComponents, openComment: false})
    setCommentaries(deletedComment)
  }

  const handleSetCurrentComment = ({id, code}) => {

    let auxCurrentComment

    if(id){
      auxCurrentComment = commentaries.find(elem => elem.id == id)
    }else{
      auxCurrentComment = {
        id: new Date().getTime(),
        code: code
      }
    }

    setCurrentComment(auxCurrentComment)

    setOpenComponents({...openComponents, openComment: true, codeTag: false})

  }

  const handleComment = (comment) => {

    const nonDuplicatedComments = commentaries.filter(elem => elem.id !== comment.id)
    const updatedComments = [comment, ...nonDuplicatedComments]

    setCurrentComment({})
    setCommentaries(updatedComments)
    setOpenComponents({...openComponents, openComment: false})

  }

  return(
    <div>
      <IconContext.Provider value={{ color: "#ACAEC5", className: "icon-element" }}>
      <div className="app-container">
        <div className="sidebar-container">
          <SideBar 
            files={files} 
            commentaries={commentaries} 
            openComponents={openComponents} 
            handleOpenFile={handleOpenFile} 
            handleSetCurrentComment={handleSetCurrentComment}
            setOpenComponents={setOpenComponents}/>
        </div>
        <div className="app-body">
          <div className="header">
            <h1>Auto Informes</h1>
          </div>
          {openComponents.makeReport && <MakeReport makeReport={makeReport}/>}
          {openComponents.codeTag && <CodeTag editFile={editFile} handleSetCurrentComment={handleSetCurrentComment}/>}
          {openComponents.openComment && <CommentCode currentComment={currentComment} handleComment={handleComment} handleDeleteComment={handleDeleteComment}/>}
          {openComponents.inputRawFiles && <InputRawFiles handleNewFiles={handleNewFiles}/>}
        </div>
      </div>
      </IconContext.Provider>
    </div>
  )
}

