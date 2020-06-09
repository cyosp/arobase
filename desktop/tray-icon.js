const {app, Tray, Menu} = require("electron");
const browserWindow = require("./browser-window");
const appPackage = require("./package.json");
const i18n = require("./i18n");

let trayIcon;

function imagePath(status) {
    return app.getAppPath() + "/icons/tray/" + status + ".png";
}

function setToolTip() {
    trayIcon.setToolTip(appPackage.name + " " + appPackage.version);
}

function setContextMenu() {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: i18n.translate("trayIcon.contextMenu.showMinimize"),
            click: browserWindow.toggleShowMinimize
        }
    ]);
    trayIcon.setContextMenu(contextMenu);
}

module.exports = {
    build: () => {
        i18n.setup();
        trayIcon = new Tray(imagePath("offline"));
        setToolTip();
        setContextMenu();
    },
    setImage: (status) => {
        trayIcon.setImage(imagePath(status));
    }
}
