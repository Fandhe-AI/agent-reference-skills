# Viewing and Resolving Dependencies

Inspecting the resolved dependency tree to understand version conflicts, using the Gradle `dependencies` task.

## Signature / Usage

```bash
./gradlew app:dependencies
```

```text
releaseRuntimeClasspath - Runtime classpath of /release.
    +--- org.jetbrains.kotlin:kotlin-stdlib:2.0.0
    +--- com.sample:library.a:1.2.3
    |    +--- com.sample:library.c:2.1.1
    |    |    \--- org.jetbrains.kotlin:kotlin-stdlib:2.0.0 (*)
    |    \--- org.jetbrains.kotlin:kotlin-stdlib:2.0.0 (*)
    +--- com.sample:library.c:1.4.1 -> 2.1.1 (*)
```

## Notes

- Gradle resolves conflicting transitive versions with a "newest version wins" strategy by default; `1.4.1 -> 2.1.1` in the output means a requestor asked for `1.4.1` but Gradle substituted `2.1.1`.
- `(*)` marks a subtree that already appeared elsewhere in the tree and is omitted for brevity.
- Version candidates come from three sources: direct version declarations, version catalog entries (`libs.versions.toml`), and BOM/platform dependencies.
- To customize resolution beyond the default strategy (e.g. programmatic substitution rules), see Gradle's resolution rules documentation (`docs.gradle.org/current/userguide/resolution_rules.html`), which is Gradle-generic, not Android-specific.

## Related

- [dependency-exclusion.md](./dependency-exclusion.md)
- [dependency-coordinates.md](./dependency-coordinates.md)
