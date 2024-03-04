const app = require("./app");

const path = require("path");
const Plugin1 = require("./develop/p1/Plugin1");

async function Main() {
    const App = new app({
        Port: 80,
        DataBaseSettings: {
            client: "sqlite3",
            useNullAsDefault: true,
            connection: {
                filename: path.join(__dirname, "database.sqlite")
            }
        }
    });

    let PS = App.GetPluginSystem();
    let P1 = new Plugin1(PS);

    await App.Start();

    App.Listen();
}

Main();
