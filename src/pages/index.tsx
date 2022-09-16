import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Features, { Feature, FeatureContent } from "../components/Features";
import Testimonials, { Testimonial } from "../components/Testimonials";

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
  const featureContent: FeatureContent = {
    title: "What's different about Manage?",
    subtitle:
      "Manage provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.",
    features: [
      {
        title: "Track company-wide progress",
        body: "See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again.",
      },
      {
        title: "Advanced built-in reports",
        body: "Set internal delivery estimates and track progress toward company goals. Our customisable dashboard helps you build out the reports you need to keep key stakeholders informed.",
      },
      {
        title: "Everything you need in one place",
        body: "Stop jumping from one service to another to communicate, store files, track tasks and share documents. Manage offers an all-in-one team productivity solution.",
      },
    ],
  };
  const testimonialsContent: Testimonial[] = [
    {
      emphasized: "",
      body: "",
      author: {
        avatar: "",
        name: "",
        position: "",
      },
    },
  ];

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
