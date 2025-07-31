import { useMemo } from "react";
import { Todo } from "../types/Common";
import { AnalysisData } from "../types/Analysis";
import { calculateAnalysisData } from "../utils/analysisUtils";

export const useAnalysisData = (todos: Todo[]): AnalysisData => {
  return useMemo(() => {
    return calculateAnalysisData(todos);
  }, [todos]);
};
