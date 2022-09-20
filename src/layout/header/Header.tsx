import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import { useGlobalContext } from "../../context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useRouter } from "next/router";
import Button from "../../components/Button";

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
          <a>SoftSkillz</a>
        </Link>
      </div>
      <div className={styles.pages}>
        {isAuth && (
          <Link href="/">
            <a className={styles.link}>Главная</a>
          </Link>
        )}
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
      </div>
      {!isAuth ? (
        <Button type="primary">
          <Link href="/login" className={`${styles.auth}`}>
            <a>Войти</a>
          </Link>
        </Button>
      ) : (
        <Button
          onClick={signUserOut}
          className={`${styles.auth}`}
          type="hollow"
        >
          Выйти
        </Button>
      )}
    </nav>
  );
};

export default Header;
