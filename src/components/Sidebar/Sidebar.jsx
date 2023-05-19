import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import exitIcon from '../../assets/exitIcon.svg';
import classes from './Sidebar.module.css';

const logOut = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/logout');
    return response.data;
  } catch (e) {
    Swal.fire('Error', e?.response?.data.error || 'Произошла непредвиденная ошибка', 'error');
  }
};

function Sidebar({ tab, setTab = (f) => f }) {
  const navigate = useNavigate();
  const cookies = ['auth-token', 'selected-tab'];
  const [, , removeCookie] = useCookies(cookies);

  const onExit = async () => {
    await logOut();

    for (let i = 0; i < cookies.length; i++) removeCookie(cookies[i], { path: '/' });

    navigate('/');
  };

  return (
    <aside className={classes.sidebar}>
      <ul className={classes.sidebarList}>
        <li className={(tab === 1 && classes.active) || ''}>
          <button type="button" onClick={() => setTab(1)}>
            Афиши
          </button>
        </li>
        <li className={(tab === 2 && classes.active) || ''}>
          <button type="button" onClick={() => setTab(2)}>
            PDF
          </button>
        </li>
      </ul>
      <div className={classes.exitImg}>
        <button type="button" onClick={onExit}>
          <img src={exitIcon} alt="Exit" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
