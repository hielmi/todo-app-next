import todosServices from "@/services/todos";
import todoServices from "@/services/todos";
import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import Swal from "sweetalert2";

interface Todo {
  id: string;
  isFav: boolean;
  onArchive: boolean;
  isDone: boolean;
  desc: string;
  date: Date;
  todo: string;
}

interface TodoContextType {
  todos: Todo[];
  filteredTodo: {
    tag: string;
    todos: Todo[];
  };
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string, key: keyof Todo) => void;

  removeTodo: (id: string) => void;
  updateTodo: (id: string, updatedTodo: Todo) => void;
  SetFilterTodos: (tag: string, todo: Todo[]) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const initialTodos: Todo[] = [];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filteredTodo, setFilteredTodo] = useState<{
    tag: string;
    todos: Todo[];
  }>({
    tag: "All Task",
    todos: todos,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await todosServices.getTodosService();
        setTodos(data.data);
        setFilteredTodo({ tag: "All Task", todos: data.data });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setFilteredTodo((prevFilteredTodo) => ({
      ...prevFilteredTodo,
      todos: [...prevFilteredTodo.todos, newTodo],
    }));
  };

  const toggleTodo = (id: string, key: keyof Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, [key]: !todo[key] } : todo
    );
    setTodos(updatedTodos);
    setFilteredTodo((prevFilteredTodo) => ({
      ...prevFilteredTodo,
      todos: prevFilteredTodo.todos.map((todo) =>
        todo.id === id ? { ...todo, [key]: !todo[key] } : todo
      ),
    }));
  };

  const updateTodo = (id: string, updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
    setFilteredTodo((prevFilteredTodo) => ({
      ...prevFilteredTodo,
      todos: prevFilteredTodo.todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      ),
    }));
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    setFilteredTodo((prevFilteredTodo) => ({
      ...prevFilteredTodo,
      todos: prevFilteredTodo.todos.filter((todo) => todo.id !== id),
    }));
  };

  const SetFilterTodos = (tag: string, todos: any) => {
    setFilteredTodo({ tag, todos });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodo,
        addTodo,
        removeTodo,
        updateTodo,
        SetFilterTodos,
        setTodos,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
