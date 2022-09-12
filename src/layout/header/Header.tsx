import React from 'react'
import Link from 'next/link'
import styles from "./Header.module.scss"

const Header: React.FC = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Link href="/" >
                    <a className={styles.link}>Logo</a>
                </Link>
            </div>
            <div className={styles.pages}>
                <Link href="/" >
                    <a className={styles.link}>Главная</a>
                </Link>
                <Link href="/notes" ><a className={styles.link}>Записи</a></Link>
                <Link href="/articles" ><a className={styles.link}>Статьи</a></Link>
            </div>
            <Link href="/login" className={`${styles.auth} ${styles.link}`}><a className={styles.link}>Войти</a></Link>
        </nav >
    )
}

export default Header