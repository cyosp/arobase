const appSettings = require("electron-settings");
const logger = require("./logger");
const converter = require("./converter");

const FOCUS_EVENT = "focus";
const WINDOW_STATE_PATH = "window.state";

let window;

let state = {
    bounds: {
        x: undefined,
        y: undefined,
        width: 600,
        height: 800
    },
    maximized: false,
    minimized: false,
    focused: true
};

function restoreDisplay() {
    window.removeListener(FOCUS_EVENT, restoreDisplay);

    if (state.maximized)
        window.maximize();
    else {
        if (state.minimized)
            window.minimize();
        else {
            if (state.focused)
                window.focus();
            else
                window.blur();
        }
    }
}

module.exports = {
    load: () => {
        if (appSettings.has(`${WINDOW_STATE_PATH}`))
            state = appSettings.get(`${WINDOW_STATE_PATH}`);
        logger.debug("State loaded: " + converter.toString(state));
    },
    x: () => {
        return state.bounds.x;
    }, y: () => {
        return state.bounds.y;
    }, width: () => {
        return state.bounds.width;
    }, height: () => {
        return state.bounds.height;
    },
    setWindow: (electronWindow) => {
        window = electronWindow;
    },
    restoreDisplayOnFocus: () => {
        window.on(FOCUS_EVENT, restoreDisplay);
    },
    saveOnClose: () => {
        window.on("close", () => {
            state.bounds = window.getBounds();
            state.maximized = window.isMaximized();
            state.minimized = window.isMinimized();
            state.focused = window.isFocused();
            appSettings.set(`${WINDOW_STATE_PATH}`, state);
            logger.debug("State saved: " + converter.toString(state));
        });
    }
}
