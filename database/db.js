"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDataService = void 0;
const fs_1 = require("fs");
class usersDataService {
    constructor() {
        this.dataFile = 'src/database/data.json';
    }
    addUser(newObject) {
        let data = this.readFile(this.dataFile);
        console.log('obj', newObject);
        if (data) {
            let newId = this.assignId(data);
            console.log('newid', newId);
            newObject.newUser.id = newId;
            console.log('saving user: ', newObject);
            data.push(newObject.newUser);
            let response = this.saveFile(this.dataFile, data);
            console.log(response);
        }
    }
    updateUser(id, currentUser) {
        let data = this.readFile(this.dataFile);
        let user = this.findUserByID(id);
        console.log('position', user === null || user === void 0 ? void 0 : user.position);
        if (user && data && data.length) {
            data[user.position] = currentUser.newData;
            this.saveFile(this.dataFile, data);
            return "User updated.";
        }
        else {
            return "User not found.";
        }
    }
    findUserByID(id) {
        let data = this.readFile(this.dataFile);
        let foundID = 0;
        console.log('data c', data);
        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    foundID = i;
                }
            }
        }
        console.log('found', foundID !== 0);
        if (foundID !== 0 && data) {
            return { user: data[foundID], position: foundID };
        }
        else {
            return null;
        }
    }
    getAllUsers() {
        let data = this.readFile(this.dataFile);
        return data;
    }
    deleteUser(id) {
        let data = this.readFile(this.dataFile);
        let user = this.findUserByID(id);
        if (user && user.position !== 0 && data) {
            data.splice(user.position, 1);
            this.saveFile(this.dataFile, data);
            return "User Deleted.";
        }
        else {
            return "User not found";
        }
    }
    /* --------------------------------------- */
    /*  Helper Functions */
    /* --------------------------------------- */
    readFile(dataFile) {
        try {
            const data = JSON.parse((0, fs_1.readFileSync)(dataFile, 'utf-8'));
            return data;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    saveFile(dataFile, data) {
        try {
            (0, fs_1.writeFileSync)(dataFile, JSON.stringify(data));
            return "Data saved.";
        }
        catch (error) {
            console.log(error);
            return "Error saving data.";
        }
    }
    assignId(data) {
        let objectId;
        console.log('assign data: ', data);
        if (data && data.length > 0) {
            objectId = data[data.length - 1].id + 1;
        }
        else {
            objectId = 1;
        }
        return objectId;
    }
}
exports.usersDataService = usersDataService;
