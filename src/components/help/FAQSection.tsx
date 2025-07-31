import React, { useState } from "react";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";
import { getFAQData } from "../../utils/helpUtils";

const FAQSection: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const faqData = getFAQData();

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">자주 묻는 질문</h2>
      </div>

      <div className="space-y-3">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleFAQ(index);
                }
              }}
              className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset transition-colors flex items-center justify-between"
              aria-expanded={expandedFAQ === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span
                id={`faq-question-${index}`}
                className="font-medium text-gray-800"
              >
                {faq.question}
              </span>
              {expandedFAQ === index ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedFAQ === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-4 py-3 bg-white border-t border-gray-200"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
