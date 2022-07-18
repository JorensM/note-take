import { Plus } from "react-feather";

import "./CreateFolderButton.css";

export function CreateFolderButton(props){
    return (
        <div onClick={() => props.handler()} className="CreateFolderButton">
            <Plus size={18}/>
        </div>
    )
}