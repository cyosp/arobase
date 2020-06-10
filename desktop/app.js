const {app} = require("electron");
const browserWindow = require("./browser-window");
const trayIcon = require("./tray-icon");
require("./event-handler");

app.whenReady().then(() => {
    trayIcon.build();
    browserWindow.build();
});
