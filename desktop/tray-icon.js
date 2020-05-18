const {Tray} = require("electron");

let trayIcon;

module.exports = {
    build: () => {
        trayIcon = new Tray("icons/tray/offline.png");
    }
}
