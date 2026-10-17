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

## 自動更新の有効化・無効化

```sh
vercel upgrade --enable-auto
```

```sh
vercel upgrade --disable-auto
```

## ネイティブバイナリ実行の有効化・無効化

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
vercel upgrade --format=json
```
