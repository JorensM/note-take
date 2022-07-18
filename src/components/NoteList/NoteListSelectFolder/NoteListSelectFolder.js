//Style
import { getAllFoldersExcept } from "util/getAllFoldersExcept";
import "./NoteListSelectFolder.css";

//Component
/* This component is used in the NoteListOption context menu to select a folder to move the note to */
export function NoteListSelectFolder(props){

    return (
        <div className="NoteListSelectFolder">
            <select
                defaultValue=""
            >
                <option disabled value="">
                    Move to folder...
                </option>
                {getAllFoldersExcept(props.folders, props.note.folder_id).map((folder) =>
                    <option
                        key={folder.id}
                        value={folder.id}
                    >
                        {folder.name}
                    </option>
                )}
            </select>
        </div>
    )
}