const {app, BrowserWindow} = require("electron");

let browserWindow;

function build() {
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

function imagePath(status) {
    return app.getAppPath() + "/icons/app/" + status + ".png";
}

function setOfflineIcon() {
    browserWindow.setIcon(imagePath("offline"));
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

module.exports = {
    build: build,
    setIcon: (status) => {
        browserWindow.setIcon(imagePath(status));
    }
}