---
source: https://kotlinlang.org/docs/multiplatform/github-actions-for-kmp.html
---

# CI

GitHub Actions と TeamCity の CI で実行されるコマンド。ワークフロー YAML 本体は `references/tooling/github-actions.md` / `references/tooling/teamcity.md` を参照。出典は `github-actions-for-kmp` / `configure-teamcity-for-kmp`（`https://kotlinlang.org/docs/multiplatform/configure-teamcity-for-kmp.html`）。

## 共有テストの実行

```sh
./gradlew jvmTest
```

テストレポートは `**/build/reports/tests/` に出力される（GitHub Actions / TeamCity とも同じタスク）。

## Android debug APK のビルド

```sh
./gradlew :mobile:assembleDebug
```

APK は `mobile/build/outputs/apk/debug/` に出力される。`:mobile` は原文サンプル（Jetcaster KMP）のモジュール名。

## iOS シミュレーター向けアプリのビルド

```sh
xcodebuild build \
  -project JetcasterMigration/JetcasterMigration.xcodeproj \
  -configuration Debug \
  -scheme JetcasterMigration \
  -sdk iphonesimulator \
  -derivedDataPath ./build \
  -verbose
```

macOS ランナー（`macos-latest`）と Xcode が前提。署名を避けるため iOS Simulator を対象にする。プロジェクト名・scheme は原文サンプルの値で、自身のプロジェクトに置き換える。成果物は `build/Build/Products/Debug-iphonesimulator/*`。

## Gradle 実行オプション（GitHub Actions の GRADLE_OPTS）

```sh
export GRADLE_OPTS="-Dorg.gradle.jvmargs=-Xmx4096M -Dorg.gradle.daemon=false -Dorg.gradle.parallel=true -Dorg.gradle.caching=true"
```

原文はワークフローの `env: GRADLE_OPTS:` として設定している。ローカルで同等の設定を使う場合の書き方で、`export` 形式は原文の値からの組み立て。
