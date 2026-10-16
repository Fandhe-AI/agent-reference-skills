# Extensions

GitHub CLI 拡張機能の管理コマンド。ワークフロー lockfile（gh-actions-lock）と artifact attestation の検証コマンドを含む。

## 拡張機能のインストール

```sh
gh extension install OWNER/gh-EXTENSION-NAME
```

## ローカルからインストール（開発時）

```sh
gh extension install .
```

拡張機能ディレクトリ内で実行する。

## 拡張機能の一覧表示

```sh
gh extension list
```

## 拡張機能の検索

```sh
gh search repos --topic gh-extension --sort stars
```

## 拡張機能ブラウザの表示

```sh
gh ext browse
```

## 全拡張機能のアップグレード

```sh
gh extension upgrade --all
```

## 特定の拡張機能のアップグレード

```sh
gh extension upgrade EXTENSION-NAME
```

## 拡張機能のアンインストール

```sh
gh extension remove EXTENSION-NAME
```

## gh-actions-lock 拡張機能のインストール

```sh
gh extension install github/gh-actions-lock
```

ワークフロー依存関係 lockfile は public preview（仕様変更の可能性あり）。GitHub CLI が事前に必要。

## gh-actions-lock 拡張機能のアップグレード

```sh
gh extension upgrade gh-actions-lock
```

## ワークフロー lockfile の生成（全ワークフロー）

> **警告**: `uses` 参照が解決済みの具体バージョンへ書き換えられ（例: `@v3` が `@v3.1.0`）、自リポジトリ内の `uses: ./…` も書き換わる。lockfile 以外の差分も含むため、コミット前に全差分をレビューする。lockfile は手動編集しない。

```sh
gh actions-lock
```

リポジトリルートで実行する。`.github/workflows/` 配下の全ワークフローを走査し、解決可能な action をコミット SHA に固定して lockfile を書き出す。

## ワークフロー lockfile の生成（単一ワークフロー）

```sh
gh actions-lock .github/workflows/ci.yml
```

## gh-actions-lock のオプション確認

```sh
gh actions-lock --help
```

## 移動した参照の再解決

```sh
gh actions-lock --relock
```

tag の指す先が上流で変わり正当な移動と確認できた場合のみ実行する。固定済みコミットが到達不能な場合に新しいコミットを受け入れるには、次の `--accept-moved` を併用する。

```sh
gh actions-lock --relock --accept-moved
```

> **警告**: 上流の force-push や削除で元コミットが消えた場合に新コミットを受け入れる操作。上流リポジトリの履歴を確認してから実行する。

## artifact attestation の検証（バイナリ）

```sh
gh attestation verify PATH/TO/YOUR/BUILD/ARTIFACT-BINARY -R ORGANIZATION_NAME/REPOSITORY_NAME
```

オンライン環境を前提とする。オフライン環境の手順は公式の Verifying attestations offline を参照。

## artifact attestation の検証（コンテナイメージ）

```sh
docker login ghcr.io

gh attestation verify oci://ghcr.io/ORGANIZATION_NAME/IMAGE_NAME:test -R ORGANIZATION_NAME/REPOSITORY_NAME
```

イメージの FQDN に `oci://` を前置する。

## SBOM attestation の検証

```sh
gh attestation verify PATH/TO/YOUR/BUILD/ARTIFACT-BINARY \
  -R ORGANIZATION_NAME/REPOSITORY_NAME \
  --predicate-type https://spdx.dev/Document/v2.3
```

既定以外の predicate を `--predicate-type` で指定する。上記は SPDX 形式の例。

## attestation 検証結果の JSON 出力

```sh
gh attestation verify PATH/TO/YOUR/BUILD/ARTIFACT-BINARY \
  -R ORGANIZATION_NAME/REPOSITORY_NAME \
  --predicate-type https://spdx.dev/Document/v2.3 \
  --format json \
  --jq '.[].verificationResult.statement.predicate'
```
