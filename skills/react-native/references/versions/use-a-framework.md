---
source: https://reactnative.dev/blog/2024/06/25/use-a-framework-to-build-react-native-apps
---

# Use a framework to build React Native apps

Announcement (dated 2024-06-25): using a React Native framework such as Expo is the recommended approach to create new apps; `react-native init` moved out of core to the Community CLI.

## Signature / Usage

```text
npx @react-native-community/cli@latest init
```

## Notes

- A React Native framework is a toolbox with the APIs needed for production-ready apps (navigation, data, native code upgrades, dependency compatibility, native build tools). The post states "you're either using a framework or you're building your own framework".
- As of the post, the only recommended community framework is Expo. Expo (the framework) is and will remain free and open source; Expo Application Services (EAS) is an optional paid service. The RFC (RFC0759) also gives guidelines on how to become a recommended framework.
- Using React Native without a framework continues to be supported; the Community CLI, Template and Upgrade Helper keep working.
- The `react-native init` command moved out of core to `npx @react-native-community/cli@latest init` (repository `react-native-community/cli`).
- The Getting Started page on the website was updated to reflect this recommendation.
- Distinct from the expo skill (if installed), which covers Expo SDK, Expo Router, EAS and Expo CLI; this repository's react-native skill covers React Native core.

## Related

- [../getting-started/environment-setup.md](../getting-started/environment-setup.md)
- [../getting-started/getting-started-without-a-framework.md](../getting-started/getting-started-without-a-framework.md)
