const path = require("path");

const fs = require("fs");

const usersRead = require('../helper/usersRead.helper');

const usersWrite = require("../helper/usersWrite.helper");

const filePath = path.join(__dirname, '../dataBase/users.json');

module.exports = {
    getUsers: async (req, res) => {
        const content = await usersRead(filePath);
        res.json(content);
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;
        const content = await usersRead(filePath).then(users => {
            const user = users.find(user => user.id === +user_id);
            res.json(user);
        })
    },

    createUser: async (req, res) => {
        console.log(req.body);
        const content = usersRead(filePath)
            .then(users => res.json(users));
        content.push({...req.body, id: content.length + 1});
        await usersWrite(filePath, content);
        res.json(content);
    },

    deleteUser: async (req, res) => {
        const {user_id} = req.params;
        const data = await usersRead(filePath);
        const users = data.filter(item => item.id !== +user_id);
        await usersWrite(filePath, JSON.stringify(users));
        res.json(users);
    }
}