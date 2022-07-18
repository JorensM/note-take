//Core
import { useDispatch } from "react-redux";

//Components
import { NoteListOption } from "components/NoteList/NoteListOption/NoteListOption.js";
import { NoteListSearchbar } from "components/NoteList/NoteListSearchbar/NoteListSearchbar";

//Core
import { useState } from "react";

//Selectors
import { selectNote } from "redux/slices/dispatchers/notesDispatchers";

//Style
import "./NoteList.css";
import { getFavoritedNotes } from "util/getFavoritedNotes";

const filterTypes = {
    all: "all",
    folders: "folder",
    favorites: "favorites",
    trash: "trash",
}

export function NoteList(props){
    //State

    const [optionsId, setOptionsId] = useState(null);

    //Dispatch

    const dispatch = useDispatch();

    const _selectNote = (note_id) => dispatch(selectNote(note_id));

    //Event handlers

    const onNoteSelect = (event, note_id) => {
        _selectNote(note_id);
    }

    // const onNoteContext = (event, note_id) => {
    //     event.preventDefault();
    //     console.log("ctx");
    //     setOptionsId(note_id)
    // }

    // const getNotesByFolderId = (folder_id) =>{
    //     const filteredNotes = props.notes.filter((note) => note.folder_id === folder_id);
    //     return filteredNotes;
    // }

    const filterNotes = (filter_type = "all", arg = "") => {
        let filteredNotes = null;

        if(filter_type === "folder"){
            filteredNotes = props.notes.filter((note) => note.folder_id === arg);
        }else if(filter_type === "favorites"){
            filteredNotes = getFavoritedNotes(props.notes);
        }else{
            filteredNotes = props.notes;
        }

        return filteredNotes;
    }

    return(
        <div className="NoteList">
            <NoteListSearchbar/>
            {filterNotes(props.notesState.filter_type, props.selected_folder_id).map((note) =>
                <NoteListOption
                    key={note.id} 
                    name={note.content.slice(0, 10) }
                    folder_id={note.folder_id}
                    note_id={note.id}
                    note={note}
                    folders={props.folders}
                    selected_note_id={props.selected_note_id}
                    clickHandler={(event, note_id) => onNoteSelect(event, note_id)}
                    // rightClickHandler={onNoteContext}
                    options_id={optionsId}
                />
            )}
        </div>
    )
}