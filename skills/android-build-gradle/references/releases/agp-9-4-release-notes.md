# AGP 9.4 Release Notes

Android Gradle plugin 9.4 is a minor release that includes a variety of new features and improvements.

## Signature / Usage

```properties
# gradle.properties: temporarily opt a module out of the mandatory (AGP 10) new Variant API
android.newDsl.optOut=:example-lib1

# Promote the dynamic feature / app variant parity check from warning to error
android.enforceDynamicFeatureVariantMatching=true
```

## Options / Props

| Item | Minimum version | Default version |
|------|-----------------|-----------------|
| Gradle | 9.6.0 | 9.6.0 |
| SDK Build Tools | 36.0.0 | 36.0.0 |
| NDK | N/A | 28.2.13676358 |
| JDK | 17 | 17 |

## Notes

- Compatibility table above: maximum supported API level is 37.
- Variant API module opt-out: starting with AGP 10, the new Variant API is mandatory for all projects. Before AGP 10, `android.newDsl.optOut=<module path>` in `gradle.properties` temporarily opts specific modules out to support gradual migration.
- Strict 1:1 variant parity between dynamic feature and app modules: from AGP 9.4 the build checks flavor dimension parity between Android app modules and dynamic feature modules and reports missing, extra, or mismatched dimensions as build warnings. Setting `android.enforceDynamicFeatureVariantMatching=true` promotes it to an execution error. From AGP 10.0 onwards it is enforced by default and mismatches become fatal build failures.
- Fixed issues listed for 9.4.0-alpha01 to alpha04 include: AGP SigningConfig is too eager (#499166350), L8 obfuscation mapping not included in app mapping.txt (#146403477), and "Unable to get provider" ClassNotFoundException on `connectedDebugAndroidTest` with a provider in a dynamic feature module (#257765153). The source page lists no later fixed-issue sections.
- Source: https://developer.android.com/build/releases/agp-9-4-0-release-notes (fetched 2026-10).

## Related

- [AGP 9.3 Release Notes](./agp-9-3-release-notes.md)
- [AGP API Deprecations and Removals](./gradle-plugin-api-updates.md)
