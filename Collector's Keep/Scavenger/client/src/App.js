import './App.css';
import { useState } from 'react';
import { Routes, Link, Route } from 'react-router-dom';
import AllItems from './components/ViewAll';
import EditForm from './components/EditForm';
import OneItem from './components/ViewOne';
import PreviewOneItem from './components/ViewOneNotLoggedIn';
import ItemForm from './components/CreateItem';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';

function App() {
	let [formSubmitted, setFormSubmitted] = useState(false);

	return (
		<div className='App container'>
			<NavBar />
			{/* <h1>Scavenger</h1> */}
			<Routes>
				<Route
					exact
					path='/users/login'
					element={
						<>
							<SignIn formSubmitted={formSubmitted}></SignIn>
						</>
					}></Route>
				<Route
					exact
					path='/' //this is where to start when moving the itemform to a new page
					element={
						<>
							<AllItems formSubmitted={formSubmitted}></AllItems>
						</>
					}></Route>
				<Route
					exact
					path='/items/create'
					element={
						<ItemForm
							formSubmitted={formSubmitted}
							setFormSubmitted={setFormSubmitted}></ItemForm>
					}></Route>
				<Route exact path='/items/preview/:_id' element={<PreviewOneItem />}></Route>
				<Route exact path='/items/:_id' element={<OneItem />}></Route>
				<Route exact path='/items/edit/:_id' element={<EditForm />}></Route>
			</Routes>
		</div>
	);
}

export default App;
