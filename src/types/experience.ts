export interface Experience {
  _id: string;
  title: string;
  organisation: string;
  type: "work" | "education";
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies?: string[];
}