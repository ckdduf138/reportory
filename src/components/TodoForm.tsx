import React, { memo, useEffect, useState, useCallback } from "react";
import {
  X,
  Plus,
  Edit3,
  AlertCircle,
  AlertTriangle,
  Info,
  Tag,
} from "lucide-react";
import { Todo, PriorityColors } from "../types/Common";
import Dropdown from "./Dropdown";
import { useIsMobile } from "../hooks/useBreakpoint";

interface TodoFormProps {
  isOpen: boolean;
  editTodo?: Todo;
  onSubmit: (todo: Todo) => void;
  onClose: () => void;
}

const TodoForm: React.FC<TodoFormProps> = memo(
  ({ editTodo, isOpen, onSubmit, onClose }) => {
    const isMobile = useIsMobile();
    const [scale, setScale] = useState(0.8);
    const [title, setTitle] = useState(editTodo?.title || "");
    const [category, setCategory] = useState(editTodo?.category || "");
    const [priority, setPriority] = useState<"high" | "medium" | "low">(
      editTodo?.priority || "medium"
    );

    useEffect(() => {
      if (isOpen) {
        setTimeout(() => setScale(1), 50);
      } else {
        setScale(0.8);
      }
    }, [isOpen]);

    const handleSubmit = useCallback(() => {
      if (title.trim()) {
        onSubmit({
          ...editTodo,
          title: title.trim(),
          category,
          priority,
          isCompleted: editTodo?.isCompleted || false,
          createdAt: editTodo?.createdAt || new Date().toISOString(),
        } as Todo);

        onClose();
      }
    }, [title, category, priority, editTodo, onSubmit, onClose]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          handleSubmit();
        } else if (e.key === "Escape") {
          onClose();
        }
      },
      [handleSubmit, onClose]
    );

    const isFormValid = title.trim();
    const formTitle = editTodo ? "할일 수정하기" : "새 할일 추가";

    const priorityOptions = [
      {
        value: "high",
        label: "높음",
        color: PriorityColors.high,
        icon: AlertCircle,
      },
      {
        value: "medium",
        label: "보통",
        color: PriorityColors.medium,
        icon: AlertTriangle,
      },
      {
        value: "low",
        label: "낮음",
        color: PriorityColors.low,
        icon: Info,
      },
    ];

    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-2xl shadow-2xl w-full transition-all duration-300 ease-out border border-gray-100 ${
            isMobile ? "max-w-sm" : "max-w-lg"
          }`}
          style={{ transform: `scale(${scale})` }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {editTodo ? (
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Edit3 className="w-5 h-5 text-teal-600" />
                </div>
              ) : (
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Plus className="w-5 h-5 text-teal-600" />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800">
                {formTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 폼 내용 */}
          <div className="p-6 space-y-5">
            {/* 제목 입력 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                할일 제목
              </label>
              <input
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-base transition-all duration-200 bg-gray-50 focus:bg-white"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="무엇을 해야 하나요?"
                autoFocus
                maxLength={100}
              />
              <div className="text-right text-xs text-gray-500 mt-2">
                {title.length}/100
              </div>
            </div>

            <div
              className={`grid gap-5 ${
                isMobile ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {/* 카테고리 선택 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-teal-600" />
                    카테고리
                  </div>
                </label>
                <Dropdown
                  category={editTodo?.category}
                  handleSetCategory={setCategory}
                />
              </div>

              {/* 우선순위 선택 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  우선순위
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {priorityOptions.map((option) => {
                    const OptionIcon = option.icon;
                    const isSelected = priority === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setPriority(option.value as "high" | "medium" | "low")
                        }
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 
                          ${
                            isSelected
                              ? "border-teal-400 bg-teal-50 shadow-md scale-105"
                              : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                          }`}
                      >
                        <OptionIcon
                          className={`w-6 h-6 ${
                            isSelected ? "text-teal-600" : "text-gray-500"
                          }`}
                          style={{
                            color: isSelected ? option.color : undefined,
                          }}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-teal-700" : "text-gray-600"
                          }`}
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 푸터 버튼 */}
          <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
            <button
              className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-base"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 text-base ${
                isFormValid
                  ? "bg-teal-500 text-white hover:bg-teal-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              {editTodo ? "수정" : "추가"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

TodoForm.displayName = "TodoForm";

export default TodoForm;
