"use client";

import styles from "./page.module.css";
import { v9auth } from "../../configs/firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo } from "react";
// Components
import { DroneController } from "@/components/base/DroneController";
import { MapController } from "@/components/base/MapController";

export default function Home() {
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });
  const [user, loading, error] = useAuthState(v9auth);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (user && isLoaded) {
    console.log("LOADING MAP");
    return (
      <>
        <DroneController />
        <MapController />
      </>
    );
  }
}
