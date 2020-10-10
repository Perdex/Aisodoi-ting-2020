import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './map-style';

const AnyReactComponent = ({ text }) => <div style={{color: "white"}}>{text}</div>;


const  App = () => {
  console.log(process.env)
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:  process.env.REACT_APP_GOOGLE_API }}
          defaultCenter={{
            lat: 60.6382379,
            lng: 25.3179172
          }}
          defaultZoom={16}
          options={{styles}} 
          >
          <AnyReactComponent
            // @ts-ignore
            lat={60.6382379}
            lng={25.3179172}
            text="You"
          />
        </GoogleMapReact>
      </div>
    );

}

export default App;