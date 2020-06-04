const {app, Tray, Menu} = require("electron");
const browserWindow = require("./browser-window");
const appPackage = require("./package.json");

let translation;

let trayIcon;

function initializeTranslation() {
    const TRANSLATION_FOLDER = "./i18n/";
    const JSON_EXTENSION = ".json";
    try {
        translation = require(TRANSLATION_FOLDER + app.getLocale() + JSON_EXTENSION);
    } catch (e) {
        translation = require(TRANSLATION_FOLDER + "en" + JSON_EXTENSION);
    }
}

function imagePath(status) {
    return app.getAppPath() + "/icons/tray/" + status + ".png";
}

function setToolTip() {
    trayIcon.setToolTip(appPackage.name + " " + appPackage.version);
}

function setContextMenu() {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: translation.trayIcon.contextMenu.showMinimize,
            click: browserWindow.toggleShowMinimize
        }
    ]);
    trayIcon.setContextMenu(contextMenu);
}

module.exports = {
    build: () => {
        initializeTranslation();
        trayIcon = new Tray(imagePath("offline"));
        setToolTip();
        setContextMenu();
    },
    setImage: (status) => {
        trayIcon.setImage(imagePath(status));
    }
}
