import React from "react";
import Item from "./Item";

const NavSecondary = ({icon, name, items, ...props}) => {
    return(
        <div className="nav-secondaty">
            <h3 className="side-title-secondary">{name}</h3>
            <ul className="list-items">
                {items.map(item => <Item key={item.id} id={item.id} icon={icon} handleComment={props.handleComment}>{item[props.nameItem]}</Item>)}
            </ul>
        </div>
    )
}

export default NavSecondary