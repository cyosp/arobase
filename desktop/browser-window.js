const {app, shell, BrowserWindow} = require("electron");
const windowState = require("./window-state");
const spellChecker = require("./spell-checker");

let browserWindow;

function build() {
    windowState.load();
    browserWindow = new BrowserWindow({
        x: windowState.x(),
        y: windowState.y(),
        width: windowState.width(),
        height: windowState.height(),
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            spellcheck: true
        }
    });
    windowState.setWindow(browserWindow);
    windowState.restoreDisplayOnFocus();
    windowState.saveOnClose();
    exitOnClose();
    setOfflineIcon();
    loadGoogleChat();
    spellChecker.setup(browserWindow);
    registerFaviconChangedEvent();
    registerNewWindowEvent();
}

function exitOnClose() {
    browserWindow.on("close", () => {
        app.exit();
    });
}

function registerNewWindowEvent() {
    browserWindow.webContents.on("new-window", (event, url) => {
        // Avoid new app window
        event.preventDefault();
        if (url !== "about:blank")
            shell.openExternal(url)
                .then(/*nothing*/);
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
    toggleShowMinimize: () => {
        browserWindow.isFocused() ? browserWindow.minimize() : browserWindow.show();
    },
    flashFrame: (flag) => {
        browserWindow.flashFrame(flag);
    },
    getSpellCheckerLanguages: () => {
        return browserWindow.webContents.session.availableSpellCheckerLanguages;
    }
}
