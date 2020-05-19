const {ipcMain} = require("electron");

ipcMain.on("favicon-changed", (evt, href) => {
    console.debug("Favicon href: " + href)
});