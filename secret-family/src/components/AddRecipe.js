import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from 'styled-components';


const AddRecipeDiv = styled.div `
    background-color: #D4A59A;
    border: 0;
    box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
        0 2px 4px rgba(0, 0, 0, 0.24);
    padding: 1rem;
    position: relative;
    margin: 1rem auto;
    width: 75%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;

const AddInput = styled.input `
    padding: 0.5em;
    margin: 0.5em;
    background: papayawhip;
    border: none;
    border-radius: 3px;
`;

const Button = styled.button `
    font-size: 0.75em;
    margin: 0.5em;
    padding: 0.5em;
    border: 1px solid black;
    border-radius: 3px;
`;

const initialRecipe = {
    user_id: 1,
    title: "", 
    source: "",
    category: "",
    image: "",
};

const AddRecipe = () => {
//   const params = useParams();
  const { push } = useHistory();
  const [recipe, setRecipe] = useState(initialRecipe);
  

 
  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setRecipe({
      ...recipe,
        [ev.target.name]: value
      }
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(recipe)
    axiosWithAuth()
      .post("https://secret-family-recipes-2-api.herokuapp.com/recipes/addrecipe", recipe)
      .then(() => push("/"))
      .catch(err => console.log(err));
  };

  return (
    <AddRecipeDiv>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <AddInput
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Recipe Name"
          value={recipe.title}
        />
        <Button>Submit</Button>
      </form>
    </AddRecipeDiv>
  );
};

export default AddRecipe;