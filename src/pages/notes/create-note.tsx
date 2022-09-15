import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import styles from './create-note.module.scss'
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../firebase-config';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../context';
import { Author, PostNote, Note } from '../../features/posts/notesSlice';
import dayjs from 'dayjs';

interface Props {

}

const createNote: NextPage<Props> = () => {
    const [noteContent, setNoteContent] = useState({ title: "", text: "" });

    const router = useRouter();

    const notesCollectionRef = collection(db, 'notes');

    const { isAuth } = useGlobalContext();

    const createNote = async () => {
        const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const author: Author = {
            name: auth.currentUser.displayName, id: auth.currentUser.uid, email: auth.currentUser.email
        }
        const note: PostNote = {
            title: noteContent.title, text: noteContent.text, author, createdAt
        }
        await addDoc(notesCollectionRef, note)
        router.push('/notes');
    }

    useEffect(() => {
        if (!isAuth && !localStorage.getItem('isAuth')) {
            router.push('/login')
        }
    }, [])

    return (
        <div className={styles.createPostPage}>
            <div className={styles.cpContainer}>
                <h1>Разберите своё состояние</h1>
                <div className={styles.inputGp}>
                    <label htmlFor="title">Заголовок</label>
                    <input type="text" placeholder='Заголовок...' id='title' name='title' onChange={(e) => setNoteContent({ ...noteContent, title: e.target.value })} />
                </div>
                <div className={styles.inputGp}>
                    <label htmlFor="post">Ситуация</label>
                    <textarea placeholder='Ситуация...' id='post' name='post' onChange={(e) => setNoteContent({ ...noteContent, text: e.target.value })} />
                </div>
                <button onClick={createNote}> Сохранить запись </button>
            </div>
        </div>
    )
}

export default createNote