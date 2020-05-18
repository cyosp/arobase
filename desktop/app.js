const {app, BrowserWindow} = require("electron");
const trayIcon = require("./tray-icon");

let browserWindow;

app.whenReady().then(() => {
    trayIcon.build();
    startGoogleChat();
});

function startGoogleChat() {
    browserWindow = new BrowserWindow({
        width: 600,
        height: 800
    });
    setOfflineIcon();
    loadGoogleChat();
}

function setOfflineIcon() {
    browserWindow.setIcon("icons/app/offline.png");
}

function loadGoogleChat() {
    browserWindow.loadURL("https://chat.google.com");
}

app.on('window-all-closed', function () {
    app.quit();
});
