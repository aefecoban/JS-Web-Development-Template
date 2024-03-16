import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./Models/User";

let entities = [
    User
]

export default new DataSource({
    type : "sqlite",
    database : "database.sqlite",
    synchronize : true,
    entities : entities,
    logging : true
});
