export function selectNotesState(state){
    return state.notesState;
}

export function selectAllNotes(state){
    return state.notesState.notes;
}

export function selectNoteById(state, target_id){
    return state.notesState.notes.find((note) => note.id === target_id);
}

export function selectNotesByFolder(state, folder_id){
    return state.notesState.notes.filter((note) => note.folder_id === folder_id);
}

export function selectTrashedNotes(state){
    return state.notesState.notes.filter((note) => note.trashed);
}

export function selectFavoritedNotes(state){
    return state.notesState.notes.filter((note) => note.favorited);
}

export function selectNotesByContent(state, target_str){
    return state.notesState.notes.filter((note) => note.content.includes(target_str));
}

export function selectSelectedNoteId(state){
    return state.notesState.selected_note_id
}

export function selectSelectedNote(state){
    return state.notesState.notes.find((note) => note.id === state.notesState.selected_note_id)
}