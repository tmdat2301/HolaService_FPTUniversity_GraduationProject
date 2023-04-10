import React from "react";
import { Header, Intro, Contact, Navigation, Footer } from "../../components";
import { Outlet } from "react-router-dom";

const Public = () => {
  return (
    <div className="w-full flex gap-6 h-full flex-col items-center">
      <div className="w-main">
        <Header />
      </div>
      <div className="w-full">
        <Navigation />
      </div>
      {/* {location.pathname !== `/${path.CONTACT}` && location.pathname !== `/${path.LOGIN}` && !location.pathname?.includes(path.DETAIL) && <Search />} */}
      <div className="w-main flex flex-col items-start justify-start mt-3">
        <Outlet />
      </div>
      <Intro />
      <Contact />
      <div className="w-full h-[450px]">
        <Footer />
      </div>
    </div>
  );
};

export default Public;
