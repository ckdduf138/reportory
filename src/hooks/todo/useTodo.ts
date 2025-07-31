import { useState, useCallback } from "react";
import { Todo } from "../../types/Common";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoComplete,
  updateTodo,
} from "../../utils/stores/todoUtils";
import { generateUUID } from "../../utils/transalte";
import { toast } from "../../components/ui/toastContainer";

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo>();
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    const data = await getTodos();
    setTodos(data);
  }, []);

  const handleAddTodo = useCallback(() => {
    setEditTodo(undefined);
    setIsTodoModalOpen(true);
  }, []);

  const handleSaveTodo = useCallback(
    async (todo: Todo) => {
      setIsLoading(true);
      let response: string = "";
      try {
        if (!todo.id) {
          todo.id = generateUUID();
          response = await createTodo(todo);
        } else {
          response = await updateTodo(todo);
        }
        toast.success(response);
      } catch (error: any) {
        toast.error(error);
      } finally {
        await fetchTodos();
        setIsLoading(false);
        setIsTodoModalOpen(false);
      }
    },
    [fetchTodos]
  );

  const handleEditTodo = useCallback((todo: Todo) => {
    setEditTodo(todo);
    setIsTodoModalOpen(true);
  }, []);

  const handleDeleteTodo = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const response = await deleteTodo(id);
        toast.success(response);
      } catch (error: any) {
        toast.error(error);
      } finally {
        await fetchTodos();
        setIsLoading(false);
      }
    },
    [fetchTodos]
  );

  const handleToggleTodoComplete = useCallback(
    async (id: string) => {
      try {
        const response = await toggleTodoComplete(id);
        toast.success(response);
        await fetchTodos();
      } catch (error: any) {
        toast.error(error);
      }
    },
    [fetchTodos]
  );

  const closeTodoModal = useCallback(() => {
    setIsTodoModalOpen(false);
  }, []);

  return {
    todos,
    editTodo,
    isTodoModalOpen,
    isLoading,
    fetchTodos,
    handleAddTodo,
    handleSaveTodo,
    handleEditTodo,
    handleDeleteTodo,
    handleToggleTodoComplete,
    closeTodoModal,
  };
};
