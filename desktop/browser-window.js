const {app, shell, BrowserWindow} = require("electron");

let browserWindow;

function build() {
    browserWindow = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            spellcheck: true
        }
    });
    setOfflineIcon();
    loadGoogleChat();
    registerFaviconChangedEvent();
    registerNewWindowEvent();
}

function registerNewWindowEvent() {
    browserWindow.webContents.on("new-window", (event, url) => {
        // Default behavior will be to open URL in a new app window
        // Google Meet for example: https://meet.google.com
        if (!url.match(/\.google\.com/)) {
            // Avoid new app window
            event.preventDefault();
            if (url !== "about:blank")
                shell.openExternal(url)
                    .then(/*nothing*/);
        }
    });
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
    },
    show: () => {
        browserWindow.show();
    },
    flashFrame: (flag) => {
        browserWindow.flashFrame(flag);
    }
}