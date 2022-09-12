import { NextPage } from 'next'
import React from 'react'
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from 'firebase/auth';
import { useGlobalContext } from '../context';

interface Props {

}

const Login: NextPage = () => {
    const { isAuth, setIsAuth } = useGlobalContext();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {

        })
    }
    return (
        <div className="login">
            <p>Войдите с помощью Google, чтобы продолжить</p>
            <button className='login-btn'>Войдите с Google</button>
        </div>
    )
}

export default Login