import { doc, setDoc } from "firebase/firestore";
import { useCallback, useEffect } from "react";
import { db } from "../firebaseConfig";
interface Position {
  lat: number;
  lng: number;
}
export function DroneController() {
  const guysHospitalCoordinates: Position = {
    lat: 51.5024498412395,
    lng: -0.08787809742533845,
  };
  const thomasHospitalCoordinates: Position = {
    lat: 51.49920431248376,
    lng: -0.11887389031303706,
  };

  const droneAutoController = useCallback(
    (pathFractions: number, signalFrequency: number) => {
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
      const positionInterval = setInterval(() => {
        const direction =
          Math.floor(desCounter / pathFractions) % 2 === 0 ? "forward" : "back";
        const currentFraction = (desCounter % pathFractions) / pathFractions;
        const newPosition = getNewPosition(currentFraction, direction);
        dispachDrone(newPosition);
        desCounter++;
      }, signalFrequency);
      return () => clearInterval(positionInterval);
    },
    [guysHospitalCoordinates, thomasHospitalCoordinates]
  );

  let desCounter = 0;
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
  useEffect(() => {
    const cleanInterval = droneAutoController(15, 5000);

    return () => {
      cleanInterval();
    };
  }, [droneAutoController]);

  return (
    <div>
      <button
        className="btn py-2 px-4 m-4 border-solid border rounded-2xl hover:bg-slate-800 hover:text-white duration-300"
        onClick={() => droneAutoController(10, 3000)}
      >
        Dispach Drone
      </button>
      <button
        className="btn py-2 px-4 m-4 border-solid border rounded-2xl hover:bg-slate-800 hover:text-white duration-300"
        onClick={() =>
          createDrone(
            thomasHospitalCoordinates.lat,
            thomasHospitalCoordinates.lng
          )
        }
      >
        Create Drone
      </button>
    </div>
  );
}
