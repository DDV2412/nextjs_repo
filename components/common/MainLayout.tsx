import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
