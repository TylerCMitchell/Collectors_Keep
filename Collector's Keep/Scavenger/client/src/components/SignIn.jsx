/** @format */

import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Paper from '@mui/material/Paper';

const styles = {
	paper: {
		width: 'auto',
		padding: '1rem',
	},
	input: {
		marginBottom: '1rem',
	},
};
const SignIn = () => {
	return (
		<div>
			<div>
				<h1 className='text-center m-3'>Create an account!</h1>
			</div>
			<h3 className='text-center m-3'>Existing user? Login to view more!</h3>
			<Paper elevation={3} style={styles.paper}>
				<div className='row'>
					<div className='col'>
						<RegistrationForm></RegistrationForm>
					</div>
					<div className='col'>
						<LoginForm></LoginForm>
					</div>
				</div>
			</Paper>
		</div>
	);
};

export default SignIn;
