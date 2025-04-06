export class CreateTaskDto{
    id: number;
    title: string;
    description: string;
    images: string[];
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    status?: string;
    plannedDate: Date;
    assignedTo?: number[];
    assignedTold: number;
}