import React from "react";

export default function Footer() {
  return (
    <footer className="px-4">
      <div className=" bg-blue-100 flex place-content-between container max-w-[1024px] lg:mx-auto shadow-lg rounded-t-2xl">
        <h3 className="text-xl font-bold underline text-center p-6">drony</h3>
        <a
          href="https://github.com/AdamMrotek/drone-delivery"
          className="p-6 font-bold"
        >
          github repo
        </a>
      </div>
    </footer>
  );
}
