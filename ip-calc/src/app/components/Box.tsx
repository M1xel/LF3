import React from "react";

interface BoxProps {
  content: string;
  onclick: () => void;
}

const Box = ({ content, onclick }: BoxProps) => {
  return (
    <div>
      <button onClick={onclick}>{content}</button>
    </div>
  );
};

export default Box;
