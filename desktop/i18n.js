const {app} = require("electron");
const _ = require("lodash");
const fs = require("fs");

const I18N_FOLDER = "./i18n/";
const DEFAULT_LANGUAGE = "en";

let i18n;
let language;
let configuration;

function loadConfiguration() {
    configuration = new Map();
    fs.readdirSync(I18N_FOLDER).forEach(fileName => {
        let languageFromFileName = fileName.replace(".json", '');
        configuration.set(languageFromFileName, I18N_FOLDER + fileName);
    });
}

function setLanguage(value) {
    try {
        language = value;
        i18n = require(configuration.get(language));
    } catch (e) {
        language = DEFAULT_LANGUAGE;
        i18n = require(configuration.get(language));
    }
}

module.exports = {
    setup: () => {
        loadConfiguration();
        setLanguage(app.getLocale())
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
