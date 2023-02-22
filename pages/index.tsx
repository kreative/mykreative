import Head from "next/head";
import Image from "next/image";

import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <p className="text-4xl text-center">Hello World</p>
    </div>
  );
}
