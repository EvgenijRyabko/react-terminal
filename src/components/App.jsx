import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import classes from './App.module.css'

const App = () => {
	return (
		<div className={ classes.app }>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</div>
	)
}

export default App;
