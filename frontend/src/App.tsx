import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import { motion } from "framer-motion";
import styles from "./map-style";
import MissionIcon from "./components/MissionIcon";

const AnyReactComponent = ({ text }) => (
  <div style={{ color: "white" }}>{text}</div>
);

enum AppState {
  menu = 1,
  map = 2,
  mission = 3,
}

const App = () => {
  const [appState, setAppState] = useState(AppState.map);

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
          defaultCenter={{
            lat: 60.6382379,
            lng: 25.3179172,
          }}
          defaultZoom={16}
          options={{ styles }}
          onChildClick={(e) => console.log(e)}
        >
          <MissionIcon
            // @ts-ignore
            lat={60.6382379}
            lng={25.3179172}
            text="You"
          />
        </GoogleMapReact>
      </div>
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
              y: ["50vh", "50vh", "50vh", "10vh"],
              opacity: [0, 1, 1, 1],
            }}
            transition={{
              delay: 0.25,
              duration: 2.5,
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 1],
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
              delay: 3.5,
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
            Badger! Your mission, should you choose to accept it, is to
            transport this package to a dead drop. Be discreet, we have reports
            of enemy badgers in the arena.
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
            style={{
              marginTop: "3em",
              color: "#FEFEFEBB",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Estimated Time: 25 minutes
          </motion.div>
          <motion.div
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              delay: 4.25,
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
            Package Weight: ~ 1 kg
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
            }}
          >
            Reward: 300 XP
          </motion.div>
          <motion.img
            src="badger.png"
            style={{
              position: "absolute",
              left: "2vw",
              bottom: 0,
              width: "30vw",
              maxWidth: 349,
              opacity: 0.4
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
    </>
  );
};

export default App;
