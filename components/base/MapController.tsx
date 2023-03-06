"use client";
import styles from "./mapController.module.css";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../configs/firebase/firebaseConfig";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMemo, useRef, useState } from "react";
import { animateMarker } from "@/utils/animateMarker";

export function MapController() {
  const [position, setPosition] = useState({ lat: 51.4992, lng: -0.1188 });
  const droneMarkerRef = useRef<any>();
  const [mapPosition, setMapPosition] = useState({
    lat: 51.503,
    lng: -0.1,
  });
  const guysHospitalCoordinates = {
    lat: 51.5024498412395,
    lng: -0.08787809742533845,
  };
  const thomasHospitalCoordinates = {
    lat: 51.49920431248376,
    lng: -0.11887389031303706,
  };

  async function watchDronePosition() {
    const querySnapshot = await onSnapshot(
      doc(db, "drones", "FirstDrone"),
      (doc) => {
        const data = doc.data();
        if (data) {
          animateMarker(droneMarkerRef.current, data.position);
        }
      }
    );
  }

  const handleOnLoad = (markerInstance: google.maps.Marker) => {
    droneMarkerRef.current = markerInstance;
    watchDronePosition();
  };

  const staticMapPosition = useMemo(() => mapPosition, [mapPosition]);
  console.log(position);

  return (
    <>
      <GoogleMap
        zoom={14}
        center={staticMapPosition}
        mapContainerClassName={`${styles.mapcontainer}`}
      >
        <MarkerF position={guysHospitalCoordinates} />
        <MarkerF position={thomasHospitalCoordinates} />

        <MarkerF
          onLoad={handleOnLoad}
          position={position}
          icon={{
            url: "/drone.svg",
            fillColor: "#EB00FF",
            scaledSize: new google.maps.Size(60, 60),
          }}
        ></MarkerF>
      </GoogleMap>
    </>
  );
}
