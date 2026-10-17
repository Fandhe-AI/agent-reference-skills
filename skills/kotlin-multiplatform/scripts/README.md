# scripts

| Name | Description | Path |
|------|-------------|------|
| CI | GitHub Actions と TeamCity の CI で実行されるコマンド。ワークフロー YAML 本体は `references/tooling/github-actions.md` / `references/tooling/teamcity.md` を参照。 | [ci.md](./ci.md) |
| Gradle Tasks | KMP プロジェクトで公式ドキュメントに記載された Gradle タスク（web 配布物・テスト・XCFramework）。 | [gradle-tasks.md](./gradle-tasks.md) |
| Hot Reload | Compose Hot Reload の Gradle 関連コマンド。Compose Multiplatform 1.10.0 以降は desktop ターゲットを持つプロジェクトでプラグインが同梱・既定有効。 | [hot-reload.md](./hot-reload.md) |
| iOS Integration | iOS 統合（CocoaPods・SwiftPM export / import・direct integration）で公式ドキュメントに記載されたコマンド。いずれも macOS と Xcode が前提。 | [ios-integration.md](./ios-integration.md) |
| Kotlin Toolchain CLI | Kotlin Toolchain（Alpha、`kotlinToolchainVersion` 0.13）の CLI によるインストール・プロジェクト作成・実行コマンド。 | [kotlin-toolchain-cli.md](./kotlin-toolchain-cli.md) |
| Native Distribution | Compose Multiplatform Gradle プラグイン（`org.jetbrains.compose`）の desktop パッケージング・実行・notarization タスク。出力は `${project.buildDir}/compose/binaries`。 | [native-distribution.md](./native-distribution.md) |
| Publish | ライブラリの Maven Central / Maven Local / npm への公開に関するコマンド。公開系は外部レジストリへ成果物を出すため取り消し困難。 | [publish.md](./publish.md) |
