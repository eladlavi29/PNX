import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { useState, useEffect } from "react";
import RotatedMarker from "./RotatedMarker";
import { Plane } from "../../Icons/Icons";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './Mapkpitz.css';
import { Label } from "@mui/icons-material";
import React from "react";
import config from '../../config.js';

type direction = 1 | -1;

const Mapkpitz = ({mapData}) => {

  
  const [rotationAngle, setRotationAngle] = useState(0);
  const [lat, setLat] = useState(31.58304248898149);
  const [long, setLong] = useState(34.87970835035038);
  

  const handleRotate = () => {
    setRotationAngle((prev) => prev + 21);
  };

  // Modify the icon size to make it bigger
  const customIcon = new L.Icon({
    iconUrl: '/plane.png', // assuming Plane is the path to your icon image
    iconSize: [70, 70], // adjust the size as needed
    iconAnchor: [15, 15], // center the icon on the marker's position
  });


  
  return (
    <>
      <MapContainer 
        zoomControl={false}
        center={[31.58304248898149, 34.87970835035038]}
        zoom={11}
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        <TileLayer url={config.mapServerUrl} />  
        
        {Object.keys(mapData).map(key => (
          <RotatedMarker
            position={[mapData[key].TELE_PP_LAT * (180 / Math.PI), mapData[key].TELE_PP_LONG * (180 / Math.PI)]}
            icon={customIcon} // Use the custom icon
            rotationAngle={mapData[key].TELE_HEADING}
            rotationOrigin="center"
          >
            <Popup>Tail Number: {key}, LAT: {mapData[key].TELE_PP_LAT }, LONG: {mapData[key].TELE_PP_LONG}</Popup>
          </RotatedMarker>
        ))}
      </MapContainer>
    </>
  );
};

export default Mapkpitz;
