import React from "react";
import styled from "styled-components";
import styles from "./all.module.css";

const MissionIcon = ({ $hover, title, color = "blue" }: any) => {
  if (true) {
    return (
      <div>
         <div
          style={{
            color: "#fefefeAA",
            marginTop: "1em",
            marginLeft: "-4em",
            fontSize: 12,
            width: "8em",
            marginBottom: 3,
            whiteSpace: "nowrap",
            textAlign: "center"
          }}
        >{title}</div> 
        <div
          style={{
            backgroundImage: color === "blue" ? "radial-gradient(#679ae055, #679ae0)" : "radial-gradient(#dbc74655, #dbc746)",
            marginLeft: -12,
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
