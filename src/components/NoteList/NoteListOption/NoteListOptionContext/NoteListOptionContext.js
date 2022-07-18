//Core
import { useDispatch, useSelector } from "react-redux";

//Components
import { NoteListSelectFolder } from "components/NoteList/NoteListSelectFolder/NoteListSelectFolder";
import { NoteListContextOption } from "./NoteListContextOption/NoteListContextOption";
import { ContextMenu } from "containers/ContextMenu/ContextMenu";

import { Download, Star, Trash, X } from "react-feather";

//Style
import "./NoteListOptionContext.css";
import { selectNoteById } from "redux/slices/selectors/notesSelectors";
import notesReducer from "redux/slices/notesReducer";
import { setNoteFavorite } from "redux/slices/dispatchers/notesDispatchers";

const actionType = {
    favorite: "favorite"
}

export function NoteListOptionContext(props){

    //Dispatch

    const dispatch = useDispatch();

    const _setFavorite = (note_id, value) => dispatch(setNoteFavorite(note_id, value));

    const handleContextAction = (type) => {
        if(type === actionType.favorite){
            _setFavorite(props.note.id, !props.note.favorited);
        }

        props.onOptionClick();
    }


    return (
        <ContextMenu
            contextRef={props.contextRef}
            position={props.position}
        >
            <div className="NoteListOptionContext">
                <NoteListSelectFolder
                    folders={props.folders}
                    note={props.note}
                    handler={() => handleContextAction()}
                />
                <NoteListContextOption
                    icon={<Star size={18}/>}
                    name={props.note.favorited ? "Remove favorite" : "Mark as favorite"}
                    handler={() => handleContextAction(actionType.favorite)}
                />
                <NoteListContextOption
                    icon={<Trash size={18}/>}
                    name="Move to trash"
                    type="trash"
                    handler={() => handleContextAction()}
                />
                <NoteListContextOption
                    icon={<X size={18}/>}
                    name="Remove folder"
                    handler={() => handleContextAction()}
                />
                <NoteListContextOption
                    icon={<Download size={18}/>}
                    name="Download"
                    handler={() => handleContextAction()}
                />
            </div>
        </ContextMenu>
    )
}