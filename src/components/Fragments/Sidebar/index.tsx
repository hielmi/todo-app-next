import Input from "@/components/ui/Input";
import styles from "./Sidebar.module.scss";
import { useEffect, useState } from "react";
const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <h1>TodoKu</h1>
        <div className={styles.sidebar__header__search}>
          <i className="bx bx-search"></i>
          <Input
            name="search"
            type="text"
            placeholder="Search"
            className={styles.sidebar__header__search__input}
          />
        </div>
      </div>
      <div className={styles.sidebar__fav}>
        <h4>Favorites</h4>
        <div className={styles.sidebar__fav__wrapper}>
          <div className={styles.sidebar__fav__wrapper__item}>
            <div className={styles.sidebar__fav__wrapper__item__body}>
              <i className="bx bxs-zap"></i>
              <p>My Day</p>
            </div>
            <div className={styles.sidebar__fav__wrapper__item__amount}>
              <p>3</p>
            </div>
          </div>
          <div className={styles.sidebar__fav__wrapper__item}>
            <div className={styles.sidebar__fav__wrapper__item__body}>
              <i className="bx bx-check-circle"></i>
              <p>Completed</p>
            </div>
            <div className={styles.sidebar__fav__wrapper__item__amount}>
              <p>3</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={toggleTheme}>Toggle</button>
    </aside>
  );
};

export default Sidebar;
