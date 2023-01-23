import { connection } from "../database/database.js";
import { Request, Response } from "express";
import { ResponsibleSchema, TaksSchema } from "../models/schemas.js";
import { CreateResponsibleData, CreateTaskData, Task } from "../protocols/pocProtocols.js";
import { insertResponsible, insertTask, oneTask, returnMyTasks } from "../repository/pocRepository.js";


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

    const taskExist = await connection.query("SELECT * FROM task WHERE id = $1", [id]);

    if(!taskExist.rows[0]){
        return res.sendStatus(400);
    }

    try {
        await connection.query("DELETE FROM task WHERE id = $1", [id]);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
}

export async function uptadeTask(req: Request, res: Response) {
    const { status, id } = req.body as Task;

    try {
        await connection.query("UPDATE task SET status = $1 WHERE id = $2", [status, id]);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
}

export async function listMyTask(req: Request, res: Response) {
    const { responsibleId } = req.params;

    const tasks = await returnMyTasks(responsibleId);

    if (!tasks.rows[0]) {
        return res.sendStatus(404);
    }
    res.send(tasks.rows);
}

export async function myTask(req: Request, res: Response) {
    const { id } = req.params;

    const uniqueTask = await oneTask(id);
    if (!uniqueTask.rows[0]) {
        return res.sendStatus(404);
    }
    res.send(uniqueTask.rows);
}