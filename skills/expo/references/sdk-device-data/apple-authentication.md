---
source: https://docs.expo.dev/versions/v58.0.0/sdk/apple-authentication/
---

# AppleAuthentication

`expo-apple-authentication` provides Sign in with Apple for iOS (and tvOS). It does not yet support Android or web.

## Signature / Usage

```sh
npx expo install expo-apple-authentication
```

```json
{
  "expo": {
    "plugins": ["expo-apple-authentication"],
    "ios": {
      "usesAppleSignIn": true
    }
  }
}
```

```jsx
import * as AppleAuthentication from 'expo-apple-authentication';

<AppleAuthentication.AppleAuthenticationButton
  buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
  buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
  cornerRadius={5}
  style={{ width: 200, height: 44 }}
  onPress={async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
    } catch (e) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }}
/>
```

## Options / Props

`AppleAuthenticationButton` (iOS, tvOS) props; extends `ViewProps`:

| Name | Type | Description |
| --- | --- | --- |
| buttonStyle | `AppleAuthenticationButtonStyle` | Apple-defined color scheme. |
| buttonType | `AppleAuthenticationButtonType` | Button text ("Sign In with Apple" vs "Continue with Apple" ...). |
| cornerRadius (optional) | `number` | Border radius, like `style.borderRadius`. |
| onPress | `() => void` | Called on press; call `signInAsync` here. |
| style (optional) | `StyleProp<Omit<ViewStyle, 'backgroundColor' \| 'borderRadius'>>` | Custom style; must not include `backgroundColor` or `borderRadius`. |

Methods (iOS, tvOS):

| Name | Returns | Description |
| --- | --- | --- |
| `AppleAuthentication.isAvailableAsync()` | `Promise<boolean>` | Whether the OS supports Apple authentication. |
| `AppleAuthentication.signInAsync(options?: AppleAuthenticationSignInOptions)` | `Promise<AppleAuthenticationCredential>` | Starts the Apple authentication flow with a modal. Rejects with `ERR_REQUEST_CANCELED` on cancel. |
| `AppleAuthentication.refreshAsync(options: AppleAuthenticationRefreshOptions)` | `Promise<AppleAuthenticationCredential>` | Refreshes the logged-in user's credentials (shows the sign-in modal first). |
| `AppleAuthentication.signOutAsync(options: AppleAuthenticationSignOutOptions)` | `Promise<AppleAuthenticationCredential>` | Ends the authenticated session (shows the sign-in modal first). |
| `AppleAuthentication.getCredentialStateAsync(user: string)` | `Promise<AppleAuthenticationCredentialState>` | Whether a user credential is still valid or revoked. `user` comes from `AppleAuthenticationCredential.user`. Always throws on the iOS simulator. |
| `AppleAuthentication.formatFullName(fullName: AppleAuthenticationFullName, formatStyle?: AppleAuthenticationFullNameFormatStyle)` | `string` | Locale-aware string for a tokenized full name. |
| `AppleAuthentication.addRevokeListener(listener: () => void)` | `EventSubscription` | Subscribes to credential revocation; call `remove()` to unsubscribe. |

`AppleAuthenticationSignInOptions` (all optional): `nonce: string` (prevents replay attacks, see OpenID Connect spec), `requestedScopes: AppleAuthenticationScope[]` (default `[]`; granted only the first time each user signs in), `state: string` (returned unmodified in the credential; RFC6749).

`AppleAuthenticationRefreshOptions`: `user: string`, `requestedScopes?`, `state?`. `AppleAuthenticationSignOutOptions`: `user: string`, `state?`.

`AppleAuthenticationCredential`:

| Property | Type | Description |
| --- | --- | --- |
| authorizationCode | `string \| null` | Short-lived session token for proof of authorization with your server; changes each session. |
| email | `string \| null` | Email; null if the scope was not requested or not the first sign-in. May be an obscured Apple-domain address. |
| fullName | `AppleAuthenticationFullName \| null` | Name; may be null or contain nulls. |
| identityToken | `string \| null` | JWT with information about the user. |
| realUserStatus | `AppleAuthenticationUserDetectionStatus` | Whether the user appears to be a real person. |
| state | `string \| null` | The `state` supplied in the request. |
| user | `string` | Stable user identifier shared across apps from the same development team. |

`AppleAuthenticationFullName` fields (all `string | null`): `familyName`, `givenName`, `middleName`, `namePrefix`, `nameSuffix`, `nickname`.

`AppleAuthenticationFullNameFormatStyle`: `'default' | 'short' | 'medium' | 'long' | 'abbreviated'`.

Enums:

| Enum | Values |
| --- | --- |
| `AppleAuthenticationButtonStyle` | `WHITE = 0`, `WHITE_OUTLINE = 1`, `BLACK = 2` |
| `AppleAuthenticationButtonType` | `SIGN_IN = 0`, `CONTINUE = 1`, `SIGN_UP = 2` (iOS 13.2+) |
| `AppleAuthenticationCredentialState` | `REVOKED = 0`, `AUTHORIZED = 1`, `NOT_FOUND = 2`, `TRANSFERRED = 3` |
| `AppleAuthenticationOperation` | `IMPLICIT = 0`, `LOGIN = 1`, `REFRESH = 2`, `LOGOUT = 3` |
| `AppleAuthenticationScope` | `FULL_NAME = 0`, `EMAIL = 1` |
| `AppleAuthenticationUserDetectionStatus` | `UNSUPPORTED = 0`, `UNKNOWN = 1`, `LIKELY_REAL = 2` |

Error codes: `ERR_INVALID_OPERATION`, `ERR_INVALID_RESPONSE`, `ERR_INVALID_SCOPE`, `ERR_REQUEST_CANCELED` (user canceled), `ERR_REQUEST_FAILED`, `ERR_REQUEST_NOT_HANDLED`, `ERR_REQUEST_NOT_INTERACTIVE`, `ERR_REQUEST_UNKNOWN`. Most match Apple Authorization errors.

## Notes

- Platforms (frontmatter `platforms`): iOS, tvOS, Included in Expo Go.
- Apps that include third-party authentication options must provide Apple authentication to comply with App Store Review guidelines.
- Render the button only if `isAvailableAsync()` resolves to `true`; otherwise it renders nothing and warns in development. Attach width and height via `style`, or the button will not appear. Do not set `backgroundColor` / `borderRadius` in `style` (against App Store Guidelines).
- Credentials (name, email) are only delivered the first time a user signs in; store them server-side or with `expo-secure-store`.
- `signOutAsync` is not recommended as it works counterintuitively; clear the user's data collected from `signInAsync` / `refreshAsync` instead.
- Verify the response by checking the signed JWT against Apple's public keys at https://appleid.apple.com/auth/keys (not Expo-specific).
- Without EAS Build, manually configure the Apple Sign In capability: add entitlement `com.apple.developer.applesignin` (`Default`) and set `CFBundleAllowMixedLocalizations` to `true` in Info.plist so the button uses the device locale.
- Works in Expo Go on iOS (identifiers differ from standalone apps); limited testing on the iOS Simulator, prefer a real device.
- This is a client-side native Sign in with Apple API, not a backend auth library; for auth backends see better-auth and supabase.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-apple-authentication

## Related

- [AuthSession](./auth-session.md)
- [LocalAuthentication](./local-authentication.md)
