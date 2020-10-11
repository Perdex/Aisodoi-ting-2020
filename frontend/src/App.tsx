import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import styles from "./map-style";
import MissionIcon from "./components/MissionIcon";
import MissionMenu from "./components/MissionMenu";
import MissionFinish from "./components/MissionFinish";
import { useQuery } from "react-query";

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
  const [task, setTask] = useState(null);
  const { data, isLoading } = useQuery("tasks", () =>
    fetch("http://localhost:8000/tasks").then((res) => res.json()),
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
          color="red"
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
    if (appState == AppState.map) {
      setAppState(AppState.mission);
      setTask(tasks[i]);
    } else if (appState == AppState.travel) setAppState(AppState.finish);
  };

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
          onChildClick={onClickMission}
        >
          {icons}
        </GoogleMapReact>
      </div>
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
