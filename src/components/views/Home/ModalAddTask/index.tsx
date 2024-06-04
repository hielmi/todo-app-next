import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalAddTask.module.scss";
import { useTodos } from "@/Context/TodoContext";
import todosServices from "@/services/todos";
import Swal from "sweetalert2";

interface PropTypes {
  setShowModalAddTask: Dispatch<SetStateAction<boolean>>;
}

const ModalAddTask = (props: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setShowModalAddTask } = props;

  const { addTodo } = useTodos();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: any = e.target as HTMLFormElement;
    const { todo, desc, date, completed, favorite, archived } = form;

    const data: any = {
      todo: todo.value,
      desc: desc.value,
      date: date.value,
      isDone: completed.checked,
      isFav: favorite.checked,
      onArchive: archived.checked,
    };

    try {
      const result = await todosServices.addTodoService(data);
      data.id = result.data.data.id;
      addTodo(data);

      if (result.status) {
        setIsLoading(false);
        setShowModalAddTask(false);
      } else {
        setIsLoading(false);
        throw new Error("Failed to add todo");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <Modal
      onClose={() => {
        setShowModalAddTask(false);
      }}
    >
      <h1>Modal Add Task</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Todo" name="todo" type="text" />
        <Input label="Description" name="desc" type="text" />
        <Input label="Date" name="date" type="date" />
        <div className={styles.modal__checkbox}>
          <input type="checkbox" name="completed" id="completed" />
          <label htmlFor="completed">Completed</label>
        </div>
        <div className={styles.modal__checkbox}>
          <input type="checkbox" name="favorite" id="favorite" />
          <label htmlFor="favorite">Favorite</label>
        </div>
        <div className={styles.modal__checkbox}>
          <input type="checkbox" name="archived" id="archived" />
          <label htmlFor="archived">Archive</label>
        </div>
        <Button type="submit" isDisabled={isLoading}>
          {isLoading ? "Loading..." : "Add task"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddTask;
