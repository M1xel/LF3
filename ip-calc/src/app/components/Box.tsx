import React from "react";

interface BoxProps {
  content: string;
  onclick: () => void;
}

// This is an example for a component (delete before build)

const Box = ({ content, onclick }: BoxProps) => {
  return (
    <div>
      <button onClick={onclick}>{content}</button>
    </div>
  );
};

export default Box;
