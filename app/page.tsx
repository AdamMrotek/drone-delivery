"use client";
import { Inter } from "@next/font/google";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { v9auth } from "@/components/firebaseConfig";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, loading, error] = useAuthState(v9auth);
  const router = useRouter();
  if (loading) {
    return <div>Loading...</div>;
  } else if (user) {
    router.push("/map");
  } else if (!user) {
    router.push("/login");
  }
  return <main></main>;
}
