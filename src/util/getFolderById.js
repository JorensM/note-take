export function getFolderById(folder_id, all_folders){
    const folder = all_folders.find((folder) => folder.id === folder_id);

    return folder;
}