import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import Upload from "./Upload/Upload";
import { Helmet, HelmetProvider } from "react-helmet-async";
import classes from './Home.module.css';
import { useState } from "react";

const Home = () => {
    const [terminal, setTerminal] = useState();

    return (
        <div className={classes.homeContainer}>
            <Sidebar />
            <div>
                <Upload setTerminal={setTerminal} terminalId={terminal}/>
                <Content terminalId={terminal}/>
            </div>
            <HelmetProvider>
                <Helmet title="Главная"/>
            </HelmetProvider>
        </div>
    )
}

export default Home;