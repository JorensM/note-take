export function getAllFoldersExcept(all_folders, except_id){
    const filtered_folders = all_folders.filter((folder) => folder.id !== except_id);

    return filtered_folders;
}