const {Tray} = require("electron");

let trayIcon;

function imagePath(status) {
    return "icons/tray/" + status + ".png";
}

module.exports = {
    build: () => {
        trayIcon = new Tray(imagePath("offline"));
    },
    setImage: (status) => {
        trayIcon.setImage(imagePath(status));
    }
}
