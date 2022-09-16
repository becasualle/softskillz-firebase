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
  color: string;
}

type Props = React.PropsWithChildren<{ testimonials: Testimonial[] }>;

const Testimonials = ({ testimonials }: Props) => {
  const getTestimonialClasses = (color: string) => {
    return [
      styles["testimonial"],
      color === "green" && styles["testimonial--bg-green"],
      color === "yellow" && styles["testimonial--bg-yellow"],
      color === "purple" && styles["testimonial--bg-purple"],
      color === "blue" && styles["testimonial--bg-blue"],
    ]
      .filter((e) => e)
      .join(" ");
  };

  return (
    <section className={styles["testimonial-page"]}>
      <h2 className={styles["testimonial-page__title"]}>
        What's Different About Manage?
      </h2>
      <div className={styles.testimonials}>
        {testimonials.map((testimonial) => {
          const testimonialClasses = getTestimonialClasses(testimonial.color);
          const { author, emphasized, body } = testimonial;

          return (
            <div className={testimonialClasses} key={testimonial.body}>
              <header className={styles.testimonial__header}>
                <img
                  src={author.avatar}
                  className={styles.testimonial__img}
                  alt="author avatar"
                />
                <div>
                  <h3>{author.name}</h3>
                  <p>{author.position}</p>
                </div>
              </header>
              <p className={styles.testimonial__lead}>{emphasized}</p>
              <p className={styles.testimonial__quote}>{body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
