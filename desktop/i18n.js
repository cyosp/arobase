const {app} = require("electron");
const appSettings = require("electron-settings");
const logger = require("./logger");
const _ = require("lodash");
const fs = require("fs");

const TRANSLATION_LANGUAGE_PATH = "translation.language";
const I18N_FOLDER = "./i18n/";
const DEFAULT_LANGUAGE = "en";

let i18n;
let language;
let configuration;

function loadConfiguration() {
    configuration = new Map();
    fs.readdirSync(app.getAppPath() + "/" + I18N_FOLDER).forEach(fileName => {
        let languageFromFileName = fileName.replace(".json", '');
        configuration.set(languageFromFileName, I18N_FOLDER + fileName);
    });
}

function loadLanguage() {
    let lang;
    if (appSettings.has(`${TRANSLATION_LANGUAGE_PATH}`)) {
        lang = appSettings.get(`${TRANSLATION_LANGUAGE_PATH}`);
        logger.debug("Language loaded: " + lang);
    } else {
        lang = app.getLocale();
    }
    setLanguage(lang);
}

function setLanguage(value) {
    try {
        language = value;
        i18n = require(configuration.get(language));
    } catch (e) {
        language = DEFAULT_LANGUAGE;
        i18n = require(configuration.get(language));
    }
    appSettings.set(`${TRANSLATION_LANGUAGE_PATH}`, language);
}

module.exports = {
    setup: () => {
        loadConfiguration();
        loadLanguage();
    },
    getLanguages: () => {
        return Array.from(configuration.keys());
    },
    setLanguage: setLanguage,
    getLanguage: () => {
        return language;
    },
    translate: (keyPath) => {
        return _.get(i18n, keyPath);
    }
}
