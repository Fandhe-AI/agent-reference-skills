---
source: https://docs.expo.dev/build/setup/
---

# Create your first build

Learn how to create a build for your app with EAS Build.

## Signature / Usage

```sh
# Install EAS CLI (or use `npx eas-cli@latest` in place of `eas`)
npm install --global eas-cli

# Log in (check with `eas whoami`)
eas login

# Configure the project (creates eas.json)
eas build:configure

# Development builds use expo-dev-client
npx expo install expo-dev-client

# Build
eas build --platform android
eas build --platform ios
eas build --platform all
```

Create a sample project:

```sh
npx create-expo-app@latest my-app --template default@sdk-58
```

## Notes

- Prerequisites: a React Native Android or iOS project, and an Expo account (available on the Free plan; paid plans add build concurrency, priority queueing and larger build timeouts).
- Store builds need a Google Play Developer membership (one-time $25 USD) or an Apple Developer Program membership ($99 USD).
- Signing: let EAS CLI handle credentials (Android: `Generate new keystore`; iOS: sign in to Apple Developer account and follow prompts), or provide your own (see existing/local credentials). Credentials from `expo build:android` / `expo build:ios` can be reused.
- Attach a note to a build with `--message`, e.g. `eas build --platform ios --message "Some message"`.
- `eas build` waits for completion by default (interruptible); list builds with `eas build:list`.
- Additional configuration: environment variables, monorepos (build-with-monorepos.md), private npm packages, specific tool versions (build-eas-json.md).
- Install directly to an Android device/iOS Simulator only if built for that purpose; store builds go through the stores (TestFlight etc.). Submit with EAS Submit.
- Source modificationDate: October 16, 2026 (fetched 2026-10-17).

## Related

- [EAS Build](./build-introduction.md)
- [Configure EAS Build with eas.json](./build-eas-json.md)
- [App credentials](./app-credentials.md)
- [Trigger builds from CI](./building-on-ci.md)
