import React from "react";
import { Award } from "lucide-react";
import { ImprovementSuggestion } from "../../types/Analysis";

interface ImprovementSuggestionsProps {
  suggestions: ImprovementSuggestion[];
}

const ImprovementSuggestions: React.FC<ImprovementSuggestionsProps> = ({
  suggestions,
}) => {
  const getStyleByType = (type: ImprovementSuggestion["type"]) => {
    const styles = {
      warning: {
        container: "bg-yellow-50 border-yellow-200",
        title: "text-yellow-800",
        description: "text-yellow-700",
      },
      error: {
        container: "bg-red-50 border-red-200",
        title: "text-red-800",
        description: "text-red-700",
      },
      success: {
        container: "bg-green-50 border-green-200",
        title: "text-green-800",
        description: "text-green-700",
      },
      info: {
        container: "bg-blue-50 border-blue-200",
        title: "text-blue-800",
        description: "text-blue-700",
      },
    };
    return styles[type];
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-5 h-5 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">개선 제안</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion) => {
          const style = getStyleByType(suggestion.type);
          return (
            <div
              key={suggestion.id}
              className={`p-4 border rounded-lg ${style.container}`}
            >
              <div className={`font-medium mb-2 ${style.title}`}>
                {suggestion.title}
              </div>
              <div className={`text-sm ${style.description}`}>
                {suggestion.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImprovementSuggestions;
