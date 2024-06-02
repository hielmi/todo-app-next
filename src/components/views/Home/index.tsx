import Sidebar from "@/components/Fragments/Sidebar";
import styles from "./Home.module.scss";
import Content from "@/components/Fragments/Content";
import Profile from "@/components/Fragments/Profile";
const HomeView = () => {
  return (
    <>
      <Sidebar />
      <Content />
      <Profile />
    </>
  );
};

export default HomeView;
