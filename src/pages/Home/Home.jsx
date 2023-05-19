import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Sidebar from '../../components/Sidebar/Sidebar';
import AfishaPage from '../../components/Afisha/Afisha';
import PDF from '../../components/PDF/PDF';
import classes from './Home.module.css';

function Home() {
  const [terminal, setTerminal] = useState();
  const [tab, setTab] = useState(1);

  return (
    <div className={classes.homeContainer}>
      <Sidebar tab={tab} setTab={setTab} />
      {tab === 1 && <AfishaPage terminalId={terminal} setTerminal={setTerminal} />}
      {tab === 2 && <PDF terminalId={terminal} setTerminal={setTerminal} />}
      <HelmetProvider>
        <Helmet title="Главная" />
      </HelmetProvider>
    </div>
  );
}

export default Home;
