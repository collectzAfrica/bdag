import Image from "next/image";
import React, { useState } from "react";
import ErrorForm from "./ErrorForm";
import FailedForm from "./FailedForm";

export default function SingleWallets({ details }) {
  const [show, setshow] = useState({ error: false, fill: false });
  const closeModal = () => {
    setshow({ error: false, fill: false });
  };
  const openFailed = () => {
    setshow({ error: false, fill: true });
  };
  return (
    <main>
      {show.error && (
        <ErrorForm
          closeModal={closeModal}
          show={show.error}
          setShow={openFailed}
          details={details}
        />
      )}
      {show.fill && (
        <FailedForm
          closeModal={closeModal}
          show={show.fill}
          details={details}
        />
      )}
      <div onClick={() => setshow({ error: true, fill: false })}>
        <Image
          src={details.image}
          height={100}
          width={100}
          alt="img"
          className="mx-auto rounded-md cursor-pointer"
        />
      </div>
      <p className="text-center text-xs font-bold my-6">{details.name}</p>
    </main>
  );
}
