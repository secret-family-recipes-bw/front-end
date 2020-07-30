import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

function Search() {
    const {searchText, changeSearchText, clearFilter} = useContext(RecipeContext);
    return (
        <div>
            <input 
                type="text" 
                value={searchText} 
                onChange={changeSearchText} 
                placeholder="Enter search term"
            />
            <button onClick={clearFilter}>Clear Filter</button>
        </div>
    )
}

export default Search;