import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Sidebar.module.css';

function Sidebar() {
  return (
    <aside className={classes.sidebar}>
      <ul className={classes.sidebarList}>
        <li className={classes.active}>
          <NavLink to="/afishi">Афиши</NavLink>
        </li>
        <li>
          <a href="/">PDF</a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
