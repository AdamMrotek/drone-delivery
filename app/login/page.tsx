"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import StyledFirebaseAuth from "../login/StyledFirebaseAuth";
import { db, app, auth, v9auth } from "../../components/firebaseConfig";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
      <main className={styles.main}>
        <div className={styles.description}>
          <h2 className="text-3xl font-bold underline">Hello my code</h2>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      </main>
    );
  }
}
