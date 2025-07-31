import React from "react";
import { Circle, CheckCircle, Edit3, Trash2 } from "lucide-react";
import CategoryComponent from "./Category";
import type { Todo, Category } from "../types/Common";
import { useIsMobile, useIsTablet } from "../hooks/useBreakpoint";

interface TodoViewerProps {
  todos: Todo[];
  categories: Category[];
  onToggleComplete: (todoId: string) => void;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: string) => void;
}

const TodoViewer = React.forwardRef<HTMLDivElement, TodoViewerProps>(
  ({ todos, categories, onToggleComplete, onEditTodo, onDeleteTodo }, ref) => {
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();

    const incompleteTodos = todos.filter((todo) => !todo.completedAt);
    const completedTodos = todos.filter((todo) => todo.completedAt);

    const gridCols = isMobile ? 1 : isTablet ? 2 : 3;

    const priorityOrder = { high: 0, medium: 1, low: 2 };

    const sortedIncompleteTodos = incompleteTodos.sort((a, b) => {
      const priorityA =
        priorityOrder[a.priority as keyof typeof priorityOrder] ?? 1;
      const priorityB =
        priorityOrder[b.priority as keyof typeof priorityOrder] ?? 1;
      return priorityA - priorityB;
    });

    const sortedCompletedTodos = completedTodos.sort((a, b) => {
      const priorityA =
        priorityOrder[a.priority as keyof typeof priorityOrder] ?? 1;
      const priorityB =
        priorityOrder[b.priority as keyof typeof priorityOrder] ?? 1;
      return priorityA - priorityB;
    });

    const getPriorityBorderColor = (priority: string) => {
      switch (priority) {
        case "high":
          return "border-red-400";
        case "medium":
          return "border-yellow-400";
        case "low":
          return "border-green-400";
        default:
          return "border-gray-300";
      }
    };

    const getPriorityLabel = (priority: string) => {
      switch (priority) {
        case "high":
          return "높음";
        case "medium":
          return "보통";
        case "low":
          return "낮음";
        default:
          return "보통";
      }
    };

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "high":
          return "bg-red-100 text-red-800";
        case "medium":
          return "bg-yellow-100 text-yellow-800";
        case "low":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    if (todos.length === 0) {
      return (
        <div
          ref={ref}
          className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
        >
          <Circle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">할일이 없습니다.</p>
          <p className="text-sm opacity-75">새로운 할일을 추가해보세요!</p>
        </div>
      );
    }

    return (
      <div ref={ref} className="space-y-8">
        {/* 미완료 할일들 */}
        {sortedIncompleteTodos.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Circle className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-bold text-gray-800">
                진행중 ({sortedIncompleteTodos.length})
              </h3>
            </div>

            <div
              className={`grid gap-4`}
              style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
            >
              {sortedIncompleteTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`bg-white rounded-xl border-l-4 ${getPriorityBorderColor(
                    todo.priority
                  )} shadow-sm hover:shadow-md transition-all group cursor-pointer overflow-hidden`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* 체크박스 */}
                      <button
                        onClick={() => onToggleComplete(todo.id)}
                        className="mt-1 text-gray-400 hover:text-teal-500 transition-colors hover:scale-110 duration-200"
                      >
                        <Circle className="w-5 h-5" />
                      </button>

                      {/* 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">
                            {todo.title}
                          </h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                              todo.priority
                            )}`}
                          >
                            {getPriorityLabel(todo.priority)}
                          </span>
                        </div>
                        {todo.description && (
                          <p className="text-sm text-gray-600 mb-2">
                            {todo.description}
                          </p>
                        )}
                        {todo.category && (
                          <CategoryComponent category={todo.category} />
                        )}
                      </div>

                      {/* 액션 버튼들 */}
                      <div
                        className={`flex ${
                          isMobile ? "gap-1" : "flex-col gap-1"
                        } opacity-0 group-hover:opacity-100 transition-opacity ${
                          isMobile ? "opacity-100" : ""
                        }`}
                      >
                        <button
                          onClick={() => onEditTodo(todo)}
                          className={`${
                            isMobile ? "p-1.5" : "p-2"
                          } text-gray-500 hover:bg-gray-50 rounded-lg transition-colors`}
                          title="수정"
                        >
                          <Edit3
                            className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`}
                          />
                        </button>
                        <button
                          onClick={() => onDeleteTodo(todo.id)}
                          className={`${
                            isMobile ? "p-1.5" : "p-2"
                          } text-red-500 hover:bg-red-50 rounded-lg transition-colors`}
                          title="삭제"
                        >
                          <Trash2
                            className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 완료된 할일들 */}
        {sortedCompletedTodos.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-bold text-gray-600">
                완료됨 ({sortedCompletedTodos.length})
              </h3>
            </div>

            <div
              className={`grid gap-4`}
              style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
            >
              {sortedCompletedTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden opacity-75 hover:opacity-90 transition-opacity group"
                >
                  <div className="h-1 bg-teal-500" />

                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* 체크박스 */}
                      <button
                        onClick={() => onToggleComplete(todo.id)}
                        className="mt-1 transition-colors hover:scale-110 duration-200"
                      >
                        <CheckCircle className="w-5 h-5 text-teal-500" />
                      </button>

                      {/* 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-700 line-through">
                            {todo.title}
                          </h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                              todo.priority
                            )} opacity-60`}
                          >
                            {getPriorityLabel(todo.priority)}
                          </span>
                          {todo.completedAt && (
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                              {new Date(todo.completedAt).toLocaleTimeString(
                                "ko-KR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}{" "}
                              완료
                            </span>
                          )}
                        </div>
                        {todo.description && (
                          <p className="text-sm text-gray-500 line-through mb-2">
                            {todo.description}
                          </p>
                        )}
                        {todo.category && (
                          <CategoryComponent category={todo.category} />
                        )}
                      </div>

                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => onDeleteTodo(todo.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

TodoViewer.displayName = "TodoViewer";

export default TodoViewer;
