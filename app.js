const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const Database = require("./systems/Database").default;
const Plugin = require("./plugin").default;
const SessionAPI = require("./systems/SessionAPI").default;

module.exports = class Application {

    Settings;
    Port = 80;
    DB;
    PluginSystem;
    SessionAPI;

    /**
     * 
     * @param {object} Settings
     */
    constructor(Settings) {
        this.Settings = Settings;
        this.Port = Settings.Port;
        this.App = express();

        this.DB = new Database(Settings.DataBaseSettings);
        this.SessionAPI = new SessionAPI();
        this.PluginSystem = new Plugin();
    }

    #GetArgs() {
        return {
            Models : this.Models,
            DB : this.DB,
            Settings : this.Settings,
            SessionAPI : this.SessionAPI,
            App : this.App
        }
    }

    GetPluginSystem() {
        return this.PluginSystem;
    }

    async Start() {
        await this.DB.Init();

        this.PluginSystem.RunHook("OnStart", this.#GetArgs());

        this.MiddleWare();
        this.Route();
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
