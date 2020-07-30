import * as yup from 'yup';

const signupSchema = yup.object().shape({
    username: yup
    .string()
    .required('Username required')
    .min(2, 'Name must be at least two characters long'),
    email: yup
    .string()
    .email('Invalid email format'),
    password: yup
    .string()
    .required('Password required')
    .min(2, 'Name must be at least two characters long'),
    name: yup
    .string()
    .required('Name required')
    .min(2, 'Name must be at least two characters long')
})

export default signupSchema;