---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-build-native-binaries.html
---

# Gradle Tasks

KMP プロジェクトで公式ドキュメントに記載された Gradle タスク（web 配布物・テスト・XCFramework）。出典は `build-and-run-kmp` / `multiplatform-run-tests` / `multiplatform-build-native-binaries`（docs SHA `3ad4b02`）。

> 注記: 原文がタスク名のみを示し `./gradlew` 形式の完全なコマンド行を載せていないものは、各項目に明記する。

## Web 互換モードの配布物生成

```sh
./gradlew composeCompatibilityBrowserDistribution
```

`js` と `wasmJs` の両ターゲットに対応する成果物を生成する。出力例は `webApp/build/dist/composeWebCompatibility/productionExecutable`。Gradle JVM は Java 11 以上必須、Compose Multiplatform では Java 17 以上を推奨（出典: `build-and-run-kmp`）。

## Wasm ブラウザ配布物の生成

```sh
./gradlew wasmJsBrowserDistribution
```

原文は IDE の Gradle run configuration の **Tasks and arguments** に `wasmJsBrowserDistribution` を貼る手順（出典: `multiplatform-publish-apps`）。`./gradlew` 形式は同ページに無く、タスク名のみが原文由来。

## 全テストの実行

```sh
./gradlew allTests
```

プロジェクト内の全テストを対応するテストランナーで実行する。HTML レポートは `sharedLogic/build/reports/tests` に生成される（出典: `multiplatform-run-tests`）。原文は「`allTests` Gradle タスクを実行」と記述しており、`./gradlew` 形式はタスク名からの組み立て。

## XCFramework の組み立て

```sh
./gradlew assembleXCFramework
```

`XCFramework()` を宣言すると Kotlin Gradle プラグインが `assembleXCFramework` / `assemble<Framework name>DebugXCFramework` / `assemble<Framework name>ReleaseXCFramework` を登録する（出典: `multiplatform-build-native-binaries`）。`./gradlew` 形式はタスク名からの組み立て。

## CocoaPods プラグインによる XCFramework の組み立て

```sh
./gradlew podPublishXCFramework
```

CocoaPods Gradle プラグイン使用時のタスク。`podPublishReleaseXCFramework`（release のみ）/ `podPublishDebugXCFramework`（debug のみ）/ `podPublishXCFramework`（両方）が podspec とともに XCFramework を生成する（出典: `multiplatform-build-native-binaries`）。`./gradlew` 形式はタスク名からの組み立て。

## Gradle デーモンの停止

```sh
./gradlew --stop
```

Xcode の User Script Sandboxing を無効化した後、サンドボックス下で起動された可能性のある Gradle デーモンを止める（出典: `multiplatform-cocoapods-overview` / `multiplatform-direct-integration`）。

## Gradle のその他の注記

- `build-and-run-kmp` は「既定の Gradle build タスクは全ターゲットの debug / release を常にビルドする」と記すのみで、`./gradlew build` のコマンド行は原文に無いため収録しない。
- `link*` タスク（`linkDebugExecutable*` 等）の名称・使い方は対象ページに記載が無いため収録しない。
