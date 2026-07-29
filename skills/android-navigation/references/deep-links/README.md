# deep-links

| Name | Description | Path |
|------|-------------|------|
| Deep Link Types | Custom scheme vs web link vs verified Android App Links comparison. | [deep-link-types.md](./deep-link-types.md) |
| Declaring Deep Links with `<intent-filter>` | Register an Activity for VIEW intents via AndroidManifest.xml. | [intent-filter-deep-links.md](./intent-filter-deep-links.md) |
| `android:autoVerify` and Digital Asset Links (`assetlinks.json`) | Verify website ownership to promote a web link to an Android App Link. | [asset-links-verification.md](./asset-links-verification.md) |
| Verify App Links and Troubleshooting | adb commands to trigger/inspect verification and fix common failures. | [verify-app-links.md](./verify-app-links.md) |
| `navDeepLink` | Type-safe implicit deep link builder for Navigation Compose routes. | [nav-deep-link.md](./nav-deep-link.md) |
| `<deepLink>` Tag (Navigation XML) | Implicit deep link declaration on a Navigation XML destination. | [deep-link-xml-tag.md](./deep-link-xml-tag.md) |
| `NavController.handleDeepLink` and `NavDeepLinkBuilder` | Dispatch incoming deep links and build explicit deep-link PendingIntents. | [handle-deep-link.md](./handle-deep-link.md) |
| Deep Links in Navigation 3 | Built-in `DeepLinkRequest`/`DeepLinkMatcher`/`UriDeepLinkMatcher` pipeline (`androidx.navigation3.runtime.deeplink`, 1.2.0-alpha05+). | [navigation3-deep-links.md](./navigation3-deep-links.md) |
| `Intent.ACTION_VIEW` and Activity `launchMode` | How a matched deep link is delivered to onCreate vs onNewIntent. | [intent-action-view-launch-mode.md](./intent-action-view-launch-mode.md) |
| Testing Deep Links and App Links | adb am start / dumpsys commands to test links and inspect verification. | [test-deep-links.md](./test-deep-links.md) |
