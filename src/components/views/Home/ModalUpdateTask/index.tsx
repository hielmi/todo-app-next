import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useTodoSelected } from "@/Context/SelectedTodo";
import { useTodos } from "@/Context/TodoContext";
import todosServices from "@/services/todos";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Swal from "sweetalert2";

interface PropTypes {
  setShowUpdateTask: Dispatch<SetStateAction<boolean>>;
}

const ModalUpdateTask = (props: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setShowUpdateTask } = props;

  const { selectedTodo, setSelectedTodo } = useTodoSelected();
  const { updateTodo } = useTodos();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: any = e.target as HTMLFormElement;
    const { todo, desc, date } = form;

    const data: any = {
      todo: todo.value,
      desc: desc.value,
      date: date.value,
    };

    try {
      const result = await todosServices.updateTodoService(
        selectedTodo[0].id,
        data
      );

      if (result.status) {
        setIsLoading(false);
        setShowUpdateTask(false);

        updateTodo(selectedTodo[0].id, {
          ...selectedTodo[0],
          ...data,
        });

        setSelectedTodo([]);
      } else {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      setIsLoading(false);
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
        setShowUpdateTask(false);
      }}
    >
      <h1>Modal Updated Task</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Todo"
          name="todo"
          type="text"
          defaultValue={selectedTodo[0].todo}
        />
        <Input
          label="Description"
          name="desc"
          type="text"
          defaultValue={selectedTodo[0].desc}
        />
        <Input
          label="Date"
          name="date"
          type="date"
          defaultValue={selectedTodo[0].date.toString()}
        />
        <Button type="submit" isDisabled={isLoading}>
          {isLoading ? "Loading..." : "Update task"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateTask;
