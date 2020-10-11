import React from "react";
import { motion } from "framer-motion";


type Props = {
  xp: number
  onAccept: () => void;
  onDecline: () => void;
};

const MissionMenu = ({ onAccept, onDecline, xp }: Props) => {
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
        <motion.div
          animate={{
            scale: [1, 1.5, 1.5, 1],
            y: ["35vh", "35vh", "35vh", "10vh"],
            opacity: [0, 1, 1, 1],
          }}
          transition={{
            delay: 0.25,
            duration: 1.75,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 1],
          }}
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <div style={{ color: "#FEFEFEBB", fontSize: 40 }}>MISSION</div>
          <div
            style={{ color: "#FEFEFEBB", fontSize: 18, textAlign: "center" }}
          >
            INSOMNIAC
          </div>
        </motion.div>
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 2.5,
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
          Badger! Your mission, should you choose to accept it, is to transport
          this package to a dead drop. Be discreet, we have reports of enemy
          badgers in the arena.
        </motion.div>
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 3,
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 1],
          }}
          style={{
            marginTop: "3em",
            color: "#FEFEFEBB",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Estimated Time: {Math.floor((10 + Math.random()*25))} minutes
        </motion.div>
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 3.25,
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 1],
          }}
          style={{
            marginTop: "1em",
            color: "#FEFEFEBB",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Package Weight: ~ {0.5 + Math.floor((1 + Math.random()*2)) + Math.round(Math.random())/2} kg
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
            marginTop: "1em",
            color: "#FEFEFEBB",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Reward: {xp} XP
        </motion.div>
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 5,
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
            onClick={onDecline}
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
            Decline
          </button>
          <button
            onClick={onAccept}
            style={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderRadius: 16,
              paddingLeft: "0.75em",
              paddingRight: "0.57em",
              paddingTop: "0.75em",
              paddingBottom: "0.75em",
              fontSize: 20,
              borderStyle: "solid",
              borderColor: "#FEFEFEBB",
              color: "#FEFEFEBB",
              margin: "1em",
            }}
          >
            Accept
          </button>
        </motion.div>
        <motion.img
          src="badger.png"
          style={{
            position: "absolute",
            left: "2vw",
            bottom: 0,
            width: "30vw",
            maxWidth: 349,
            opacity: 0.4,
          }}
          animate={{
            opacity: [0, 0.4],
          }}
          transition={{
            delay: 0,
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 1],
          }}
        ></motion.img>
      </div>
    </div>
  );
};

export default MissionMenu;
