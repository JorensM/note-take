import { deepCopy } from "util/deepCopy";
import { generateNote } from "util/generateNote";
import { loadNotes } from "util/localStorage";

const initialState = {
    notes: loadNotes(),
    search_value: "",
    filter_type: "all",
    selected_note_id: "",
}

function getNoteIndex(notes, id){
    return notes.findIndex((note) => note.id === id);
}

export default function notesReducer(state = initialState, action){
    switch(action.type){
        case "notes/create":{
            let new_state = {...state, notes: [...state.notes]};
            console.log(new_state);

            let target_folder_id = action.payload;

            let new_note = generateNote(target_folder_id);

            new_state.notes.push(new_note);
            return new_state;
        }
        case "notes/delete": {
            let new_state = {...state};
            let target_id = action.payload;

            new_state.notes = new_state.notes.filter((note) => note.id !== target_id);

            return new_state;
        }
        case "notes/update": {
            let new_state = JSON.parse(JSON.stringify(state))//{...state, notes: [...state.notes]};

            const { target_id, new_content } = action.payload;
            console.log("target id and content: ");
            console.log(target_id);
            console.log(new_content);
            console.log(new_state.notes);

            const note_index = getNoteIndex(new_state.notes, target_id);//new_state.notes.findIndex((note) => note.id === target_id);

            let updated_note = new_state.notes[note_index];
            updated_note.content = new_content;
            updated_note.updated = new Date().toString();

            new_state.notes.splice(note_index, 1, updated_note);

            return new_state;
        }
        case "notes/setFavorite": {
            let new_state = deepCopy(state);
            const { target_id, value } = action.payload;

            const note_index = getNoteIndex(new_state.notes, target_id);//new_state.notes.findIndex((note) => note.id === target_id);

            new_state.notes[note_index].favorited = value;

            return new_state;
        }
        case "notes/setTrashed": {
            let new_state = {...state};
            const { target_id, value } = action.payload;

            const note_index = getNoteIndex(target_id);//new_state.notes.findIndex((note) => note.id === target_id);

            new_state.notes[note_index].trashed = value;
            return new_state;
        }
        case "notes/setFolder": {
            let new_state = {...state};
            const { note_id, folder_id } = action.payload;

            const note_index = getNoteIndex(note_id);

            new_state.notes[note_index].folder_id = folder_id;
            return new_state;
        }
        case "notes/select": {
            let new_state = {...state};

            const new_selected_id = action.payload;
            
            new_state.selected_note_id = new_selected_id;

            return new_state;
        }
        case "notes/setAll":{
            let new_state = {...state};

            const notes = action.payload;

            new_state.notes = notes;
            return new_state;
        }
        case "notes/setFilterType":{
            let new_state = {...state};

            const filter_type = action.payload;

            new_state.filter_type = filter_type;
            return new_state;
        }
        default: {
            return state;
        }

    }
}