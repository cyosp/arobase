const {app, Menu, MenuItem} = require("electron");
const appSettings = require("electron-settings");
const logger = require("./logger");
const i18n = require("./i18n");

const CORRECTION_LANGUAGE_PATH = "spellChecker.language";
const DEFAULT_LANGUAGE = "en";

let language;
let session;

function loadSpellCheckerLanguage() {
    let lang;
    if (appSettings.has(`${CORRECTION_LANGUAGE_PATH}`)) {
        lang = appSettings.get(`${CORRECTION_LANGUAGE_PATH}`);
        logger.debug("Spell checker language loaded: " + lang);
    } else {
        lang = app.getLocale();
    }
    setSpellCheckerLanguage(lang);
}

function setSpellCheckerLanguage(value) {
    try {
        language = value;
        session.setSpellCheckerLanguages([language]);
    } catch (e) {
        language = DEFAULT_LANGUAGE;
        session.setSpellCheckerLanguages([language]);
    }
    appSettings.set(`${CORRECTION_LANGUAGE_PATH}`, language);
}

function buildSuggestionList(browserWindow) {
    const webContents = browserWindow.webContents;
    webContents.on("context-menu", (event, parameters) => {
        if (parameters.dictionarySuggestions && parameters.dictionarySuggestions.length) {
            const menu = new Menu();
            menu.append(new MenuItem({
                label: i18n.translate("browserWindow.contextMenu.suggestions"),
                enabled: false
            }));
            menu.append(new MenuItem({
                type: "separator"
            }));
            parameters.dictionarySuggestions.map(suggestion => {
                menu.append(new MenuItem({
                    label: suggestion,
                    click(menuItem, window) {
                        window.webContents.insertText(suggestion)
                            .then(/*nothing*/);
                        menu.closePopup(this);
                    }
                }));
            });
            menu.popup({
                window: browserWindow,
                x: parameters.x,
                y: parameters.y
            });
        }
    });
}

module.exports = {
    setSpellCheckerLanguage: setSpellCheckerLanguage,
    setup: (browserWindow) => {
        session = browserWindow.webContents.session;
        loadSpellCheckerLanguage();
        buildSuggestionList(browserWindow);
    },
    getLanguage: () => {
        return language;
    }
}
