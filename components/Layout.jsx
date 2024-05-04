import React from "react";
import Head from "next/head";
import { NavBar } from "@/components";
import { Footer } from "@/components";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>DeMaestro Tech Store</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
