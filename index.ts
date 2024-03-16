const app = require("./app");
const DBSource = require("./Database/DataSource").default;

const path = require("path");
const Plugin1 = require("./develop/p1/Plugin1");

async function Main() {
    const App = new app({
        Port: 80,
        DataBaseSettings : {
            Source : DBSource
        }
    });

    let PS = App.GetPluginSystem();
    let P1 = new Plugin1(PS);

    await App.Start();

    App.Listen();
}

Main();
