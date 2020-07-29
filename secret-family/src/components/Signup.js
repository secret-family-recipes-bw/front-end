import React, { useState, useEffect } from 'react';
import signupSchema from './SignupSchema';
import * as yup from 'yup';


const Signup = props => {

    const submit = e => {
        e.preventDefault();
    }
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
        signupSchema.isValid(formState).then(valid => {
            setDisabled(!valid)
        })
    },[formState])

    const [ disabled, setDisabled ] = useState(false);

    return (
        <div>
            <form onSubmit={submit}>
                <h1>
                    Signup
                </h1>
                <label htmlFor='username'>
                    Username:
                    <input name='username' type='text'onChange={formState}/>
                </label>
                <label htmlFor='email'>
                    Email:
                    <input name='email' type='text' onChange={formState}/>
                </label>
                <label htmlFor='password'>
                    Password:
                    <input name='password' type='text' onChange={formState} secureTextEntry/>
                </label>
                <label htmlFor='name'>
                    Name:
                    <input name='name' type='text' onChange={formState}/>
                </label>
                <button disabled={disabled}>Signup</button>
            </form>
        </div>
    )
}

export default Signup;