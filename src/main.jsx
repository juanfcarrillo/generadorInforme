import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { IconContext } from "react-icons";

String.prototype.insert = function(index, item){
  return this.slice(0,index)+item+this.slice(index)
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
)
