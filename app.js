const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const Database = require("./systems/Database");
const ModelLoader = require("./develop/database/ModelLoader");
const Plugin = require("./plugin");

module.exports = class Application {

    Settings;
    Port = 80;
    DB;
    PluginSystem;

    /**
     * 
     * @param {object} Settings
     */
    constructor(Settings) {
        this.Settings = Settings;
        this.Port = Settings.Port;
        this.App = express();

        this.DB = new Database(Settings.DataBaseSettings);
        this.PluginSystem = new Plugin();
    }

    #GetArgs() {
        return {
            Models : this.Models,
            DB : this.DB,
            Settings : this.Settings,
            App : this.App
        }
    }

    GetPluginSystem() {
        return this.PluginSystem;
    }

    async Start() {
        this.Models = ModelLoader(this.DB.GetDB());

        for (const key in this.Models) {
            await (this.Models[key]).CreateTable();
        }

        this.PluginSystem.RunHook("OnStart", this.#GetArgs());

        this.Route();
        this.MiddleWare();
    }

    MiddleWare() {

        this.App.use(cors());

        this.App.use(bodyParser.json());
        this.App.use(bodyParser.urlencoded({ extended: true }));
        
        this.PluginSystem.RunHook("OnMW", this.#GetArgs());

    }

    Route() {
      
        this.PluginSystem.RunHook("OnRoute", this.#GetArgs());
    
    }

    Listen() {
        this.PluginSystem.RunHook("BeforeListen", this.#GetArgs());
        this.App.listen(this.Port, () => {
            this.PluginSystem.RunHook("OnListen", this.#GetArgs());
        });
    }

}
