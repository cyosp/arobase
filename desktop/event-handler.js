const {ipcMain} = require("electron");
const trayIcon = require("./tray-icon");
const browserWindow = require("./browser-window");

ipcMain.on("favicon-changed", (ipcMainEvent, href) => {
    let status = computeStatus(href);
    trayIcon.setImage(status);
    browserWindow.setIcon(status);
});

function computeStatus(href) {
    let status = "offline";
    if (href.match(/new-notif/))
        status = "personal-notification";
    else if (href.match(/new-non-notif/))
        status = "channel-notification";
    else if (href.match(/no-new/))
        status = "online";
    return status;
}