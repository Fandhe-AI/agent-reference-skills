---
source: https://kotlinlang.org/docs/multiplatform/compose-native-distribution.html
---

# Native distributions

How to create installers and packages for the supported systems with the `org.jetbrains.compose` Gradle plugin, and how to run an application locally with the same settings as for distributions.

## Signature / Usage

The plugin packages applications into native distributions using `jpackage`, bundling only the needed Java modules with `jlink`. Distributable applications are self-contained and need no JDK on the target system.

```kotlin
import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    kotlin("jvm")
    id("org.jetbrains.compose")
}

dependencies {
    implementation(compose.desktop.currentOs)
}

compose.desktop {
    application {
        mainClass = "example.MainKt"

        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Exe)
        }
    }
}
```

Include extra JDK modules (avoids `ClassNotFoundException` at runtime):

```kotlin
compose.desktop {
    application {
        nativeDistributions {
            modules("java.sql")
            // Alternatively: includeAllModules = true
        }
    }
}
```

Package version template (priority from highest to lowest within a platform block):

```kotlin
compose.desktop {
    application {
        nativeDistributions {
            // Version for all packages
            packageVersion = "..."

            macOS {
              // Version for all macOS packages
              packageVersion = "..."
              // Version for the dmg package only
              dmgPackageVersion = "..."
              // Version for the pkg package only
              pkgPackageVersion = "..."

              // Build version for all macOS packages
              packageBuildVersion = "..."
              // Build version for the dmg package only
              dmgPackageBuildVersion = "..."
              // Build version for the pkg package only
              pkgPackageBuildVersion = "..."
            }
            windows {
              packageVersion = "..."
              msiPackageVersion = "..."
              exePackageVersion = "..."
            }
            linux {
              packageVersion = "..."
              debPackageVersion = "..."
              rpmPackageVersion = "..."
            }
        }
    }
}
```

JDK, output directory, launcher properties, metadata:

```kotlin
compose.desktop {
    application {
        javaHome = System.getenv("JDK_17")
    }
}

compose.desktop {
    application {
        nativeDistributions {
            outputBaseDir.set(project.layout.buildDirectory.dir("customOutputDir"))
        }
    }
}

compose.desktop {
    application {
        mainClass = "MainKt"
        args += listOf("-customArgument")
        jvmArgs += listOf("-Xmx2G")
    }
}

compose.desktop {
    application {
        nativeDistributions {
            packageName = "ExampleApp"
            packageVersion = "1.0.0"
            description = "Compose Multiplatform App"
            copyright = "© 2024 My Name. All rights reserved."
            vendor = "Example vendor"
            licenseFile.set(project.file("LICENSE.txt"))
        }
    }
}
```

Add files to the packaged application and read them at runtime:

```kotlin
compose.desktop {
    application {
        mainClass = "MainKt"
        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
            packageVersion = "1.0.0"

            appResourcesRootDir.set(project.layout.projectDirectory.dir("resources"))
        }
    }
}
```

```kotlin
val resourcesDir = File(System.getProperty("compose.application.resources.dir"))

fun main() {
    println(resourcesDir.resolve("resource.txt").readText())
}
```

Custom source sets:

```kotlin
val customSourceSet = sourceSets.create("customSourceSet")
compose.desktop {
    application {
        from(customSourceSet)
    }
}
```

```kotlin
kotlin {
    jvm("customJvmTarget") {}
}
compose.desktop {
    application {
        from(kotlin.targets["customJvmTarget"])
    }
}
```

```kotlin
compose.desktop {
    application {
        disableDefaultConfiguration()
        fromFiles(project.fileTree("libs/") { include("**/*.jar") })
        mainJar.set(project.file("main.jar"))
        dependsOn("mainJarTask")
    }
}
```

Application icon (`.icns` macOS, `.ico` Windows, `.png` Linux):

```kotlin
compose.desktop {
    application {
        nativeDistributions {
            macOS {
                iconFile.set(project.file("icon.icns"))
            }
            windows {
                iconFile.set(project.file("icon.ico"))
            }
            linux {
                iconFile.set(project.file("icon.png"))
            }
        }
    }
}
```

macOS `Info.plist` raw XML (deep linking example), then `./gradlew runDistributable`:

```kotlin
compose.desktop {
  application {
      mainClass = "MainKt"
      nativeDistributions {
          targetFormats(TargetFormat.Dmg)
          packageName = "Deep Linking Example App"
          macOS {
              bundleID = "org.jetbrains.compose.examples.deeplinking"
              infoPlist {
                  extraKeysRawXml = macExtraPlistKeys
              }
          }
      }
  }
}

val macExtraPlistKeys: String
  get() = """
    <key>CFBundleURLTypes</key>
    <array>
      <dict>
        <key>CFBundleURLName</key>
        <string>Example deep link</string>
        <key>CFBundleURLSchemes</key>
        <array>
          <string>compose</string>
        </array>
      </dict>
    </array>
  """
```

```kotlin
fun main() {
  var text by mutableStateOf("Hello, World!")

  try {
      Desktop.getDesktop().setOpenURIHandler { event ->
          text = "Open URI: " + event.uri
      }
  } catch (e: UnsupportedOperationException) {
      println("setOpenURIHandler is unsupported")
  }

  singleWindowApplication {
      MaterialTheme {
          Text(text)
      }
  }
}
```

ProGuard minification and obfuscation in `buildTypes.release.proguard`:

```kotlin
compose.desktop {
    application {
        buildTypes.release.proguard {
            configurationFiles.from(project.file("compose-desktop.pro"))
            obfuscate.set(true)
            optimize.set(false)
            joinOutputJars.set(true)
            version.set("7.8.0")
        }
    }
}
```

The source shows each of these options in its own block; they are combined here only for brevity.

## Options / Props

Target formats (`TargetFormat`):

| OS | Formats |
| --- | --- |
| macOS | `.dmg` (`TargetFormat.Dmg`), `.pkg` (`TargetFormat.Pkg`) |
| Windows | `.exe` (`TargetFormat.Exe`), `.msi` (`TargetFormat.Msi`) |
| Linux | `.deb` (`TargetFormat.Deb`), `.rpm` (`TargetFormat.Rpm`) |

Gradle tasks:

| Task | Description |
| --- | --- |
| `package<FormatName>` | Packages the application into the format. No cross-compilation: build a format only on a compatible OS (for example `packageDmg` on macOS). Incompatible tasks are skipped by default. |
| `packageDistributionForCurrentOS` | Lifecycle task aggregating all package tasks for an application. |
| `packageUberJarForCurrentOS` | Single jar with all dependencies for the current OS; expects `compose.desktop.currentOS` as a `compile`, `implementation`, or `runtime` dependency. |
| `run` | Runs a non-packaged JVM application with the full runtime from `mainClass`; faster and easier to debug. |
| `createDistributable` | Creates a final application image without an installer. |
| `runDistributable` | Runs a prepackaged application image. |
| `suggestModules` | Uses `jdeps` to suggest possibly missing JDK modules (output may be incomplete or list unnecessary modules). |

Release (ProGuard) variants of tasks:

| Default | Release |
| --- | --- |
| `createDistributable` | `createReleaseDistributable` |
| `runDistributable` | `runReleaseDistributable` |
| `run` | `runRelease` |
| `package<FORMAT_NAME>` | `packageRelease<FORMAT_NAME>` |
| `packageDistributionForCurrentOS` | `packageReleaseDistributionForCurrentOS` |
| `packageUberJarForCurrentOS` | `packageReleaseUberJarForCurrentOS` |
| `notarize<FORMAT_NAME>` | `notarizeRelease<FORMAT_NAME>` (macOS only) |
| `checkNotarizationStatus` | `checkReleaseNotarizationStatus` (macOS only) |

Package version formats:

| File type | Version format | Constraints |
| --- | --- | --- |
| `dmg`, `pkg` | `MAJOR[.MINOR][.PATCH]` | Non-negative integers; MINOR and PATCH optional. |
| `msi`, `exe` | `MAJOR.MINOR.BUILD` | MAJOR max 255, MINOR max 255, BUILD max 65535. |
| `deb` | `[EPOCH:]UPSTREAM_VERSION[-DEBIAN_REVISION]` | EPOCH optional integer; UPSTREAM_VERSION alphanumerics and `.`, `+`, `-`, `~`, starts with a digit; DEBIAN_REVISION optional, alphanumerics and `.`, `+`, `~`. |
| `rpm` | Any format | Must not contain `-`. |

Version DSL priority (highest to lowest): `nativeDistributions.<os>.<packageFormat>PackageVersion`, `nativeDistributions.<os>.packageVersion`, `nativeDistributions.packageVersion`. macOS build version: `<packageFormat>PackageBuildVersion`, then `packageBuildVersion`; unset falls back to the package version.

Launcher properties:

| Name | Description |
| --- | --- |
| `mainClass` | Fully-qualified name of the class containing `main`. |
| `args` | Arguments for the application's `main` method. |
| `jvmArgs` | Arguments for the application's JVM. |

Metadata in `nativeDistributions`:

| Name | Description | Default |
| --- | --- | --- |
| `packageName` | Application name. | Gradle project name |
| `packageVersion` | Application version. | Gradle project version |
| `description` | Description. | None |
| `copyright` | Copyright information. | None |
| `vendor` | Vendor. | None |
| `licenseFile` | License file. | None |

Platform-specific options (`macOS {}`, `windows {}`, `linux {}`):

| Platform | Option | Description |
| --- | --- | --- |
| All | `iconFile.set(File("PATH_TO_ICON"))` | Platform-specific icon. |
| All | `packageVersion = "1.0.0"` | Platform-specific package version. |
| All | `installationPath = "PATH_TO_INST_DIR"` | Default installation directory (absolute or relative). On Windows `dirChooser = true` allows customizing during installation. |
| Linux | `packageName = "custom-package-name"` | Overrides the default application name. |
| Linux | `debMaintainer = "maintainer@example.com"` | Email of the package maintainer. |
| Linux | `menuGroup = "my-example-menu-group"` | Menu group. |
| Linux | `appRelease = "1"` | Release value for rpm or revision for deb. |
| Linux | `appCategory = "CATEGORY"` | Group value for rpm or section value for deb. |
| Linux | `rpmLicenseType = "TYPE_OF_LICENSE"` | License type for rpm. |
| Linux | `debPackageVersion` / `rpmPackageVersion` | deb / rpm specific package version. |
| macOS | `bundleID` | Unique identifier; alphanumerics, `-`, `.` only; reverse DNS notation recommended. |
| macOS | `packageName` | Name of the application. |
| macOS | `dockName` | Name shown in the menu bar, About menu item, and dock. Default is `packageName`. |
| macOS | `minimumSystemVersion` | Minimum macOS version (`LSMinimumSystemVersion`). |
| macOS | `signing`, `notarization`, `provisioningProfile`, `runtimeProvisioningProfile` | See the Signing and notarizing distributions for macOS tutorial. |
| macOS | `appStore = true` | Build and sign for the Apple App Store. Requires at least JDK 17. |
| macOS | `appCategory` | App Store category (`LSApplicationCategoryType`). Default `public.app-category.utilities` when building for the App Store, otherwise `Unknown`. |
| macOS | `entitlementsFile.set(File("PATH_ENT"))` | Entitlements file used when signing; custom files must include the entitlements Java applications need. If unset, the `jpackage` defaults are used. |
| macOS | `runtimeEntitlementsFile.set(File("PATH_R_ENT"))` | Entitlements used when signing the JVM runtime. |
| macOS | `dmgPackageVersion`, `pkgPackageVersion` | DMG / PKG specific package version. |
| macOS | `packageBuildVersion`, `dmgPackageBuildVersion`, `pkgPackageBuildVersion` | Package build version (all / DMG / PKG). |
| macOS | `infoPlist` | Raw `Info.plist` XML via `extraKeysRawXml`. |
| Windows | `console = true` | Adds a console launcher. |
| Windows | `dirChooser = true` | Customize installation path during installation. |
| Windows | `perUserInstall = true` | Per-user installation. |
| Windows | `menuGroup = "start-menu-group"` | Start menu group. |
| Windows | `upgradeUuid = "UUID"` | Unique ID enabling updates via the installer; must remain constant for one application. |
| Windows | `msiPackageVersion`, `exePackageVersion` | MSI / EXE specific package version. |

ProGuard options (`buildTypes.release.proguard`):

| Name | Description |
| --- | --- |
| `configurationFiles` | Custom ProGuard configuration files. |
| `obfuscate` | Enables obfuscation (disabled by default). |
| `optimize` | Controls ProGuard optimizations (enabled by default). |
| `joinOutputJars` | Produces a single uber-JAR (by default one `.jar` per input `.jar`). |
| `version` | Sets a ProGuard version. JDK 25 requires at least ProGuard 7.8.0, the default since Compose Multiplatform 1.12.0; with earlier versions and JDK 25 set `7.8.0` explicitly. |

## Notes

- The official example uses `0.1-SNAPSHOT`, which is not valid for dmg/pkg/msi/exe/rpm packaging; `1.0.0` is used here.
- Output binaries are generated in `${project.buildDir}/compose/binaries`.
- The `application` DSL here is unrelated to the deprecated Gradle `application` plugin.
- The plugin does not determine required JDK modules automatically; missing modules cause `ClassNotFoundException` at runtime (in a packaged app or `runDistributable`). The plugin needs JDK 17 or newer for `jpackage`: point `JAVA_HOME` at it or set `javaHome` in the DSL.
- Resource directories under `appResourcesRootDir`: `common` (all packages), `<OS_NAME>` (`windows`, `macos`, `linux`), and `<OS_NAME>-<ARCH_NAME>` (`x64`, `arm64`, for example `macos-arm64`). Other ways to load resources: the multiplatform resources library, or `Class::getResource` / `Class::getResourceAsStream` from `src/main/resources`.
- Default configuration is used with the `org.jetbrains.kotlin.jvm` plugin (the `main` source set) or `org.jetbrains.kotlin.multiplatform` (a single JVM target; with several JVM targets the default is disabled).
- Undocumented platform-specific properties are not recommended.
- Unsigned downloaded apps do not run on modern macOS ("YourApp is damaged and can't be open..."); see the Signing and notarization on macOS tutorial in the compose-multiplatform repository. To test tray notifications on macOS the app must be packaged.
- Default ProGuard rules: unused classes are removed, `compose.desktop.application.mainClass` is the entry point, and several `keep` rules keep the Compose runtime functional. Reflection use may need custom rules.
- Alternative packaging tool (not by JetBrains): Conveyor, which supports online updates and cross-building and needs a license for non-open-source projects.
- Distance line: this packages the desktop JVM app with the Compose Gradle plugin. Native MSIX / Microsoft Store packaging belongs to windows-packaging-publish and macOS notarization / App Store distribution to apple-distribution; general Gradle dependency and publishing configuration belongs to android-build-gradle.

## Related

- [Images and in-app icons](./images.md)
- [Support for desktop accessibility features](./desktop-accessibility.md)
- [Tray and notifications](./tray.md)
- Multiplatform Gradle DSL reference — Targets
