import React, { memo, useMemo } from "react";
import {
  TrendingUp,
  Target,
  Award,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  Circle,
  AlertCircle,
  AlertTriangle,
  Info,
  Timer,
} from "lucide-react";
import { Todo, PriorityColors } from "../../types/Common";
import CategoryComponent from "../ui/Category";
import { useIsMobile, useIsTablet } from "../../hooks/useBreakpoint";

interface StatsViewProps {
  todos: Todo[];
}

interface CategoryStat {
  category: any;
  total: number;
  completed: number;
}

interface PriorityStatsType {
  high: number;
  medium: number;
  low: number;
}

const StatsView: React.FC<StatsViewProps> = memo(({ todos }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const stats = useMemo(() => {
    const completedTodos = todos.filter((todo) => todo.isCompleted);
    const completionRate =
      todos.length > 0 ? (completedTodos.length / todos.length) * 100 : 0;

    // 카테고리별 통계
    const categoryStats = todos.reduce((acc, todo) => {
      if (todo.category) {
        const key = todo.category.id;
        if (!acc[key]) {
          acc[key] = {
            category: todo.category,
            total: 0,
            completed: 0,
          };
        }
        acc[key].total++;
        if (todo.isCompleted) acc[key].completed++;
      }
      return acc;
    }, {} as Record<string, CategoryStat>);

    // 우선순위별 통계
    const priorityStats = todos.reduce(
      (acc, todo) => {
        acc[todo.priority] = (acc[todo.priority] || 0) + 1;
        return acc;
      },
      { high: 0, medium: 0, low: 0 } as PriorityStatsType
    );

    // 시간 통계
    const totalEstimatedMinutes = todos.reduce((sum, todo) => {
      return sum + (todo.estimatedTime ? parseInt(todo.estimatedTime) : 0);
    }, 0);

    const completedEstimatedMinutes = completedTodos.reduce((sum, todo) => {
      return sum + (todo.estimatedTime ? parseInt(todo.estimatedTime) : 0);
    }, 0);

    return {
      completedTodos,
      completionRate,
      categoryStats,
      priorityStats,
      totalEstimatedMinutes,
      completedEstimatedMinutes,
    };
  }, [todos]);

  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const getGridColumns = () => {
    if (isMobile) return "grid-cols-1";
    if (isTablet) return "grid-cols-2";
    return "grid-cols-3";
  };

  // 빈 상태
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gray-100 rounded-full p-8 mb-6">
          <BarChart3 className="w-16 h-16 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-3">
          통계를 준비중이에요
        </h3>
        <p className="text-center text-gray-500 max-w-sm leading-relaxed">
          할일을 추가하고 완료하면 멋진 통계를 확인할 수 있어요!
        </p>
      </div>
    );
  }

  const priorityItems = [
    {
      key: "high",
      label: "높음",
      icon: AlertCircle,
      color: PriorityColors.high,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      key: "medium",
      label: "보통",
      icon: AlertTriangle,
      color: PriorityColors.medium,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      key: "low",
      label: "낮음",
      icon: Info,
      color: PriorityColors.low,
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-teal-600 rounded-lg p-2.5">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">통계 대시보드</h2>
          <p className="text-gray-600">오늘의 성과를 한눈에 확인하세요</p>
        </div>
      </div>

      {/* 주요 지표 카드들 */}
      <div className={`grid gap-4 ${getGridColumns()}`}>
        {/* 완료율 카드 */}
        <div className="bg-teal-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-6 h-6 text-teal-100" />
            <span className="text-teal-100 text-sm font-medium">완료율</span>
          </div>
          <div className="text-3xl font-bold mb-1">
            {Math.round(stats.completionRate)}%
          </div>
          <div className="text-teal-100 text-sm">
            {stats.completedTodos.length}/{todos.length} 할일 완료
          </div>
        </div>

        {/* 총 할일 카드 */}
        <div className="bg-gray-800 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-6 h-6 text-gray-300" />
            <span className="text-gray-300 text-sm font-medium">총 할일</span>
          </div>
          <div className="text-3xl font-bold mb-1">{todos.length}</div>
          <div className="text-gray-300 text-sm">
            {stats.completedTodos.length}개 완료됨
          </div>
        </div>

        {/* 시간 통계 카드 */}
        {stats.totalEstimatedMinutes > 0 && (
          <div className="bg-gray-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Timer className="w-6 h-6 text-gray-300" />
              <span className="text-gray-300 text-sm font-medium">
                예상 시간
              </span>
            </div>
            <div className="text-3xl font-bold mb-1">
              {formatTime(stats.completedEstimatedMinutes)}
            </div>
            <div className="text-gray-300 text-sm">
              총 {formatTime(stats.totalEstimatedMinutes)} 중
            </div>
          </div>
        )}
      </div>

      {/* 진행률 바 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">전체 진행률</h3>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-teal-600 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>0%</span>
            <span className="font-medium">
              {Math.round(stats.completionRate)}%
            </span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* 우선순위별 분포 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            우선순위별 분포
          </h3>
        </div>
        <div className="space-y-4">
          {priorityItems.map((item) => {
            const count =
              stats.priorityStats[item.key as keyof PriorityStatsType];
            const percentage =
              todos.length > 0 ? (count / todos.length) * 100 : 0;
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                className={`p-4 rounded-xl border-2 ${item.bgColor} ${item.borderColor}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                    <span className="font-medium text-gray-800">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    {count}개
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {Math.round(percentage)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 카테고리별 진행률 */}
      {Object.keys(stats.categoryStats).length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              카테고리별 진행률
            </h3>
          </div>
          <div className="space-y-4">
            {Object.values(stats.categoryStats).map((stat) => {
              const percentage =
                stat.total > 0 ? (stat.completed / stat.total) * 100 : 0;

              return (
                <div
                  key={stat.category.id}
                  className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center mb-3">
                    <CategoryComponent category={stat.category} />
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-teal-500" />
                      <span>
                        {stat.completed}/{stat.total}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-teal-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-2">
                    {Math.round(percentage)}% 완료
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

StatsView.displayName = "StatsView";

export default StatsView;
