# Arobase

Linux desktop app for https://chat.google.com

## Development context

App is developed and tested on **Debian Bullseye** with **Xfce 4.14**

## Main features

 * Tray and app icons change according to notifications
 * App flashes in taskbar for personal or channel notification
 * Spell checker with suggestions
 * Open non Google URL into default system app
 * Tray icon context menu to show or minimize app
 * Restore window state on app startup
 * Tray icon tooltip displays app version
 
### Release notes

They can be accessed here: [RELEASE-NOTES.md](RELEASE-NOTES.md)

## Run app on Debian

```
cd desktop
npm i
npm start -- --no-sandbox
```

### Options

 * `--debug`
 
    Display debug messages on console

## System tray info
 
Starting Electron 8, system tray integration has changed and is based on DBus.

It means tray icon could not appear in your desktop environment.

In that case, search in your desktop environment how to add and configure a component whose name could contain:
 * *statusnotifier*
 * *appindicator*
 * *sntray*

For Debian Buster and Xfce it's necessary to:
 * Install: `xfce4-sntray-plugin` package.
 * Configure Xfce dashboard to display: `StatusNotifer plugin`.

# Developer

App is based on [Electron](https://github.com/electron/electron).

Here are some quick documentation links and tips:
 * [Browser window](https://www.electronjs.org/docs/api/browser-window)

 * [Tray icon](https://www.electronjs.org/docs/api/tray)
 
    On Linux, tray icon click is ignored

 * [Menu item](https://www.electronjs.org/docs/api/menu-item)
 
 * [Desktop integration](https://github.com/electron/electron/blob/master/docs/tutorial/desktop-environment-integration.md)

