# Upgrade

Vercel CLI 本体のアップグレード・自動更新管理

## CLI のアップグレード

インストールに使われたパッケージマネージャーを検出し、最新版へアップグレード。

```sh
vercel upgrade
```

グローバルのパッケージマネージャーによるインストールを検出できない場合はエラー終了する。その場合はインストールに使ったパッケージマネージャーで更新する。

## 実行内容のプレビュー

実際には変更を加えず、実行されるコマンドのみ表示。

```sh
vercel upgrade --dry-run
```

## バージョンの指定

完全な `major.minor.patch` で指定してインストール。

```sh
vercel upgrade 59.11.7
```

パッケージマネージャーの設定（最小リリース経過日数など）が許す最新リリースをインストール。

```sh
vercel upgrade latest
```

## 最小リリース経過日数チェックのバイパス

npm / pnpm の最小リリース経過日数の設定で最新版が止められている場合に、チェックを飛ばして最新版をインストール（npm / pnpm のみ。以降の手動アップグレードでも記憶される）。

```sh
vercel upgrade --bypass-min-release-age
```

チェックを元に戻す（設定のみ変更し、アップグレードは実行しない）。

```sh
vercel upgrade --no-bypass-min-release-age
```

## 自動更新の有効化・無効化

設定のみを変更し、アップグレードは実行しない。

```sh
vercel upgrade --autoupdate
```

```sh
vercel upgrade --no-autoupdate
```

## ネイティブバイナリ実行の有効化・無効化

> **注記**: `--enable-binary` / `--disable-binary` は現行の公式 `vercel upgrade` ページに記載がなく、現行の公式ドキュメントでは未確認。

インストール済みの実験的ネイティブバイナリを使う設定を保存する（別パッケージはインストールしない。`vercel` のインストール時に optional dependencies を有効にしておく）。

```sh
vercel upgrade --enable-binary
```

ネイティブ実行を無効にして Node.js 実行へ戻す。

```sh
vercel upgrade --disable-binary
```

`VERCEL_CLI_USE_NATIVE_BINARY=1` または `true` を設定している場合は、保存した opt-out を有効にするためその上書きを削除する。

`@vercel/vc-native` を直接インストールしている場合は、アップグレード前に `vercel` へ移行する（[install.md](./install.md) 参照）。

## アップグレード計画を JSON で取得

`--dry-run` を暗黙的に含む（実際のアップグレードは行われない）。

```sh
vercel upgrade --json
```
