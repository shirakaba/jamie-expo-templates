# expo-template-nativescript

A proof-of-concept of [Expo](https://expo.dev) + [NativeScript](https://nativescript.org), made possible by [Node-API](https://nodejs.org/api/n-api.html).

## About

### Expo SDK and React Native support

This proof-of-concept is limited to React Native `v0.72.4` because that's the latest version that supports our old fork of Hermes, which we need to provide Node-API support as explained below.

React Native `0.72.4` was part of Expo SDK 50, so we have to use the `expo@~50.0.4` npm package. However, we must use the CLI from Expo SDK 51 or above to create and prebuild the project (as Expo SDK 51 is when this [PR](https://github.com/expo/expo/pull/27212) landed).

### Node-API support

This project Microsoft's [fork](https://github.com/microsoft/hermes-windows) of Hermes `v0.12.3`, with a few extra [patches](https://github.com/DjDeveloperr/hermes-windows/tree/fix-ios) to add Node-API support (which NativeScript depends upon).

This template provides a ready-built Hermes: `hermes-ios-release.tar.gz`, which it references in `ios/Podfile` via the `HERMES_ENGINE_TARBALL_PATH` environment variable. However, you can build it from source yourself by following [these](https://github.com/shirakaba/jamie-expo-templates/blob/nativescript/templates/nativescript/notes-to-self.md) instructions.

### Supported platforms

NativeScript is only available for iOS for now, so the provided Android template is just the usual [expo-template-bare-minimum](https://github.com/expo/expo/tree/main/templates/expo-template-bare-minimum).

## Setup

### Creating an app from this template

We recommend bun as it installs [much quicker](https://x.com/notbrent/status/1701044351177244790).

```sh
# Via npm
npx create-expo@latest --template https://github.com/shirakaba/jamie-expo-templates/tree/nativescript/templates/nativescript

# Via bun
bun create expo@latest --template https://github.com/shirakaba/jamie-expo-templates/tree/nativescript/templates/nativescript
```

The first time you create the app, it will prebuild it for you as well.

### Prebuilding

The app will be ready-prebuilt upon first creating from this template, but in case you want to do a manual prebuild, here's how.

#### The easy (but slow) way

The easy way is to use the script written into the `package.json`. However, it's slow because it has to download this repo.

```sh
# Via npm
npm run prebuild

# Via bun
bun prebuild
```

#### The fast way

The faster way, if you're planning to prebuild often, is to download this repo yourself and create a ready-packed template that you can prebuild from locally. This avoids having to redownload it on each prebuild.

```sh
git clone --single-branch --branch nativescript git@github.com:shirakaba/jamie-expo-templates.git
cd jamie-expo-templates/templates/nativescript
npm pack
# This will output your local prebuild template: expo-template-nativescript-50.0.33.tgz
```

Now you can prebuild from that template:

```sh
# Via npm
npx expo prebuild --template path/to/expo-template-nativescript-50.0.33.tgz

# Via bun
bunx expo prebuild --template path/to/expo-template-nativescript-50.0.33.tgz

# (Consider committing the template to the repo and adding an npm script for this)
```
