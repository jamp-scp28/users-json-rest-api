import express from "express";
import { adminInterfaces } from "../../database/admin.interfaces";
import { usersDataService } from "../../database/db";

export class usersController { 
    
    private usersDAO!: any; 

    constructor(){
        this.usersDAO = new usersDataService();
    }
    
    public getusers = async (req: express.Request, res: express.Response)=>{
        const response: adminInterfaces.User[] = await this.usersDAO.getAllUsers(); 
        res.status(200).json(response)
    }

    public getUsersById = async (req: express.Request, res: express.Response)=>{
        const id = parseInt(req.params.id);
        const response: any = await this.usersDAO.findUserByID(id); 
        res.json(response.user)
    }

    public createusers = async (req: express.Request, res: express.Response)=>{
        const response: any = await this.usersDAO.addUser(req.body);
        res.status(200).json({response: response})
    }
    
    public updateusers = async (req: express.Request, res: express.Response)=>{
        const id = parseInt(req.params.id);
        const user = req.body;
        const response = await this.usersDAO.updateUser(id,user); 
        res.status(200).json({response: response})
    }

    public deleteusers = async (req: express.Request, res: express.Response)=>{
        const userId = parseInt(req.params.id);
        const response = await this.usersDAO.deleteUser(userId)
        res.status(200).send({response: response}) 
    }
    
}