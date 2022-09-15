import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import { useGlobalContext } from "../../context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { isAuth, setIsAuth } = useGlobalContext();
  const router = useRouter();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      router.push("/login");
    });
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <a className={styles.link}>Logo</a>
        </Link>
      </div>
      <div className={styles.pages}>
        <Link href="/">
          <a className={styles.link}>Главная</a>
        </Link>
        {isAuth && (
          <Link href="/notes">
            <a className={styles.link}>Записи</a>
          </Link>
        )}
        {isAuth && (
          <Link href="/notes/create-note">
            <a className={styles.link}>Создать</a>
          </Link>
        )}
        <Link href="/articles">
          <a className={styles.link}>Статьи</a>
        </Link>
      </div>
      {!isAuth ? (
        <Link href="/login" className={`${styles.auth} ${styles.link}`}>
          <a className={styles.link}>Войти</a>
        </Link>
      ) : (
        <button
          onClick={signUserOut}
          className={`${styles.auth} ${styles.link}`}
        >
          <a className={styles.link}> Выйти </a>
        </button>
      )}
    </nav>
  );
};

export default Header;
