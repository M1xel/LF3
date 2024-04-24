import React from "react";

interface BoxProps {
  content: string;
}

const Box = ({ content }: BoxProps) => {
  return <div>{content}</div>;
};

export default Box;
