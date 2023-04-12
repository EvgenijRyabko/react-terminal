import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigation = useNavigate();

	const signIn = (e) => {
		e.preventDefault();
		navigation('/home');
	}

	return (
		<div className="grid bg-white shadow-md shadow-slate-100 bg-slate-100 rounded-xl w-9/12 h-3/4 items-center justify-center">
			<div>
				<input id='login' className="w-2/6 justify-center justify-self-center" />
				<label for='login'>Login</label>
			</div>
			<div>
				<input id='password' className="w-2/6" />
				<label for='password'>Password</label>
			</div>
			<button type='submit' onClick={signIn}>Sign in</button>
		</div>
	)
}

export default Login;