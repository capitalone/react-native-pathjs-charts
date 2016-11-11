watchman-update-example-src.sh - Automate file src copies to example app for ease in manual testing

## Intro
Often when making changes to this charting library, you will want to do some manual testing using the example app included with this project. Often, you will have an emulator up and running and it would be nice if you could see a change in the emulator as soon as you make a change to the charting library. The example app, naturally, looks the source for the "installed" version of this charting package in node_modules (just like any other `npm install`ed package) which means every time you make a change to the chart library source and you want to test with the example app, you have to either `npm install` or manually copy the updated source files into node_modules/react-native-pathjs-charts. Wouldn't it be nice if you didn't have to do this each time? The watchman-update-example-src.sh script in this directory solves this by setting up a watchman watch and trigger that looks for *.js source file changes in `/src` and automatically copies them to `example/node_modules/react-native-pathjs-charts`


## Creating the script

From root dir:
```
watchman-update-example-src/create-script-from-template.sh
chmod +x watchman-update-example-src/watchman-update-example-src.sh
```

## Running the script (only need to do once)

From root dir:
```
watchman-update-example-src.sh
```
