export class CreateTaskDto{
    id: number;
    title: string;
    description: string;
    images: string[];
    priority: string;
    status?: string;
    plannedDate?: Date;
    assignedTo?: number[];
    assignedTold: number;
}