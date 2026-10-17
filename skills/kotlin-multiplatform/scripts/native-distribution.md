---
source: https://kotlinlang.org/docs/multiplatform/compose-native-distribution.html
---

# Native Distribution

Compose Multiplatform Gradle プラグイン（`org.jetbrains.compose`）の desktop パッケージング・実行・notarization タスク。出力は `${project.buildDir}/compose/binaries`。

> 注記: 原文で `./gradlew` 形式の完全なコマンド行が載っているのは `runDistributable` のみ。他はタスク名の表で、`./gradlew <task>` はタスク名からの組み立て。

> **警告**: `notarize*` タスクは Apple の notarization サービスへアプリイメージをアップロードする。署名・notarization の認証情報は原文の手順（Signing and notarization on macOS チュートリアル）に従い、実値をスクリプトやリポジトリに書かない。

## 配布イメージの実行

```sh
./gradlew runDistributable
```

パッケージ済みアプリケーションイメージ（JDK 同梱）を実行する。

## 非パッケージ JVM アプリの実行

```sh
./gradlew run
```

`mainClass` を起点に、Gradle JDK で非パッケージのアプリケーションを実行する。

## 配布イメージの作成（インストーラーなし）

```sh
./gradlew createDistributable
```

## 形式を指定したパッケージ化

```sh
./gradlew package<FormatName>
```

例: `packageDmg`。クロスコンパイル非対応のため、各形式は対応する OS 上でのみ作成できる（`.dmg` / `.pkg` は macOS、`.exe` / `.msi` は Windows、`.deb` / `.rpm` は Linux）。

## 現在の OS 向けパッケージ化

```sh
./gradlew packageDistributionForCurrentOS
```

## uber JAR の作成

```sh
./gradlew packageUberJarForCurrentOS
```

`compose.desktop.currentOS` が `compile` / `implementation` / `runtime` 依存として使われていることが前提。

## 不足 JDK モジュールの推定

```sh
./gradlew suggestModules
```

`jdeps` による静的解析で不足モジュールを推定する。出力は不完全、または不要なモジュールを含む場合がある。

## ProGuard を適用する release 系タスク

```sh
./gradlew createReleaseDistributable
./gradlew runReleaseDistributable
./gradlew runRelease
./gradlew packageRelease<FORMAT_NAME>
./gradlew packageReleaseDistributionForCurrentOS
./gradlew packageReleaseUberJarForCurrentOS
```

各既定タスクに対応する ProGuard 適用版（`createDistributable` → `createReleaseDistributable` の対応）。

## notarization（macOS のみ）

```sh
./gradlew notarize<FORMAT_NAME>
./gradlew checkNotarizationStatus
```

release 版は `notarizeRelease<FORMAT_NAME>` / `checkReleaseNotarizationStatus`。`notarize<FORMAT_NAME>` は application image のアップロード、`checkNotarizationStatus` は notarization の成否確認。
