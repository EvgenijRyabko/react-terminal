import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import AfishaPage from "./AfishaPage";
import { Helmet, HelmetProvider } from "react-helmet-async";
import classes from "./Home.module.css";

const Home = () => {
	const [terminal, setTerminal] = useState();

	return (
		<div className={classes.homeContainer}>
			<Sidebar />
			<div className="min-w-full">
				<AfishaPage terminalId={terminal} setTerminal={setTerminal} />
			</div>
			<HelmetProvider>
				<Helmet title="Главная" />
			</HelmetProvider>
		</div>
	);
};

export default Home;
