const Plugin = require("../../../plugin")

module.exports = class Anime{

    /**
     * 
     * @param {Plugin} PluginSystem 
     */
    constructor(PluginSystem){
        PluginSystem.AddHook("OnStart", (args) => {
            console.log("http://localhost:" + args.Settings.Port)
        })

        PluginSystem.AddHook("OnRoute", (args) => {
            args.App.get("/", (req, res) => {
                res.send("");
            })
        })
    }

}
