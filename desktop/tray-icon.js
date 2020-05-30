const {app, Tray, Menu} = require("electron");
const browserWindow = require("./browser-window");

let trayIcon;

function imagePath(status) {
    return app.getAppPath() + "/icons/tray/" + status + ".png";
}

function setContextMenu() {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Display",
            click: browserWindow.show
        }
    ]);
    trayIcon.setContextMenu(contextMenu);
}

module.exports = {
    build: () => {
        trayIcon = new Tray(imagePath("offline"));
        setContextMenu();
    },
    setImage: (status) => {
        trayIcon.setImage(imagePath(status));
    }
}
