import path from "path";
import url from "url";
import { app } from "electron";
import is from "electron-is";
import menubar from "menubar";

let mb;

const installExtensions = async () => {
    console.log("TCL: installExtensions -> process.env.NODE_ENV", process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
        const installer = require("electron-devtools-installer");

        const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];

        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

        return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(
            console.log
        );
    }
};

app.on("ready", async () => {
    await installExtensions();

    mb = menubar({
        index: is.dev()
            ? "http://localhost:8888/app.html"
            : url.format({
                  pathname: path.join(__dirname, "app.html"),
                  protocol: "file:",
                  slashes: true
              }),
        icon: path.resolve(__dirname, "rapidapi.png"),
        tooltip: "RapidPing",
        width: 350,
        height: 460,
        fullscreenable: false,
        resizable: false,
        transparent: true,
        webPreferences: {
            backgroundThrottling: false
        },
        alwaysOnTop: true,
        showOnAllWorkspaces: false
        // preloadWindow: true,
    });

    mb.on("after-create-window", () => {
        mb.window.webContents.openDevTools({ mode: "undocked" });
    });
});

app.on("window-all-closed", event => {
    app.dock.hide();
    event.preventDefault();
});
