import Input from "@/components/ui/Input";
import styles from "./LeftSide.module.scss";
import Link from "next/link";
import { useTodos } from "@/Context/TodoContext";
import { formatDate } from "@/utils/formattedDate";
import { useState } from "react";

const LeftSide = () => {
  const [search, setSearch] = useState("");
  const { SetFilterTodos, todos } = useTodos();
  const handleAllTask = () => {
    SetFilterTodos("All Task", todos);
  };

  const handleTodayTask = () => {
    const today = todos.filter((todo) => formatDate(todo.date) === "Today");
    SetFilterTodos("My Day", today);
  };

  const handleArchiveTask = () => {
    const archive = todos.filter((todo) => todo.onArchive);
    SetFilterTodos("Archive", archive);
  };

  const handleCompletedTask = () => {
    const completed = todos.filter((todo) => todo.isDone);
    SetFilterTodos("Completed", completed);
  };

  const totalAllTask = todos.length;
  const totalTodayTask = todos.filter(
    (todo) => formatDate(todo.date) === "Today"
  ).length;
  const totalArchiveTask = todos.filter(
    (todo) => todo.onArchive === true
  ).length;
  const totalCompletedTask = todos.filter(
    (todo) => todo.isDone === true
  ).length;

  const handleSearch = (e: any) => {
    const searchValue = e.target.value;
    if (searchValue) {
      const filteredTodos = todos.filter((todo) =>
        todo.todo.toLowerCase().includes(searchValue.toLowerCase())
      );
      SetFilterTodos("Search", filteredTodos);
    } else {
      SetFilterTodos("All Task", todos);
    }
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
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className={styles.sidebar__fav}>
        <h4>Favorites</h4>
        <div className={styles.sidebar__fav__wrapper}>
          <Link
            href={"/"}
            onClick={handleAllTask}
            className={styles.sidebar__fav__wrapper__item}
          >
            <div className={styles.sidebar__fav__wrapper__item__body}>
              <i className="bx bx-border-all"></i>
              <p>All</p>
            </div>
            {totalAllTask > 0 && (
              <div className={styles.sidebar__fav__wrapper__item__amount}>
                <p>{totalAllTask}</p>
              </div>
            )}
          </Link>
          <Link
            href={"/"}
            onClick={handleTodayTask}
            className={styles.sidebar__fav__wrapper__item}
          >
            <div className={styles.sidebar__fav__wrapper__item__body}>
              <i className="bx bxs-zap"></i>
              <p>My Day</p>
            </div>
            {totalAllTask > 0 && (
              <div className={styles.sidebar__fav__wrapper__item__amount}>
                <p>{totalTodayTask}</p>
              </div>
            )}
          </Link>
          <Link
            href={"/"}
            onClick={handleArchiveTask}
            className={styles.sidebar__fav__wrapper__item}
          >
            <div className={styles.sidebar__fav__wrapper__item__body}>
              <i className="bx bx-archive-in"></i>
              <p>Archive</p>
            </div>
            {totalArchiveTask > 0 && (
              <div className={styles.sidebar__fav__wrapper__item__amount}>
                <p>{totalArchiveTask}</p>
              </div>
            )}
          </Link>
          <Link
            href={"/"}
            onClick={handleCompletedTask}
            className={styles.sidebar__fav__wrapper__item}
          >
            <div className={styles.sidebar__fav__wrapper__item__body}>
              <i className="bx bx-check-circle"></i>
              <p>Completed</p>
            </div>
            {totalCompletedTask > 0 && (
              <div className={styles.sidebar__fav__wrapper__item__amount}>
                <p>{totalCompletedTask}</p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default LeftSide;
