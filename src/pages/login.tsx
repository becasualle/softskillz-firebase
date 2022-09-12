import { NextPage } from 'next'
import { useRouter } from "next/router"
import React from 'react'
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from 'firebase/auth';
import { useGlobalContext } from '../context';

interface Props {

}

const Login: NextPage = () => {
    const { setIsAuth } = useGlobalContext();
    const router = useRouter();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", "true");
            setIsAuth(true);
            router.push('/');
        })
    }
    return (
        <div className="login">
            <p>Войдите с помощью Google, чтобы продолжить</p>
            <button className='login-btn' onClick={signInWithGoogle}>Войдите с Google</button>
        </div>
    )
}

export default Login