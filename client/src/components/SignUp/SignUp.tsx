import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import userService from '../../services/userService';
import { setUser } from '../../store/user/userSlice';
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner';

import './SignUp.scss'

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        return email.length > 0 && password.length > 0 && password === repeatPassword;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return setErrorMessage("Invalid Inputs");

        setLoading(true);

        const data = await userService.registerUser(email, password);

        if (data.message) {
            setLoading(false);
            return setErrorMessage(data.message)
        }

        dispatch(setUser(data));
        navigate('/home');
    };

    return (
        <div className="sign-up-wrapper">
            {loading ? <LoadingSpinner /> :
                <div className="sign-up">
                    <h1 className='sign-up-title'>Sign Up</h1>
                    {errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
                    <form className='sign-up-form' onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input type="text" name='email' autoComplete='off' onChange={(e) => setEmail(e.target.value)} />
                        <label>Password:</label>
                        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                        <label>Repeat Password:</label>
                        <input type="password" name='repeatPassword' onChange={(e) => setRepeatPassword(e.target.value)} />

                        <input type="submit" value="SIGN UP" className="submit" />
                    </form>
                    <p className="sign-up-text">Already have an account?<Link to={"/sign-in"}><span className="login-link">Sign in</span></Link></p>
                </div>
            }
        </div>
    );
};

export default SignUp;
