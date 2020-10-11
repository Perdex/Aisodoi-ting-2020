import React from "react";

const MissionIcon = ({ $hover, title, color = "blue" }: any) => {
  if (true) {
    const color0 = `${color}55`;
    return (
      <div
        style={{
          fontSize: 12,
          marginTop: -12,
          marginLeft: -12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          style={{
            color: "#fefefeAA",
            marginTop: "-1em",

            marginBottom: "0.05em",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          {title}
        </div>
        <div
          style={{
            backgroundImage: `radial-gradient(${color0}, ${color})`,
            width: 24,
            height: 24,
            borderRadius: 20,
            opacity: 0.7,
          }}
        ></div>
      </div>
    );
  }
  return (
    <>
      <div
        style={{
          backgroundImage: "radial-gradient(#679ae0, #679ae0)",
          width: 24,
          height: 24,
          borderRadius: 20,
          opacity: 0.7,
        }}
      ></div>
      <div
        style={{
          width: 300,
          height: 200,
          backgroundColor: "#0F0F0FAA",
          marginTop: -224,
          marginLeft: 24,
          zIndex: 100,
          borderStyle: "solid",
          borderColor: "#fefefeAA",
          borderWidth: 2,
          borderRadius: 10,
        }}
      ></div>
    </>
  );
};

export default MissionIcon;
