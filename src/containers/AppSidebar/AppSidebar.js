import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createFolder, selectFolder } from "redux/slices/dispatchers/foldersDispatchers";
import { selectAllFolders, selectSelectedFolderId } from "redux/slices/selectors/foldersSelectors";

import { FolderOption } from "components/AppSidebar/FolderOption/FolderOption.js";
import "./AppSidebar.css";
import { CreateFolderButton } from "components/AppSidebar/CreateFolderButton/CreateFolderButton";
import { NewNoteButton } from "components/AppSidebar/NewNoteButton/NewNoteButton";
import { createNote, setFilterType } from "redux/slices/dispatchers/notesDispatchers";
import { saveFolders } from "util/localStorage";
import { selectAllNotes } from "redux/slices/selectors/notesSelectors";


export function AppSidebar(){

    //Dispatch

    const dispatch = useDispatch();

    const _createFolder = (folder_name) => dispatch(createFolder(folder_name));
    const _selectFolder = (id) => dispatch(selectFolder(id));
    const _createNote = (id) => dispatch(createNote(id));
    const _setFilterType = (filter_type) => dispatch(setFilterType(filter_type));

    //Selectors

    const folders = useSelector(selectAllFolders);
    const notes = useSelector(selectAllNotes);
    const selected_folder_id = useSelector(selectSelectedFolderId);

    //State

    const [addingTempFolder, setAddingTempFolder] = useState(false);
    const [tempFolderValue, setTempFolderValue] = useState("");

    const resetTempFolderForm = () => {
        setAddingTempFolder(false);
        setTempFolderValue("");
    }

    //Event handlers

    const onCreateFolder = () => {
        setAddingTempFolder(true);
        
        //_createFolder();
    }

    const onTempFolderInputChange = (event) => {
        setTempFolderValue(event.target.value);
    }

    const onCreateFolderFormSubmit = () => {
        if(tempFolderValue && tempFolderValue != ""){
            _createFolder(tempFolderValue);
            console.log(folders);
            saveFolders(folders);
        }

        resetTempFolderForm();

    }

    const onFolderSelect = (folder_id) => {
        _selectFolder(folder_id);
        if(["all", "favorites", "trash"].indexOf(folder_id) != -1){
            _setFilterType(folder_id);
            return;
        }
        _setFilterType("folder")
        
    }

    const onCreateNote = () => {
        if(selected_folder_id){
            _createNote(selected_folder_id);
        }else{
            console.log("Failed to create note: no folder selected");
        }
    }

    return (
        <div className="AppSidebar">
            <div className="AppSidebarHeader">
                <NewNoteButton handler={onCreateNote}/>
            </div>
            <div className="AppSidebarFoldersTop">
                <FolderOption
                    key="folder/all"
                    folder_id="all"
                    selected_folder_id={selected_folder_id}
                    name="Notes"
                    selectFolderHandler={onFolderSelect}
                />
                <FolderOption
                    key="folder/favorites"
                    folder_id="favorites"
                    selected_folder_id={selected_folder_id}
                    name="Favorites"
                    selectFolderHandler={onFolderSelect}
                />
                <FolderOption
                    key="folder/trash"
                    folder_id="trash"
                    selected_folder_id={selected_folder_id}
                    name="Trash"
                    selectFolderHandler={onFolderSelect}
                />
            </div>
            <div className="AppSidebarFoldersBot">
                <div className="AppSidebarSubheader">
                    FOLDERS
                    <CreateFolderButton handler={onCreateFolder}/>
                </div>
                {folders.map((folder) => 
                    <FolderOption 
                        key={folder.id} 
                        folder_id={folder.id}
                        selected_folder_id={selected_folder_id}
                        name={folder.name}
                        selectFolderHandler={onFolderSelect}
                    />
                )}
                {addingTempFolder &&
                    <div className="AppSidebarTempFolderForm">
                        <form
                            onSubmit={onCreateFolderFormSubmit}
                        >
                            <input
                                type="text"
                                maxLength={20}
                                placeholder="New folder..."
                                onChange={onTempFolderInputChange}
                                autoFocus
                                onBlur={onCreateFolderFormSubmit}
                            />
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}