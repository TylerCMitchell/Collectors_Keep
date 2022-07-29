/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
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

const AllItems = props => {
	let [items, setItems] = useState([]);
	let [itemDeleted, setItemDeleted] = useState(false);

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/items')
			.then(response => {
				console.log('response: ', response);
				setItems(response.data.results);
			})
			.catch(err => console.log(err));
	}, [itemDeleted, props.formSubmitted]);

	// const deleteItem = _id => {
	// 	axios
	// 		.delete(`http://localhost:8000/api/items/${_id}`)
	// 		.then(response => {
	// 			setItemDeleted(!itemDeleted);
	// 		})
	// 		.catch(err => console.log(err));
	// };

	return (
		<div>
			<div className='d-grid'></div>
			<Paper elevation={3} style={styles.paper}>
				<div
					style={{
						backgroundImage: `url(${process.env.PUBLIC_URL + '/toys.jpeg'})`,
						backgroundSize: 'cover',

						width: 'auto',
					}}>
					<div id='wrapper'>
						<div className='title text-center h1'>Recent Listings</div>

						<div className='module-section clearfix'>
							<ul id='content'>
								{items.map((item, i) => {
									return (
										<Link to={`/items/preview/${item._id}`}>
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
					</div>
				</div>
			</Paper>
		</div>
	);
};

export default AllItems;
