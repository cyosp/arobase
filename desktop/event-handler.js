const {ipcMain} = require("electron");
const trayIcon = require("./tray-icon");
const browserWindow = require("./browser-window");
const logger = require("./logger");

const PERSONAL_NOTIFICATION = "personal-notification";
const CHANNEL_NOTIFICATION = "channel-notification";

ipcMain.on("notification-status-change", (ipcMainEvent, value) => {
    let notificationDate = new Date();
    logger.debug(notificationDate.toLocaleDateString('fr-FR') + " " + notificationDate.toLocaleTimeString('fr-FR') + ": Notification status change: " + value);

    let status = computeStatus(value);
    trayIcon.setImage(status);
    browserWindow.setIcon(status);
    flashBrowserWindow(status);
});

function computeStatus(value) {
    let status = "offline";
    if (value.match(/P/))
        status = PERSONAL_NOTIFICATION;
    else if (value.match(/C/))
        status = CHANNEL_NOTIFICATION;
    else if (value.match(/O/))
        status = "online";
    return status;
}

function flashBrowserWindow(status) {
    browserWindow.flashFrame(status === PERSONAL_NOTIFICATION || status === CHANNEL_NOTIFICATION);
}
