# CI features

Features found in most CI systems that matter for Android: environment, logs and reports, caching and run times, and retrying failed tests.

## Signature / Usage

Environment variables can be set by the CI system (for example `ANDROID_HOME`) or by you, to avoid hardcoding credentials in the workflow:

```sh
echo "$ANDROID_HOME"
```

## Options / Props

Retry actions by failure level:

| Failure | Action |
|---------|--------|
| Emulator was unresponsive for a second, triggering a timeout | Rerun the failed test |
| Emulator failed to boot | Rerun the whole task |
| Connection error during the code checkout phase | Restart the workflow |

## Notes

- Environment considerations: platform (Linux, Mac, Windows and versions); available memory (builds and emulators use a lot of RAM, so tweaking parameters such as the JVM heap size may be needed); preinstalled software (JDK, Android SDK, build tools, platforms, emulators); runner architecture and instruction set (ARM, x86, important for emulators); environment variables. Also consider core count and whether virtualization is enabled for emulators.
- Logs and reports: when a step fails the CI system notifies you and usually blocks the merge; look for errors in the logs. Build and test reports are usually stored as artifacts and can be visualized with plugins, depending on the CI system.
- Cache: in its simplest form, save all Gradle cache files after a successful build and restore them before a new one. This relies on Gradle's build cache feature, which should be enabled in the project. An oversized cache that contains more than necessary can hurt overall build time because of download time.
- Ways to improve run times and reliability: build and test only the modules affected by a change; skip caches when the build includes scripts a developer modified (safer to build from scratch); shard tests (especially instrumented tests) across devices, supported by the Android runner, Gradle Managed Devices and Firebase Test Lab; shard builds across multiple server instances; use Gradle's remote cache.
- Flakiness: always try to find and fix the causes of flaky builds and tests. A common strategy is to retry failed runs up to a maximum number of retries. There is no single way to configure retries; they can occur at multiple levels. Log and track which parts are flaky and invest in keeping CI reliable and fast.
- Source: https://developer.android.com/training/testing/continuous-integration/features

## Related

- [ci-basics](./ci-basics.md)
- [ci-automation](./ci-automation.md)
