import { generateFolder } from "util/generateFolder";
import { loadFolders } from "util/localStorage";

const initialState = {
    folders: loadFolders(),
    selected_folder_id: "",
}


export default function foldersReducer(state = initialState, action){
    switch(action.type){
        case "folders/create":{
            let new_state = {...state, folders: [...state.folders]};

            const folder_name = action.payload
            const new_folder = generateFolder(folder_name);

            console.log(new_folder);

            new_state.folders.push(new_folder);
            return new_state;
        }
        case "folders/delete":{
            let new_state = {...state};

            const target_id = action.payload;

            const target_folder_index = new_state.folders.findIndex((folder) => folder.id === target_id);

            new_state.folders.splice(target_folder_index, 1);
            return new_state;
        }
        case "folders/update":{
            let new_state = {...state};

            const new_folder = action.payload;

            const target_folder_index = new_state.folders.findIndex((folder) => folder.id === new_folder.id);

            new_state.folders.splice(target_folder_index, 1, new_folder);
            return new_state;
        }
        case "folders/select":{
            let new_state = {...state};

            const id_to_select = action.payload;

            new_state.selected_folder_id = id_to_select;
            return new_state;
        }
        case "folders/setAll":{
            let new_state = {...state};

            const folders = action.payload;

            console.log("in reducer: ");
            console.log(folders);

            new_state.folders = folders;
            console.log(new_state);
            return new_state;
        }
        default:{
            return state;
        }
    }
}