import { v4 as uuid } from "uuid";

export function generateNote(target_folder_id){
    let note = {
        id: uuid(),
        content: "New note",
        created: new Date().toString(),
        updated: new Date().toString(),
        favorited: false,
        trashed: false,
        folder_id: target_folder_id, 
    }

    return note;
}