import Layout from "@/layouts/Layout";
import React, { useEffect, useState } from "react";
import Modal from "./Modals";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";

export default function ErrorForm({ closeModal, show, details, setShow }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFailed(true);
    }, 2000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, []);
  return (
    <Modal closeModal={closeModal} show={show}>
      <main className="text-white rounded-full">
        <header className="flex justify-between p-4 bg-primary rounded-t-md">
          <button className=" text-sm" onClick={closeModal}>
            Back
          </button>
          <MdOutlineClose onClick={closeModal} className="cursor-pointer" />
        </header>
        <article className=" py-10 md:text-sm text-xs space-y-4 bg-white rounded-b-md px-6 text-black ">
          <div
            className={`flex justify-between  min-h-14 px-2 rounded-md   items-center border ${
              failed ? "border-red-400" : " border-green-400"
            }`}
          >
            {failed ? (
              <p className="text-red-400">Connection Error</p>
            ) : (
              <p className="animate-pulse">Initializing...</p>
            )}
            {failed && (
              <button
                className="px-3 p-1 bg-green-400 rounded-md"
                onClick={setShow}
              >
                connect manually
              </button>
            )}
          </div>
          <div
            className={`flex justify-between min-h-14 px-2 rounded-md items-center border ${
              failed ? "border-red-400" : " border-green-400"
            }`}
          >
            <Image
              src={details?.image}
              width={40}
              height={40}
              alt="img"
              className=""
            />
            <p className="font-bold">{details?.name}</p>
          </div>
        </article>
      </main>
    </Modal>
  );
}
