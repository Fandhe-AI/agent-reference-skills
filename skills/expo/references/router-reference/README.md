# router-reference

| Name | Description | Path |
|------|-------------|------|
| Error handling and loading states | Learn how to handle unmatched routes, errors, and loading states in your app when using Expo Router. | [error-handling.md](./error-handling.md) |
| Handle screen focus | Run effects, render UI, and respond to navigation events when an Expo Router screen is focused. | [focus-handling.md](./focus-handling.md) |
| Link preview | Learn how to add a preview to your link on iOS when using Expo Router. | [link-preview.md](./link-preview.md) |
| Migrate from React Navigation | Learn how to migrate a project using React Navigation to Expo Router. | [migrate-from-react-navigation.md](./migrate-from-react-navigation.md) |
| Migrate Expo Router from SDK 57 to SDK 58 | Learn how to migrate your Expo Router application from SDK 57 to SDK 58. | [migrate-sdk-57-to-58.md](./migrate-sdk-57-to-58.md) |
| Redirects | Learn how to redirect URLs in Expo Router. | [redirects.md](./redirects.md) |
| Reserved paths | URL paths reserved by Metro and Expo Router that you should avoid using for routes or static files. | [reserved-paths.md](./reserved-paths.md) |
| Router | A file-based routing library for React Native and web applications. | [router-api.md](./router-api.md) |
| Router Color | The Color API of Expo Router provides access to platform-specific native colors. | [router-color.md](./router-color.md) |
| Router Experimental Stack | An opt-in sibling to `Stack` built on the `react-native-screens/experimental` stack. Alpha, available for testing only. | [router-experimental-stack.md](./router-experimental-stack.md) |
| Router Link | An Expo Router API that provides `Link`, `Redirect`, preview, menu, and zoom transition components for navigating between routes. | [router-link.md](./router-link.md) |
| Router Native tabs | `expo-router/native-tabs` is a submodule of `expo-router` that exports components to build tab layouts using platform-native system tabs. | [router-native-tabs.md](./router-native-tabs.md) |
| Router Split View | `expo-router/unstable-split-view` is a submodule of `expo-router` that exports components to build split view layouts using platform-native system split views. Alpha API, iOS only. | [router-split-view.md](./router-split-view.md) |
| Router Stack | An Expo Router API that provides the `Stack` navigator, header, toolbar, search bar, and screen components. | [router-stack.md](./router-stack.md) |
| Router UI | `expo-router/ui` is a submodule of `expo-router` that exports headless components and hooks to build custom tab layouts. Use it instead of the built-in navigators bundled with Expo Router, such as JavaScript tabs and native tabs. | [router-ui.md](./router-ui.md) |
| Sitemap | Expo Router injects a **/_sitemap** route that lists all routes in the app, useful for debugging. | [sitemap.md](./sitemap.md) |
| Top-level src directory | Use a top-level **src** directory in an Expo Router project. Projects created with the default template on SDK 55 and later already include **src** containing **app**, **components**, **constants**, and **hooks**; no extra configuration is needed. | [src-directory.md](./src-directory.md) |
| Testing configuration for Expo Router | `expo-router/testing-library` is a set of testing utilities built on `@testing-library/react-native` that lets you create in-memory Expo Router apps pre-configured for testing. | [testing.md](./testing.md) |
| Typed routes | Expo Router supports generating TypeScript types automatically with Expo CLI. This enables `<Link>` and the hooks API to be statically typed. The feature is currently in beta and is not enabled by default. | [typed-routes.md](./typed-routes.md) |
| Using URL parameters | URL parameters include **route parameters** (dynamic segments such as `/profile/[user]`, used to match a route) and **search parameters** (query params such as `/profile?extra=info`, serializable fields commonly used to pass data between pages). | [url-parameters.md](./url-parameters.md) |
