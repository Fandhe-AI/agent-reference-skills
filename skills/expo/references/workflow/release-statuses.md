---
source: https://docs.expo.dev/more/release-statuses/
---

# Release statuses

Statuses (experimental, alpha, preview, beta, stable, deprecated) used across the Expo SDK, Expo Router, EAS, and Expo CLI.

## Signature / Usage

```json
{
  "expo": {
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

(`experiments.typedRoutes` enables typed routes, which is a beta feature; the app config `experiments` field is different from the Experimental status.)

## Options / Props

| Product area | Statuses you'll mostly see |
| --- | --- |
| Expo SDK libraries and Expo Router | Alpha, Beta |
| EAS services | Preview, Beta |
| Expo CLI and other development tools | Experimental |

| Status | What to expect |
| --- | --- |
| Experimental | Early exploration; may change significantly or be removed in any release; APIs change without notice or deprecation warnings; may have known bugs; not recommended for production. |
| Alpha | Early testing with significant limitations; breaking changes without a new SDK release; not recommended for production. |
| Preview | Focused slice of functionality, not feature-complete; APIs subject to breaking changes; can be used in production with thorough testing. Mostly new EAS services. |
| Beta | Feature-complete, final validation; breaking changes possible but unlikely; can be used in production with thorough testing. |
| Stable | No status badge; production-ready; per semantic versioning, breaking changes only in new major versions. |
| Deprecated | No longer recommended and will be removed in a future release; deprecation warnings; Expo may not accept feedback for deprecated APIs; removal happens in a new SDK release. |

## Notes

- Statuses are not a single pipeline. Any feature can become deprecated, and individual APIs in otherwise stable libraries can be experimental.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react / react-native skills for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: August 06, 2026).

## Related

- [Debugging and profiling tools](./debugging-tools.md)
- [Expo CLI](./expo-cli.md)
