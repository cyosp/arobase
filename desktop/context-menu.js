const contextMenu = require('electron-context-menu');
const i18n = require('./i18n');

let dispose;

function build() {
    dispose = contextMenu({
        showLookUpSelection: false,
        showSaveImage: true,
        showSaveImageAs: true,
        showSaveLinkAs: true,
        showInspectElement: false,
        labels: {
            copy: i18n.translate("browserWindow.contextMenu.copy"),
            copyImage: i18n.translate("browserWindow.contextMenu.copyImage"),
            copyLink: i18n.translate("browserWindow.contextMenu.copyLink"),
            cut: i18n.translate("browserWindow.contextMenu.cut"),
            learnSpelling: i18n.translate("browserWindow.contextMenu.learnSpelling"),
            paste: i18n.translate("browserWindow.contextMenu.paste"),
            saveImage: i18n.translate("browserWindow.contextMenu.saveImage"),
            saveImageAs: i18n.translate("browserWindow.contextMenu.saveImageAs"),
            saveLinkAs: i18n.translate("browserWindow.contextMenu.saveLinkAs"),
            searchWithGoogle: i18n.translate("browserWindow.contextMenu.searchWithGoogle")
        }
    });
}

module.exports = {
    build: () => {
        if (typeof dispose === 'function') {
            dispose();
        }
        build();
    }
}