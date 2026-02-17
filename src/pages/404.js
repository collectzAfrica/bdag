import Layout from "@/layouts/Layout";
import Link from "next/link";
import React from "react";

export default function Index() {
  return (
    <Layout>
      <main className="mx-auto mt-20 text-white space-y-6">
        <p className="text-center text-xl ">Oops</p>
        <p className="text-center text-xl ">This page does not exist </p>
        <Link
          href={"/"}
          className="px-4 p-2 bg-secondary w-max flex items-center self-center rounded-md text-lg mx-auto"
        >
          Go Back
        </Link>
      </main>
    </Layout>
  );
}
