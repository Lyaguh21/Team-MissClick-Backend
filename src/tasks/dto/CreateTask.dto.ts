export class CreateTaskDto {
  title: string;
  content: string;
  images: string[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status?: string;
  plannedDate: Date;
  assignedTo?: number[];
  assignedTold: number;
}
