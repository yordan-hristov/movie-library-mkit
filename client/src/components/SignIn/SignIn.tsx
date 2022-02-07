import React, { FormEvent, useState } from 'react';

import userService from '../../services/userService';

import './SignIn.scss';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!validateForm()) return setErrorMessage("Invalid Inputs");

        const data = await userService.loginUser(email, password);

        if (data.message) return setErrorMessage(data.message);

        console.log(data);
    };

    return (
        <div className="sign-in-wrapper">
            <div className="sign-in">
                <h1 className='sign-in-title'>Sign In</h1>
                {errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
                <form className='sign-in-form' onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="text" name='email' autoComplete='off' onChange={(e) => setEmail(e.target.value) } />
                    <label>Password:</label>
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value) }/>

                    <input type="submit" value="SIGN IN" className="submit"/>
                </form>
                <p className="sign-in-text">Don't have an account?</p>
            </div>
        </div>
    );
};

export default SignIn;
