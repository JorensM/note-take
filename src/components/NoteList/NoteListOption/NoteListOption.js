//Core
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

//Components
import { ContextMenu } from "containers/ContextMenu/ContextMenu";

//Utils
import { getFolderById } from "util/getFolderById.js";

//Style
import "./NoteListOption.css";
import { NoteListOptionContext } from "./NoteListOptionContext/NoteListOptionContext";
import { MoreHorizontal, Star } from "react-feather";

export function NoteListOption(props) {

    //State

    const [renderContext, setRenderContext] = useState(false);
    const [contextPos, setContextPos] = useState({x: 0, y: 0});

    //Variables

    const folder = getFolderById(props.folder_id, props.folders);

    //Refs

    const ref = useRef(null);
    const contextRef = useRef(null);
    const openContextRef = useRef(null);

    //Checkers

    const isNoteSelected = () => {
        return props.selected_note_id === props.note_id;
    }

    //Event handlers

    const handleOnContext = (event) => {
        event.preventDefault();
        setRenderContext(true);
        setContextPos({x: event.clientX, y: event.clientY});
    }

    const handleGlobalClick = (event) => {
        //Check if clicked outside of context, and remove context if true
        if(contextRef.current){
            if(event.target != contextRef && !contextRef.current.contains(event.target)){
                setRenderContext(false);
            }
        }
    }

    const handleContextButtonClick = (event) => {
        handleOnContext(event);
    }

    /* On context option click */
    const handleContextOptionClick = () => {
        setRenderContext(false);
    }

    //On mount
    useEffect(() => {
        //Add event listener for global click, required to hide context when clicked outside of
        document.addEventListener('mousedown', handleGlobalClick)
    
        return () => {
          document.removeEventListener('mousedown', handleGlobalClick)
        }
    }, [])

    return (
        <div 
            className={"NoteListOption" + (isNoteSelected() ? " NoteListOptionSelected" : "")}
            onClick={(event) => {
                //Don't select option if click was inside a context menu or on openContextMenu button 
                if(contextRef.current && contextRef.current.contains(event.target)){
                    return;
                }
                if(openContextRef.current && openContextRef.current.contains(event.target)){
                    return;
                }
                props.clickHandler(event, props.note_id);
            }}
            onContextMenu={(event) => handleOnContext(event)}//{(event) => props.rightClickHandler(event, props.note_id)}
            ref={ref}
        >   
            {props.note.favorited ?
                <div className="NoteListOptionFavorited">
                    <Star color={isNoteSelected() ? "#ffffff" : "#5183f5"} size={14}/>
                </div>
            : ""
            }
            <div
                className={"NoteListOptionTitleC" + (isNoteSelected() ? " NoteListOptionTitleCSelected" : "")}
            >
                <span>{props.name}</span>
                <div 
                    className="NoteListOptionOpenContext"
                    onClick={(event) => handleContextButtonClick(event)}
                    ref={openContextRef}
                >
                    <MoreHorizontal size={14}/>
                </div>
            </div>
            <div
                className={"NoteListOptionFolderC" + (isNoteSelected() ? " NoteListOptionFolderCSelected" : "")}
            >
                {folder.name}
            </div>
            {renderContext ? 

                <NoteListOptionContext
                    note_id={props.note_id}
                    note={props.note}
                    folders={props.folders}
                    position={contextPos}
                    contextRef={contextRef}
                    onOptionClick={() => handleContextOptionClick()}
                />

                /*<ContextMenu
                    contextRef={contextRef}
                    position={contextPos}
                >

                </ContextMenu>*/
            : ""}
        </div>
    )
}