"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const db_1 = require("../../database/db");
class usersController {
    constructor() {
        this.getusers = async (req, res) => {
            const response = await this.usersDAO.getAllUsers();
            res.status(200).json(response);
        };
        this.getUsersById = async (req, res) => {
            const id = parseInt(req.params.id);
            const response = await this.usersDAO.findUserByID(id);
            res.json(response.user);
        };
        this.createusers = async (req, res) => {
            const response = await this.usersDAO.addUser(req.body);
            res.status(200).json({ response: response });
        };
        this.updateusers = async (req, res) => {
            const id = parseInt(req.params.id);
            const user = req.body;
            const response = await this.usersDAO.updateUser(id, user);
            res.status(200).json({ response: response });
        };
        this.deleteusers = async (req, res) => {
            const userId = parseInt(req.params.id);
            const response = await this.usersDAO.deleteUser(userId);
            res.status(200).send({ response: response });
        };
        this.usersDAO = new db_1.usersDataService();
    }
}
exports.usersController = usersController;
