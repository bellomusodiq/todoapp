# todoapp

https://www.loom.com/share/b6cb1f5b0e004b978e6d12a38ae33a2d

this is a cross platform mobile app developed using react native version 0.66 and typescript

## Technology
React, Reactnative, typescript

## Folder structure
1. navigation: this is where the screen are being registered to react-native-navigation
2. layout: this is where the general screen setup is being handled
3. screens: this is a folder that contains each screen
4. constants: this is a folder that contains constant values
5. assets: this folder contains the static images, fonts, videos etc.
6. models: this folders contains the data structure for the data used and methods used in manipulating the data structure, think of it as a mini database.

## Setup on android
 ```
yarn install
react-native run-android
```

## Setup on ios
```
yarn install
npx pod-install
react-native run-ios
```
