import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigation = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        navigation('/home');
    }

    return (
        <div className="w-12">
            <label for='login'>Login</label>
            <input id='login' />
            <label for='password'>Password</label>
            <input id='password' />
            <button type='submit' onClick={signIn}>Sign in</button>
        </div>
    )
}

export default Login;