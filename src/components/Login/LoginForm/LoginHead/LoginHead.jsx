import React from "react";
import authLogo from '../../../../assets/authLogo.svg';
import classes from './LoginHead.module.css';

const LoginHead = () => {
    return (
        <div className={ classes.head }>
            <div className={ classes.container }>
                <img src={ authLogo } alt='authLogo.svg' />
                <p>Autorization</p>
            </div>
        </div>
    )
}

export default LoginHead;