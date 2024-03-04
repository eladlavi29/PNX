import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import RotatedMarker from "./RotatedMarker";
import { Plane } from "../../Icons/Icons";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapkpitz.css";
import { Label } from "@mui/icons-material";
import React from "react";
import config from "../../config.js";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { gql, useQuery } from "@apollo/client";

type direction = 1 | -1;

function KeepLocation({ zoomRef, centerRef }) {
  const eve = useMapEvents({
    moveend: () => {
      zoomRef.current = eve.getZoom();
      centerRef.current = eve.getCenter();
    },
  });
}

const Mapkpitz = ({ mapData, showHeatMap, heatMapData }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [lat, setLat] = useState(31.58304248898149);
  const [long, setLong] = useState(34.87970835035038);
  const zoomRef = useRef(7);
  const centerRef = useRef([31.5, 34.75]);
  // const { error, loading, data } = useQuery(gql``);
  const handleRotate = () => {
    setRotationAngle((prev) => prev + 21);
  };

  // Modify the icon size to make it bigger
  const customIcon = new L.Icon({
    iconUrl: "/plane.png", // assuming Plane is the path to your icon image
    iconSize: [70, 70], // adjust the size as needed
    iconAnchor: [15, 15], // center the icon on the marker's position
  });

  const heatmapOptions = {
    radius: 20,
    blur: 20,
    maxZoom: 18,
  };
  return (
    <>
      <MapContainer
        center={centerRef.current}
        zoom={zoomRef.current}
        key={Math.random()}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
      >
        <TileLayer url={config.mapServerUrl} />
        <KeepLocation zoomRef={zoomRef} centerRef={centerRef} />
        {Object.keys(mapData).map((key) => (
          <RotatedMarker
            key={Math.random()}
            position={[
              mapData[key].TELE_PP_LAT * (180 / Math.PI),
              mapData[key].TELE_PP_LONG * (180 / Math.PI),
            ]}
            icon={customIcon} // Use the custom icon
            rotationAngle={mapData[key].TELE_HEADING}
            rotationOrigin="center"
          >
            <Popup>
              Tail Number: {key}, LAT: {mapData[key].TELE_PP_LAT}, LONG:{" "}
              {mapData[key].TELE_PP_LONG}
            </Popup>
          </RotatedMarker>
        ))}
        {showHeatMap && (
          <HeatmapLayer
            points={heatMapData}
            longitudeExtractor={(point) => (point[1] * 180.0) / Math.PI}
            latitudeExtractor={(point) => (point[0] * 180.0) / Math.PI}
            key={Math.random() + Math.random()}
            intensityExtractor={(point) => point[2]}
            {...heatmapOptions}
          />
        )}
      </MapContainer>
    </>
  );
};

export default Mapkpitz;
