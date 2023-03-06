"use client";
import styles from "./page.module.css";
import { Inter } from "@next/font/google";
import { auth, v9auth } from "../../components/firebaseConfig";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// Components
import StyledFirebaseAuth from "../../components/base/StyledFirebaseAuth";
import DroneAnimation from "../../components/base/DroneAnimatedSvg";

const inter = Inter({ subsets: ["latin"] });

const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function () {
      return false;
    },
  },
};

useAuthState;

export default function Home() {
  const [user, loading, error] = useAuthState(v9auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/map");
    }
  }, [user, router]);
  if (loading) {
    return <div>Loading...</div>;
  } else if (!user) {
    return (
      <div className="flex-1 flex flex-col  justify-center container mx-auto max-w-[1024px]">
        <div className="p-4 flex flex-wrap items-center justify-center bg-blue-100 border border-solid shadow-lg rounded-2xl">
          <div className=" min-[500px]:min-w-[400px] min-w-[200px]">
            <h2 className="text-3xl font-bold underline text-center p-4">
              Join the community!
            </h2>
            <p className="p-4">
              Start dispaching drones, and monitor their flightpaths live.
            </p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </div>
          <div className=" w-full min-[500px]:w-1/2">
            <DroneAnimation />
          </div>
        </div>
      </div>
    );
  }
}
