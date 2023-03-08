import { doc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useRef } from "react";
import { db } from "../../configs/firebase/firebaseConfig";
interface Position {
  lat: number;
  lng: number;
}

export function DroneController() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const guysHospitalCoordinates: Position = {
    lat: 51.5024498412395,
    lng: -0.08787809742533845,
  };
  const thomasHospitalCoordinates: Position = {
    lat: 51.49920431248376,
    lng: -0.11887389031303706,
  };
  function getNewPosition(
    pathFraction: number,
    direction: "forward" | "back"
  ): Position {
    const THC = thomasHospitalCoordinates;
    const GHC = guysHospitalCoordinates;
    const currentPosition =
      direction === "forward" ? pathFraction : 1 - pathFraction;
    return {
      lat: THC.lat - (THC.lat - GHC.lat) * currentPosition,
      lng: THC.lng - (THC.lng - GHC.lng) * currentPosition,
    };
  }
  let desCounter = 0;
  const droneAutoController = (
    pathFractions: number,
    signalFrequency: number
  ) => {
    return () => {
      const direction =
        Math.floor(desCounter / pathFractions) % 2 === 0 ? "forward" : "back";
      const currentFraction = (desCounter % pathFractions) / pathFractions;
      const newPosition = getNewPosition(currentFraction, direction);
      dispachDrone(newPosition);
      desCounter++;
    };
  };

  async function dispachDrone(position: Position) {
    const cityRef = doc(db, "drones", "FirstDrone");
    setDoc(cityRef, { position: position }, { merge: true });
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
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const restartDrone = () => {
    const setDrone = droneAutoController(15, 5000);
    console.log(intervalRef);
    if (intervalRef.current) return;
    (intervalRef.current as ReturnType<typeof setInterval> | null) =
      setInterval(() => {
        console.log("NEW INTERVAL");
        setDrone();
      }, 2000);
    const interval = intervalRef.current;
  };
  function stopDrone() {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
  useEffect(() => {
    const setDrone = droneAutoController(15, 5000);
    console.log("Interval Set Up");
    intervalRef.current = setInterval(() => {
      console.log("NEW INTERVAL");
      setDrone();
    }, 2000);
    const interval = intervalRef.current;

    return () => {
      console.log("CLeaning");
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <button
        className="btn py-2 px-4 m-4 border-solid border rounded-2xl hover:bg-slate-800 hover:text-white duration-300"
        onClick={() => {
          stopDrone();
        }}
      >
        Stop drone
      </button>

      <button
        className="btn py-2 px-4 m-4 border-solid border rounded-2xl hover:bg-slate-800 hover:text-white duration-300"
        onClick={() => restartDrone()}
      >
        Restart drone
      </button>
    </div>
  );
}
