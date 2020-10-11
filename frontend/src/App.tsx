import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import styles from "./map-style";
import MissionIcon from "./components/MissionIcon";
import MissionMenu from "./components/MissionMenu";
import MissionFinish from "./components/MissionFinish";
import Div100vh from "react-div-100vh";

import "./index.css";

const AnyReactComponent = ({ text }) => (
  <div style={{ color: "white" }}>{text}</div>
);

enum AppState {
  menu = 1,
  map = 2,
  mission = 3,
  travel = 4,
  finish = 5,
}

const App = () => {
  const [appState, setAppState] = useState(AppState.map);

  window.onresize = function () {
    // @ts-ignore
    document.body.height = window.innerHeight;
  };

  let icon;

  if (appState === AppState.map) {
    icon = (
      <MissionIcon
        // @ts-ignore
        lat={60.6382379}
        lng={25.3179172}
        title="Mission 1"
      />
    );
  } else if (appState === AppState.travel) {
    icon = (
      <MissionIcon
        // @ts-ignore
        lat={60.6409979}
        lng={25.3148272}
        title="Mark"
        color="red"
      />
    );
  }

  const onClickMission = (i: number) => {
    if (appState === AppState.map) setAppState(AppState.mission);
    else if (appState === AppState.travel) setAppState(AppState.finish);
  };

  return (
    <>
      {/* @ts-ignore */}
      <Div100vh style={{ width: "100%", backgroundColor: "black" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
          defaultCenter={{
            lat: 60.6382379,
            lng: 25.3179172,
          }}
          defaultZoom={15}
          options={{
            styles,
            backgroundColor: "black",
            zoomControl: false,
            fullscreenControl: false,
          }}
          onChildClick={onClickMission}
        >
          {icon}
        </GoogleMapReact>
      </Div100vh>
      {appState === AppState.mission && (
        <MissionMenu
          onDecline={() => setAppState(AppState.map)}
          onAccept={() => setAppState(AppState.travel)}
        />
      )}
      {appState === AppState.finish && (
        <MissionFinish
          onDecline={() => setAppState(AppState.map)}
          onAccept={() => setAppState(AppState.travel)}
        />
      )}
    </>
  );
};

export default App;
