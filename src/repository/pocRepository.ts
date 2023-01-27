import prisma from "../database/database.js"
import { CreateResponsibleData, CreateTaskData } from "../protocols/pocProtocols.js";

export async function insertResponsible(responsible: CreateResponsibleData) {
    try {
            await prisma.responsible.create({
                data: {
                    name: responsible.name
                },
            });
    } catch (err) {
        console.log(err);
    }
}

export async function insertTask(task: CreateTaskData, day: Date) {
    try {
         await prisma.task.create({
            data: {
                responsibleId: task.responsibleId, 
                name: task.name,
                description: task.description,   
                day: day,                
                status: task.status     
            },
          });
    } catch (err) {
        console.log(err);
    }

}
