export interface AppSettings {
  theme: "light" | "dark" | "auto";
  primaryColor: string;
}

export interface ThemeOption {
  value: "light" | "dark" | "auto";
  label: string;
  icon: React.ComponentType<any>;
}

export interface DataAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
  variant?: "default" | "danger";
}

export interface AppInfo {
  version: string;
  lastUpdate: string;
  developer: string;
}
