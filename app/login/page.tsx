"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import StyledFirebaseAuth from "../login/StyledFirebaseAuth";
import { db, app, auth, v9auth } from "../../components/firebaseConfig";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
// import { Router } from "next/router";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

const uiConfig = {
  signInSuccessUrl: "/map",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

useAuthState;

export default function Home() {
  const [user, loading, error] = useAuthState(v9auth);
  const router = useRouter();
  if (user) {
    router.push("/map");
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2 className="text-3xl font-bold underline">Hello my code</h2>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </main>
  );
}
