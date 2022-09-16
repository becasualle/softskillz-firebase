import React from "react";
import styles from "./Testimonials.module.scss";

export interface TestimonialAuthor {
  avatar: string;
  name: string;
  position: string;
}

export interface Testimonial {
  author: TestimonialAuthor;
  emphasized: string;
  body: string;
}

type Props = React.PropsWithChildren<{ testimonials: Testimonial[] }>;

const Testimonials = (props: Props) => {
  return (
    <section className={styles.testimonials}>
      <h1>What's Different About Manage?</h1>
    </section>
  );
};

export default Testimonials;
