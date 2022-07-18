import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNoteById, selectSelectedNote } from "redux/slices/selectors/notesSelectors";

import { updateNote } from "redux/slices/dispatchers/notesDispatchers";
import { getNoteById } from "util/getNoteById";

import "./NoteEditor.css";

export function NoteEditor(props){

    //Dispatch

    const dispatch = useDispatch();

    const _updateNote = (target_note_id, new_content) => dispatch(updateNote(target_note_id, new_content));

    //Selectors

    const note = useSelector(selectSelectedNote);

    //State

    const [textareaValue, setTextareaValue] = useState("");

    //Event handlers

    const onTextareaChange = (new_content) => {
        _updateNote(note.id, new_content);
    }

    return (
        <div className="NoteEditor">
            {note ?
                <textarea
                    // className="NoteEditorInput"
                    value={note.content}
                    onChange={(event) => onTextareaChange(event.target.value)}
                />
            :   <div className="NoteEditorEmpty">
                    <b>Create a note</b>
                    <br/>
                    <span>
                        <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>N</kbd>
                    </span>
                </div>
            }
        </div>
    )
}