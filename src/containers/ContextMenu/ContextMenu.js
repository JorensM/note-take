//Code
import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

//Style
import "./ContextMenu.css";

export function ContextMenu(props){
    return ReactDOM.createPortal(
        <div 
            className="ContextMenu"
            style={{left: props.position.x + 4, top: props.position.y + 4}}
            tabIndex={0}
            ref={props.contextRef}
        >
            {props.children}
        </div>
    , document.getElementById("context-menu"))
}