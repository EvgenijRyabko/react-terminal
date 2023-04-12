import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';

const App = () => {
  return (
    <div className="text-3xl font-bold underline">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
