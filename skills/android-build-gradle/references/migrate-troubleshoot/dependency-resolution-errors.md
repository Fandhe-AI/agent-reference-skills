# Debug Dependency Resolution Errors

Duplicate class errors and classpath version conflicts that occur when direct and transitive dependencies collide, plus how to inspect the dependency tree and exclude transitive dependencies.

## Signature / Usage

```kotlin
dependencies {
    implementation("some-library") {
        exclude(group = "com.example.imgtools", module = "native")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exclude(group, module)` | dependency configuration block | — | Excludes a transitive dependency from a specific `implementation`/`api` declaration. |
| `api` (vs `implementation`) | dependency configuration | — | In a library module, declaring a dependency as `api` propagates its version transitively to consuming apps, helping resolve classpath version mismatches. |

## Notes

- **Duplicate class error**: `Program type already present com.example.MyClass` — caused by a binary dependency that bundles a library your app also declares directly, or by having both a local and a remote binary dependency on the same library. Fix by removing the duplicate direct dependency or one of the conflicting binary dependencies.
- **Classpath version conflict**: `Conflict with dependency '...' in project '...'. Resolved versions for runtime classpath (1.0) and compile classpath (2.0) differ.` Since AGP 3.3.0+, if the runtime classpath resolves higher than the compile classpath, AGP automatically upgrades to the higher version; if the compile classpath resolves higher than the runtime classpath, this is an error (no automatic downgrade).
- Inspect the dependency tree via **View > Tool Windows > Gradle > AppName > Tasks > android > androidDependencies** (double-click to run), which prints per-configuration trees (e.g. `debugRuntimeClasspath`).
- To find which dependency brings in a duplicate class, use **Navigate > Class**, check "Include non-project items", and search for the class name from the error message.
- Source: `developer.android.com/build/dependency-resolution-errors`.

## Related

- [Manifest Merger Conflicts](./manifest-merger-conflicts.md)
