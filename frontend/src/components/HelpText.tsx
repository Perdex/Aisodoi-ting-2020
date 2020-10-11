import React from "react";

type Props = {
  text: string;
  disclaimer?: string;
};

const HelpText = ({ text, disclaimer }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "3vh",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "#0F0F0FAA",
          borderRadius: 18,
          paddingTop: "0.5em",
          paddingBottom: "0.5em",
          paddingLeft: "0.7em",
          paddingRight: "0.7em",
          color: "#FEFEFEBB",
          textAlign: "center",
        }}
      >
        {text}
        {disclaimer && (
          <>
            <br /> {disclaimer}
          </>
        )}
      </div>
    </div>
  );
};

export default HelpText;
