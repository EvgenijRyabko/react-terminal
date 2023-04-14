import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Sidebar.module.css';

const Sidebar = () => {

    return (
        <aside className={classes.sidebar}>
            <ul className={classes.sidebarList}>
                <li>
                    <NavLink to='/afishi'>Афишы</NavLink>
                </li>
                <li>
                    <a href='/'>PDF</a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;