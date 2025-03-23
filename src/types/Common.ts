export interface Report {
  id: string;
  startTime: string;
  endTime: string;
  content: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const DefaultCategoryColor = '#7986CB';