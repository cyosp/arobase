# arobase
Linux desktop app for https://chat.google.com

## Run app from Debian

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
 
# Development context

Desktop app is developed and tested on Debian Bullseye with Xfce 4.14
 
# Release notes

Release notes can be accessed here: [RELEASE-NOTES.md](RELEASE-NOTES.md)
