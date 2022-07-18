export function getNoteById(note_id, all_notes){

    const note = all_notes.find((note) => note.id === note_id);

    return note;
}