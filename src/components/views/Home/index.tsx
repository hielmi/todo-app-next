import styles from "./Home.module.scss";
import ItemTodo from "@/components/fragments/ItemTodo";
import Button from "@/components/ui/Button";
import { useState } from "react";
import ModalAddTask from "./ModalAddTask";
import { useTodos } from "@/Context/TodoContext";
import { useTodoSelected } from "@/Context/SelectedTodo";
import todosServices from "@/services/todos";
import Swal from "sweetalert2";
import ModalUpdateTask from "./ModalUpdateTask";

interface TodoTypes {
  id: string;
  isFav: boolean;
  onArchive: boolean;
  isDone: boolean;
  desc: string;
  date: Date;
  todo: string;
}

const HomeView = () => {
  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalUpdateTask, setShowModalUpdateTask] = useState(false);

  const { todos, filteredTodo, toggleTodo, removeTodo } = useTodos();
  const { selectedTodo, setSelectedTodo } = useTodoSelected();

  const handleIsFav = async (id: string) => {
    toggleTodo(id, "isFav");

    try {
      const result = await todosServices.updateTodoService(id, {
        isFav: !todos.find((todo) => todo.id === id)?.isFav,
      });
      if (!result.status) {
        throw new Error("Failed to update todo");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleOnArchive = async (id: string) => {
    toggleTodo(id, "onArchive");
    try {
      const result = await todosServices.updateTodoService(id, {
        onArchive: !todos.find((todo) => todo.id === id)?.onArchive,
      });
      if (!result.status) {
        throw new Error("Failed to update todo");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleToggleTodoIsDone = () => {
    selectedTodo.forEach(async ({ id }) => {
      toggleTodo(id, "isDone");
      try {
        const result = await todosServices.updateTodoService(id, {
          isDone: !todos.find((todo) => todo.id === id)?.isDone,
        });
        if (!result.status) {
          throw new Error("Failed to update todo");
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    });
  };

  const handleDeleteTodo = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          selectedTodo.forEach(async (todo) => {
            removeTodo(todo.id);
            const result = await todosServices.deleteTodoService(todo.id);
            if (!result.status) {
              throw new Error("Failed to delete todo");
            }
          });

          setSelectedTodo([]);
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.content__header}>
          <div className={styles.content__header__title}>
            <h1>{filteredTodo.tag}</h1>
          </div>
          <div className={styles.content__header__btn}>
            {selectedTodo.length > 0 ? (
              <Button type="button" onClick={() => handleToggleTodoIsDone()}>
                <i className="bx bx-check-circle"></i>
              </Button>
            ) : (
              <Button type="button" onClick={() => setShowModalTask(true)}>
                <i className="bx bx-plus"></i>
              </Button>
            )}
            {selectedTodo.length === 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowModalUpdateTask(true)}
              >
                <i className="bx bxs-edit-alt"></i>
              </Button>
            )}
            {selectedTodo.length > 0 && (
              <Button
                type="button"
                variant="danger"
                onClick={() => handleDeleteTodo()}
              >
                <i className="bx bx-trash"></i>
              </Button>
            )}
          </div>
        </div>
        <div className={styles.content__body}>
          {todos.length === 0 && (
            <div className={styles.content__body__no__task}>
              <p>No Task</p>
            </div>
          )}
          {filteredTodo?.todos.length > 0 &&
            filteredTodo?.todos.map((item: TodoTypes) => (
              <ItemTodo
                key={item.id}
                todo={item}
                handleIsFav={handleIsFav}
                handleOnArchive={handleOnArchive}
              />
            ))}
        </div>
      </div>
      {showModalTask && <ModalAddTask setShowModalAddTask={setShowModalTask} />}
      {showModalUpdateTask && (
        <ModalUpdateTask setShowUpdateTask={setShowModalUpdateTask} />
      )}
    </>
  );
};

export default HomeView;
