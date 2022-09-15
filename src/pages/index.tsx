import type { NextPage } from "next";
import Head from "next/head";
import { title } from "process";
import Hero from "../components/Hero";

const IndexPage: NextPage = () => {
  const heroInfo = {
    title: "Responsive left-aligned hero with image",
    subtitle:
      "Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.",
    btn1Text: "Primary",
    btn2Text: "Default",
    imgSrc:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  };
  return (
    <div>
      <Head>
        <title>Soft Skillz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Main page</h1>
      <Hero
        title={heroInfo.title}
        subtitle={heroInfo.subtitle}
        imgSrc={heroInfo.imgSrc}
        btn1Text={heroInfo.btn1Text}
        btn2Text={heroInfo.btn2Text}
      />
    </div>
  );
};

export default IndexPage;
