import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { NextSeo } from "next-seo";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextSeo
        additionalMetaTags={[
          {
            name: "lang",
            content: "en",
          },
        ]}
      />
      <header className="h-16 md:h-20">
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
