//Import core
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Import components
import { AppSidebar } from "containers/AppSidebar/AppSidebar";
import { NoteList } from "containers/NoteList/NoteList";
import { NoteEditor } from "containers/NoteEditor/NoteEditor";


//Import dispatchers
import { createNote, setAllNotes } from "redux/slices/dispatchers/notesDispatchers";
import { setAllFolders } from "redux/slices/dispatchers/foldersDispatchers";

//Import selectors
import { selectAllNotes, selectNotesState, selectSelectedNoteId } from "redux/slices/selectors/notesSelectors";
import { selectAllFolders, selectSelectedFolderId } from "redux/slices/selectors/foldersSelectors";

import "./NoteTakeApp.css";
import { loadFolders, loadNotes, saveFolders, saveNotes } from "util/localStorage";

export function NoteTakeApp(){

    //Dispatch

    const dispatch = useDispatch();

    const _createNote = () => dispatch(createNote("0"));

    const _setAllNotes = (notes) => dispatch(setAllNotes(notes));
    const _setAllFolders = (folders) => dispatch(setAllFolders(folders));

    //Selectors

    const notesState = useSelector(selectNotesState);
    const notes = useSelector(selectAllNotes);
    const folders = useSelector(selectAllFolders);
    const selected_folder_id = useSelector(selectSelectedFolderId);
    const selected_note_id = useSelector(selectSelectedNoteId);
    

    //State

    //const [currentNote, setCurrentNote] = useState(null);

    //Event handlers

    const handleCreateNote = () => {
        // console.log(notes);
        _createNote();
    }

    const onNoteEditorInputChange = (new_content) => {

    }


    //On mount
    useEffect(() => {
        //Load notes and folders from localStorage
        const _folders = loadFolders();
        const _notes = loadNotes();

        //_setAllFolders(_folders);
        //_setAllNotes(_notes);
    }, []);

    //On folders state changed, save folders
    useEffect(() => {
        saveFolders(folders);
    }, [folders])
    //On notes state changed, save notes
    useEffect(() => {
        saveNotes(notes);
    }, [notes])

    return(
        <div className="NoteTakeApp">
            <div className="cols">
                <AppSidebar/>
                <NoteList 
                    notesState={notesState}
                    notes={notes} 
                    folders={folders}
                    selected_folder_id={selected_folder_id}
                    selected_note_id={selected_note_id}
                />
                <NoteEditor 
                    note_id={selected_note_id}
                    onChange={onNoteEditorInputChange}    
                />
            </div>
        </div>
    )
}