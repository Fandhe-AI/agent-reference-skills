---
source: https://kotlinlang.org/docs/kotlin-evolution-principles.html
---

# Kotlin evolution principles

How Kotlin evolves: pragmatic principles, incompatible change handling, decision making, language feature statuses, library and binary compatibility, and the compatibility options `-language-version` / `-api-version`.

## Signature / Usage

```bash
# Compatibility options (also available in Gradle and Maven)
-language-version X.Y
-api-version X.Y
-progressive
```

## Principles

- Keeping the language modern: phase out legacy features as well as adding new ones.
- Feedback loop: ship early designs in pre-stable status (Experimental, Alpha, or Beta) so users can validate them before they are cast in stone.
- Comfortable updates: announce incompatible changes in advance, deprecate, and provide automated migration tools. Ideal workflow: update to version A (warnings) and migrate with tools, then update to version B (change happens) with no issues.

## Incompatible changes

A change is incompatible if code that compiled and ran is now rejected with an error (compile or link time), or now throws an exception. Gray-area cases include different corner-case handling, a different exception type, reflection-only observable changes, modified undefined behavior, and renamed binary artifacts. Not incompatible: adding new warnings, enabling new constructs or relaxing limitations, changing private / internal APIs and implementation details.

Compiler bugs that generate wrong code without failing are fixed quickly even though fixes are technically incompatible, to stop bad patterns from spreading (applies to bugs found soon after appearing in a release).

## Decision making

JetBrains drives Kotlin together with the community and the Kotlin Foundation. The Lead Language Designer (currently Michail Zarečenskij) has the final say; incompatible changes to fully stable components must be approved by the Language Committee under the Kotlin Foundation, which relies on the Language committee guidelines.

## Language feature delivery

- Features ship in language releases (2.x.0) or the following tooling releases (2.x.20). Language and tooling releases stay compatible; compiler changes there are mostly optimizations and warning additions / removals. Pre-stable features may be added, removed, or changed at any time.
- EAP builds of language releases usually produce binaries that the stable compiler later rejects; final release candidates (RC2, RC3) normally do not have this limitation.
- Pre-stable features require explicit opt-in in code or project configuration.

### Feature statuses

| Status | Meaning |
| --- | --- |
| Exploration and design | Considering a feature; discussed in YouTrack issues |
| KEEP discussion | Fairly certain the feature should be added; documented as a Kotlin Evolution and Enhancement Process (KEEP) proposal |
| In preview | Prototype ready, enabled via a feature-specific compiler option; Experimental or Beta stability level; may change significantly or be revoked |
| Stable | First-class citizen; backward compatibility and tooling support guaranteed |
| Revoked | Proposal revoked; will not be implemented |

## Libraries

- Ideally a new library version is a drop-in replacement even without recompilation (ABI stability under separate compilation).
- Library code should always specify return types of public / protected functions and properties explicitly; overloads in the same library should do essentially the same thing.
- Use `@Deprecated` and `@RequiresOptIn` to control API evolution; `@Deprecated(level=HIDDEN)` preserves binary compatibility for removed declarations.
- Packages named "internal" are not public API; everything in packages named "experimental" is pre-stable.
- `kotlin-stdlib` evolves under the same principles; contract changes follow the same procedures as language changes.

## Compiler options

Supported options (without `-X` / `-XX` prefix) can be added only in language releases and are deprecated before removal. `-X` and `-XX` options are experimental and can be added or removed at any time.

## Compatibility tools

- `-language-version X.Y`: compatibility mode; the compiler reports errors for features introduced in later versions.
- `-api-version X.Y`: the compiler ignores declarations that use stdlib APIs introduced in later versions, including APIs referenced by compiler-generated code.
- On the JVM, at least three previous language and API versions are supported in addition to the latest stable version. On other platforms older versions can be configured, but consumers still need the latest compiler.
- Set both options to the same version in most projects; a lower API version mainly helps when you must stay compatible with an older stdlib.
- `-progressive` adopts bug-fix changes in tooling releases before they become the default. Configure on the command line, Gradle, or Maven.

### Binary format

For fully stable compilers: all binaries are backwards compatible (newer reads older); older compilers reject binaries using newer features; preferably the format is mostly forwards compatible with the next language release only (for example 1.9 understands most binaries from 2.0, not 2.1). Kotlin/JVM has reached this level; not all platforms have.

klib binaries are Stable since Kotlin 1.9.20 and backwards compatible from 1.9.20; forward compatibility is not guaranteed. Cinterop klib binaries are still Beta, so no specific compatibility guarantees across versions.

## Notes

- The compiler option references (`compiler-reference`, Gradle compiler options, Maven compiler options) are in the compiler and build-tools categories.

## Related

- [Stability of Kotlin components](./components-stability.md)
- [Kotlin language features and proposals](./kotlin-language-features-and-proposals.md)
- [Kotlin release process](./releases.md)
- [Compatibility guide for Kotlin 2.4.x](./compatibility-guide-24.md)
