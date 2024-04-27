# Jamie Expo Templates

While we refer to `create-expo@latest`, the minimum requirement is `create-expo@2.3.1` (as it supports SDK 51).

```sh
# Create a given template
npx create-expo@latest --template https://github.com/shirakaba/jamie-expo-templates/tree/nativescript/templates/nativescript

# Build and run the app for the first time
cd name-of-your-app
npm run ios

# When running prebuild, always make sure to pass the --template arg, as
# otherwise it'll just build using the default template,
# `expo-template-bare-minimum`.
#
# No need to specify `@expo/cli@latest` here, as projects created with
# `create-expo@latest` get pinned to it anyway.
npx expo prebuild --platform ios --template https://github.com/shirakaba/jamie-expo-templates/tree/nativescript/templates/nativescript
```
