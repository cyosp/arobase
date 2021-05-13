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
            spellcheck: true,
            webSecurity: false
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
    browserWindow.webContents.setWindowOpenHandler(({url}) => {
        // Avoid new app window
        if (url !== "about:blank#blocked")
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
    browserWindow.loadURL("https://mail.google.com/chat/u/0/");
}

function registerFaviconChangedEvent() {
    browserWindow.webContents.on("dom-ready", () => {
        browserWindow.webContents.executeJavaScript(
            "try {" +

            "   let previousNotificationType = '';" +
            "   let conversationsDiv = document.querySelector('div.V6.CL.V2.X9.Y2');" +
            "   let roomsDiv = document.querySelector('div.V6.CL.su.ahD.X9.Y2');" +
            "   let roomsDocument = document.body.querySelector(\"iframe.Xu\").contentWindow.document;" +

            "   if(conversationsDiv && roomsDiv && roomsDocument) {" +
            "      let notificationChanged = function() {" +
            "         const ipcRender = require('electron').ipcRenderer;" +

            "         const conversationsSpan = conversationsDiv.querySelector('span > span.akt > span');" +
            "         const roomsSpan = roomsDiv.querySelector('span > span.akt > span');" +

            "         let personalNotificationNumber = 0;" +

            "         if(conversationsSpan && conversationsSpan.textContent) personalNotificationNumber += parseInt(conversationsSpan.textContent);" +
            "         if(roomsSpan && roomsSpan.textContent) personalNotificationNumber += parseInt(roomsSpan.textContent);" +

            "         let notificationType = 'O';" +
            "         if(personalNotificationNumber > 0) notificationType = 'P';" +
            "         else {" +
            "            let hasNotification = false;" +
            "            var allRoomsSpan = roomsDocument.getElementsByTagName(\"span\");" +
            "            for (var i=0; i < allRoomsSpan.length && !hasNotification; i++) {" +
            "               let clazz = allRoomsSpan[i].getAttribute('class');" +
            "               if(clazz && clazz.includes('H7du2')) {" +
            "                  hasNotification = true;" +
            "                  notificationType = 'C';" +
            "               };" +
            "            };" +
            "         };" +

            "          if(previousNotificationType !== notificationType) {" +
            "             previousNotificationType = notificationType;" +
            "             ipcRender.send('notification-status-change', notificationType);" +
            "          };" +
            "       };" +

            "      notificationChanged();" +

            "      let mutationObserver = new MutationObserver(notificationChanged);" +
            "      mutationObserver.observe(conversationsDiv, {" +
            "         characterData: true," +
            "         subtree: true," +
            "         childList: true," +
            "         attributes: true" +
            "      });" +

            "      let mutationObserverS = new MutationObserver(notificationChanged);" +
            "      mutationObserverS.observe(roomsDocument.body, {" +
            "         characterData: true," +
            "         subtree: true," +
            "         childList: true," +
            "         attributes: true" +
            "      });" +

            "   } else {" +
            "      console.error( 'Missing root element(s)');" +
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
