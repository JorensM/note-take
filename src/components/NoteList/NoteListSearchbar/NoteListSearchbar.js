import "./NoteListSearchbar.css";

export function NoteListSearchbar(props){

    return(
        <div className="NoteListSearchbar">
            <input
                type="search"
                placeholder="Search for notes"
            />
        </div>
    )
}