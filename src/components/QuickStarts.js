import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOpenInNew } from "react-icons/md";

export default function QuickStarts({ details }) {
  return (
    <Link
      href={"/wallets"}
      className="bg-primary border-l-8 rounded-lg border-secondary py-10 relative"
    >
      <div>
        <Image
          width={78}
          height={78}
          src={details?.image}
          alt="img"
          className="mx-auto"
        />
        <p className="text-center mt-2 text-sm capitalize">{details?.name}</p>
      </div>
      <MdOpenInNew className="text-white text-sm absolute top-2 right-2" />
    </Link>
  );
}
