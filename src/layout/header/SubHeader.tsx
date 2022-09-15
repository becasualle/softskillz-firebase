import React from "react";
import { NextPage } from "next";

interface Props {
  title?: string;
}

const Subheader: NextPage<Props> = ({ title = "Watch the Latest Lessons" }) => {
  return (
    <div className="subheader">
      <h2 className="subheader__title">{title}</h2>
    </div>
  );
};

export default Subheader;
