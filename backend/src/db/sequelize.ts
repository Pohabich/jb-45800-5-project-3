import config from "config";
import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Vacation from "../models/Vacation";


const sequelize = new Sequelize({
    dialect: "mysql",
    models: [User, Vacation],
    logging: console.log,
    ...config.get('db')
})  