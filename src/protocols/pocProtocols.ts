export type Responsible = {
    id: number;
    name: string;
};

export type CreateResponsibleData = Omit<Responsible, "id">;

export type Task = {
    id: number;
    name: string;
    responsibleId: number;
    description: string;
    status: string;
};

export type CreateTaskData = Omit<Task, "id">;

export type TaskReport = {
    id: number;
    description: string;
    taskId: number;
    responsibleId: number;
};

export type TaskReportData = Omit<TaskReport, "id">;
