---
source: https://reactnative.dev/docs/0.87/upgrading
---

# Upgrade

Commands for upgrading React Native in a non-Expo project. The docs direct you to the Upgrade Helper web tool (react-native-community.github.io/upgrade-helper) for the file diffs between two versions. The official page writes the versions as the placeholders `{{VERSION}}` and `{{REACT_VERSION}}` ("the release versions showing in the diff"); here they are shell variables.

## Upgrade dependencies with npm

```sh
# RN_VERSION: example value (React Native 0.87). REACT_VERSION: set to the react version shown in the Upgrade Helper package.json diff.
RN_VERSION=0.87
npm install react-native@"${RN_VERSION}"
npm install react@"${REACT_VERSION:?set REACT_VERSION from the Upgrade Helper diff}"
```

Set `RN_VERSION` to the target version and `REACT_VERSION` to the value shown in the diff before running.

## Upgrade dependencies with Yarn

```sh
RN_VERSION=0.87
yarn add react-native@"${RN_VERSION}"
yarn add react@"${REACT_VERSION:?set REACT_VERSION from the Upgrade Helper diff}"
```

After updating `package.json`, apply the remaining file changes listed in the Upgrade Helper by hand, then rebuild the project.
