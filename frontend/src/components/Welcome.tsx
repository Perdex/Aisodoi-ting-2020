import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onContinue: () => void;
};

const Welcome = ({ onContinue }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#0F0F0FAA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "100%",
          maxWidth: "600",
          marginLeft: 24,
          marginRight: 24,
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.img
          src="logo.png"
          style={{
            width: "45vw",
            maxWidth: 349,
            opacity: 0.4,
          }}
          animate={{
            scale: [1, 1.5, 1.5, 1],
            y: ["35vh", "35vh", "35vh", "10vh"],
            opacity: [0, 1, 1, 1],
          }}
          transition={{
            delay: 0.25,
            duration: 2.5,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 1],
          }}
        ></motion.img>
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 3.0,
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 1],
          }}
          style={{
            marginTop: "10vh",
            color: "#FEFEFEBB",
            textAlign: "center",
            paddingTop: "3em",
            fontSize: 16,
            maxWidth: 600,
          }}
        >
          Welcome to City of Gerlin, Badger.
          <br /> <br />
          We, the Badgers, are here to save the homeland. We are given missions.
          The missions vary from securing territories to delivering and tracking
          physical packages. As your progress, you will unlock more rewarding
          and challenging missions. Good to see that you are joining our forces.
        </motion.div>
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 3.5,
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 1],
          }}
          style={{
            color: "#FEFEFEBB",
            textAlign: "center",
            paddingTop: "1em",
            fontSize: 16,
            maxWidth: 600,
            opacity: 0,
          }}
        >
          Are you ready for your first mission?
        </motion.div>
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 4.5,
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 1],
          }}
          style={{
            marginTop: "1em",
            color: "#FEFEFEBB",
            textAlign: "center",
            fontSize: 16,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <button
            onClick={onContinue}
            style={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderRadius: 16,
              flex: 1,
              paddingLeft: "0.75em",
              paddingRight: "0.75em",
              paddingTop: "0.75em",
              paddingBottom: "0.75em",
              fontSize: 20,
              borderStyle: "solid",
              borderColor: "#FEFEFEBB",
              color: "#FEFEFEBB",
              margin: "1em",
              marginRight: 0,
            }}
          >
            Yeah
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
