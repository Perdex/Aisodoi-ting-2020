import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import styles from "./map-style";
import MissionIcon from "./components/MissionIcon";
import MissionMenu from "./components/MissionMenu";
import MissionFinish from "./components/MissionFinish";
import Div100vh from "react-div-100vh";
import { useQuery, useMutation } from "react-query";
import "./index.css";
import HelpText from "./components/HelpText";
import Welcome from "./components/Welcome";

enum AppState {
  welcome = 1,
  map = 2,
  mission = 3,
  travel = 4,
  finish = 5,
}

const rarityColors = {
  common: "#fefefe",
  uncommon: "#4ecb25",
  rare: "#3379fc",
  epic: "#923ac7",
  legendary: "#f29717",
};

const App = () => {
  const [appState, setAppState] = useState(AppState.welcome);
  const [task, setTask] = useState(null);
  const [totalXp, setTotalXp] = useState(800);
  const [futureXp, setFutureXp] = useState(250);
  const { data, isLoading } = useQuery(
    "tasks",
    () =>
      fetch(`${process.env.REACT_APP_API_URL}/tasks`).then((res) => res.json()),
    { refetchInterval: 5000 },
  );
  const [deleteMission, {}] = useMutation(({ id }: any) =>
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { method: "DELETE" }),
  );

  const tasks = isLoading ? {} : data.objs;
  // const tasks = isLoading
  //   ? []
  //   : Object.entries<any>(data.objs).map(([id, obj]) => ({ id, ...obj }));

  let icons;

  if (appState === AppState.map) {
    icons = (Object.entries(tasks) as any).map(([id, t]) => {
      const [startLat, startLon] = t.start
        .split(",")
        .map((x) => Number.parseFloat(x));
      return (
        <MissionIcon
          // @ts-ignore
          key={id}
          lat={startLat}
          lng={startLon}
          title={t.name}
          color={rarityColors[t.rarity]}
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
        title="Drop Point"
        color="#65de45"
      />
    );
  }

  const onClickMission = (id: number) => {
    if (appState === AppState.map) {
      setAppState(AppState.mission);
      setFutureXp((20 + Math.round(Math.random() * 25)) * 10);
      setTask({ ...tasks[id], id });
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
          id={task.id}
          xp={futureXp}
          name={task.name}
          onDecline={() => setAppState(AppState.map)}
          onAccept={() => setAppState(AppState.travel)}
        />
      )}
      {appState === AppState.welcome && (
        <Welcome onContinue={() => setAppState(AppState.map)} />
      )}
      {appState === AppState.finish && (
        <MissionFinish
          xp={futureXp}
          totalXp={totalXp}
          onContinue={() => {
            setAppState(AppState.map);
            setTotalXp((futureXp + totalXp) % 1000);
            deleteMission({ id: task.id });
            setTask(null);
          }}
        />
      )}
      {appState === AppState.map && (
        <HelpText
          text="Select your mission"
          disclaimer={"(Alpha Build: GPS not enabled)"}
        />
      )}
      {appState === AppState.travel && (
        <HelpText
          text={"Deliver the package to Drop Point"}
          disclaimer={"(Alpha Build: GPS not enabled)"}
        />
      )}
    </>
  );
};

export default App;
