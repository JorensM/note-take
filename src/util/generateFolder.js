import { v4 as uuid } from "uuid";

export function generateFolder(name = "New folder"){
    let folder = {
        id: uuid(),
        name: name,
        created: new Date().toString(),
        updated: new Date().toString(),
    }

    return folder;
}