---
source: https://reactnative.dev/docs/0.87/libraries
---

# Using Libraries

This guide introduces React Native developers to finding, installing, and using third-party libraries in their apps. If the Core Components and APIs don't have what you are looking for, you may be able to find and install a library from the community to add the functionality to your app.

## Signature / Usage

Install a library (example: `react-native-webview`):

**npm**

```shell
npm install react-native-webview
```

**Yarn**

```shell
yarn add react-native-webview
```

#### Linking Native Code on iOS

React Native uses CocoaPods to manage iOS project dependencies and most React Native libraries follow this same convention. If a library you are using does not, then please refer to their README for additional instruction. In most cases, the following instructions will apply.

Run `pod install` in our `ios` directory in order to link it to our native iOS project. A shortcut for doing this without switching to the `ios` directory is to run `npx pod-install`.

```bash
npx pod-install
```

Once this is complete, re-build the app binary to start using your new library:

**npm**

```shell
npm run ios
```

**Yarn**

```shell
yarn ios
```

#### Linking Native Code on Android

React Native uses Gradle to manage Android project dependencies. After you install a library with native dependencies, you will need to re-build the app binary to use your new library:

**npm**

```shell
npm run android
```

**Yarn**

```shell
yarn android
```

### Selecting a Package Manager

React Native libraries are typically installed from the [npm registry](https://www.npmjs.com/) using a Node.js package manager such as [npm CLI](https://docs.npmjs.com/cli/npm) or [Yarn Classic](https://classic.yarnpkg.com/en/). If you have Node.js installed on your computer then you already have the npm CLI installed. Some developers prefer to use Yarn Classic for slightly faster install times and additional advanced features like Workspaces. Both tools work great with React Native.

### Finding Libraries

- [React Native Directory](https://reactnative.directory) is a searchable database of libraries built specifically for React Native. This is the first place to look for a library for your React Native app.
- Many of the libraries you will find on the directory are from [React Native Community](https://github.com/react-native-community/) or [Expo](https://docs.expo.dev/versions/latest/). Community libraries are driven by volunteers and individuals at companies that depend on React Native; they often support iOS, tvOS, Android, Windows, but this varies across projects. Libraries built by Expo are all written in TypeScript and support iOS, Android, and `react-native-web` wherever possible.
- After React Native Directory, the [npm registry](https://www.npmjs.com/) is the next best place. The libraries it lists may not all be compatible with React Native.

### Determining Library Compatibility

- **Does it work with React Native?** Usually libraries built _specifically for other platforms_ will not work with React Native. Examples include `react-select` which is built for the web and specifically targets `react-dom`, and `rimraf` which is built for Node.js and interacts with your computer file system. Other libraries like `lodash` use only JavaScript language features and work in any environment. The easiest way to find out is to try it yourself. You can remove packages using `npm uninstall` if it turns out that it does not work in React Native.
- **Does it work for the platforms that my app supports?** React Native Directory allows you to filter by platform compatibility, such as iOS, Android, Web, and Windows. If the library is not listed there, refer to its README.
- **Does it work with my app version of React Native?** The latest version of a library is typically compatible with the latest version of React Native. If you are using an older version, refer to the README to know which version of the library to install: `npm install <library-name>@<version-number>`, for example: `npm install @react-native-community/netinfo@^2.0.0`.

## Notes

- The terms "library" and "package" are used interchangeably in the JavaScript community.

## Related

- [upgrading.md](./upgrading.md)
- [typescript.md](./typescript.md)
