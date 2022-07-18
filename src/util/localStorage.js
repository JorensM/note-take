import constants from "./constants";

export function storageSaveObject(obj, key){
    let stringified = JSON.stringify(obj);
    localStorage.setItem(key, stringified);
}

export function storageGetObject(key){
    let unparsed = localStorage.getItem(key);
    if(unparsed === undefined || unparsed === null || unparsed === ""){
        unparsed = "[]";
    }
    let parsed = JSON.parse(unparsed);

    return parsed;
}

export function saveNotes(notes){
    storageSaveObject(notes, constants.storageKeys.notes);
}

export function loadNotes(){
    return storageGetObject(constants.storageKeys.notes)
}

export function saveFolders(folders){
    storageSaveObject(folders, constants.storageKeys.folders);
}

export function loadFolders(){
    return storageGetObject(constants.storageKeys.folders);
}