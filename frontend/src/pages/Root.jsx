import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import ScrollUp from "../components/ScrollUp/ScrollUp";

const Root = () => {
  return (
    <>
      <ScrollUp />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
