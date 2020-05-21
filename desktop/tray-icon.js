const {app, Tray} = require("electron");
let trayIcon;

function imagePath(status) {
    return app.getAppPath() + "/icons/tray/" + status + ".png";
}

module.exports = {
    build: () => {
        trayIcon = new Tray(imagePath("offline"));
    },
    setImage: (status) => {
        trayIcon.setImage(imagePath(status));
    }
}
