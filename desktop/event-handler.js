const {ipcMain} = require("electron");

ipcMain.on("favicon-changed", (ipcMainEvent, href) => {
    let status = computeStatus(href);
    console.debug("Status: " + status);
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