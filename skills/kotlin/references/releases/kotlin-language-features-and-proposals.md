---
source: https://kotlinlang.org/docs/kotlin-language-features-and-proposals.html
---

# Kotlin language features and proposals

Status list of Kotlin language feature proposals (listed from Kotlin 1.7.0), grouped by status: exploration and design, KEEP discussion, in preview, stable, revoked.

## Signature / Usage

Preview features are enabled with feature-specific compiler options, for example:

```kotlin
kotlin {
    compilerOptions {
        freeCompilerArgs.add("-Xcollection-literals")
    }
}
```

## In preview (Experimental)

| Feature | Available since | Issue |
| --- | --- | --- |
| Collection literals (KEEP-0416) | 2.4.0 | KT-43871 |
| Improve compile-time constants (KEEP-0444) | 2.4.0 | KT-22505 |
| Name-based destructuring | 2.3.20 | KT-19627 |
| Unused return value checker | 2.3.0 | KT-12719 |
| Context-sensitive resolution | 2.2.0 | KT-16768 |
| Expose boxed inline value classes in JVM | 2.2.0 | KT-28135 |
| Common Atomics and Atomic Arrays (KEEP-0398) | 2.2.0 | KT-62423 |
| KMP Kotlin-to-Java direct actualization | 2.1.0 | KT-67202 |

## Stable

| Feature | Available since | Stable since | Issue |
| --- | --- | --- | --- |
| Context parameters | 2.2.0 | 2.4.0 | KT-10468 |
| Improvements to annotation use-site targets on properties (KEEP-0402) | 2.2.0 | 2.4.0 | KT-73255 |
| Explicit backing fields | 2.3.0 | 2.4.0 | KT-14663 |
| Uuid | 2.0.20 | 2.4.0 | KT-31880 |
| Data flow-based exhaustiveness checking (KEEP-0442) | 2.2.20 | 2.3.0 | KT-8781 |
| Nested (non-capturing) type aliases | 2.2.0 | 2.3.0 | KT-45285 |
| kotlin.time.Instant | 2.1.0 | 2.3.0 | KT-80778 |
| Guard conditions in when-with-subject | 2.2.0 | n/a | KT-13626 |
| Multidollar interpolation | 2.2.0 | n/a | KT-2425 |
| Non-local `break` and `continue` | 2.2.0 | n/a | KT-1436 |
| Stabilized `@SubclassOptInRequired` | 2.1.0 | n/a | KT-54617 |
| `Enum.entries` (replacement of `Enum.values()`) | 2.0.0 | n/a | KT-48872 |
| Data objects | 1.9.0 | n/a | KT-4107 |
| RangeUntil operator `..<` | 1.7.20 | n/a | KT-15613 |
| Definitely non-nullable types | 1.7.0 | n/a | KT-26245 |

"n/a": the source lists only an "Available since" version for the entry (no separate "Stable since").

## KEEP discussion

- `CoroutineContext` as context parameter (KEEP-0443, KT-15555)
- Rich Errors: motivation and rationale (KEEP-0441, KT-68296)
- Kotlin companion blocks and extensions (statics) (KEEP-0449, KT-11968)
- Version overloading
- Streamline KDoc ambiguity links (dokka issues 3451, 3179, 3334)
- Resolution of links to extensions in KDoc (dokka issue 3555)

## Exploration and design

- Support immutability (KT-77734; KEEP notes on value classes and immutability)

## Revoked

- Context receivers (KT-10468): replaced with context parameters.
- Java synthetic property references (KT-8575).

## Notes

- Each entry on the official page links its KEEP proposal and YouTrack issue; this page keeps issue IDs only.
- Experimental features use the stability levels defined in `components-stability.md`.
- Related stdlib features: `Instant` and `Uuid` stabilization is described in `whatsnew23.md` and `whatsnew24.md`.

## Related

- [Kotlin evolution principles](./kotlin-evolution-principles.md)
- [Stability of Kotlin components](./components-stability.md)
- [What's new in Kotlin 2.4.0](./whatsnew24.md)
