import { adminInterfaces } from "./admin.interfaces";
import { writeFileSync, readFileSync } from "fs";
import path from 'path';

export class usersDataService{
    private dataFile: any;
    file = path.join(process.cwd(), 'files', 'data.json');
    constructor(){
        this.dataFile = this.file;
    }
    
    public addUser(newObject: any){
        let data: adminInterfaces.User[] | null = this.readFile(this.dataFile);
        console.log('obj',newObject)
        if(data){
            let newId: number = this.assignId(data);
            console.log('newid',newId)
            newObject.newUser.id = newId;
            console.log('saving user: ',newObject)
            data.push(newObject.newUser);
            let response = this.saveFile(this.dataFile,data);
            console.log(response);
        }
    }
    
    public updateUser(id: number, currentUser: any){
        let data: adminInterfaces.User[] | null = this.readFile(this.dataFile);
        let user: {user: adminInterfaces.User, position: number} | null = this.findUserByID(id);
   
        console.log('position', user?.position)
        if(user && data && data.length){
            data[user!.position] = currentUser.newData;
            this.saveFile(this.dataFile,data);
            return "User updated."
        } else {
            return "User not found."
        }
    
    }
    
    public findUserByID(id: number): ({user: adminInterfaces.User, position: number} | null){
        let data: adminInterfaces.User[] | null = this.readFile(this.dataFile);
        let foundID: number = 0;
        console.log('data c', data)
        if(data && data.length){
            for(let i: number = 0;i < data!.length;i++){
                if(data![i].id === id){
                    foundID = i;
                }
            }
        }
        console.log('found', foundID !==0)
        if (foundID !== 0 && data){
            return {user: data![foundID],position: foundID}
        }else {
            return null
        }
    }
    public getAllUsers(){
        let data: adminInterfaces.User[] | null = this.readFile(this.dataFile);
        return data;
    }
    
    public deleteUser(id: number){
        let data: adminInterfaces.User[] | null= this.readFile(this.dataFile);
        let user: {user: adminInterfaces.User, position: number} | null = this.findUserByID(id);
        if(user && user.position !==0 && data){
            data!.splice(user!.position,1);
            this.saveFile(this.dataFile,data!);
            return "User Deleted."
        }else{
            return "User not found"
        }
    }
    
    /* --------------------------------------- */
    /*  Helper Functions */
    /* --------------------------------------- */
    
    private readFile(dataFile: string){
        try{
            const data: adminInterfaces.User[] = JSON.parse(readFileSync(dataFile,'utf-8'));
            return data;
        }catch(err){
            console.log(err);
            return null
        }
    }
    
    private saveFile(dataFile: string ,data: adminInterfaces.User[]){
        try{
            writeFileSync(dataFile, JSON.stringify(data))
            return "Data saved.";
        }catch(error: any){
            console.log(error)
            return "Error saving data."
        }
    }
    
    private assignId(data: adminInterfaces.User[]){        
        let objectId: number;
        console.log('assign data: ',data)
        if (data && data.length > 0) {
            objectId = data[data.length-1].id + 1;
        } else{
            objectId = 1;
        }
    
        return objectId
    }
}