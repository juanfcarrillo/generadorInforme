import React from "react";

const Item = (props) => {

    return(
        <div className="list-item-container" onClick={() => props.handleComment(props.id)}>
            {<props.icon color="fafafa"/>}
            <li className="list-item">
                {props.children}
            </li>
        </div>
    )

}

export default Item