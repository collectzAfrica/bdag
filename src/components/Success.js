import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Successful() {
  return (
    <main>
      <div className=" bg-cover bg-[rgba(3,13,67,0.9)] bg-center">
        <Image
          src={"/barcode.png"}
          width={300}
          height={300}
          alt="barcode"
          className="mx-auto"
        />
        <p className="my-14 text-black text-center">Scan code to continue</p>
        <Link
          href={"/"}
          className="underline text-blue-600  mx-auto  w-max text-center"
        >
          <p>Go Home</p>
        </Link>
      </div>
    </main>
  );
}
