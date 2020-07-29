import * as yup from 'yup';

const signupSchema = yup.object().shape({
    username: yup
    .string()
    .required('Username required'),
    email: yup
    .string()
    .email('Invalid email format'),
    password: yup
    .string()
    .required('Password required'),
    name: yup
    .string()
    .required('Name required')
})

export default signupSchema;