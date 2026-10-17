---
source: https://docs.expo.dev/versions/v58.0.0/sdk/storereview/
---

# StoreReview

`expo-store-review` provides access to the `ReviewManager` API on Android 5+ and the `SKStoreReviewController` API on iOS, to ask the user to rate the app without leaving it.

## Signature / Usage

```sh
npx expo install expo-store-review
```

```js
import * as StoreReview from 'expo-store-review';

if (await StoreReview.hasAction()) {
  // you can call StoreReview.requestReview()
}
```

Open the store review pages directly:

```ts
import { Linking } from 'react-native';

const androidPackageName = 'host.exp.exponent';
// Open the Android Play Store directly
Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`);

const itunesItemId = 982107779;
// Open the iOS App Store directly
Linking.openURL(
  `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
);
```

## Options / Props

Methods (Android, iOS):

| Name | Returns | Description |
| --- | --- | --- |
| `StoreReview.hasAction()` | `Promise<boolean>` | Fulfills to `true` if `requestReview()` can direct the user to some kind of store review flow. `false` if app config (`app.json`) has no store URLs and native capabilities are unavailable. |
| `StoreReview.isAvailableAsync()` | `Promise<boolean>` | iOS: `true` unless distributed through TestFlight. Android: `true` on Android 5.0+. Web: `false`. |
| `StoreReview.requestReview()` | `Promise<void>` | Ideally opens a native modal for a star rating without leaving the app. On Android below 5.0, attempts to get the store URL and link the user to it. |
| `StoreReview.storeUrl()` | `string \| null` | `Constants.expoConfig.ios.appStoreUrl` on iOS, `Constants.expoConfig.android.playStoreUrl` on Android. `null` on Web. |

Error codes: `ERR_STORE_REVIEW_FAILED` — the store review request was not successful.

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Included in Expo Go.
- Follow the Human Interface Guidelines (iOS) and Android in-app review guidelines. Don't call `requestReview()` from a button; call it after the user finished some signature interaction. Don't spam the user, don't request while the user is doing something time sensitive like navigating, and don't ask questions before or while presenting the rating button or card.
- Android has no equivalent "write a review" redirect, but the Play Store can be opened to the reviews section with `showAllReviews=true`. On iOS, `action=write-review` opens the "Write a Review" screen.
- The import line is added; the official snippet omits it.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-store-review

## Related

- [Constants](../sdk-app/constants.md)
- [Linking](../sdk-app/linking.md)
