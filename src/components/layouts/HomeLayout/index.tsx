import LeftSide from "@/components/fragments/LeftSide";
import RightSide from "@/components/fragments/RightSide";
import styles from "./HomeLayout.module.scss";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface PropsTypes {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: PropsTypes) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div className={`${styles.container} ${inter.className}`}>
        <LeftSide />
        <main className={styles.main}>{children}</main>
        <RightSide />
      </div>
      <div className={styles.toggle} onClick={toggleTheme}>
        {isDarkMode ? (
          <i className="bx bxs-sun"></i>
        ) : (
          <i className="bx bxs-moon"></i>
        )}
      </div>
    </>
  );
};

export default HomeLayout;
