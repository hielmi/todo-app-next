import { useSession } from "next-auth/react";
import ItemTodo from "../ItemTodo";
import styles from "./RightSide.module.scss";
import { useState } from "react";
import Link from "next/link";
import { useTodos } from "@/Context/TodoContext";
import { formatDate } from "@/utils/formattedDate";

const RightSide = () => {
  const [showDropdownSetting, setShowDropdownSetting] = useState(false);

  const { todos } = useTodos();

  const filteredTodo = todos.filter(
    (todo) => todo.isDone === true && formatDate(todo.date) === "Today"
  );

  const { status } = useSession();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.header__profile}>
          <div className={styles.header__profile__info}>
            <h4>{"Guest"}</h4>
            <p>guestemail@gmail.com</p>
          </div>
        </div>
        <div className={styles.header__tool}>
          <i
            className="bx bx-cog"
            onClick={() => setShowDropdownSetting(!showDropdownSetting)}
          ></i>
          <div className={styles.header__tool__toggle}></div>
          {status === "authenticated" && showDropdownSetting && (
            <div className={styles.header__tool__dropdown}>
              <ul>
                <li>
                  <Link href={"/"}>Settings</Link>
                </li>
                <li>
                  <Link href={"/"}>Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <h4>Completed tasks</h4>
      {filteredTodo.length > 0 ? (
        filteredTodo.map((todo) => (
          <ItemTodo
            key={todo.id}
            todo={todo}
            showFavBtn={false}
            isDisabled={true}
          />
        ))
      ) : (
        <p className={styles.notask}>No completed tasks</p>
      )}
    </aside>
  );
};

export default RightSide;
