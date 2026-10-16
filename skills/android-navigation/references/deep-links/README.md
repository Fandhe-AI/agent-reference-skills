# deep-links

| Name | Description | Path |
|------|-------------|------|
| `android:autoVerify` and Digital Asset Links (`assetlinks.json`) | `android:autoVerify="true"` on an `<intent-filter>` tells Android to ver… | [asset-links-verification.md](./asset-links-verification.md) |
| Deep Link Types | Android supports three kinds of link-based navigation into an app… | [deep-link-types.md](./deep-link-types.md) |
| `<deepLink>` Tag (Navigation XML) | Declares an implicit deep link directly on a `<fragment>`… | [deep-link-xml-tag.md](./deep-link-xml-tag.md) |
| `NavController.handleDeepLink` and `NavDeepLinkBuilder` | `handleDeepLink` dispatches an incoming implicit deep-link… | [handle-deep-link.md](./handle-deep-link.md) |
| `Intent.ACTION_VIEW` and Activity `launchMode` | When an intent filter matches, Android launches the target… | [intent-action-view-launch-mode.md](./intent-action-view-launch-mode.md) |
| Declaring Deep Links with `<intent-filter>` | Registers an `Activity` to respond to `VIEW` intents matching… | [intent-filter-deep-links.md](./intent-filter-deep-links.md) |
| `navDeepLink` | Builder function used in Navigation Compose's `composable()`… | [nav-deep-link.md](./nav-deep-link.md) |
| Custom DeepLinkMatcher / MatchResult ranking | Extend `DeepLinkMatcher<T, R>` when `UriDeepLinkMatcher` is not… | [navigation3-custom-deep-link-matcher.md](./navigation3-custom-deep-link-matcher.md) |
| Deep Links in Navigation 3 | Since stable `androidx.navigation3:navigation3-runtime:1.2.0`… | [navigation3-deep-links.md](./navigation3-deep-links.md) |
| UriDeepLinkMatcher (Navigation 3 URI deep links) | `UriDeepLinkMatcher` matches hierarchical URIs against a… | [navigation3-uri-deep-link-matcher.md](./navigation3-uri-deep-link-matcher.md) |
| Testing Deep Links and App Links | `adb` commands and tools to fire a deep link into a running app… | [test-deep-links.md](./test-deep-links.md) |
| Verify App Links and Troubleshooting | Steps and `adb` commands to trigger, inspect, and debug Android App Links… | [verify-app-links.md](./verify-app-links.md) |
