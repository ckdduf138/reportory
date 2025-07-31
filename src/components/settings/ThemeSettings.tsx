import React from "react";
import { Moon, Sun, Globe, Palette } from "lucide-react";
import { SimpleColorPicker } from "../ui";
import { AppSettings, ThemeOption } from "../../types/Settings";

interface ThemeSettingsProps {
  settings: AppSettings;
  onSettingChange: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => void;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  settings,
  onSettingChange,
}) => {
  const themeOptions: ThemeOption[] = [
    { value: "light", label: "밝게", icon: Sun },
    { value: "dark", label: "어둡게", icon: Moon },
    { value: "auto", label: "자동", icon: Globe },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-teal-600" />
        <h2 className="text-xl font-bold text-gray-800">테마 설정</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            테마
          </label>
          <div className="grid grid-cols-3 gap-2">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onSettingChange("theme", value)}
                className={`p-3 rounded-lg border transition-colors flex flex-col items-center gap-2 ${
                  settings.theme === value
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기본 색상
          </label>
          <SimpleColorPicker
            selectedColor={settings.primaryColor}
            onColorChange={(color) => onSettingChange("primaryColor", color)}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
