export class CreateTaskDto {
  title: string;
  description: string;
  images: string[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status?: string;
  plannedDate: Date;
  assignedTo?: number[];
  assignedTold: number;
}
