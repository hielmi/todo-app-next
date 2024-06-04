import { formatDate } from "@/utils/formattedDate";
import styles from "./ItemTodo.module.scss";
import { useTodoSelected } from "@/Context/SelectedTodo";

interface PropsTypes {
  todo: {
    id: string;
    isFav: boolean;
    onArchive: boolean;
    isDone: boolean;
    desc: string;
    date: Date;
    todo: string;
  };
  showFavBtn?: boolean;
  handleIsFav?: (id: string) => void;
  handleOnArchive?: (id: string) => void;
  isDisabled?: boolean;
}

const ItemTodo = (props: PropsTypes) => {
  const {
    showFavBtn = true,
    todo,
    handleIsFav,
    handleOnArchive,
    isDisabled = false,
  } = props;
  const { setSelectedTodoHandler, selectedTodo } = useTodoSelected();

  const isSelected = selectedTodo.some((item) => item.id === todo?.id);

  const handleCheckboxChange = () => {
    setSelectedTodoHandler(todo);
  };

  const handleTodoIsFav = (id: string) => {
    if (handleIsFav) {
      handleIsFav(id);
    }
  };
  const handleTodoOnArchive = (id: string) => {
    if (handleOnArchive) {
      handleOnArchive(id);
    }
  };

  return (
    <div className={styles.todo}>
      <div className={styles.todo__checkbox}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          disabled={isDisabled}
        />
      </div>
      <div className={styles.todo__desc}>
        <h4>
          {todo?.todo}
          <span className={styles.todo__desc__date}>
            {" - "}
            {formatDate(todo?.date)}
          </span>
          {todo?.isDone && (
            <i
              className={`${"bx bxs-check-circle"} ${styles.todo__desc__done}`}
            ></i>
          )}
        </h4>
        {showFavBtn && <p>{todo?.desc} </p>}
      </div>
      {showFavBtn && (
        <>
          <div
            className={styles.todo__fav}
            onClick={() => handleTodoOnArchive(todo?.id)}
          >
            <i
              className={`${"bx bx-archive-in"} ${
                todo?.onArchive ? styles["is-fav"] : styles["is-not-fav"]
              }`}
            ></i>
          </div>
          <div
            className={styles.todo__fav}
            onClick={() => handleTodoIsFav(todo?.id)}
          >
            <i
              className={`${"bx bxs-star"} ${
                todo?.isFav ? styles["is-fav"] : styles["is-not-fav"]
              }`}
            ></i>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemTodo;
