/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import ItemForm from './CreateItem';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
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

const EditForm = props => {
	const { _id } = useParams();
	const [formInfo, setFormInfo] = useState({
		title: '',
		price: '',
		description: '',
		imgUrl: '',
		dateAdded: '',
		forSale: '',
		photo: '',
		itemCondition: '',
	});
	let [formErrors, setFormErrors] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/items/${_id}`)
			.then(response => {
				console.log('response: ', response);
				if (response.data.results) {
					setFormInfo(response.data.results);
				}
			})
			.catch(err => console.log(err));
	}, []);

	const deleteItem = () => {
		axios
			.delete(`http://localhost:8000/api/items/${_id}`)
			.then(response => {
				console.log('response', response);
				navigate('/');
			})
			.catch(err => console.log(err));
	};

	//changehandler to update formInfo object with info from the form as it is being changed
	const changeHandler = e => {
		if (e.target.type === 'dropdown') {
			setFormInfo({
				...formInfo,
				[e.target.name]: e.target.value,
			});
		}
		// console.log('updating the form');
		if (e.target.type === 'checkbox') {
			setFormInfo({
				...formInfo,
				[e.target.name]: !formInfo.checkbox,
			});
		} else if (e.target.type === 'file') {
			setFormInfo({
				...formInfo,
				[e.target.name]: e.target.files[0],
			});
		} else {
			setFormInfo({
				...formInfo,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		// const formData = new FormData();
		// formData.append('title', formInfo.title);
		// formData.append('price', formInfo.price);
		// formData.append('description', formInfo.description);
		// formData.append('imgUrl', formInfo.imgUrl);
		// formData.append('photo', formInfo.photo);
		// formData.append('dateAdded', formInfo.dateAdded);
		// formData.append('forSale', formInfo.forSale);
		// formData.append('itemCondition', formInfo.itemCondition);
		axios
			.put(`http://localhost:8000/api/items/${_id}`, formInfo)
			.then(response => {
				console.log('Response from update request', response);
				navigate('/');
				if (response.data.errors) {
					setFormErrors(response.data.errors);
				} else {
					setFormErrors({});
					props.setFormSubmitted(!props.formSubmitted);
				}
			})
			.catch(err => console.log(err));
	};

	// returning the edit form from our Form.js
	return (
		<div>
			<h3>Edit {formInfo.title}</h3>
			<div>
				<div>
					<Paper elevation={3} style={styles.paper}>
						{/* <h3>Add an Item</h3> */}
						<form onSubmit={handleSubmit} encType='multipart/form-data'>
							<FormGroup variant='outlined' style={styles.input}>
								{/* <label htmlFor=''>Item Title:</label> */}
								<TextField
									label='Item Title'
									onChange={changeHandler}
									type='text'
									name='title'
									id=''
									className='form-control'
									value={formInfo.title}
								/>
								<p className='text-danger'>{formErrors.title?.message}</p>
							</FormGroup>
							<FormGroup variant='outlined' style={styles.input}>
								{/* <label htmlFor=''>Price:</label> */}
								<TextField
									label='Price'
									onChange={changeHandler}
									type='number'
									name='price'
									id=''
									className='form-control'
									value={formInfo.price}
								/>
								<p className='text-danger'>{formErrors.price?.message}</p>
							</FormGroup>
							<FormGroup variant='outlined' style={styles.input}>
								{/* <label htmlFor=''>Description:</label> */}
								<TextField
									label='Description'
									onChange={changeHandler}
									type='text'
									name='description'
									id=''
									multiline
									rows={3}
									className='form-control'
									value={formInfo.description}
								/>
								<p className='text-danger'>{formErrors.description?.message}</p>
							</FormGroup>
							<FormGroup variant='outlined' style={styles.input}>
								{/* <label htmlFor=''>Date added:</label> */}
								<input
									onChange={changeHandler}
									type='date'
									name='dateAdded'
									id=''
									inputFormat='MM/dd/yyyy'
									className='form-control p-3'
									value={formInfo.dateAdded}
								/>
								<p className='text-danger'>{formErrors.dateAdded?.message}</p>
							</FormGroup>
							{/* <div className='form-group'>
							<label htmlFor=''>Image Url:</label>
							<input
								onChange={changeHandler}
								type='text'
								name='imgUrl'
								id=''
								className='form-control'
								value={formInfo.imgUrl}
							/>
						</div> */}
							<br />
							<div className='d-grid'>
								<div className='d-grid gap-2 d-md-flex justify-content-between'>
									<div className='box'>
										<select
											label='Item Condition'
											className='custom-select rounded ms-3 shadow'
											onChange={changeHandler}
											type='dropdown'
											name='itemCondition'
											value={formInfo.itemCondition}>
											<option value=''>Item Condition</option>
											<option value='Mint'>Mint</option>
											<option value='Like New'>Like New</option>
											<option value='Damaged Package'>Damaged Package</option>
											<option value='Loose'>Loose</option>
											<option value='Incomplete/Damaged'>
												Incomplete/Damaged
											</option>
										</select>
									</div>
									<div className='box rounded shadow'>
										<div className='photoUpload'>
											<label htmlFor='' className='photoLabel'>
												Upload Photo{' '}
											</label>
											<input
												onChange={changeHandler}
												type='file'
												accept='.png, .jpg, .jpeg'
												name='photo'
											/>
										</div>
									</div>
									<div className='box rounded shadow'>
										<div className='check'>
											<label htmlFor=''>For Sale:</label>
											<input
												onChange={changeHandler}
												type='checkbox'
												name='forSale'
												id=''
												className='form-check-input ms-2'
												value={formInfo.forSale}
												checked={formInfo.forSale}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className=''>
								<div className='d-flex justify-content-end'>
									<input
										type='submit'
										value='Submit'
										className='btn btn-primary btn-lg mt-3 shadow'
									/>
								</div>
							</div>
						</form>
					</Paper>
					{/* <Link to={`/`} className='btn btn-outline-primary shadow m-3'>
					Dashboard
				</Link> */}
				</div>
				<Link to={`/`} className='btn btn-outline-secondary shadow m-3'>
					Cancel
				</Link>
				{/* <button className='btn btn-danger m-3' onClick={deleteItem}>
					Delete {formInfo.title}
				</button> */}
			</div>
		</div>
	);
};

export default EditForm;
