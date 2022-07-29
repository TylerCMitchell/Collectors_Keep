import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const OneItem = () => {
	const { _id } = useParams();
	const [details, setDetails] = useState({});
	const [notFound, setNotFound] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/items/${_id}`)
			.then(response => {
				console.log('response: ', response);
				if (response.data.results) {
					setDetails(response.data.results);
				} else {
					setNotFound(true);
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

	return (
		<div>
			{notFound === true ? (
				<img
					src='https://cdn0.vox-cdn.com/thumbor/Rfj3kPpv3Via8UQyOkMsuX8ARlI=/0x1:290x194/1310x873/cdn0.vox-cdn.com/uploads/chorus_image/image/49790893/tumblr_mqxy6op7Xj1rth2h5o1_400.0.0.gif'
					alt=''
					height='500px'
					width='500'
				/>
			) : (
				<>
					<div className=''>
						<div className='text-center m-3 fw-bold'>
							<h2>Item Details</h2>
						</div>
						<Card sx={{ maxWidth: 545 }}>
							<CardMedia
								component='img'
								height=''
								image={`http://localhost:8000/${details.photo}`}
								alt='action figure'
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='div'>
									{details.title}
								</Typography>
								<hr />
								<Typography gutterBottom variant='h5' component='div'>
									Price: ${details.price}
								</Typography>
								<hr />
								<Typography variant='body2' color='text.secondary'>
									{details.description}
								</Typography>
								<br />
								<Typography variant='body2' color='text.secondary'>
									Date Added: {moment(details.dateAdded).format('MMMM Do, YYYY')}
								</Typography>
								<br />
								<Typography variant='body2' color=''>
									Item Condition: {details.itemCondition}
								</Typography>
								<Typography variant='body2' color=''>
									In Stock: {details.inStock ? 'Yes' : 'Not Available'}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size='small' onClick={deleteItem}>
									Delete
								</Button>
								<Button size='small'>
									<Link
										to={`/items/edit/${details._id}`}
										className='text-decoration-none'>
										Edit Item
									</Link>
								</Button>
							</CardActions>
						</Card>
						{/* <button className='btn btn-danger m-3' onClick={deleteItem}>
							Delete {details.title}
						</button>
						<Link to={`/items/edit/${details._id}`} className='btn btn-warning m-3'>
							Edit {details.title}
						</Link> */}
						<Link to={`/`} className='btn btn-primary m-3'>
							Back
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default OneItem;
