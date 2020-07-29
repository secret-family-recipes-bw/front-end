import React, { useState, useEffect } from 'react';
import loginSchema from './LoginSchema';
import * as yup from 'yup';

const Login = props => {

    const lSubmit = e => {
        e.preventDefault();
    }
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
        loginSchema.isValid(lFormState).then(valid => {
            setLDisabled(!valid)
        })
    },[lFormState])

    return (
        <div>
            <form onSubmit={lSubmit}>
                <h1>
                    Login
                </h1>
                <label htmlFor='username'>
                    Username:
                    <input name='username' type='text' onChange={lFormState}/>
                </label>
                <label htmlFor='password'>
                    Password:
                    <input name='password' type='text' onChange={lFormState} secureTextEntry/>
                </label>
                <button disabled={lDisabled}>Login</button>
            </form>
        </div>
    )
}

export default Login;