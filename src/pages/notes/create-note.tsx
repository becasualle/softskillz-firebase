import { NextPage } from 'next'
import React from 'react'
import styles from './create-note.module.scss'

interface Props {

}

const createNote: NextPage<Props> = () => {
    return (
        <div className={styles.createPostPage}>
            <div className={styles.cpContainer}>
                <h1>Разберите своё состояние</h1>
                <div className={styles.inputGp}>
                    <label htmlFor="title">Заголовок</label>
                    <input type="text" placeholder='Заголовок...' id='title' name='title' />
                </div>
                <div className={styles.inputGp}>
                    <label htmlFor="post">Ситуация</label>
                    <textarea placeholder='Ситуация...' id='post' name='post' />
                </div>
                <button> Сохранить запись </button>
            </div>
        </div>
    )
}

export default createNote