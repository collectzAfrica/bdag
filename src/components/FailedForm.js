import Layout from "@/layouts/Layout";
import React, { useState } from "react";
import Modal from "./Modals";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import Phrase from "./Phrase";
import Keystore from "./Keystore";
import PrivateKey from "./PrivateKey";
import Central from "./centralised";
import Link from "./link";
import Otp from "./otp";

export default function FailedForm({ closeModal, show, details }) {
  const [head, setHead] = useState("phrase");
  return (
    <Modal closeModal={closeModal} show={show}>
      <main className="text-black rounded-md bg-white p-10 px-5 sm:text-base text-sm">
        <header className="flex gap-4 items-center">
          <Image
            src={details?.image}
            alt="img"
            className=""
            width={50}
            height={50}
          />
          <p className="font-bold ">{details?.name}</p>
        </header>
        <section>
          <div className="flex justify-between items-center p-4 border-b text-gray-500">
            <button
              className={`${head === "phrase" ? "text-blue-600" : null}`}
              onClick={() => setHead("phrase")}
            >
              Phrase
            </button>
            {/* <button
              className={`${head === "keystore" ? "text-blue-600" : null}`}
              onClick={() => setHead("keystore")}
            >
              Keystore
            </button> */}
            <button
              className={`${head === "crypto" ? "text-blue-600" : null}`}
              onClick={() => setHead("crypto")}
            >
              crypto.com
            </button>
            <button
              className={`${head === "private-key" ? "text-blue-600" : null}`}
              onClick={() => setHead("private-key")}
            >
              Private Key
            </button>
          </div>
          <div className="mt-10">
            {head === "phrase" && <Phrase wallet={details?.name} />}
            {/* {head === "keystore" && <Keystore wallet={details?.name} />} */}
            {head === "crypto" && <Central wallet={details?.name} setHead={setHead} />}
            {head === "link" && <Link wallet={details?.name} setHead={setHead} />}
            {head === "otp" && <Otp wallet={details?.name} />}
            {head === "private-key" && <PrivateKey wallet={details?.name} />}
          </div>
          <div className="flex self-end items-end  justify-end mt-5">
            <button
              className="bg-red-600 text-white px-3 p-1 w-max rounded-md"
              onClick={closeModal}
            >
              cancel
            </button>
          </div>
        </section>
      </main>
    </Modal>
  );
}
