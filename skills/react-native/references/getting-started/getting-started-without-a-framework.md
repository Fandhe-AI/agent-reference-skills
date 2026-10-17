---
source: https://reactnative.dev/docs/0.87/getting-started-without-a-framework
---

# Get Started Without a Framework

Create a React Native app with the React Native Community CLI and run it on an Android emulator, without a Framework.

## Signature / Usage

```shell
npx @react-native-community/cli@latest init AwesomeProject
```

Platforms: android, ios, macOS, tv, watchOS, web, windows, visionOS.

### Step 1: Creating a new application

If you previously installed a global `react-native-cli` package, remove it as it may cause unexpected issues:

```shell
npm uninstall -g react-native-cli @react-native-community/cli
```

Use React Native Community CLI (https://github.com/react-native-community/cli) to generate a new project called "AwesomeProject" (command above).

Optional, using a specific version or template:

```shell
npx @react-native-community/cli@X.XX.X init AwesomeProject --version X.XX.X
```

A custom template can be used with the `--template` argument (https://github.com/react-native-community/cli/blob/main/docs/init.md#initializing-project-with-custom-template).

If you are having trouble with iOS, reinstall the dependencies:

1. `cd ios` to navigate to the `ios` folder.
2. `bundle install` to install Bundler (https://bundler.io/)
3. `bundle exec pod install` to install the iOS dependencies managed by CocoaPods.

### Step 2: Start Metro

Metro (https://metrobundler.dev/) is the JavaScript build tool for React Native. From your project folder:

**npm**

```shell
npm start
```

**Yarn**

```shell
yarn start
```

### Step 3: Start your application

Let Metro Bundler run in its own terminal. Open a new terminal inside your project folder and run:

**npm**

```shell
npm run android
```

**Yarn**

```shell
yarn android
```

If everything is set up correctly, you should see your new app running in your Android emulator shortly. This is one way to run your app; you can also run it directly from within Android Studio.

### Step 4: Modifying your app

- Open `App.tsx` in your text editor of choice and edit some lines.
- Press the R key twice or select `Reload` from the Dev Menu (Ctrl + M) to see your changes.

## Notes

- Prerequisite: first set up your environment (`set-up-your-environment`).
- The `init` step is not necessary if you are integrating React Native into an existing application, if you have installed Expo (https://docs.expo.dev/bare/installing-expo-modules/) in your project, or if you are adding Android support to an existing React Native project (see `integration-with-existing-apps`). A third-party CLI such as Ignite CLI (https://github.com/infinitered/ignite) can also be used.
- Metro is similar to web bundlers such as Vite and webpack, but is designed end-to-end for React Native. For instance, Metro uses Babel (https://babel.dev/) to transform syntax such as JSX into executable JavaScript.
- If you can't get this to work, see `troubleshooting`.
- Next: to add this React Native code to an existing application see `integration-with-existing-apps`; to learn more see `getting-started` (Introduction).
- Expo's own CLI and workflow (create-expo-app, Expo Router, EAS) are outside this skill.

## Related

- [Set Up Your Environment](./set-up-your-environment.md)
- [Integration with Existing Apps](./integration-with-existing-apps.md)
- [Troubleshooting](./troubleshooting.md)
- [Get Started with React Native](./environment-setup.md)
