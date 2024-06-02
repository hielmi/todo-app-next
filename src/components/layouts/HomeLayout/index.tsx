import styles from "./HomeLayout.module.scss";

interface PropsTypes {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: PropsTypes) => {
  return (
    <>
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default HomeLayout;
