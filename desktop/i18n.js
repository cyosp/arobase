const {app} = require("electron");
const _ = require("lodash");
const fs = require("fs");

const I18N_FOLDER = "./i18n/";

let i18n;
let configuration;

function loadConfiguration() {
    configuration = new Map();
    fs.readdirSync(I18N_FOLDER).forEach(fileName => {
        let language = fileName.replace(".json", '');
        configuration.set(language, I18N_FOLDER + fileName);
    });
}

module.exports = {
    getConfiguration: () => {
        return configuration;
    },
    setup: () => {
        loadConfiguration();
        try {
            i18n = require(configuration.get(app.getLocale()));
        } catch (e) {
            i18n = require(configuration.get("en"));
        }
    },
    translate: (keyPath) => {
        return _.get(i18n, keyPath);
    }
}
