import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import loginSchema from './LoginSchema';
import * as yup from 'yup';
import styled from 'styled-components';
import '../index.css';
import axios from "axios";


const LBackgroundDiv = styled.div`
    background-image: url('https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1957&q=80');
    background-position: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
`;
const LFormDiv = styled.div`
    padding: 15% 20% 12% 15%;
`;
const LForm = styled.form`
    background: white;
    width: 25%;
    text-align: center;
    padding: 4% 3% 1% 3%;
    background: #FFF8D7;
    height: 35rem;
`;
const LButton = styled.button`
    width: 55%;
    margin-top: 1rem;
`;

const Login = props => {

    const lHistory = useHistory();
 
    const [ validLForm, setValidLForm ] = useState({
        username:'',
        password:''
    })
    const [ lErrors, setLErrors ] = useState({
        username:'',
        password:''
    })
    const [ lDisabled, setLDisabled ] = useState(false);


    const lFormState = e => {
        const lName = e.target.name;
        const lValue = e.target.value;

        yup
        .reach(loginSchema, lName)
        .validate(lValue)
        .then(valid => {
            setLErrors({
                ...lErrors,
                [lName]: ''
            })
        })
        .catch(err => {
            setLErrors({
                [lName]: err.errors[0]
            })
        })
        setValidLForm({
            ...validLForm, [lName]: lValue
        })
    }
    useEffect(() => {
        loginSchema.isValid(validLForm).then(valid => {
            setLDisabled(!valid)
        })
    },[validLForm])

    const lSubmit = e => {
        e.preventDefault();
        console.log(validLForm)
        
        axios
        .post('https://secret-family-recipes-2-api.herokuapp.com/auth/login', validLForm)
        .then(res => {
            window.localStorage.setItem('token', res.data.token);
            lHistory.push('/')  
        })
        .catch(err => {
            console.log(err)
        })
    }


    return (
        <LBackgroundDiv>
            <LFormDiv>
                <LForm onSubmit={lSubmit}>
                    <h1>
                        Login<br />
                    </h1>
                    <label htmlFor='username'>
                        Username:<br />
                        <input name='username' type='text' onChange={lFormState}/><br />
                        {validLForm.username.length < 2 ? (<p className="error">{lErrors.username}</p>) : ''}<br />
                    </label>
                    <label htmlFor='password'>
                        Password:<br />
                        <input name='password' type='text' onChange={lFormState} /><br />
                        {validLForm.password.length < 2 ? (<p className="error">{lErrors.password}</p>) : ''}<br />
                    </label>
                    <LButton disabled={lDisabled}>Login</LButton>
                </LForm>
            </LFormDiv>
        </LBackgroundDiv>
    )
}

export default Login;