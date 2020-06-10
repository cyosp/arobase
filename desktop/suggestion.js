const {app, Menu, MenuItem} = require("electron");
const i18n = require("./i18n");

module.exports = {
    addOnContextMenu: (browserWindow) => {
        i18n.setup();

        const webContents = browserWindow.webContents;
        webContents.session.setSpellCheckerLanguages([app.getLocale()]);
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
}