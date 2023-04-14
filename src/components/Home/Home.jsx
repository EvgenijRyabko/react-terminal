import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import { Helmet, HelmetProvider } from "react-helmet-async";
import classes from './Home.module.css';

const Home = () => {
    return (
        <div className={classes.homeContainer}>
            <Sidebar />
            <Content />
            <HelmetProvider>
                <Helmet title="Главная"/>
            </HelmetProvider>
        </div>
    )
}

export default Home;