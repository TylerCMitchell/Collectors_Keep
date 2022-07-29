/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
	//form info stored in state variables
	let [firstName, setFirstName] = useState('');
	let [lastName, setLastName] = useState('');
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [confirm, setConfirm] = useState('');

	let [formErrors, setFormErrors] = useState({});

	const navigate = useNavigate();

	const register = e => {
		e.preventDefault();
		let formInfo = { firstName, lastName, email, password, confirm };
		axios
			.post('http://localhost:8000/api/users/register', formInfo, { withCredentials: true })
			.then(res => {
				console.log('res after register', res);
				if (res.data.errors) {
					setFormErrors(res.data.errors);
				} else {
					navigate('/items/create');
				}
			})
			.catch(err => console.log('error after register', err));
	};

	return (
		<div>
			<div className='text-center m-3'>
				<h3>Register</h3>
			</div>
			<form onSubmit={register}>
				<div className='form-group'>
					<label htmlFor=''></label>
					<input
						placeholder='First Name'
						type='text'
						name='firstName'
						id='firstName'
						className='form-control'
						onChange={e => setFirstName(e.target.value)}
					/>
					<p className='text-danger'>{formErrors.firstName?.message}</p>
				</div>
				<div className='form-group'>
					<label htmlFor=''></label>
					<input
						placeholder='Last Name'
						type='text'
						name='lastName'
						id='lastName'
						className='form-control'
						onChange={e => setLastName(e.target.value)}
					/>
					<p className='text-danger'>{formErrors.lastName?.message}</p>
				</div>
				<div className='form-group'>
					<label htmlFor=''></label>
					<input
						placeholder='Email'
						type='text'
						name='email'
						id='regEmail'
						className='form-control'
						onChange={e => setEmail(e.target.value)}
					/>
					<p className='text-danger'>{formErrors.email?.message}</p>
				</div>
				<div className='form-group'>
					<label htmlFor=''></label>
					<input
						placeholder='Password'
						type='password'
						name='password'
						id='regPassword'
						className='form-control'
						onChange={e => setPassword(e.target.value)}
					/>
					<p className='text-danger'>{formErrors.password?.message}</p>
				</div>
				<div className='form-group'>
					<label htmlFor=''></label>
					<input
						placeholder='Confirm Password'
						type='password'
						name='confirm'
						id='confirm'
						className='form-control'
						onChange={e => setConfirm(e.target.value)}
					/>
					<p className='text-danger'>{formErrors.confirm?.message}</p>
				</div>
				<input type='submit' value='Register' className='btn btn-primary mt-3' />
			</form>
		</div>
	);
};

export default RegistrationForm;
