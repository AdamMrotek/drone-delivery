"use client";

import styles from "./page.module.css";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { db, app, auth, v9auth } from "../../components/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });
  const [user, loading, error] = useAuthState(v9auth);
  const router = useRouter();
  useEffect(() => {
    console.log("user state in home" + user);
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (user && isLoaded) {
    return (
      <>
        <Map />
      </>
    );
  }
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

  // const [user, loading, error] = useAuthState(v9auth);

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

  function flyDrone(position: { lat: number; lng: number }) {
    console.log(droneMarkerRef.current);
    if (!droneMarkerRef.current) return;
    animateMarkerTo(droneMarkerRef.current, position);
  }

  async function createDrone(newLat: number, newLng: number) {
    try {
      const docRef = await setDoc(doc(db, "drones", "FirstDrone"), {
        id: "FirstDrone",
        position: {
          lat: newLat,
          lng: newLng,
        },
        speed: 12,
      });
      console.log("Document written with ID: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  let desCounter = 0;
  async function dispachDrone() {
    const cityRef = doc(db, "drones", "FirstDrone");
    const destination =
      desCounter % 2 === 0
        ? guysHospitalCoordinates
        : thomasHospitalCoordinates;
    desCounter++;
    setDoc(cityRef, { position: destination }, { merge: true });
  }
  async function watchDronePosition() {
    const querySnapshot = await onSnapshot(
      doc(db, "drones", "FirstDrone"),
      (doc) => {
        const data = doc.data();
        if (data) {
          flyDrone(data.position);
        }
      }
    );
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
      <button
        className="btn p-4 m-4 border-white border-solid border-2"
        onClick={() =>
          createDrone(
            thomasHospitalCoordinates.lat,
            thomasHospitalCoordinates.lng
          )
        }
      >
        Create Drone
      </button>
      <button
        className="btn p-4 m-4 border-white border-solid border-2"
        onClick={() => watchDronePosition()}
      >
        Watch Drone
      </button>
      <button
        className="btn p-4 m-4 border-white border-solid border-2"
        onClick={() => dispachDrone()}
      >
        Dispach Drone
      </button>{" "}
      <button
        className="btn p-4 m-4 border-white border-solid border-2"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
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
