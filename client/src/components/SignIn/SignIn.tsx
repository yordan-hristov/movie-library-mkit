import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import userService from '../../services/userService';
import { setUser } from '../../store/user/userSlice';
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner';

import './SignIn.scss';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return setErrorMessage("Invalid Inputs");

        setLoading(true);

        const data = await userService.loginUser(email, password);

        if (data.message) {
            setLoading(false);
            return setErrorMessage(data.message)
        }

        dispatch(setUser(data));
        navigate('/home');
    };

    return (
        <div className="sign-in-wrapper">
            {loading ? <LoadingSpinner /> :
                <div className="sign-in">
                    <h1 className='sign-in-title'>Sign In</h1>
                    {errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
                    <form className='sign-in-form' onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input type="text" name='email' autoComplete='off' onChange={(e) => setEmail(e.target.value)} />
                        <label>Password:</label>
                        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />

                        <input type="submit" value="SIGN IN" className="submit" />
                    </form>
                    <p className="sign-in-text">Don't have an account?<Link to={"/sign-up"}><span className="register-link">Sign up</span></Link></p>
                </div>
            }
        </div>
    );
};

export default SignIn;
