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