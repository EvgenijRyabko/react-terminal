import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Sidebar from '../../components/Sidebar/Sidebar';
import AfishaPage from '../../components/Afisha/Afisha';
import classes from './Home.module.css';

function Home() {
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
}

export default Home;
