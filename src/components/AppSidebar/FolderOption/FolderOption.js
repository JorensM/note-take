//Core
import { useRef, useEffect } from "react";

//Style
import "./FolderOption.css";

export function FolderOption(props){

    //Refs

    const ref = useRef(null);


    //On mount

    useEffect(() => {
        if(props.folder_id === "all"){
            ref.current.click();
        }
    },[])

    return (
        <div 
            onClick={() => props.selectFolderHandler(props.folder_id)} 
            className={"FolderOption" + (props.selected_folder_id === props.folder_id ? " FolderOptionSelected" : "")}
            ref={ref}
        >
            {props.name}
        </div>
    )
}