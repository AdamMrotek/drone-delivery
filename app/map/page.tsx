"use client";

import styles from "./page.module.css";

import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import type { NextPage } from "next";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { JsxElement } from "typescript";

export default function Home() {
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Map />
    </>
  );
}
const animationConfig = {
  duration: 1000,
  // easing: function (x, t, b, c, d) {
  //   // jquery animation: swing (easeOutQuad)
  //   return -c * (t /= d) * (t - 2) + b;
  // },
};
function Map() {
  const [position, setPosition] = useState({ lat: 51.4992, lng: -0.1188 });
  const droneMarkerRef = useRef<JsxElement>(null);
  const [mapPosition, setMapPosition] = useState({
    lat: 51.4992,
    lng: -0.1188,
  });

  function createInterwalPositionChange() {
    setPosition((prevState) => {
      return {
        lng: (prevState.lng = +0.001),
        lat: (prevState.lat = +0.001),
      };
    });
  }
  const staticMapPosition = useMemo(() => mapPosition, [mapPosition]);
  function handleMapClick() {
    setPosition({ lat: position.lat + 0.1, lng: -80.04 });
  }
  console.log(position);
  return (
    <GoogleMap
      zoom={14}
      center={staticMapPosition}
      mapContainerClassName={`${styles.mapcontainer}`}
      onClick={createInterwalPositionChange}
    >
      <MarkerF
        // ref={droneMarkerRef}
        position={position}
        icon={{
          url: "/drone.svg",
          fillColor: "#EB00FF",
          scale: 2,
        }}
      ></MarkerF>
    </GoogleMap>
  );
}
