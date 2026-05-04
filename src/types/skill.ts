export interface Skill {
  _id: string;
  name: string;
  category: "language" | "framework" | "tool" | "concept" | "hardware";
  proficiency: number; // 1–5
}