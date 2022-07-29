import { orange } from '@mui/material/colors';
import React from 'react';

const NavBar = () => {
	return (
		<div className='navbar navbar-expand-lg navbar-light navColor justify-content-center shadow'>
			<div className='d-flex text-center'>
				<div className='container-fluid'>
					<a className='navbar-brand' href='/'>
						<img
							className='rounded'
							src={process.env.PUBLIC_URL + '/logo.png'}
							alt=''
							style={{ width: '200px', height: '200px' }}
						/>
					</a>

					<div className='collapse navbar-collapse show' id='navbarNavAltMarkup'>
						<div className='navbar-nav'>
							{/* <a className='navbar-brand' href='/'>
								Collector's Keep
							</a> */}
							<a className='nav-link active fw-bold' aria-current='page' href='/'>
								Home
							</a>
							<a className='nav-link active fw-bold' href='/users/login'>
								Login & Registration
							</a>
							<a className='nav-link active fw-bold' href='/items/create'>
								My Collection
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
