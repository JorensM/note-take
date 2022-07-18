export function selectAllFolders(state){
    return state.folders.folders;
}

export function selectFolderById(state, id){
    return state.folders.folders.filter((folder) => folder.id === id);
}

export function selectSelectedFolderId(state){
    return state.folders.selected_folder_id;
}