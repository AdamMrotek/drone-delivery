"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, v9auth } from "../../configs/firebase/firebaseConfig";

export default function Header() {
  const [user, loading, error] = useAuthState(v9auth);
  return (
    <header className="max-w-[1024px] container mx-auto flex items-center place-content-between">
      <h1 className="text-3xl font-bold underline p-4">drony</h1>
      <nav>
        {user && (
          <button
            className="btn py-2 px-4 m-4 border-solid border rounded-2xl hover:bg-slate-800 hover:text-white duration-300"
            onClick={() => auth.signOut()}
          >
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
}
