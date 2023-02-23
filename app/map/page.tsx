"use client";

import styles from "./page.module.css";

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useMemo, useRef, useState } from "react";

export default function Home() {
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return <Map />;
}
function Map() {
  const [position, setPosition] = useState({ lat: 44, lng: -80 });
  const markerRef = useRef(null);
  function handleMapClick() {
    setPosition({ lat: position.lat + 0.001, lng: -80.04 });
  }

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      mapContainerClassName={`${styles.mapcontainer}`}
      onClick={handleMapClick}
    >
      <MarkerF position={position}></MarkerF>
    </GoogleMap>
  );
}
