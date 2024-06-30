import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import RotatedMarker from "./RotatedMarker";
import { Plane } from "../../Icons/Icons";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import "./Mapkpitz.css";
import { Key, Label } from "@mui/icons-material";
import React from "react";
import config from "../../config.js";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { gql, useQuery } from "@apollo/client";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import antenas_json from "../../antenas_config.json";

type direction = 1 | -1;
const colors = [
  "#2C3E50", // Midnight Blue
  "#8E44AD", // Wisteria
  "#2980B9", // Seaside Blue
  "#16A085", // Green Sea
  "#27AE60", // Emerald
  "#F39C12", // Orange
  "#D35400", // Pumpkin
  "#C0392B", // Pomegranate
  "#7F8C8D", // Asbestos
  "#BDC3C7", // Silver
  "#34495E", // Wet Asphalt
  "#9B59B6", // Amethyst
  "#3498DB", // Peter River
  "#1ABC9C", // Turquoise
  "#2ECC71", // Nephritis
  "#F1C40F", // Sunflower
  "#E67E22", // Carrot
  "#E74C3C", // Alizarin
  "#95A5A6", // Concrete
  "#ECF0F1", // Clouds
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

  const connection_color = (param) => {
    switch (true) {
      case param >= 0 && param < 10:
        return "green";
      case param >= 10 && param < 20:
        return "red";
      default:
        return "blue";
    }
  };

  const undefined_to_number = (param) => {
    if (param === undefined) {
      return 0;
    }
    return param;
  };

  // Modify the icon size to make it bigger
  const uavIcon = new L.Icon({
    iconUrl: "/uav.png", // assuming Plane is the path to your icon image
    iconSize: [60, 60], // adjust the size as needed
    iconAnchor: [30, 30], // center the icon on the marker's position
  });

  const antenaIcon = new L.Icon({
    iconUrl: "/antena.png", // assuming Plane is the path to your icon image
    iconSize: [30, 30], // adjust the size as needed
    iconAnchor: [15, 15], // center the icon on the marker's position
  });

  const antenas = JSON.parse(JSON.stringify(antenas_json));
  // console.log("kaki", antenas["2"]);
  // console.log(typeof antenas);
  // console.log(mapData);

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
    const previousKeys = new Set(Object.keys(paths));
    const savedPaths = paths;
    setPaths({});
    for (const key in mapData) {
      if (!previousKeys.has(key)) {
        find_path(key);
      } else {
        setPaths((prevPaths) => ({
          ...prevPaths,
          [`${key}`]: savedPaths[key],
        }));
      }
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
          Object.keys(paths).map((key, index) => (
            <Polyline
              key={key}
              positions={paths[key]}
              color={colors[index % colors.length]}
            />
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

        {/* showing planes: */}
        {Object.keys(mapData).map((key) => {
          console.log("tele_heading:", mapData[key].tele_heading);
          try {
            console.log(
              "antena:",
              antenas[
                undefined_to_number(Math.trunc(mapData[key].tele_heading / 100))
              ]
            );
          } catch (e) {
            console.log("error! ", mapData[key].tele_heading);
          }

          return (
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
                fid: {key} | altitude: {mapData[key].tele_altitude}ft, antena:
                {Math.floor(mapData[key].tele_heading / 100)}
              </Popup>
              <Polyline
                pathOptions={{
                  color: connection_color(mapData[key].tele_altitude % 50),
                }}
                positions={[
                  [
                    mapData[key].tele_pp_lat * (180 / Math.PI),
                    mapData[key].tele_pp_long * (180 / Math.PI),
                  ],
                  [
                    antenas[
                      Math.floor(
                        undefined_to_number(mapData[key].tele_heading / 100)
                      )
                    ].lat,
                    antenas[
                      Math.floor(
                        undefined_to_number(mapData[key].tele_heading / 100)
                      )
                    ].long,
                  ],
                ]}
              />
            </RotatedMarker>
          );
        })}

        {/* showing heatmap: */}
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

        {/* showing markers: */}
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

        {/* showing antenas: */}
        {Object.keys(antenas).map((key) => (
          <Marker
            key={Math.random() + Math.random()}
            position={[antenas[key].lat, antenas[key].long]}
            icon={antenaIcon} // Use the custom icon
          >
            <Popup>
              Antena: {key}, LAT: {antenas[key].lat}, LONG: {antenas[key].long}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Mapkpitz;
