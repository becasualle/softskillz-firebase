import React from "react";
import styles from "./Hero.module.scss";
import Button from "../Button";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "../../context";
import { useRouter } from "next/router";

type Props = {
  title: string;
  imgSrc: string;
  subtitle?: string;
  btn1Text?: string;
  btn2Text?: string;
};

const Hero = ({ title, imgSrc, subtitle, btn1Text, btn2Text }: Props) => {
  const { isAuth } = useGlobalContext();
  const router = useRouter();

  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1 className={styles.text__title}>{title}</h1>
        <p className={styles.text__subtitle}>{subtitle}</p>
        <div className={styles.cta}>
          {btn1Text && (
            <Button className={styles.cta__btn}>
              {isAuth ? (
                <Link href="/notes">{btn1Text}</Link>
              ) : (
                <Link href="/login">{btn1Text}</Link>
              )}
            </Button>
          )}
          {btn2Text && (
            <Button className={styles.cta__btn} type="hollow">
              <a href="#"> {btn2Text}</a>
            </Button>
          )}
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src={imgSrc}
          className={styles.image__img}
          width={870}
          height={580}
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
