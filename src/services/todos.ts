import instance from "@/lib/axios/instance";

const todosServices = {
  getTodosService: () => instance.get("/api/todo"),
  addTodoService: (data: any) => instance.post("/api/todo", data),
  updateTodoService: (id: string, data: any) =>
    instance.put(`/api/todo?id=${id}`, data),
  deleteTodoService: (id: string) => instance.delete(`/api/todo?id=${id}`),
};

export default todosServices;
