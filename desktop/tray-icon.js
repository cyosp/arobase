const {app, dialog, Menu, Tray} = require("electron");
const browserWindow = require("./browser-window");
const appPackage = require("./package.json");
const i18n = require("./i18n");

let trayIcon;

function imagePath(status) {
    return app.getAppPath() + "/icons/tray/" + status + ".png";
}

function about() {
    let promise = dialog.showMessageBox(
        {
            title: i18n.translate("trayIcon.contextMenu.about"),
            icon: app.getAppPath() + "/icons/about.png",
            message: appPackage.name.charAt(0).toUpperCase() + appPackage.name.slice(1),
            detail: appPackage.version,
            buttons: ["ok"]
        }
    )
}

function buildCorrectionMenu() {
    let menu = [];
    i18n.getConfiguration().forEach((value, key) => {
        menu.push({
            label: (key === app.getLocale() ? "✓" : "  ") + " " + key,
            enabled: false
        })
    })
    return menu;
}

function setContextMenu() {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: i18n.translate("trayIcon.contextMenu.showMinimize"),
            click: browserWindow.toggleShowMinimize
        },
        {
            label: i18n.translate("trayIcon.contextMenu.correction"),
            submenu: buildCorrectionMenu()
        },
        {
            label: i18n.translate("trayIcon.contextMenu.about"),
            click: about
        }
    ]);
    trayIcon.setContextMenu(contextMenu);
}

module.exports = {
    build: () => {
        i18n.setup();
        trayIcon = new Tray(imagePath("offline"));
        setContextMenu();
    },
    setImage: (status) => {
        trayIcon.setImage(imagePath(status));
    }
}
