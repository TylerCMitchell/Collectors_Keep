/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');

	let [loginFormErrors, setLoginFormErrors] = useState('');
	const navigate = useNavigate();

	const login = e => {
		e.preventDefault();
		// objectify the form info
		let formInfo = { email, password };
		axios
			.post('http://localhost:8000/api/users/login', formInfo, { withCredentials: true })
			.then(res => {
				console.log('response when logging in', res);
				if (res.data.error) {
					setLoginFormErrors(res.data.error);
				} else {
					navigate('/items/create');
				}
			})
			.catch(err => console.log('err when logging in:', err));
	};

	return (
		<div>
			<div className='text-center m-3'>
				<h3>Login</h3>
			</div>
			<form onSubmit={login}>
				<div className='form-group'>
					<label htmlFor=''></label>
					<input
						placeholder='Email'
						type='text'
						name='email'
						id='loginEmail'
						className='form-control'
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor=''></label>
					<input
						placeholder='Password'
						type='password'
						name='password'
						id='logPassword'
						className='form-control'
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<p className='text-danger'>{loginFormErrors}</p>
				<input type='submit' value='Login' className='btn btn-success mt-3' />
			</form>
		</div>
	);
};

export default LoginForm;
