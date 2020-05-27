# arobase
Linux desktop app for https://chat.google.com

## Run app from Debian

```
cd desktop
npm i
npm start -- --no-sandbox
```

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
