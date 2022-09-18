import { Router } from "express";
import { usersController } from "../controllers/user.controller";
const uController: any = new usersController()
const user = Router()

user.get('/',uController.getusers)

user.get("/:id", uController.getUsersById)

user.post("/add", uController.createusers)

user.put("/update/:id", uController.updateusers)

user.delete("/:id", uController.deleteusers)

export default user;
