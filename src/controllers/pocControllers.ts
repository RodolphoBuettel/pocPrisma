import prisma from "../database/database.js";
import { Request, Response } from "express";
import { ResponsibleSchema, TaksSchema } from "../models/schemas.js";
import { CreateResponsibleData, CreateTaskData, Responsible, Task, TaskReportData } from "../protocols/pocProtocols.js";
import { insertResponsible, insertTask } from "../repository/pocRepository.js";


export async function createResponsible(req: Request, res: Response) {
    const responsible = req.body as CreateResponsibleData;

    const { error } = ResponsibleSchema.validate(responsible);
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    insertResponsible(responsible);
    res.sendStatus(201);

}

export async function createTask(req: Request, res: Response) {
    const task = req.body as CreateTaskData;
    const day = new Date();

    const { error } = TaksSchema.validate(task);
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    insertTask(task, day);
    res.sendStatus(201);

}

export async function deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    const taskExist = await prisma.task.findUnique({
        where: {
            id: Number(id),
        },
    })

    if (!taskExist) {
        return res.sendStatus(404);
    }

    try {
        await prisma.task.delete({
            where: {
                id: Number(id),
            },
        });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
}

export async function uptadeTask(req: Request, res: Response) {
    const { status, id } = req.body as Task;

    try {
        await prisma.task.update({
            where: {
                id: Number(id)
            },
            data: {
                status: status,
            },
        })
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
}

export async function listMyTask(req: Request, res: Response) {
    const { responsibleId } = req.params;

    const tasks = await prisma.task.aggregate({
        _count: {
            id: true
        },
        where: {
            responsibleId: Number(responsibleId)
        },

    });

    if (!tasks) {
        return res.sendStatus(404);
    }

    const responsible = await prisma.responsible.findUnique({
        where: {
            id: Number(responsibleId)
        }
    })

    const myTasks = {
        myTask: tasks._count.id,
        name: responsible.name
    }

    res.send(myTasks);
}

export async function myTask(req: Request, res: Response) {
    const { id } = req.params;

    const uniqueTask = await prisma.task.findUnique({
        where: {
            id: Number(id)
        },
    })
    if (!uniqueTask) {
        return res.sendStatus(404);
    }
    res.send(uniqueTask);
}

export async function createTaskReport(req: Request, res: Response) {
    const {taskId, responsibleId, description} = req.body as TaskReportData;

    try{
        await prisma.taskReport.create({
            data: {
                description: description,
                taskId: taskId,
                responsibleId: responsibleId
            },
        })
        res.sendStatus(200);
    } catch(error){
        console.log(error);
    }
}

export async function myReport(req: Request, res: Response) {
    const { id } = req.body as Responsible;

    const myReports = await prisma.responsible.findMany({
        where: {
            id: id
        }, 
        include: {
            taskReport: {
                where: {
                    responsibleId: id
                }
            }
        }
    })
    res.send(myReports);
}