import React from "react";

const MakeReport = (props) => {
    return(
        <div className="make-report-container">
            <h1>Descargar Informe</h1>
            <button className="button-styled" onClick={props.makeReport}>
                Descargar
            </button>
        </div>
    )
}

export default MakeReport