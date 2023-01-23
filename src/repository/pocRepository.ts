import { connection } from "../database/database.js";
import { QueryResult } from "pg";
import { CreateResponsibleData, CreateTaskData, Task } from "../protocols/pocProtocols.js";

export async function insertResponsible(responsible: CreateResponsibleData) {
    try {
        await connection.query("INSERT INTO responsible (name) VALUES ($1)", [responsible.name]);
    } catch (err) {
        console.log(err);
    }
}

export async function insertTask(task: CreateTaskData, day: Date) {
    try {
        await connection.query(`INSERT INTO task 
        (name, "responsibleId", description, day, status)
        VALUES ($1, $2, $3, $4, $5)`, [task.name, task.responsibleId, task.description, day, task.status]);
    } catch (err) {
        console.log(err);
    }

}

export function returnMyTasks(responsibleId: string): Promise<QueryResult<Task>> {


    try {
        return connection.query(`
    SELECT COALESCE(count(t.id), 0) as "myTasks", r.name
    FROM task t
    LEFT JOIN responsible r
    ON r.id = t."responsibleId"
    WHERE t."responsibleId" = $1
    GROUP BY r.name
`, [responsibleId]);
    } catch (err) {
        console.log(err);
    }
}

export function oneTask(id: string): Promise<QueryResult<Task>>{
    try{
      return connection.query(`
            SELECT * FROM task WHERE id = $1
        `, [id]);
    }catch(err){
        console.log(err);
    }
}