---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-publish-libraries-to-maven.html
---

# Publish

ライブラリの Maven Central / Maven Local / npm への公開に関するコマンド。出典は `multiplatform-publish-libraries-to-maven` / `multiplatform-publish-lib-setup` / `multiplatform-publish-libraries-to-npm`。

> **警告**: 本ページの公開系コマンドは外部レジストリへ成果物を公開する（取り消し困難）。認証情報・署名鍵は原文のプレースホルダ（`example-password` / `YOUR_ACCESS_TOKEN` / `<...>` 等）を実値に置き換えて環境変数やシークレットストアで渡し、スクリプトやリポジトリに書かない。使い捨てのテスト用ライブラリで試してから実行する。

## Maven Local への公開

```sh
./gradlew publishToMavenLocal
```

ターゲット別と root の全 publication をまとめて Maven Local に公開する。

## 完全なライブラリの公開（任意の Maven リポジトリ）

```sh
./gradlew publishAllPublicationsToGithubPackagesRepository
```

`publishAllPublicationsTo<MavenRepositoryName>Repository` の例（原文は `GithubPackages` リポジトリ）。

## root publication の個別公開

```sh
./gradlew publishKotlinMultiplatformPublicationToMavenLocal
```

`*.module` ファイルのみを公開し、ターゲット別 publication は別途必要。

## ターゲット別 publication の個別公開

```sh
./gradlew publish<TargetName>PublicationToMavenLocal
```

## PGP 鍵ペアの生成（Kotlin Gradle プラグイン）

```sh
./gradlew -Psigning.password=example-password generatePgpKeys --name "John Smith <john@example.com>"
```

鍵ペアは `build/pgp` に保存される。安全な場所へ移し、`example-password` は実際のパスワードに置き換える。

## 公開鍵のアップロード（Kotlin Gradle プラグイン）

```sh
./gradlew uploadPublicPgpKey --keyring /path_to/build/pgp/public_KEY_ID.asc
```

## PGP 鍵ペアの生成（gpg）

```sh
brew install gpg
gpg --full-generate-key
gpg --list-keys
```

## 公開鍵のアップロード（gpg）

```sh
gpg --keyserver keyserver.ubuntu.com --send-keys F175482952A225BFC4A07A715EE6B5F76620B385CE
```

鍵 ID は原文の例。自分の鍵 ID に置き換える。

## 秘密鍵のエクスポート

> **警告**: `key.gpg` は秘密鍵そのもの。他者と共有せず、リポジトリにコミットしない。

```sh
gpg --armor --export-secret-keys F175482952A225BFC4A07A715EE6B5F76620B385CE > key.gpg
```

## 署名設定のローカル検証

```sh
./gradlew checkSigningConfiguration
```

公開鍵が `keyserver.ubuntu.com` または `keys.openpgp.org` にアップロード済みかを確認する。

## pom.xml のローカル検証

```sh
./gradlew checkPomFileFor<PUBLICATION_NAME>Publication
```

vanniktech の gradle-maven-publish-plugin では publication 名が通常 `Maven` のため、次のコマンドになる。

```sh
./gradlew checkPomFileForMavenPublication
```

## Maven Central への公開（手動リリース）

```sh
./gradlew publishToMavenCentral --no-configuration-cache
```

認証情報は環境変数 `ORG_GRADLE_PROJECT_mavenCentralUsername` / `ORG_GRADLE_PROJECT_mavenCentralPassword` / `ORG_GRADLE_PROJECT_signingInMemoryKeyId` / `ORG_GRADLE_PROJECT_signingInMemoryKeyPassword` / `ORG_GRADLE_PROJECT_signingInMemoryKey` で渡す（原文は GitHub Actions のシークレットから設定）。デプロイメントは Maven Central のサイトで確認し手動で **Publish** する。`--no-configuration-cache` は公開プラグインが configuration cache 非対応のため。

## Maven Central への公開（自動リリース）

```sh
./gradlew publishAndReleaseToMavenCentral --no-configuration-cache
```

検証完了後に自動でリリースまで行う。`--no-configuration-cache` の扱いは上記と同じ（原文は `publishToMavenCentral` のワークフローの例のみで、このフラグ付きの完全な行は `publishAndReleaseToMavenCentral` への置換から導出）。

## npm への手動公開

```sh
NPM_TOKEN=YOUR_ACCESS_TOKEN ./gradlew :shared:publishJsPackageToNpmjsRegistry
```

`YOUR_ACCESS_TOKEN` は原文のプレースホルダ。`build.gradle.kts` の `authToken = System.getenv("NPM_TOKEN")` を前提とする。同一または古い `version` では npm が公開を拒否する。

## npm への公開（Trusted Publisher の CI）

```sh
./gradlew :shared:publishJsPackageToNpmjsRegistry
```

GitHub Actions のワークフロー内で実行する（`permissions: id-token: write` と npm 側の Trusted Publisher 設定が必要）。トークンは不要。
