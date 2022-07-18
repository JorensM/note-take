import { PlusCircle } from "react-feather";
import "./NewNoteButton.css";

export function NewNoteButton(props){
    return (
        <div 
            className="NewNoteButton"
            onClick={() => props.handler()}
        >
            <PlusCircle color="#5183f5" /><span style={{width: "10px"}}></span> <b>New Note</b>
        </div>
    )
}