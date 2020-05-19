const {app, BrowserWindow} = require("electron");
const trayIcon = require("./tray-icon");
require("./event-handler");

let browserWindow;

app.whenReady().then(() => {
    trayIcon.build();
    startGoogleChat();
});

function startGoogleChat() {
    browserWindow = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    setOfflineIcon();
    loadGoogleChat();
    registerFaviconChangedEvent();
}

function setOfflineIcon() {
    browserWindow.setIcon("icons/app/offline.png");
}

function loadGoogleChat() {
    browserWindow.loadURL("https://chat.google.com");
}

function registerFaviconChangedEvent() {
    browserWindow.webContents.on("dom-ready", () => {
        browserWindow.webContents.executeJavaScript(
            "try {" +
            "   let favicon = document.querySelector('link#favicon16');" +
            "   if(favicon) {" +
            "      const ipcRender = require('electron').ipcRenderer;" +
            "      let notifyFaviconChanged = function() {" +
            "         if(favicon.href)" +
            "            ipcRender.send('favicon-changed', favicon.href);" +
            "         else" +
            "            console.error('Missing favicon href attribute');" +
            "      };" +
            "      notifyFaviconChanged();" +
            "      let mutationObserver = new MutationObserver(notifyFaviconChanged);" +
            "      mutationObserver.observe(favicon, {" +
            "         attributes: true" +
            "      });" +
            "   } else {" +
            "      console.error( 'Missing favicon element');" +
            "   }" +
            "} catch (e) {" +
            "  console.error(e);" +
            "}"
        );
    });
}

app.on('window-all-closed', function () {
    app.quit();
});
