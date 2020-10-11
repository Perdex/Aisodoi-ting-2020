import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import styles from "./map-style";
import MissionIcon from "./components/MissionIcon";
import MissionMenu from "./components/MissionMenu";
import MissionFinish from "./components/MissionFinish";
import Div100vh from "react-div-100vh";
import { useQuery } from "react-query";
import "./index.css";

enum AppState {
  menu = 1,
  map = 2,
  mission = 3,
  travel = 4,
  finish = 5,
}

const App = () => {
  const [appState, setAppState] = useState(AppState.map);
  const [task, setTask] = useState(null);
  const [totalXp, setTotalXp] = useState(800);
  const [futureXp, setFutureXp] = useState(250);
  const { data, isLoading } = useQuery("tasks", () =>
    fetch(`${process.env.REACT_APP_API_URL}/tasks`).then((res) => res.json()),
  );

  const tasks = isLoading
    ? []
    : Object.entries<any>(data.objs).map(([id, obj]) => ({ id, ...obj }));

  let icons;

  if (appState === AppState.map) {
    icons = tasks.map((t) => {
      const [startLat, startLon] = t.start
        .split(",")
        .map((x) => Number.parseFloat(x));
      return (
        <MissionIcon
          // @ts-ignore
          key={t.id}
          lat={startLat}
          lng={startLon}
          title={t.name}
          color="blue"
        />
      );
    });
  } else if (appState === AppState.travel) {
    const [lat, lon] = task.destination
      .split(",")
      .map((x) => Number.parseFloat(x));
    icons = (
      <MissionIcon
        // @ts-ignore
        lat={lat}
        lng={lon}
        title="Mark"
        color="red"
      />
    );
  }

  const onClickMission = (i: number) => {
    if (appState === AppState.map) {
      setAppState(AppState.mission);
      setFutureXp((20 + Math.round(Math.random() * 25)) * 10);
      setTask(tasks[i]);
    } else if (appState === AppState.travel) {
      setAppState(AppState.finish);
    }
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
          {icons}
        </GoogleMapReact>
      </Div100vh>
      {appState === AppState.mission && (
        <MissionMenu
          xp={futureXp}
          onDecline={() => setAppState(AppState.map)}
          onAccept={() => setAppState(AppState.travel)}
        />
      )}
      {appState === AppState.finish && (
        <MissionFinish
          xp={futureXp}
          totalXp={totalXp}
          onContinue={() => { 
            setAppState(AppState.map);
            setTotalXp((futureXp + totalXp)%1000);}}
        />
      )}
    </>
  );
};

export default App;
