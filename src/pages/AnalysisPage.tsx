import React, { useEffect, useState, useMemo } from "react";
import {
  TrendingUp,
  PieChart,
  BarChart3,
  Clock,
  Target,
  Calendar,
  Activity,
  Award,
  Filter,
} from "lucide-react";

import { AppHeader, SidebarMenu } from "../components/common";
import { Loader } from "../components/ui";
import { useTodo } from "../hooks/todo/useTodo";
import { useIsMobile } from "../hooks/useBreakpoint";
import { Todo } from "../types/Common";

interface AnalysisData {
  totalTodos: number;
  completedTodos: number;
  todayTodos: number;
  todayCompleted: number;
  completionRate: number;
  productivityScore: number;
  categoryStats: { [key: string]: number };
  dailyTrends: { date: string; todos: number; completed: number }[];
  priorityStats: { high: number; medium: number; low: number };
  overdueCount: number;
  averageCompletionDays: number;
}

const AnalysisPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { todos, fetchTodos } = useTodo();

  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "quarter"
  >("week");
  const [selectedMetric, setSelectedMetric] = useState<
    "completion" | "productivity" | "priority"
  >("completion");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const analysisData = useMemo((): AnalysisData => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayStr = today.toISOString().split("T")[0];

    // 전체 할일 통계
    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => todo.isCompleted).length;

    // 오늘 할일 통계
    const todayTodos = todos.filter((todo) => todo.dueDate === todayStr);
    const todayCompleted = todayTodos.filter((todo) => todo.isCompleted).length;

    // 완료율 계산
    const completionRate =
      totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    // 연체된 할일 계산
    const overdueCount = todos.filter(
      (todo) => !todo.isCompleted && todo.dueDate < todayStr
    ).length;

    // 평균 완료 소요일 계산
    const completedWithDates = todos.filter(
      (todo) => todo.isCompleted && todo.completedAt && todo.createdAt
    );
    const averageCompletionDays =
      completedWithDates.length > 0
        ? Math.round(
            completedWithDates.reduce((sum, todo) => {
              const created = new Date(todo.createdAt);
              const completed = new Date(todo.completedAt!);
              return (
                sum +
                Math.ceil(
                  (completed.getTime() - created.getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              );
            }, 0) / completedWithDates.length
          )
        : 0;

    // 생산성 점수 계산 (완료율, 연체율, 오늘 완료율 기반)
    const overdueRate = totalTodos > 0 ? (overdueCount / totalTodos) * 100 : 0;
    const todayCompletionRate =
      todayTodos.length > 0 ? (todayCompleted / todayTodos.length) * 100 : 100;
    const productivityScore = Math.min(
      Math.round(
        completionRate * 0.5 +
          (100 - overdueRate) * 0.3 +
          todayCompletionRate * 0.2
      ),
      100
    );

    // 카테고리별 통계
    const categoryStats = todos.reduce((acc, todo) => {
      const categoryName = todo.category?.name || "기타";
      acc[categoryName] = (acc[categoryName] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // 일별 트렌드 (최근 7일)
    const dailyTrends = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];

      const dayTodos = todos.filter((todo) => todo.dueDate === dateStr);
      const dayCompleted = dayTodos.filter((todo) => todo.isCompleted);

      return {
        date: date.toLocaleDateString("ko-KR", {
          month: "short",
          day: "numeric",
        }),
        todos: dayTodos.length,
        completed: dayCompleted.length,
      };
    }).reverse();

    // 우선순위별 통계
    const priorityStats = todos.reduce(
      (acc, todo) => {
        acc[todo.priority || "medium"]++;
        return acc;
      },
      { high: 0, medium: 0, low: 0 }
    );

    return {
      totalTodos,
      completedTodos,
      todayTodos: todayTodos.length,
      todayCompleted,
      completionRate,
      productivityScore,
      categoryStats,
      dailyTrends,
      priorityStats,
      overdueCount,
      averageCompletionDays,
    };
  }, [todos]);

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "teal",
  }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`bg-${color}-100 p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <div className="container mx-auto max-w-6xl">
        <AppHeader
          title="분석"
          subtitle="상세한 통계와 분석으로 생산성을 향상시키세요"
        />

        <div className={`${isMobile ? "px-4" : "px-6"} pb-24 space-y-6`}>
          {/* 필터 옵션 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">분석 옵션</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기간
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="week">최근 1주일</option>
                  <option value="month">최근 1개월</option>
                  <option value="quarter">최근 3개월</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  지표
                </label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="completion">완료율 분석</option>
                  <option value="productivity">생산성 분석</option>
                  <option value="priority">우선순위 분석</option>
                </select>
              </div>
            </div>
          </div>

          {/* 주요 지표 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Target}
              title="오늘 할일"
              value={`${analysisData.todayCompleted}/${analysisData.todayTodos}`}
              subtitle="완료/전체"
            />

            <StatCard
              icon={Activity}
              title="전체 완료율"
              value={`${analysisData.completionRate}%`}
              subtitle={`${analysisData.completedTodos}/${analysisData.totalTodos} 완료`}
              color="green"
            />

            <StatCard
              icon={Award}
              title="생산성 점수"
              value={analysisData.productivityScore}
              subtitle="100점 만점"
              color="purple"
            />

            <StatCard
              icon={Clock}
              title="연체된 할일"
              value={analysisData.overdueCount}
              subtitle={analysisData.overdueCount > 0 ? "주의 필요" : "완벽!"}
              color={analysisData.overdueCount > 0 ? "red" : "green"}
            />
          </div>

          {/* 일별 트렌드 차트 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">
                일별 활동 트렌드
              </h2>
            </div>

            <div className="space-y-4">
              {analysisData.dailyTrends.map((day, index) => (
                <div key={day.date} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600">{day.date}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-sm font-medium">
                        할일: {day.todos}개
                      </div>
                      <div className="text-sm text-gray-500">
                        완료: {day.completed}개
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            day.todos > 0
                              ? (day.completed / day.todos) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 w-12 text-right">
                    {day.todos > 0
                      ? Math.round((day.completed / day.todos) * 100)
                      : 0}
                    %
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 카테고리별 분석 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 카테고리별 시간 분포 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="w-5 h-5 text-teal-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  카테고리별 분포
                </h2>
              </div>

              <div className="space-y-3">
                {Object.entries(analysisData.categoryStats).map(
                  ([category, count], index) => {
                    const total = Object.values(
                      analysisData.categoryStats
                    ).reduce((a, b) => a + b, 0);
                    const percentage =
                      total > 0 ? Math.round((count / total) * 100) : 0;
                    const colors = [
                      "bg-teal-500",
                      "bg-blue-500",
                      "bg-green-500",
                      "bg-purple-500",
                      "bg-yellow-500",
                    ];

                    return (
                      <div key={category} className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            colors[index % colors.length]
                          }`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">
                              {category}
                            </span>
                            <span className="text-sm text-gray-600">
                              {percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                colors[index % colors.length]
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* 우선순위별 할일 분석 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  우선순위별 할일
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "high",
                    label: "높음",
                    color: "bg-red-500",
                    count: analysisData.priorityStats.high,
                  },
                  {
                    key: "medium",
                    label: "보통",
                    color: "bg-yellow-500",
                    count: analysisData.priorityStats.medium,
                  },
                  {
                    key: "low",
                    label: "낮음",
                    color: "bg-green-500",
                    count: analysisData.priorityStats.low,
                  },
                ].map(({ key, label, color, count }) => {
                  const total = Object.values(
                    analysisData.priorityStats
                  ).reduce((a, b) => a + b, 0);
                  const percentage =
                    total > 0 ? Math.round((count / total) * 100) : 0;

                  return (
                    <div key={key} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${color}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{label}</span>
                          <span className="text-sm text-gray-600">
                            {count}개 ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${color}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 개선 제안 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">개선 제안</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisData.completionRate < 70 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-2">
                    📋 할일 완료율 개선
                  </div>
                  <div className="text-sm text-yellow-700">
                    현재 완료율이 {analysisData.completionRate}%입니다. 할일을
                    더 작은 단위로 나누어 보세요.
                  </div>
                </div>
              )}

              {analysisData.overdueCount > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-medium text-red-800 mb-2">
                    ⏰ 연체 할일 관리
                  </div>
                  <div className="text-sm text-red-700">
                    연체된 할일이 {analysisData.overdueCount}개 있습니다.
                    우선순위를 재조정해 보세요.
                  </div>
                </div>
              )}

              {analysisData.productivityScore < 50 && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="font-medium text-purple-800 mb-2">
                    🚀 생산성 향상
                  </div>
                  <div className="text-sm text-purple-700">
                    생산성 점수가 {analysisData.productivityScore}점입니다.
                    마감일 관리와 할일 완료에 더 집중해 보세요.
                  </div>
                </div>
              )}

              {analysisData.averageCompletionDays > 7 && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-800 mb-2">
                    📈 완료 속도 개선
                  </div>
                  <div className="text-sm text-blue-700">
                    평균 완료 소요일이 {analysisData.averageCompletionDays}
                    일입니다. 할일을 더 작게 나누어 빠른 완료를 목표로 해보세요.
                  </div>
                </div>
              )}

              {analysisData.completionRate >= 80 &&
                analysisData.overdueCount === 0 && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="font-medium text-green-800 mb-2">
                      🎉 훌륭한 관리!
                    </div>
                    <div className="text-sm text-green-700">
                      완료율이 높고 연체된 할일이 없습니다. 이 패턴을 계속
                      유지하세요!
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        <SidebarMenu />
      </div>
    </div>
  );
};

export default AnalysisPage;
