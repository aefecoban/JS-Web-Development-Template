import { DataSource } from "typeorm";

export default class Database {

    DB : DataSource;

    constructor(DBSettings : {
        Source : DataSource
    }) {
        this.DB = DBSettings.Source;
    }

    async Init(){
        await this.DB.initialize();
    }

    GetDB() {
        return this.DB;
    }

}
