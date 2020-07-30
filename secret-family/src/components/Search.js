import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import styled from 'styled-components';

const SearchDiv = styled.div `
    background-color: #D4A59A;
    border: 0;
    box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
        0 2px 4px rgba(0, 0, 0, 0.24);
    padding: 1rem;
    cursor: pointer;
    position: relative;
    margin: 1rem auto;
    display: flex;
    justify-content: center;
`;
const SearchInput = styled.input `
    padding: 0.5em;
    margin: 0.5em;
    background: papayawhip;
    border: none;
    border-radius: 3px;
`;

function Search() {
    const {searchText, changeSearchText, clearFilter} = useContext(RecipeContext);
    return (
        <SearchDiv>
            <SearchInput 
                type="text" 
                value={searchText} 
                onChange={changeSearchText} 
                placeholder="Enter search term"
            />
            <button onClick={clearFilter}>Clear Filter</button>
        </SearchDiv>
    )
}

export default Search;