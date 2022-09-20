import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import { heroInfo, featureContent, testimonialsContent } from "../features/posts/data";

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Soft Skillz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero
        title={heroInfo.title}
        subtitle={heroInfo.subtitle}
        imgSrc={heroInfo.imgSrc}
        btn1Text={heroInfo.btn1Text}
        btn2Text={heroInfo.btn2Text}
      />
      <Features featureContent={featureContent} />
      <Testimonials testimonials={testimonialsContent} />
    </div>
  );
};

export default IndexPage;
