# Jamie Expo Templates

We rely on `create-expo@canary` and `@expo-cli@canary` because it's only from the canary releases, namely SDK 51, that creating from subdirectories of GitHub repos becomes supported.

```sh
# Create a given template
npx create-expo@canary --template https://github.com/shirakaba/jamie-expo-templates/tree/main/templates/bare-minimum-typescript

# Prebuild using that same template again (rather than the default, expo-template-bare-minimum)
npx expo prebuild@canary --template https://github.com/shirakaba/jamie-expo-templates/tree/main/templates/bare-minimum-typescript
```
