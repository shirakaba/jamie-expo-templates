# Jamie Expo Templates

We rely on `create-expo@canary` and `@expo/cli@canary` because it's only from the canary releases, namely SDK 51, that creating from subdirectories of GitHub repos becomes supported.

```sh
# Create a given template
npx create-expo@canary --template https://github.com/shirakaba/jamie-expo-templates/tree/main/templates/nativescript

# Build and run the app for the first time
cd name-of-your-app
npm run ios

# When running prebuild, always make sure to pass the --template arg, as
# otherwise it'll just build using the default template,
# `expo-template-bare-minimum`.
#
# No need to specify `@expo/cli@canary` here, as projects created with
# `create-expo@canary` get pinned to it anyway.
npx expo prebuild --platform ios --template https://github.com/shirakaba/jamie-expo-templates/tree/main/templates/nativescript
```
