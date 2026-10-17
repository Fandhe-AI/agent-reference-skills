---
source: https://docs.expo.dev/build-reference/caching/
---

# Cache dependencies

Speed up EAS Build by caching JavaScript, Android, iOS dependencies and native compilation artifacts.

## Signature / Usage

Custom caching: the `cache` field on build profiles in **eas.json** saves specific files and directories after a successful build and restores them on subsequent builds after JavaScript dependencies are installed. Restoring does not overwrite existing files. Changing `cache.key` (or any other `cache` property) invalidates the cache.

```json
{
  "build": {
    "production": {
      "cache": {
        "paths": ["./ios/Podfile.lock"]
      }
    }
  }
}
```

ccache for native code in a custom build:

```yaml
build:
  name: Build with ccache
  steps:
    - eas/checkout
    - eas/restore_build_cache
    - eas/build
    - eas/save_build_cache
```

## Options / Props

| Environment variable | Description |
| --- | --- |
| `EAS_BUILD_DISABLE_NPM_CACHE` | Set to `"1"` to disable the npm cache server (projects using npm or Yarn 2+ use it by default). |
| `EAS_NO_FROZEN_LOCKFILE` | Set to `"1"` to disable installing with the immutable lockfile flag (e.g. `yarn --frozen-lockfile`, `npm ci`). |
| `EAS_BUILD_DISABLE_MAVEN_CACHE` | Set to `"1"` to disable the Maven cache server (`maven-central`, `google`, `plugins`). |
| `EAS_BUILD_DISABLE_COCOAPODS_CACHE` | Set to `"1"` to disable the CocoaPods cache server. |
| `EAS_USE_CACHE` | `1` enables both restoring and saving the ccache cache during a build job. |
| `EAS_RESTORE_CACHE` | `1` / `0`: restore the cache at the beginning of a build. Overrides `EAS_USE_CACHE`. |
| `EAS_SAVE_CACHE` | `1` / `0`: save the build cache at the end of a build. Overrides `EAS_USE_CACHE`. |

## Notes

- Yarn 1 (Classic) needs a workaround to use the npm cache (see the npm-cache-with-yarn page of the official docs). In EAS Workflows set these variables in a job's `env`.
- EAS Workflows: use `eas/restore_cache` / `eas/save_cache` (custom `key`, `restore_keys`, `path`) or `eas/restore_build_cache` / `eas/save_build_cache` (automatically generated key from a hash of the package manager lock file). Example ccache paths: `/home/expo/.cache/ccache` (Android), `/Users/expo/Library/Caches/ccache` (iOS).
- The custom build schema reference marks `inputs.key` and `inputs.path` of `eas/restore_build_cache` / `eas/save_build_cache` as required, whereas the example above calls them without inputs.
- Key matching order: exact match of the key, then `restore_keys` prefix matches (most recent creation date wins). Partial matches restore but may perform less effectively.
- Cache restrictions: GitHub-triggered builds scope caches to the branch (can restore from the current branch and the default branch `main` / `master`); `eas-cli` builds scope caches to the user and fall back to default-branch GitHub caches. Shared user-actors (access tokens, GitHub Actions) lose isolation; avoid restoring cache for production builds under a shared user and use designated jobs that only save clean caches (`EAS_RESTORE_CACHE: "0"`, `EAS_SAVE_CACHE: "1"`). Setting `EAS_SAVE_CACHE` does not make saving exclusive to a job.
- CocoaPods cache is bypassed automatically if you provide your own **.netrc** or **.curlrc**. Caching **Podfile.lock** (via `cache.paths`) helps determinism when generating **ios** remotely, but may require clearing the cache on build errors.
- Source modificationDate unknown here (header not recorded); fetched 2026-10-17.

## Related

- [Configure EAS Build with eas.json](./build-eas-json.md)
- [Custom build configuration schema](./custom-builds-schema.md)
