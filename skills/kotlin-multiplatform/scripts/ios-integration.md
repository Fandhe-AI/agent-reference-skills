---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-cocoapods-overview.html
---

# iOS Integration

iOS 統合（CocoaPods・SwiftPM export / import・direct integration）で公式ドキュメントに記載されたコマンド。いずれも macOS と Xcode が前提。

> **警告**: `sudo gem install` はシステムの Ruby 環境を変更する。使い捨て環境、または rbenv / RVM 等のバージョン管理下で実行する。

## CocoaPods のインストール（RVM / rbenv）

```sh
sudo gem install -n /usr/local/bin cocoapods
```

事前に `rvm install ruby <version>` または `rbenv install <version>` と `rbenv global <version>` で Ruby を用意する（バージョンは原文の変数 `rubyVersion` で、本スキルの固定値は無い）。

## CocoaPods のインストール（既定の Ruby）

```sh
sudo gem install cocoapods
```

Apple M チップ搭載機では動作しない（原文注記）。

## CocoaPods のインストール（Homebrew）

```sh
brew install cocoapods
```

Xcodeproj gem が最新の Xcode に未対応だと Pod インストールでエラーになる場合がある（原文警告）。

## Pods のインストール

```sh
pod install
```

初回実行で `.xcworkspace` が生成される。以降は `.xcodeproj` ではなく `.xcworkspace` を開く。複数の Xcode プロジェクトと依存する場合は各プロジェクトで手動実行が必要（出典: `multiplatform-cocoapods-xcode`）。

## Gradle による Pods のインストール

```sh
./gradlew podInstall
open iosApp/iosApp.xcworkspace
```

リソース欠落（フォント・画像が `.ipa` に入らない）を避けるため、クリーンな環境・CI では `pod install` 直接実行ではなく `podInstall` を使う。

## CocoaPods パスの明示

```sh
echo -e "kotlin.apple.cocoapods.bin=$(which pod)" >> local.properties
```

Xcode でのビルドエラー対策。`local.properties` に追記される。

## CocoaPods ツールの更新（RVM / rbenv / Homebrew）

```sh
rvm get stable
gem update --system
gem update
```

```sh
cd ~/.rbenv
git pull
gem update --system
gem update
```

```sh
brew update
brew upgrade
```

`module 'SomeSDK' not found` 等のエラー対策（それぞれ RVM / rbenv / Homebrew 用）。

## SwiftPM export の XCFramework 生成

```sh
./gradlew :shared:assembleSharedXCFramework
```

`shared/build/XCFrameworks/release/Shared.xcframework` が生成される。複数モジュールをまとめる場合は `./gradlew :together:assembleTogetherReleaseXCFramework`（原文の umbrella モジュール例）。

## XCFramework のチェックサム計算

```sh
swift package compute-checksum Shared.xcframework.zip
```

`Shared.xcframework` を ZIP 化した後に実行する。

## アップロード済み ZIP の確認

```sh
curl <downloadable link to the uploaded XCFramework ZIP file>
```

`<...>` は原文のプレースホルダ。

## Package.swift マニフェストの検証

```sh
swift package reset && swift package show-dependencies --format json
```

`Package.swift` のあるディレクトリで実行する。

## SwiftPM import の統合タスク

```sh
XCODEPROJ_PATH='/path/to/project/iosApp/iosApp.xcodeproj' ./gradlew :kotlin-library:integrateLinkagePackage
```

SwiftPM 依存を初めて追加した際、生成された中間パッケージと Xcode プロジェクトを連携させる。生成パッケージと更新された Xcode プロジェクトはコミットする。

## SwiftPM 依存の解決（ロックファイルの強制更新）

```sh
./gradlew :yourModuleName:fetchSyntheticImportProjectPackages
```

事前に対象サブプロジェクトの `build` ディレクトリと既存の `Package.resolved`（`.swiftpm-locks/default/` 等）を削除する（出典: `multiplatform-spm-import`）。

## CocoaPods から SwiftPM import への再設定

```sh
XCODEPROJ_PATH='/path/to/project/iosApp/iosApp.xcodeproj' GRADLE_PROJECT_PATH=':kotlin-library' '/path/to/project/gradlew' -p '/path/to/project' ':kotlin-library:integrateEmbedAndSign' ':kotlin-library:integrateLinkagePackage'
```

Xcode のビルドエラーに表示されるコマンドの例（実際のパスは各プロジェクト固有）。`iosApp` ディレクトリで実行し、`.xcodeproj` を書き換える（出典: `multiplatform-cocoapods-spm-migration`）。

## CocoaPods の統合解除

> **警告**: `pod deintegrate` は Xcode プロジェクトから CocoaPods の統合を削除する。コミット済みの状態、または使い捨てのコピーで実行する。

```sh
pod deintegrate
```

Podfile のあるディレクトリで実行する。この後 `cocoapods {}` ブロック、`.podspec`、Podfile を削除する（出典: `multiplatform-cocoapods-spm-migration` / `multiplatform-spm-local-integration`）。

## Xcode Run Script での Kotlin フレームワーク埋め込み

```sh
if [ "YES" = "$OVERRIDE_KOTLIN_BUILD_IDE_SUPPORTED" ]; then
    echo "Skipping Gradle build task invocation due to OVERRIDE_KOTLIN_BUILD_IDE_SUPPORTED environment variable set to \"YES\""
    exit 0
fi
cd "<Path to the root of the multiplatform project>"
./gradlew :<Shared module name>:embedAndSignAppleFrameworkForXcode
```

direct integration で Xcode の Run Script phase に貼るスクリプト（出典: `multiplatform-direct-integration`）。`<...>` は原文のプレースホルダで、例は `$SRCROOT/..` と `:shared` / `:sharedUI`。`embedAndSignAppleFrameworkForXcode` は CocoaPods 統合とは併用できない。

## ローカル Swift パッケージ連携の Pre-action スクリプト

```sh
cd "<Path to the root of the multiplatform project>"
./gradlew :<Shared module name>:embedAndSignAppleFrameworkForXcode
```

Xcode の scheme の **Build | Pre-actions** に追加する **New Run Script Action**（出典: `multiplatform-spm-local-integration`）。`swift build` への統合は未対応。
