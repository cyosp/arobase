const {ipcMain} = require("electron");
const trayIcon = require("./tray-icon");
const browserWindow = require("./browser-window");

const PERSONAL_NOTIFICATION = "personal-notification";
const CHANNEL_NOTIFICATION = "channel-notification";

ipcMain.on("favicon-changed", (ipcMainEvent, href) => {
    let status = computeStatus(href);
    trayIcon.setImage(status);
    browserWindow.setIcon(status);
    flashBrowserWindow(status);
});

function computeStatus(href) {
    let status = "offline";
    if (href.match(/new-notif/))
        status = PERSONAL_NOTIFICATION;
    else if (href.match(/new-non-notif/))
        status = CHANNEL_NOTIFICATION;
    else if (href.match(/no-new/))
        status = "online";
    return status;
}

function flashBrowserWindow(status) {
    browserWindow.flashFrame(status === PERSONAL_NOTIFICATION || status === CHANNEL_NOTIFICATION);
}
