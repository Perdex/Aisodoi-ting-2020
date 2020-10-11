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
        left: "50%",
        top: "3vh",
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
  );
};

export default HelpText;
