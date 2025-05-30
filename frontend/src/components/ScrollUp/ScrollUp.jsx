import { FiArrowUpCircle } from "react-icons/fi";
import styles from "./ScrollUp.module.css";
import { useEffect, useState } from "react";
const ScrollUp = () => {
  const [showClass, setShowClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", showButton);
  }, []);

  const showButton = () => {
    window.scrollY >= 300 ? setShowClass("show") : setShowClass("");
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <FiArrowUpCircle
        onClick={scrollUp}
        className={`${styles.button} ${styles[showClass]}`}
      />
    </>
  );
};

export default ScrollUp;
