const {app} = require("electron");
const browserWindow = require("./browser-window");
const trayIcon = require("./tray-icon");
require("./event-handler");

app.whenReady().then(() => {
    browserWindow.build();
    trayIcon.build();
});
