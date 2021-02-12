const app = require("electron");
const appSettings = require("electron-settings");
const logger = require("./logger");

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

module.exports = {
    setSpellCheckerLanguage: setSpellCheckerLanguage,
    setup: (browserWindow) => {
        session = browserWindow.webContents.session;
        loadSpellCheckerLanguage();
    },
    getLanguage: () => {
        return language;
    }
}
