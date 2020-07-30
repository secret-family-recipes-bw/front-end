import React, { useState, useEffect } from 'react';
import loginSchema from './LoginSchema';
import * as yup from 'yup';
import styled from 'styled-components';
import axios from "axios";

const LBackgroundDiv = styled.div`
    background-image: url('https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1957&q=80');
    background-position: no-repeat;
    background-size: cover;
`;
const LFormDiv = styled.div`
    padding: 19% 20% 15% 15%;
`;
const LForm = styled.form`
    background: white;
    width: 20%;
    text-align: center;
    padding: 2% 3% 4% 3%;
    background: #FFF8D7;
`;
const LButton = styled.button`
    width: 55%;
`;

const Login = props => {

    const [ validLForm, setValidLForm ] = useState({
        username:'',
        password:''
    })
    const [ lErrors, setLErrors ] = useState({
        username:'',
        password:''
    })
    const [ lDisabled, setLDisabled ] = useState(false);

    useEffect(() => {
        loginSchema.isValid(validLForm).then(valid => {
            setLDisabled(!valid)
        })
    },[validLForm])

    const lSubmit = e => {
        e.preventDefault();
        
        axios
        .post('https://secret-family-recipes-2-api.herokuapp.com/auth/login', validLForm)
        .then(res => {
            console.log(res.data)
            window.localStorage.setItem('token', res.data.token)

        })
    }

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
    

    return (
        <LBackgroundDiv>
            <LFormDiv>
                <LForm onSubmit={lSubmit}>
                    <h1>
                        Login
                    </h1>
                    <label htmlFor='username'>
                        Username:<br />
                        <input name='username' type='text' onChange={lFormState}/>
                        {validLForm.username.length < 2 ? (<p className="error">{lErrors.username}</p>) : ''}<br /><br />
                    </label>
                    <label htmlFor='password'>
                        Password:<br />
                        <input name='password' type='text' onChange={lFormState} /><br /><br /><br />
                        {validLForm.password.length < 2 ? (<p className="error">{lErrors.password}</p>) : ''}<br /><br />
                    </label>
                    <LButton disabled={lDisabled}>Login</LButton>
                </LForm>
            </LFormDiv>
        </LBackgroundDiv>
    )
}

export default Login;