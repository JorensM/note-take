export function createNote(target_folder_id){
    return {
        type: "notes/create",
        payload: target_folder_id,
    }
}

export function selectNote(target_note_id){
    return {
        type: "notes/select",
        payload: target_note_id,
    }
}

export function updateNote(target_note_id, new_content){
    return {
        type: "notes/update",
        payload: {
            target_id: target_note_id, 
            new_content: new_content
        },
    }
}

export function setAllNotes(notes){
    return {
        type: "notes/setAll",
        payload: notes,
    }
}

export function setFilterType(filter_type){
    return {
        type: "notes/setFilterType",
        payload: filter_type,
    }
}

export function setNoteFavorite(target_id, value){
    return {
        type: "notes/setFavorite",
        payload: {target_id: target_id, value: value},
    }
}