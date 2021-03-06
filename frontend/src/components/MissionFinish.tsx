import React from "react";
import { motion } from "framer-motion";

type Props = {
  xp: number;
  totalXp: number;
  onContinue: () => void;
};

const MissionFinish = ({ onContinue, xp, totalXp }: Props) => {
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
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 1],
          }}
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <div style={{ color: "#FEFEFEBB", fontSize: 40 }}>SUCCESS</div>
          <div
            style={{ color: "#FEFEFEBB", fontSize: 18, textAlign: "center" }}
          >
            + {xp} XP
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
          Badger! You have succesfully transported the package.
        </motion.div>
        {xp + totalXp >= 1000 && (
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
              marginTop: "2em",
              textAlign: "center",
              color: "#FEFEFEBB",
              fontSize: 22,
            }}
          >
            Level Up
          </motion.div>
        )}
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 2.75,
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 1],
          }}
          style={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderRadius: 16,
            width: 300,
            padding: 3,
            height: "2em",
            borderStyle: "solid",
            borderColor: "#FEFEFEBB",
            margin: "1em",
          }}
        >
          <motion.div
            animate={{
              width: [
                `${Math.min(100, totalXp / 10)}%`,
                `${Math.min(100, (totalXp + xp) / 10)}%`,
              ],
            }}
            transition={{
              delay: 3,
              duration: 1,
              ease: "easeInOut",
              times: [0, 1],
            }}
            style={{
              height: "100%",
              borderRadius: 16,
              backgroundColor: "#FEFEFEBB",
              width: "20%",
            }}
          ></motion.div>
        </motion.div>
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 4,
            duration: 0.5,
            ease: "easeInOut",
            times: [0, 1],
          }}
        >
          <button
            onClick={onContinue}
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
              marginTop: "1.5em",
            }}
          >
            Continue
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

export default MissionFinish;
