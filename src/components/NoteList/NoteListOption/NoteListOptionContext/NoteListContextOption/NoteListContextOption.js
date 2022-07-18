import "./NoteListContextOption.css";

export function NoteListContextOption (props){

    return (
        <div 
            className={"NoteListContextOption" + (props.type === "trash" ? " NoteListContextOptionTrash" : "")}
            onClick={() => props.handler()}    
        >
            {props.icon}
            <span className="NoteListContextOptionSpacer"></span>
            {props.name}
        </div>
    )
}