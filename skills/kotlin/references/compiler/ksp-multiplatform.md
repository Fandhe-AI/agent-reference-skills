---
source: https://kotlinlang.org/docs/ksp-multiplatform.html
---

# KSP with Kotlin Multiplatform

How to use KSP in a Kotlin Multiplatform project: declare processors per target with `add("ksp<Target>", <processor>)`. An example multiplatform project is in the KSP repository (`examples/multiplatform`).

## Signature / Usage

```kotlin
dependencies {
  add("ksp<Target>", <processor>)
}
```

```kotlin
add("kspJvm", project(":local-processor"))
add("kspJvm", "androidx.room:room-compiler:2.6.1")
```

Same processor in multiple targets (loop):

```kotlin
kotlin.targets.filter { it.name.startsWith("ios") }.forEach { target ->
    add(
        "ksp${target.name.replaceFirstChar { it.uppercaseChar() }}",
        project(":test-processor")
    )
}
```

Test compilations:

```kotlin
add("kspJvmTest", project(":test-processor"))
add("kspJsTest", project(":test-processor"))
add("kspIosX64Test", project(":test-processor"))
add("kspAndroidHostTest", project(":test-processor"))
add("kspAndroidDeviceTest", project(":test-processor"))
```

List the KSP configurations of a module:

```bash
./gradlew :<your-module-name>:dependencies | grep ksp
```

## Options / Props

| Name | Description |
| --- | --- |
| `<Target>` | One of the targets used in the multiplatform project |
| `<processor>` | A Gradle project path: a local directory with processor logic (`project(":local-processor")`) or an external processor such as Room (`"androidx.room:room-compiler:2.6.1"`) |

## Notes

- Since KSP 2, the catch-all `ksp(...)` configuration is deprecated; configure each target explicitly to avoid running processors where they aren't needed.
- Multiple processors can be added to one target (`add("kspAndroid", project(":test-processor"))` and `add("kspAndroid", "androidx.room:room-compiler:2.6.1")`).
- Kotlin creates a separate compilation per target and source set (`main`, `test`). KSP creates a symbol processing task for each Kotlin compilation task that has one or more configured KSP processors; compilations without KSP configuration get no KSP task. In the example project (6 targets: JVM, JS, LinuxX64, AndroidNativeX64, AndroidNativeArm64, MingwX64) there are at least 12 compilation tasks and 10 symbol processing tasks.
- KSP configuration names are derived from the multiplatform source sets (Android host and device tests from the source set names).

## Related

- [ksp-overview](./ksp-overview.md)
- [ksp-quickstart](./ksp-quickstart.md)
