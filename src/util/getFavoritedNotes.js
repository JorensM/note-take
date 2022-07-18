export function getFavoritedNotes(all_notes){
    return all_notes.filter((note) => note.favorited === true);
}