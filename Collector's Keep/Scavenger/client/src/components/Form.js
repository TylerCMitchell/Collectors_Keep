/** @format */

import React from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';

const styles = {
	paper: {
		width: 'auto',
		padding: '1rem',
	},
	input: {
		marginBottom: '1rem',
	},
};

// Making a reusable form component
const Form = props => {
	const { handleSubmit, changeHandler, formInfo, formErrors, FormData } = props;

	return (
		<div>
			<Paper elevation={3} style={styles.paper}>
				<form onSubmit={handleSubmit} encType='multipart/form-data'>
					<FormGroup variant='outlined' style={styles.input}>
						<TextField
							label='Item Title'
							type='text'
							name='title'
							id=''
							className='form-control'
							color='primary'
							variant='outlined'
							onChange={changeHandler}
							value={formInfo.title}
							required
							error={formErrors.title?.message}
							helperText={formErrors.title?.message}
						/>
					</FormGroup>
					<FormGroup variant='outlined' style={styles.input}>
						<TextField
							label='Price'
							type='number'
							name='price'
							id=''
							className='form-control'
							color='primary'
							variant='outlined'
							onChange={changeHandler}
							value={formInfo.price}
							required
							error={formErrors.price?.message}
							helperText={formErrors.price?.message}
						/>
					</FormGroup>
					<FormGroup variant='outlined' style={styles.input}>
						<TextField
							label='Description'
							type='text'
							name='description'
							className='form-control'
							id=''
							multiline
							rows={4}
							color='primary'
							variant='outlined'
							onChange={changeHandler}
							value={formInfo.description}
							required
							error={formErrors.description?.message}
							helperText={formErrors.description?.message}
						/>
					</FormGroup>
					<FormGroup variant='outlined' style={styles.input}>
						<TextField
							label=''
							type='date'
							name='dateAdded'
							id=''
							className='form-control'
							variant='outlined'
							color='primary'
							value={moment(formInfo.dateAdded).format('YYYY-MM-DD')}
							onChange={changeHandler}
						/>
					</FormGroup>
					<FormGroup variant='outlined' style={styles.input}>
						<TextField
							label='Image Url'
							type='text'
							name='imgUrl'
							id=''
							className='form-control'
							color='primary'
							variant='outlined'
							onChange={changeHandler}
							value={formInfo.imgUrl}
						/>
					</FormGroup>
					<FormGroup variant='outlined' style={styles.input}>
						<TextField
							label=''
							name='photo'
							type='file'
							accept='.png, .jpg, .jpeg'
							id=''
							className='form-control'
							color='primary'
							variant='outlined'
							onChange={changeHandler}
							value={formInfo.photo}
						/>
					</FormGroup>
					<select
						label='Item Condition'
						type='dropdown'
						name='itemCondition'
						className='ms-3 shadow'
						onChange={changeHandler}
						value={formInfo.itemCondition}>
						<option value=''></option>
						<option value='mint'>Mint</option>
						<option value='like new'>Like New</option>
						<option value='damaged package'>Damaged Package</option>
						<option value='loose'>Loose</option>
						<option value='incomplete/damaged'>Incomplete/Damaged</option>
					</select>
					<br />
					<div className='form-group'>
						<label htmlFor=''>For Sale: </label>
						{formInfo.forSale ? (
							<input
								type='checkbox'
								name='forSale'
								id=''
								className='form-check-input ms-2'
								onChange={changeHandler}
								value={formInfo.forSale}
								checked
							/>
						) : (
							<input
								className='form-check-input ms-2'
								type='checkbox'
								name='forSale'
								id=''
								onChange={changeHandler}
								value={formInfo.forSale}
							/>
						)}
					</div>
					<br />
					<input
						type='submit'
						value={props.buttonValue}
						className='btn btn-primary shadow'
						onChange={changeHandler}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default Form;
