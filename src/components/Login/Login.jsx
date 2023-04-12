import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigation = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        navigation('/home');
    }

    return (
        <div className="text-3xl font-bold underline">
            <input id='login' />
            <label for='login'>Login</label>
            <input id='password' />
            <label for='password'>Password</label>
            <button type='submit' onClick={signIn}>Sign in</button>
        </div>
    )
}

export default Login;