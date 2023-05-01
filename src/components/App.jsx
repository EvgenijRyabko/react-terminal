import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import classes from "./App.module.css";

// *Основные цели на данный момент

// ? Компонент LoginForm
// TODO: Реализация авторизации

// ? Компонент AfishaPage
// TODO: Реализовать пагинацию
// ! Пагинация требует возврата всех данных с сервера
// TODO: Рефакторнуть и разбить на подкомпоненты

const App = () => {
	return (
		<div className={classes.app}>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</div>
	);
};

export default App;
