export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface GuideStep {
  step: number;
  title: string;
  description: string;
}

export interface SupportInfo {
  version: string;
  technologies: string[];
  description: string;
}
