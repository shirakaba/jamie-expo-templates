# Notes to self

_(where self is Jamie)_

## How to build Hermes and package it for React Native

First, you have to build Hermes for all Apple architectures:

```sh
git clone --single-branch --branch fix-ios git@github.com:DjDeveloperr/hermes-windows.git
cd hermes-windows

# To do a release build:
./utils/build-apple-framework.sh
# Or, to do a debug build:
DEBUG=true ./utils/build-apple-framework.sh
```

Next, you have to run React Native's script for generating a Hermes tarball:

```sh
# Create a temporary directory and install react-native npm package into it:
mkdir temp
cd temp
# We install the same version of React Native as used by the template.
npm install react-native@0.72.4

# Spin up node and execute the below script:
node
```

```js
const {
  createHermesPrebuiltArtifactsTarball,
} = require("react-native/scripts/hermes/hermes-utils.js");

createHermesPrebuiltArtifactsTarball(
  // The path to the Hermes directory:
  "/Users/jamie/Documents/git/HermesTest/hermes",
  // The build type (out of 'Debug' and 'Release'):
  "Debug",
  // The directory to output the tarball to:
  "/Users/jamie/Downloads",
  // Whether to include (true) or exclude (false) debug symbols:
  false,
);
```

## Notes from the dark old days before Expo SDK 51

Back in Expo SDK 50, we had to use forks of `create-expo` and `@expo/cli` because Expo prebuild templates corrupted binary files such as our prebuilt Hermes. My [#27212](https://github.com/expo/expo/pull/27212) PR, which landed in SDK 51, fixed all that.

```sh
# Until https://github.com/expo/expo/pull/27212 lands, we rely on forks of
# create-expo and @expo-cli.

# How to build create-expo:
$ cd ~/git/expo/packages/create-expo
$ yarn build
# (this creates ~/git/expo/packages/create-expo/build/index.js)

# How to build @expo-cli:
$ cd ~/git/expo/packages/@expo/cli
$ yarn prepare
# (this creates ~/git/expo/packages/@expo/cli/build/bin/cli)

# How to pack this repo:
$ cd ~/git/expo-template-nativescript
$ npm pack
# (this creates ~/git/expo-template-nativescript/expo-template-nativescript-50.0.33.tgz

# Let's create an app with this under ~/git.
# I've been naming them xns1, xns2, etc.
$ cd ~/git
$ ~/git/expo/packages/create-expo/build/index.js --template ~/git/expo-template-nativescript/expo-template-nativescript-50.0.33.tgz
✔ What is your app named? … xns9
✔ Installed pods and initialized Xcode workspace.

✅ Your project is ready!

To run your project, navigate to the directory and run one of the following yarn commands.

- cd xns9
- yarn android
- yarn ios
- yarn web

# Now let's prebuild it. It's important to specify the template again, as
# otherwise it just prebuilds from the default template,
# expo-template-bare-minimum(?).
#
# In future, if Hermes upstreams Node-API support, we can drop the patch to
# ios/Podfile, and prebuild from the default template just fine, meaning we'd
# only need a template for expo-create.
$ cd xns9
$ ~/git/expo/packages/@expo/cli/build/bin/cli prebuild --template ~/git/expo-template-nativescript/expo-template-nativescript-50.0.33.tgz --platform=ios

# Now lets build it.
# We might not need the forked CLI at this point, but just for consistency.
$ ~/git/expo/packages/@expo/cli/build/bin/cli run:ios
```

However, this process should become much simpler in time.

- If Expo approves merging my [#27212](https://github.com/expo/expo/pull/27212) PR, we can stop using forks of `create-expo` and `@expo/cli`.
- Once Node-API support is upstreamed into Hermes, we can:
  - stop vending `hermes-ios-release.tar.gz`.
  - stop pinning to `react-native@0.72.4`.
  - maybe drop the patch to `ios/Podfile`, either by pinning to some nightly version of `react-native` that includes the new Hermes, or by adding a `resolutions` field to the template's `package.json`.
    - This would mean we could stop instructing users to to pass the `--template` arg to `expo prebuild`.
  - maybe initialise the Objective-C bindings via a JSI module, allowing us to drop the `patch-package` patch to `HermesExecutorFactory.cpp`.
- Once we have published `@nativescript/ios-macos` (or whatever we're going to call it), we can stop vending it as a local npm package.

If we can tackle all of these points, integrating NativeScript may become very easy indeed. Users would just install `@nativescript/react-native`, a npm package holding an autolinked JSI module that would call `objc_bridge_init()` to set up its subdependency, `@nativescript/ios-macos`. We might even be able to retire the template altogether!
