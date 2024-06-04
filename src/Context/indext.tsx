import { ReactNode } from "react";
import { TodoSelectedProvider } from "./SelectedTodo";
import { TodoProvider } from "./TodoContext";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TodoSelectedProvider>
      <TodoProvider>{children}</TodoProvider>
    </TodoSelectedProvider>
  );
};

export default AppProvider;
