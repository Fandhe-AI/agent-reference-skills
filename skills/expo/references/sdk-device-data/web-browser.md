---
source: https://docs.expo.dev/versions/v58.0.0/sdk/webbrowser/
---

# WebBrowser

`expo-web-browser` provides access to the system's web browser and supports handling redirects. On Android it uses `ChromeCustomTabs`; on iOS it uses `SFSafariViewController` or `ASWebAuthenticationSession`, depending on the method called.

## Signature / Usage

```sh
npx expo install expo-web-browser
```

```jsx
import { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.dev');
    setResult(result);
  };
  return (
    <View style={styles.container}>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
      <Text>{result && JSON.stringify(result)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
```

## Options / Props

Methods:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `WebBrowser.openBrowserAsync(url: string, browserParams?: WebBrowserOpenOptions)` | Android, iOS, Web | `Promise<WebBrowserResult>` | Opens the url in `SFSafariViewController` (modal) on iOS and a Chrome custom tab on Android. `browserParams` default `{}`. On iOS the modal Safari does not share cookies with system Safari (use `openAuthSessionAsync` for that). Android resolves `{ type: 'opened' }`; iOS resolves `{ type: 'cancel' }` if the user closed it or `{ type: 'dismiss' }` if closed via `dismissBrowser`. |
| `WebBrowser.openAuthSessionAsync(url: string, redirectUrl?: string \| null, options?: AuthSessionOpenOptions)` | Android, iOS, Web | `Promise<WebBrowserAuthSessionResult>` | Opens a login page and waits for the redirect back into the app. `redirectUrl` on web defaults to `Linking.createURL("")`. `options` default `{}`; used by the browser polyfill when there is no native AuthSession (Android) and ignored otherwise. Resolves `{ type: 'cancel' }` if the user does not permit authentication or closes the browser, `{ type: 'dismiss' }` if closed via `dismissBrowser`. |
| `WebBrowser.dismissBrowser()` | iOS | `Promise<{ type: DISMISS }>` | Dismisses the presented web browser; throws if unavailable. |
| `WebBrowser.dismissAuthSession()` | iOS, Web | `void` | Dismisses the current authentication session; on web closes the popup window. Throws if unavailable. |
| `WebBrowser.maybeCompleteAuthSession(options?: WebBrowserCompleteAuthSessionOptions)` | Web | `WebBrowserCompleteAuthSessionResult` | Possibly completes an auth session in a web popup; call on the page the window redirects to. |
| `WebBrowser.getCustomTabsSupportingBrowsersAsync()` | Android | `Promise<WebBrowserCustomTabsResults>` | Lists packages supporting Custom Tabs; uses `PackageManager.getResolvingActivities` and may not be fully reliable. |
| `WebBrowser.warmUpAsync(browserPackage?: string)` | Android | `Promise<ServiceActionResult>` | Calls `warmUp` on `CustomTabsClient` for the package (default: preferred browser). |
| `WebBrowser.mayInitWithUrlAsync(url: string, browserPackage?: string)` | Android | `Promise<ServiceActionResult>` | Initiates a `CustomTabsSession` and calls `mayLaunchUrl` for the likely first URL. |
| `WebBrowser.coolDownAsync(browserPackage?: string)` | Android | `Promise<ServiceActionResult>` | Removes bindings created by `warmUpAsync` / `mayInitWithUrlAsync`. Bindings are cleared when the app is destroyed. |

`WebBrowserOpenOptions` (all optional):

| Property | Type | Platforms | Description |
| --- | --- | --- | --- |
| browserPackage | `string` | Android | Package name of the browser handling Custom Tabs (list via `getCustomTabsSupportingBrowsersAsync`). |
| controlsColor | `string` | iOS | Tint color for `SFSafariViewController` controls. |
| createTask | `boolean` | Android | Open in a new task vs same task as the app. Default: `true` |
| dismissButtonStyle | `'done' \| 'close' \| 'cancel'` | iOS | Dismiss button style. |
| enableBarCollapsing | `boolean` | all | Hide the toolbar when the user scrolls. |
| enableDefaultShareMenuItem | `boolean` | Android | Add a default share item to the menu. |
| presentationStyle | `WebBrowserPresentationStyle` | iOS | Modal presentation style. Default: `WebBrowser.WebBrowserPresentationStyle.OverFullScreen` |
| readerMode | `boolean` | iOS | Enter Reader mode if available. |
| secondaryToolbarColor | `string` | Android | Secondary toolbar color. |
| showInRecents | `boolean` | Android | Show the site as a separate recents entry; requires `createTask` `true`. Default: `false` |
| showTitle | `boolean` | Android | Show the website title on the toolbar. |
| toolbarColor | `string` | all | Toolbar color. |
| useProxyActivity | `boolean` | Android | Launch via a transparent proxy activity with a different task affinity so the browser is not destroyed when the app is backgrounded; only when `createTask` is `true`. When `true`, `showInRecents` is treated as `true`. Default: `true` |
| windowFeatures | `string \| WebBrowserWindowFeatures` | Web | Features for `window.open()`. |
| windowName | `string` | Web | Name of the popup window. |

`AuthSessionOpenOptions` extends `WebBrowserOpenOptions` with:

| Property | Type | Description |
| --- | --- | --- |
| preferEphemeralSession (optional) | `boolean` | iOS. Request a private authentication session that does not share cookies with the user's normal browser session (honoring depends on the default browser). Default: `false` |
| preferUniversalLinks (optional) | `boolean` | iOS. Use HTTPS universal link callbacks instead of custom URL scheme callbacks (iOS 17.4+, requires Associated Domains entitlement for the redirect host). When `false` the legacy `callbackURLScheme` API is used. Default: `false` |

Result types and enums:

| Name | Definition |
| --- | --- |
| `WebBrowserResult` | `{ type: WebBrowserResultType }` |
| `WebBrowserRedirectResult` | `{ type: 'success', url: string }` |
| `WebBrowserAuthSessionResult` | `WebBrowserRedirectResult \| WebBrowserResult` |
| `WebBrowserCompleteAuthSessionOptions` | `{ skipRedirectCheck?: boolean }` — attempt to close the window without checking that the redirect matches the cached redirect URL. |
| `WebBrowserCompleteAuthSessionResult` | `{ message: string, type: 'success' \| 'failed' }` |
| `WebBrowserCustomTabsResults` | `browserPackages: string[]`, `servicePackages: string[]`, `defaultBrowserPackage?: string`, `preferredBrowserPackage?: string` |
| `WebBrowserCoolDownResult`, `WebBrowserMayInitWithUrlResult`, `WebBrowserWarmUpResult` | `ServiceActionResult` |
| `WebBrowserWindowFeatures` | `Record<string, number \| boolean \| string>` |
| `WebBrowserResultType` | `CANCEL = "cancel"` (iOS), `DISMISS = "dismiss"` (iOS), `LOCKED = "locked"`, `OPENED = "opened"` (Android) |
| `WebBrowserPresentationStyle` (iOS, maps to `UIModalPresentationStyle`) | `AUTOMATIC = "automatic"`, `CURRENT_CONTEXT = "currentContext"`, `FORM_SHEET = "formSheet"`, `FULL_SCREEN = "fullScreen"`, `OVER_CURRENT_CONTEXT = "overCurrentContext"`, `OVER_FULL_SCREEN = "overFullScreen"`, `PAGE_SHEET = "pageSheet"`, `POPOVER = "popover"` |

Error codes (Web only):

| Code | Description |
| --- | --- |
| `ERR_WEB_BROWSER_REDIRECT` | The window cannot complete the redirect because the invoking window has no reference to its parent (e.g. the parent was reloaded); close the child window manually. |
| `ERR_WEB_BROWSER_BLOCKED` | The popup was blocked or failed to open, e.g. `window.open()` invoked too long after a user input on mobile browsers. |
| `ERR_WEB_BROWSER_CRYPTO` | The environment does not support crypto; run from a secure origin (localhost/https). |

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Web, Included in Expo Go.
- As of iOS 11, `SFSafariViewController` no longer shares cookies with Safari: use `openAuthSessionAsync` for authentication and `openBrowserAsync` for just opening a page (e.g. a privacy policy).
- iOS auth session: the redirect URI set in the authentication server must use the scheme from `expo.scheme` in app.json (e.g. `demo://`, not `https://`). Using `Linking.addEventListener` is not needed and can have side effects.
- Web auth session needs a secure environment (run `npx expo start --https`); a crypto state is stored in `localStorage`, so `maybeCompleteAuthSession` must be invoked from the same origin that started the session. A 1000 ms timer detects a user-closed window and resolves `{ type: 'dismiss' }`. Mobile web browsers block `window.open()` that fires too long after a user interaction.
- Deep links from the browser: with Expo Router they are handled automatically. Without it, add a `Linking.addEventListener` handler before opening the browser and call `dismissBrowser` when it fires (it is not dismissed automatically).
- `maybeCompleteAuthSession` failure messages: `Not supported on this platform` (Android, iOS), `Cannot use expo-web-browser in a non-browser environment` (SSR / node), `No auth session is currently in progress`, `Current URL "<URL>" and original redirect URL "<URL>" do not match` (skip in development with `{ skipRedirectCheck: true }`).
- The package ships a config plugin (CNG); settings that cannot be set at runtime need a new app binary.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-web-browser

## Related

- [AuthSession](./auth-session.md)
- [AppleAuthentication](./apple-authentication.md)
