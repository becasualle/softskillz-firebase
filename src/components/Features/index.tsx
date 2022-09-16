import { features } from "process";
import React from "react";
import styles from "./Features.module.scss";

export interface Feature {
  title: string;
  body: string;
}
export interface FeatureContent {
  title: string;
  subtitle: string;
  features: Feature[];
}

type Props = React.PropsWithChildren<{
  featureContent: FeatureContent;
}>;

const Features = ({ featureContent, featureContent: { features } }: Props) => {
  const renderedFeatures = features.map((feature, index) => (
    <div className={styles.item} key={index}>
      <div className={styles["item-heading"]}>
        <div className={styles["item-heading-number"]}>
          <div className={styles["item-heading-number__numbox"]}>
            0{index + 1}
          </div>
          <h3 className={styles["item-heading-number__title"]}>
            {feature.title}
          </h3>
        </div>
      </div>
      <div className={styles["item-content"]}>
        <h3 className={styles["item-content__title"]}>{feature.title}</h3>
        <p className={styles["item-content__para"]}>{feature.body}</p>
      </div>
    </div>
  ));

  return (
    <section className={styles.features}>
      <div className={styles.description}>
        <h2 className={styles.description__title}>{featureContent.title}</h2>
        <p className={styles.description__subtitle}>
          {featureContent.subtitle}
        </p>
      </div>
      <div className={styles.list}>{renderedFeatures}</div>
    </section>
  );
};

export default Features;
