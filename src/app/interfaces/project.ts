import { View } from './view';

export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  companyName: string;
  position: string;
  client: string;
  technologies: string[];
  views: View[];
}
