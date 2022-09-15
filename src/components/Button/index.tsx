import React from "react";
import styles from "./Button.module.scss";

type Props = React.PropsWithChildren<{
  type?: "default" | "hollow" | "disabled" | "danger";
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

export const Button: React.FC<Props> = ({ children, type }) => {
  const btnClasses = [
    styles["button"],
    type === "hollow" && styles["button--hollow"],
    type === "disabled" && styles["button--disabled"],
    type === "danger" && styles["button--danger"],
  ]
    .filter((e) => e)
    .join(" ");

  return <button className={btnClasses}>{children}</button>;
};

Button.defaultProps = {
  type: "default",
};

export default Button;
