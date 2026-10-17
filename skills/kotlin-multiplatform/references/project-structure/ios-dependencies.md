---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-ios-dependencies.html
---

# Adding iOS dependencies

Apple SDK dependencies (such as Foundation or Core Bluetooth) are available as prebuilt libraries without extra configuration. Other iOS ecosystem libraries are handled with the cinterop tool or the CocoaPods dependency manager.

## Signature / Usage

cinterop with a library (`.def` file `DateTools.def` containing `language = Objective-C`, `headers = DateTools.h`, `package = DateTools`):

```kotlin
kotlin {
    iosArm64() {
        compilations.getByName("main") {
            val DateTools by cinterops.creating {
                // Path to the .def file
                definitionFile.set(project.file("src/nativeInterop/cinterop/DateTools.def"))

                // Directories for header search (an analogue of the -I<path> compiler option)
                includeDirs("include/this/directory", "path/to/another/directory")
            }
            val anotherInterop by cinterops.creating { /* ... */ }
        }

        binaries.all {
            // Linker options required to link to the library.
            linkerOpts("-L/path/to/library/binaries", "-lbinaryname")
        }
    }
}
```

```kotlin
import DateTools.*
```

cinterop with a framework (`.def` file with `modules = MyFramework` and `package = MyFramework`): pass `-framework` and `-F` to the compiler and linker.

```kotlin
kotlin {
    iosArm64() {
        compilations.getByName("main") {
            val DateTools by cinterops.creating {
                // Path to the .def file
                definitionFile.set(project.file("src/nativeInterop/cinterop/DateTools.def"))

                compilerOpts("-framework", "MyFramework", "-F/path/to/framework/")
            }
            val anotherInterop by cinterops.creating { /* ... */ }
        }

        binaries.all {
            // Tell the linker where the framework is located.
            linkerOpts("-framework", "MyFramework", "-F/path/to/framework/")
        }
   }
}
```

CocoaPods:

```kotlin
kotlin {
    cocoapods {
        version = "2.0"
        //..
        pod("SDWebImage") {
            version = "5.20.0"
        }
    }
}
```

```kotlin
import cocoapods.SDWebImage.*
```

## Options / Props

| Name | Where | Description |
|------|-------|-------------|
| `language` | `.def` file | First line, `language = Objective-C`; omit for a pure C dependency |
| `headers` | `.def` file | Headers processed by cinterop (library case) |
| `modules` | `.def` file | Framework name processed by cinterop (framework case) |
| `package` | `.def` file | Package the declarations are put into |
| `definitionFile` | `cinterops.creating {}` | Path to the `.def` file; may be omitted if the file has the cinterop's name and sits in `src/nativeInterop/cinterop/` |
| `includeDirs(...)` | `cinterops.creating {}` | Header search directories (like `-I<path>`) |
| `compilerOpts(...)` | `cinterops.creating {}` | For frameworks: `-framework <Name>` and `-F<path>` |
| `linkerOpts(...)` | `binaries.all {}` | Linker options for library or framework binaries |
| `pod(name) { version = ... }` | `cocoapods {}` | Dependency on a Pod library from the CocoaPods repository |

## Notes

- Kotlin supports interoperability with Objective-C dependencies and with Swift dependencies whose APIs are exported to Objective-C with the `@objc` attribute. Pure Swift dependencies are not yet supported, including pure Swift pods.
- General cinterop workflow: download the dependency, build it to get binaries, create a `.def` file, adjust the build script to generate bindings.
- CocoaPods: perform the initial CocoaPods integration setup first, then reload Gradle projects (Build | Reload All Gradle Projects in IntelliJ IDEA, File | Sync Project with Gradle Files in Android Studio). Import with `cocoapods.<library-name>`.
- Pod dependency sources documented in the CocoaPods libraries page: CocoaPods repository, locally stored library, custom Git repository, custom Podspec repository, custom cinterop options.
- The page's Groovy tab variants are omitted; the Kotlin DSL variant is shown.
- Distance line: SwiftPM / Xcode specifics belong to apple-swift; the `.def` file format and Swift/Objective-C interop are covered by the kotlin skill's Kotlin/Native pages.

## Related

- [add-dependencies.md](./add-dependencies.md)
- [android-dependencies.md](./android-dependencies.md)
