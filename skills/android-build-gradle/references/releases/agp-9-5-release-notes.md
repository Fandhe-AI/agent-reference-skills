# AGP 9.5 Release Notes

Android Gradle plugin 9.5 is a minor release that includes a variety of new features and improvements.

## Signature / Usage

```properties
# gradle.properties: enable the experimental automated backup and restore testing
android.experimental.testSuiteSupport=true
android.experimental.enableBackupTest=true
```

## Options / Props

| Item | Minimum version | Default version |
|------|-----------------|-----------------|
| Gradle | 9.6.0 | 9.6.0 |
| SDK Build Tools | 36.0.0 | 36.0.0 |
| NDK | N/A | 28.2.13676358 |
| JDK | 17 | 17 |

## Notes

- Compatibility table above: maximum supported API level is 37. Minimums are unchanged from AGP 9.4.
- Automated backup and restore testing (experimental, added in 9.5.0-alpha09): declare a test suite in the `testOptions.backupTests` block; AGP builds and runs JUnit 5 tests that add test data to the app on connected devices, back up and restore it, and check the data is intact. Local, cloud, and device-to-device transfers can be tested and results appear in an HTML test report. Details are in the build-config page for backup tests.
- Fixed issues listed on the source page include: `l8DexDesugarLib` destroying the obfuscation mapping (#532206373, 9.5.0-alpha10), Gradle 9.8.0 reporting `Configuration.setVisible()` deprecations with AGP 9.4.1 (#565740572, 9.5.0-alpha09), a `generateReleaseRFile` warning on JDK 25 (#553121473, 9.5.0-alpha08), `ANDROID_PREFS_ROOT` blocking the build even after removal (#555796808, 9.5.0-alpha08), and `optimization { enable = true }` not setting `isMinifyEnabled` on `ApplicationVariant` (#556343682, 9.5.0-alpha06).
- No public issues are listed as fixed in 9.5.0, 9.5.0-rc01, 9.5.0-rc02, or 9.5.1.
- Release status (Google Maven `maven-metadata.xml`, fetched 2026-11-14): 9.5.0 and 9.5.1 are published; the page title reads "Android Gradle plugin 9.5.0 (October 2026)", and the page was last updated 2026-11-05 UTC.
- Source: https://developer.android.com/build/releases/agp-9-5-0-release-notes (fetched 2026-11-14).

## Related

- [AGP 9.4 Release Notes](./agp-9-4-release-notes.md)
- [AGP API Deprecations and Removals](./gradle-plugin-api-updates.md)
- [Automated backup and restore tests](../build-config/backup-tests.md)
