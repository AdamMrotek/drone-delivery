"use client";

import styles from "./page.module.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../components/firebaseConig";

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
  easing: function (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ): number {
    // jquery animation: swing (easeOutQuad)
    return -c * (t /= d) * (t - 2) + b;
  },
};
function Map() {
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

  const pathFroThomasToGuys = {
    lat: thomasHospitalCoordinates.lat - guysHospitalCoordinates.lat,
    lng: thomasHospitalCoordinates.lng - guysHospitalCoordinates.lng,
  };

  function dispachDrone() {
    console.log(droneMarkerRef.current);
    if (!droneMarkerRef.current) return;
    animateMarkerTo(droneMarkerRef.current, { lat: 51.51, lng: -0.121 });
  }

  async function createDrone(newLat: number, newLng: number) {
    try {
      const docRef = await addDoc(collection(db, "drones"), {
        id: "FirstDrone",
        position: {
          lat: newLat,
          lng: newLng,
        },
        speed: 12,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function watchDronePosition() {
    const querySnapshot = await getDocs(collection(db, "drones"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  function animateMarkerTo(
    marker: any,
    newPosition: { lat: number; lng: number }
  ) {
    marker.AT_startPosition_lat = marker.getPosition().lat();
    marker.AT_startPosition_lng = marker.getPosition().lng();
    const { lat, lng } = newPosition;

    const animateStep = function (marker: any, startTime: number) {
      let ellapsedTime: number = Date.now() - startTime;
      console.log(ellapsedTime);
      let durationRatio = ellapsedTime / animationConfig.duration; // 0 - 1
      let easingDurationRatio = animationConfig.easing(
        durationRatio,
        ellapsedTime,
        0,
        1,
        animationConfig.duration
      );

      if (durationRatio < 1) {
        marker.setPosition({
          lat:
            marker.AT_startPosition_lat +
            (lat - marker.AT_startPosition_lat) * easingDurationRatio,
          lng:
            marker.AT_startPosition_lng +
            (lng - marker.AT_startPosition_lng) * easingDurationRatio,
        });
        marker.AT_animationHandler = setTimeout(function () {
          animateStep(marker, startTime);
        }, 17);
      } else {
        marker.setPosition(newPosition);
      }
    };

    animateStep(marker, Date.now());
  }

  const handleOnLoad = (markerInstance: unknown) => {
    droneMarkerRef.current = markerInstance;
  };

  const staticMapPosition = useMemo(() => mapPosition, [mapPosition]);
  console.log(position);
  return (
    <>
      <GoogleMap
        zoom={14}
        center={staticMapPosition}
        mapContainerClassName={`${styles.mapcontainer}`}
        onClick={dispachDrone}
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
