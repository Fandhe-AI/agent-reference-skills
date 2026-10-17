---
source: https://reactnative.dev/releases/versioning-policy
---

# Versioning Policy

Versioning policy for `react-native` and the packages under the `@react-native` scope. The `stable` channel follows the 0.x.y release policy, and a `nightly` channel is published to encourage early feedback on experimental features.

## Signature / Usage

0.x.y schema:

```text
- Breaking changes: new minor version (increment x), e.g. 0.78.0 to 0.79.0
- New features and APIs: new minor version (increment x), e.g. 0.78.0 to 0.79.0
- Critical bug fixes: new patch version (increment y), e.g. 0.78.1 to 0.78.2
```

## Options / Props

What is a breaking change:

| Counted as breaking | Examples |
| --- | --- |
| Incompatible API change | Changes of any JS/Java/Kotlin/Obj-c/C++ APIs that would require your code to be changed in order to compile; changes inside `@react-native/codegen` that are not backward compatible |
| Significant behavior/runtime change | The layout logic of a prop is changed drastically |
| Significant change in the development experience | A debugging feature is entirely removed |
| Major bump of a transitive dependency | Bumping React from 18.x to 19.x; bumping the Target SDK on Android from 34 to 35 |
| Reduction of supported platform versions | Bumping min SDK on Android from 21 to 23; bumping the min iOS version to 15.1 |

| Not counted as breaking | Details |
| --- | --- |
| `unstable_` prefixed APIs | Expose experimental features whose final shape is not settled |
| Private or internal APIs | Often prefixed `internal_` / `private_` or inside an `internal/` or `private/` folder/package; internal property names like `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` have no guarantees; classes annotated with `@FrameworkAPI` are also internal |
| Tooling/development APIs | Some Metro APIs or React Native DevTools APIs reserved for frameworks and tools; changes are discussed directly with affected tools and not announced broadly in release blogposts |
| Development warnings | Warnings may be added or modified between any versions |

## Notes

- A series of releases under the same minor number is a **minor series** (e.g. 0.76.x). Stable releases are shipped regularly, with the latest tagged `latest` on npm.
- All breaking changes in each stable release are highlighted in the _Breaking_ and _Removed_ sections of the React Native Changelog, and in the _Breaking Changes_ section of each release blogpost. Each is accompanied by reasoning, a replacement API where possible, and minimized impact.
- Deprecation cycles: once an API is deprecated, it remains available also for the following stable releases. Example from the source: if an API is deprecated in 0.76.x, it is still available in 0.77.x and is not removed sooner than 0.78.x. Some deprecated APIs are kept longer, generally with warnings.
- If a change is expected to cause broad problems in the community, a gradual migration path for the ecosystem is still provided on a best-effort basis.

## Related

- [releases-overview.md](./releases-overview.md)
- [branches.md](./branches.md)
- [../workflow/upgrading.md](../workflow/upgrading.md)
