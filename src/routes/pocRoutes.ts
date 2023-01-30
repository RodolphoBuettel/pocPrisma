import { Router } from "express";
import { createResponsible, createTask, createTaskReport, deleteTask, listMyTask, myReport, myTask, uptadeTask } from "../controllers/pocControllers.js";

const route = Router();

route.post("/createResponsible", createResponsible);

route.post("/createTask", createTask);

route.delete("/deleteTask/:id", deleteTask);

route.patch("/updateTask", uptadeTask);

route.get("/myTasks/:responsibleId", listMyTask);

route.get("/task/:id", myTask);

route.post("/report", createTaskReport);

route.get("/myReports", myReport);

export default route;