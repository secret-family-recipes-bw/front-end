import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { RecipeContext } from "../context/RecipeContext";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from 'styled-components';


const Button = styled.button `
    font-size: 0.75em;
    margin: 0.5em;
    padding: 0.5em;
    border: 1px solid black;
    border-radius: 3px;
`;


function Recipe() {
    const {addToSavedList, isInSavedList, removeFromSavedList} = useContext(RecipeContext);
    const { push } = useHistory();
    const { id } = useParams();
    const [recipe, setRecipe] = useState();
    const saved = isInSavedList(recipe);


    const toggleSaveRecipe = () => {
        saved ? removeFromSavedList(recipe) : addToSavedList(recipe);
    };

    useEffect(() => {
        axiosWithAuth()
        .get(`https://secret-family-recipes-2-api.herokuapp.com/recipes/${id}`)
        .then((res) => {
            setRecipe(res.data)
            console.log("data", res.data)
            })
        .catch((err) => console.log(err.response));
    }, [id]);

    if (!recipe) {
        return <div>Loading recipe information...</div>;
    }

    const handleDelete = e => {
        e.preventDefault();
        axiosWithAuth()
        .delete(`https://secret-family-recipes-2-api.herokuapp.com/recipes/${id}`)
        .then((res) => {
            console.log("res for delete:", res)
            push("/");
        })
        .catch(err => console.log(err));
    };

    return (
        <div style={{textAlign: "center"}}>
            <RecipeCard recipe={recipe} />

            <Button onClick={toggleSaveRecipe}>
                {saved ? "remove from saved" : "Save"}
            </Button>
            <Button onClick={handleDelete}>
                Delete
            </Button>
            <Link to={`/update-recipe/${recipe.recipe.id}`}>
                <Button>Edit</Button>
            </Link>
        </div>
    );
}

export default Recipe;
