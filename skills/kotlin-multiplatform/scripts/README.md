# scripts

| Name | Description | Path |
|------|-------------|------|
| CI | Commands run by GitHub Actions and TeamCity CI. For the workflow YAML itself, see `references/tooling/github-actions.md` / `references/tooling/teamcity.md`. | [ci.md](./ci.md) |
| Gradle Tasks | Gradle tasks documented for KMP projects (web distributions, tests, XCFramework). | [gradle-tasks.md](./gradle-tasks.md) |
| Hot Reload | Gradle-related commands for Compose Hot Reload. From Compose Multiplatform 1.10.0, the plugin is bundled and enabled by default in projects with a desktop target. | [hot-reload.md](./hot-reload.md) |
| iOS Integration | Commands documented for iOS integration (CocoaPods, SwiftPM export / import, direct integration). macOS and Xcode are required for all of them. | [ios-integration.md](./ios-integration.md) |
| Kotlin Toolchain CLI | Install, project creation, and run commands for the Kotlin Toolchain CLI (Alpha, `kotlinToolchainVersion` 0.13). | [kotlin-toolchain-cli.md](./kotlin-toolchain-cli.md) |
| Native Distribution | Desktop packaging, run, and notarization tasks of the Compose Multiplatform Gradle plugin (`org.jetbrains.compose`). Output goes to `${project.buildDir}/compose/binaries`. | [native-distribution.md](./native-distribution.md) |
| Publish | Commands for publishing libraries to Maven Central / Maven Local / npm. Publishing pushes artifacts to external registries and is hard to undo. | [publish.md](./publish.md) |
