import React, { useEffect, useContext } from "react";
import SavedList from "./SavedList";
import Search from "./Search";
import RecipeList from "./RecipesList";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { RecipeContext } from "../context/RecipeContext";
import axiosWithAuth from "../utils/axiosWithAuth";

const Button = styled.button `
  font-size: 0.75em;
  margin: 0.5em;
  padding: 0.5em;
  border: 1px solid black;
  border-radius: 3px;
`

const Home = () => {
    const { location } = useHistory();
    const { updateRecipes } = useContext(RecipeContext);

    useEffect(() => {
        axiosWithAuth()
          .get("/recipes")
          .then(res => {
              console.log(res.data)
            updateRecipes(res.data)
          } )
          .catch(err => console.log(err.response));
      }, [location]);

    return (
        <>
            <SavedList />
            <Search />
            <RecipeList />
            <Link to="/add-recipe"><Button>Add Recipe</Button></Link>
        </>
    )
};

export default Home;