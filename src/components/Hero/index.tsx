import React from "react";
import styles from "./Hero.module.scss";
import Button from "../Button";
import Image from "next/image";

type Props = {
  title: string;
  imgSrc: string;
  subtitle?: string;
  btn1Text?: string;
  btn2Text?: string;
};

const Hero = ({ title, imgSrc, subtitle, btn1Text, btn2Text }: Props) => {
  return (
    <section className={styles.hero}>
      <div className="text">
        <h1 className="text__title">{title}</h1>
        <p className="text__subtitle">{subtitle}</p>
        {btn1Text && <Button>{btn1Text}</Button>}
        {btn2Text && <Button type="hollow">{btn2Text}</Button>}
      </div>
      <div className="image">
        <Image src={imgSrc} width={870} height={580} priority />
      </div>
    </section>
  );
};

export default Hero;
