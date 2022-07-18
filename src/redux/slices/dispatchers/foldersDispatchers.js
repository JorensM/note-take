export function createFolder(folder_name = "New folder"){
    return {
        type: "folders/create",
        payload: folder_name
    }
}

export function selectFolder(id_to_select){
    return {
        type: "folders/select",
        payload: id_to_select,
    }
}

export function setAllFolders(folders){
    return {
        type: "folders/setAll",
        payload: folders,
    }
}