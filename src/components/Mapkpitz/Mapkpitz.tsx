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
import { Key, Label } from "@mui/icons-material";
import React from "react";
import config from "../../config.js";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { gql, useQuery } from "@apollo/client";
import { Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

type direction = 1 | -1;
const path = [
  [31.5, 34.75],
  [31.55, 34.85],
  [31.65, 34.65],
  [31.85, 34.95],
];
function KeepLocation({ zoomRef, centerRef }) {
  const eve = useMapEvents({
    moveend: () => {
      zoomRef.current = eve.getZoom();
      centerRef.current = eve.getCenter();
    },
  });
}

const Mapkpitz = ({
  mapData,
  showHeatMap,
  heatMapData,
  showMarkerMap,
  markerMapData,
  gqlClient,
  showPaths,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [lat, setLat] = useState(31.58304248898149);
  const [long, setLong] = useState(34.87970835035038);
  const zoomRef = useRef(7);
  const centerRef = useRef([31.5, 34.75]);
  const [paths, setPaths] = useState({});
  // Modify the icon size to make it bigger
  const uavIcon = new L.Icon({
    iconUrl: "/uav.png", // assuming Plane is the path to your icon image
    iconSize: [60, 60], // adjust the size as needed
    iconAnchor: [30, 30], // center the icon on the marker's position
  });

  const markerIcon = new L.Icon({
    iconUrl: "/location_pin.png", // assuming Plane is the path to your icon image
    iconSize: [60, 60], // adjust the size as needed
    iconAnchor: [30, 30], // center the icon on the marker's position
  });

  const heatmapOptions = {
    radius: 20,
    blur: 20,
    maxZoom: 18,
  };
  async function find_path(fid: any) {
    const { data, error } = await gqlClient.query({
      query: gql`
        query {
          marker_map(
            query: "select degrees(tele_pp_lat) as lat,degrees(tele_pp_long) as lon from fast_params where fid=${fid} and tele_pp_lat!=0 and tele_pp_long!=0  and packet % 500 = 0"
          ) {
            lat
            lon
          }
        }
      `,
      // query: gql`
      //     query{
      //         row_by_time(fid: ${fid}, time: "${format(time, 'yyyy-MM-dd HH:mm:ss')}") {
      //             params(names: [${mod_params.map(param => {return '"' + param + '"'})}]) {
      //                 name
      //                 value
      //             }
      //         }
      //     }`
    });
    if (error) {
      console.log("Error fetching data:", error);
      return;
    }
    if (data && data["marker_map"]) {
      console.log("OMER2", data["marker_map"]);
      setPaths((prevPaths) => ({
        ...prevPaths,
        [`${fid}`]: data["marker_map"].map((point) => [point.lat, point.lon]),
      }));
    }
  }

  useEffect(() => {
    var newPaths = {};
    setPaths({}); //need to optimize
    for (const key in mapData) {
      var x = find_path(key);
      console.log("OMER", x);
      // console.log("OMER", x.marker_map);
    }
  }, [mapData]);

  return (
    <>
      <MapContainer
        center={centerRef.current}
        zoom={zoomRef.current}
        key={1}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
      >
        <TileLayer url={config.mapServerUrl} />
        <KeepLocation zoomRef={zoomRef} centerRef={centerRef} />

        {showPaths &&
          Object.keys(paths).map((key) => (
            <Polyline positions={paths[key]} color="#00008B" />
          ))}
        {/* <RotatedMarker
          key={Math.random()}
          position={[
            mapData[1].tele_pp_lat * (180 / Math.PI),
            mapData[1].tele_pp_long * (180 / Math.PI),
          ]}
          icon={customIcon} // Use the custom icon
          rotationAngle={mapData[1].tele_heading}
          rotationOrigin="center"
        >
          <Popup>
            Tail Number: {1}, LAT: {mapData[1].tele_pp_lat}, LONG:{" "}
            {mapData[1].tele_pp_long}
          </Popup>
        </RotatedMarker> */}

        {Object.keys(mapData).map((key) => (
          <RotatedMarker
            key={key}
            position={[
              mapData[key].tele_pp_lat * (180 / Math.PI),
              mapData[key].tele_pp_long * (180 / Math.PI),
            ]}
            icon={uavIcon} // Use the custom icon
            rotationAngle={mapData[key].tele_heading}
            rotationOrigin="center"
          >
            <Popup>
              fid: {key} | altitude: {mapData[key].tele_altitude}ft
            </Popup>
          </RotatedMarker>
        ))}
        {showHeatMap && (
          <HeatmapLayer
            points={heatMapData}
            longitudeExtractor={(point) => (point[1] * 180.0) / Math.PI}
            latitudeExtractor={(point) => (point[0] * 180.0) / Math.PI}
            key={Math.random() + Math.random()} //nizan: why is this needed?
            intensityExtractor={(point) => point[2]}
            {...heatmapOptions}
          />
        )}
        {showMarkerMap &&
          markerMapData.map((type, idx) => {
            const markerIcon = new L.Icon({
              iconUrl: `/location_pins/location-pin(${(idx * 4) % 17}).png`, // assuming Plane is the path to your icon image
              iconSize: [60, 60], // adjust the size as needed
              iconAnchor: [30, 30], // center the icon on the marker's position
            });
            return type.map((point) => {
              return (
                <Marker
                  key={Math.random() + Math.random()}
                  position={[
                    point.lat * (180 / Math.PI),
                    point.lon * (180 / Math.PI),
                  ]}
                  icon={markerIcon} // Use the custom icon
                >
                  <Popup>{point.content}</Popup>
                </Marker>
              );
            });
          })}
      </MapContainer>
    </>
  );
};

export default Mapkpitz;
