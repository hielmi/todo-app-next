import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Todo {
  id: string;
  isFav: boolean;
  onArchive: boolean;
  isDone: boolean;
  desc: string;
  date: Date;
  todo: string;
}

interface ShowToolBtnContextProps {
  selectedTodo: Todo[];
  setSelectedTodoHandler: (todo: Todo) => void;
  setSelectedTodo: Dispatch<SetStateAction<Todo[]>>;
}

const TodoSelectedContext = createContext<ShowToolBtnContextProps | undefined>(
  undefined
);

export const TodoSelectedProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo[]>([]);

  const setSelectedTodoHandler = (todo: Todo) => {
    setSelectedTodo((prevTodo) => {
      if (prevTodo.some((item) => item.id === todo.id)) {
        return prevTodo.filter((item) => item.id !== todo.id);
      }
      return [...prevTodo, todo];
    });
  };

  return (
    <TodoSelectedContext.Provider
      value={{ selectedTodo, setSelectedTodoHandler, setSelectedTodo }}
    >
      {children}
    </TodoSelectedContext.Provider>
  );
};

export const useTodoSelected = () => {
  const context = useContext(TodoSelectedContext);
  if (!context) {
    throw new Error(
      "useTodoSelected must be used within a TodoSelectedrovider"
    );
  }
  return context;
};
