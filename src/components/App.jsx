import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';

const App = () => {
	return (
		<div className="flex bg-slate-300 items-center h-screen w-full justify-center">
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</div>
	)
}

export default App;
