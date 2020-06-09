const {app} = require("electron");
const _ = require("lodash");

const I18N_FOLDER = "./i18n/";
const JSON_EXTENSION = ".json";

let i18n;

module.exports = {
    setup: () => {
        try {
            i18n = require(I18N_FOLDER + app.getLocale() + JSON_EXTENSION);
        } catch (e) {
            i18n = require(I18N_FOLDER + "en" + JSON_EXTENSION);
        }
    },
    translate: (keyPath) => {
        return _.get(i18n, keyPath);
    }
}