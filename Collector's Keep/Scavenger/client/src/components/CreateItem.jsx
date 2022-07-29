import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { useNavigate, Link } from 'react-router-dom';

const styles = {
	paper: {
		width: 'auto',
		padding: '1rem',
	},
	input: {
		marginBottom: '1rem',
	},
};

const ItemForm = props => {
	let [items, setItems] = useState([]);
	let [itemDeleted, setItemDeleted] = useState(false);
	let [formInfo, setFormInfo] = useState({
		title: '',
		price: '',
		description: '',
		imgUrl: '',
		dateAdded: '',
		forSale: '',
		photo: '',
		itemCondition: '',
	});

	// axios for submitting form to create new item
	useEffect(() => {
		axios
			.get('http://localhost:8000/api/items')
			.then(response => {
				console.log('response: ', response);
				setItems(response.data.results);
			})
			.catch(err => console.log(err));
	}, [itemDeleted, props.formSubmitted]);

	// axios for tracking logged in user information
	let [loggedInUser, setLoggedInUser] = useState({});
	useEffect(() => {
		axios
			.get('http://localhost:8000/api/users/getloggedinuser', { withCredentials: true })
			.then(res => {
				console.log('res when getting logged in user', res);
				if (res.data.results) {
					//this means the user is logged in and can access this page
					setLoggedInUser(res.data.results);
				}
			})
			.catch(err => {
				//this means someone who is not logged in tried to access the page
				console.log('err when getting logged in user', err);
				navigate('/');
			});
	}, []);

	// axios for logging out a user
	const logout = () => {
		axios
			.get('http://localhost:8000/api/users/logout', { withCredentials: true })
			.then(res => {
				navigate('/');
			})
			.catch(err => {
				console.log('errrr logging out', err);
			});
	};
	// axios for deleting one item
	// const deleteItem = _id => {
	// 	axios
	// 		.delete(`http://localhost:8000/api/items/${_id}`)
	// 		.then(response => {
	// 			setItemDeleted(!itemDeleted);
	// 		})
	// 		.catch(err => console.log(err));
	// };

	let [formErrors, setFormErrors] = useState({});

	const changeHandler = e => {
		if (e.target.type === 'dropdown') {
			setFormInfo({
				...formInfo,
				[e.target.name]: e.target.value,
			});
		}
		if (e.target.type === 'checkbox') {
			setFormInfo({
				...formInfo,
				[e.target.name]: e.target.checked,
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
	const navigate = useNavigate();
	// if there are any errors, then save the errors to a state variable
	// when submitting an incomplete form -> response looks like this: response.data.errors
	// when submitting a complete form -> response looks like this: response.data.results
	const handleSubmit = e => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', formInfo.title);
		formData.append('price', formInfo.price);
		formData.append('description', formInfo.description);
		formData.append('imgUrl', formInfo.imgUrl);
		formData.append('dateAdded', formInfo.dateAdded);
		formData.append('itemCondition', formInfo.itemCondition);
		formData.append('forSale', formInfo.forSale);
		formData.append('photo', formInfo.photo);

		// axios.post('http://localhost:8000/api/items', formData)
		axios({
			method: 'post',
			url: 'http://localhost:8000/api/items',
			data: formData,
		})
			.then(response => {
				console.log('Error response from submission form', response);
				if (response.data.errors) {
					setFormErrors(response.data.errors);
				} else {
					setFormErrors({});
					props.setFormSubmitted(props.formSubmitted);
					navigate('/');
				}
			})
			.catch(err => console.log(err));
	};

	// returning the create form from our Form.js
	return (
		<div>
			<div className='d-grid'>
				<div className='d-grid gap-2 d-md-flex justify-content-between'>
					<h2 className='fw-bold m-3'>Welcome, {loggedInUser.firstName}!</h2>
					<button onClick={logout} className='btn btn-outline-primary shadow m-3'>
						Log Out
					</button>
				</div>
			</div>
			<div>
				<Paper elevation={3} style={styles.paper}>
					<div className='text-center'>
						<h3 className='fw-bold'>Add a Collectible</h3>
					</div>
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
			<hr />
			<div>
				<Paper elevation={3} style={styles.paper}>
					<div>
						<div id='wrapper'>
							<div className='title text-center h1'>Your Collectables</div>
							<div className='module-section clearfix'>
								{/* <button className='btn arrow-guides fa-chevron-left'></button> */}
								<ul id='content'>
									{items.map((item, i) => {
										return (
											<Link to={`/items/${item._id}`}>
												<li key={i} className='carouselCard effect1'>
													<div
														className='inside-top'
														style={{
															backgroundImage: `url(${`http://localhost:8000/${item.photo}`})`,
															backgroundSize: '10em',
															backgroundPosition: 'center',
															backgroundRepeat: 'no-repeat',
															width: '250px',
														}}></div>
													{/* <img src={item.profilePicUrl} height = "100px" width= "100px"/> */}
													<div className='card-body text-center fixed-bottom'>
														<h5 className='card-title'>{item.title}</h5>
														<p className='card-text'>
															Price: ${item.price}
														</p>
													</div>
												</li>
											</Link>
										);
									})}
								</ul>
							</div>
							{/* <button className='btn arrow-guides-right fa-chevron-right'></button> */}
						</div>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default ItemForm;
