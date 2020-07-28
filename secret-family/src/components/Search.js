import React from "react";

function Search(props) {
    return (
        <div>
            <input 
                type="text" 
                value={props.searchText} 
                onChange={props.changeSearchText} 
                placeholder="Enter search term"
            />
            <button onClick={props.clearFilter}>Clear Filter</button>
        </div>
    )
}

export default Search;