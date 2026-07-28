# Android App Bundle

The Android App Bundle (`.aab`) is Google Play's publishing format: it contains all compiled code and resources for an app, deferring APK generation, optimization, and signing to Google Play, which serves each device only the code/resources it needs.

## Signature / Usage

```bash
# Build a release bundle
./gradlew bundleRelease

# Output
app/release/app-release.aab
```

## Notes

- Mandatory for new apps on Google Play since August 2021; TV apps must publish as bundles since June 2023.
- Compressed download size limit: 4 GB, applying to the base APK plus all configuration APKs; subsequent on-demand downloads share the same limit. Asset packs have separate size limits.
- **Play Feature Delivery** lets you split functionality into dynamic feature modules (`com.android.dynamic-feature` plugin) with install-time, on-demand, conditional, or instant delivery, declared via `<dist:module>` / `<dist:delivery>` in the module manifest.
- **Play Asset Delivery** targets large game assets and does not count toward the base 4 GB compressed download limit.
- Does not support `.obb` expansion files; partial sideloaded installs fail on Android 10+ (a full app from Play Store is required).
- Reduce bundle download size via code/resource shrinking, removing unused resources, and moving rarely-used features into dynamic feature modules.
- Uploading the `.aab` to Play Console for distribution is out of scope here — this skill covers the Gradle-side build configuration only.

## Related

- [bundle-config.md](./bundle-config.md)
- [apk-splits.md](./apk-splits.md)
