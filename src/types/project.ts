export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: any;
  startDate: string;
  endDate?: string;
  featured: boolean;
}