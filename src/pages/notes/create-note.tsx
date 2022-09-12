import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import styles from './create-note.module.scss'
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../firebase-config';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../context';

interface Props {

}

const createNote: NextPage<Props> = () => {
    const [note, setNote] = useState({ title: "", text: "" });

    const router = useRouter();

    const notesCollectionRef = collection(db, 'notes');

    const { isAuth } = useGlobalContext();

    const createNote = async () => {
        console.log(auth.currentUser);
        await addDoc(notesCollectionRef, { title: note.title, text: note.text, author: { name: auth.currentUser.displayName, id: auth.currentUser.uid, email: auth.currentUser.email } })
        router.push('/notes');
    }

    useEffect(() => {
        if (!isAuth) {
            router.push('/login')
        }
    }, [])
    return (
        <div className={styles.createPostPage}>
            <div className={styles.cpContainer}>
                <h1>Разберите своё состояние</h1>
                <div className={styles.inputGp}>
                    <label htmlFor="title">Заголовок</label>
                    <input type="text" placeholder='Заголовок...' id='title' name='title' onChange={(e) => setNote({ ...note, title: e.target.value })} />
                </div>
                <div className={styles.inputGp}>
                    <label htmlFor="post">Ситуация</label>
                    <textarea placeholder='Ситуация...' id='post' name='post' onChange={(e) => setNote({ ...note, text: e.target.value })} />
                </div>
                <button onClick={createNote}> Сохранить запись </button>
            </div>
        </div>
    )
}

export default createNote