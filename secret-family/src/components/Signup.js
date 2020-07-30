import React, { useState, useEffect } from 'react';
import { useHistory }  from "react-router-dom";
import signupSchema from './SignupSchema';
import * as yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';
import '../index.css';


const SBackgroundDiv = styled.div`
    background-image: url('https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1957&q=80');
    background-position: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
`;
const SFormDiv = styled.div`
    padding: 15% 20% 20% 15%;
`;
const SForm = styled.form`
    background: white;
    width: 25%;
    text-align: center;
    padding: 2% 0 5% 0;
    background: #FFF8D7;
    height: 38rem;
`;
const SButton = styled.button`
    width: 44%;
    margin-top: 2rem;
`;

const Signup = () => {

    const history = useHistory();

    const [ validSForm, setValidSForm ] = useState({
        username:'',
        email:'',
        password:'',
        name:''
    })
    const [ errors, setErrors ] = useState({
        username:'',
        email:'',
        password:'',
        name:''
    })
    const [ disabled, setDisabled ] = useState(false);

    const formState = e => {
        const name = e.target.name;
        const value = e.target.value;

        yup
        .reach(signupSchema, name)
        .validate(value)
        .then(valid => {
            setErrors({
                ...errors,
                [name]: ''
            })
        })
        .catch(err => {
            setErrors({
                [name]: err.errors[0]
            })
        })
        setValidSForm({
            ...validSForm, [name]: value
        })
    }
    useEffect(() => {
        signupSchema.isValid(validSForm).then(valid => {
            setDisabled(!valid)
        })
    },[validSForm])

    const submit = e => {
        e.preventDefault();

         axios
            .post('https://secret-family-recipes-2-api.herokuapp.com/auth/register', validSForm)
            .then((res) => {
                console.log('Signup Request', res);
                localStorage.setItem('token', res.data.token);
                history.push('/');
            })
            .catch((err) => console.log('Error for Request', err));
                setValidSForm({
                    username:'',
                    email:'',
                    password:'',
                    name:''
                })
    }    

    return (
        <SBackgroundDiv>
            <SFormDiv>
                <SForm onSubmit={submit}>
                    <h1>
                        Signup
                    </h1>
                    <label htmlFor='username'>
                        Username:<br />
                        <input name='username' type='text'onChange={formState}/><br />
                        {validSForm.username.length < 2 ? (<p className="error">{errors.username}</p>) : ''}
                    </label>
                    <label htmlFor='email'>
                        Email:<br />
                        <input name='email' type='text' onChange={formState}/><br />
                        {validSForm.email.search(`"@" + "&nbsp" + "${'.com' || '.net' || 'org'}"`) === -1 ? (<p className="error">{errors.email}</p>) : ''}
                    </label>
                    <label htmlFor='password'>
                        Password:<br />
                        <input name='password' type='text' onChange={formState} /><br />
                        {validSForm.password.length < 2 ? (<p className="error">{errors.password}</p>) : ''}
                    </label>
                    <label htmlFor='name'>
                        Name:<br />
                        <input name='name' type='text' onChange={formState}/><br />
                        {validSForm.name.length < 2 ? (<p className="error">{errors.name}</p>) : ''}
                    </label>
                    <SButton disabled={disabled}>Signup</SButton>
                </SForm>
            </SFormDiv>
        </SBackgroundDiv>
    )
}

export default Signup;