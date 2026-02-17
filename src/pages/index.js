import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/layouts/Layout";
import BlockDAGLanding from "@/components/BlockDag";
const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <Layout>
      <BlockDAGLanding />
    </Layout>
  );
}
