---
source: https://www.electronjs.org/docs/latest/tutorial/installation
---

# Install

Electron 本体のインストール・プレリリース・ミラー・キャッシュ・プロキシ設定。出典は tutorial/installation と api/environment-variables（`https://www.electronjs.org/docs/latest/api/environment-variables`）。

## 開発依存としてのインストール

```sh
npm install electron --save-dev
```

Electron は `devDependencies` に入れる（パッケージング工程がバイナリを同梱する）。

## バイナリのオンデマンド取得

```sh
npx install-electron --no
```

`electron` パッケージ同梱の `install-electron` bin スクリプト。既定ではバイナリは開発モード初回起動時（`electron .`）にダウンロードされる。

## プレリリース版のインストール

```sh
npm install electron-nightly --save-dev
npm install electron@alpha --save-dev
npm install electron@beta --save-dev
```

`electron-nightly` は `main` ブランチの最新変更、alpha / beta は次期メジャー向け変更。本スキルの対象は v44.8.0 のため、プレリリースは API が異なる可能性がある。

## npx による一時実行

```sh
npx electron .
```

カレントディレクトリをその場で実行する。アプリの依存関係はインストールされない。

## アーキテクチャ・プラットフォームの指定（実行時）

```sh
# Inside an npm script or with npx
ELECTRON_INSTALL_ARCH=x64 electron .
ELECTRON_INSTALL_PLATFORM=mas electron .
```

対応アーキテクチャは `x64` / `arm64`、プラットフォームは `darwin` / `mas` / `win32` / `linux`。

## アーキテクチャ・プラットフォームの指定（インストール時）

```sh
ELECTRON_INSTALL_PLATFORM=darwin npm install
ELECTRON_INSTALL_ARCH=arm64 npm install
```

api/environment-variables 記載の用法。`ELECTRON_INSTALL_ARCH` は Rosetta 下では動作しない。

## ミラーの指定

```sh
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
```

China CDN ミラーの例。`ELECTRON_CUSTOM_DIR` でパス形式を変更できる（`{{ version }}` プレースホルダ）。

```sh
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

China non-CDN ミラーの例。ミラーのチェックサムが公式と異なる場合は、`electron_use_remote_checksums=1` を直接指定するか `.npmrc` に設定する（公式記載）。

## ローカルキャッシュの場所の上書き

公式は `electron_config_cache` 環境変数でキャッシュ位置を上書きできると記載するのみで、コマンド例は無い（そのためコードブロックは省略）。既定位置は Linux `$XDG_CACHE_HOME` または `~/.cache/electron/`、macOS `~/Library/Caches/electron/`、Windows `$LOCALAPPDATA/electron/Cache`。

## HTTP プロキシ

`ELECTRON_GET_USE_PROXY` を任意の値で設定し、ホストの Node バージョンに応じた追加の環境変数（Node 10 以上は global-agent、それ以前は global-tunnel）を設定する。公式は具体的なコマンド例を示さず外部 README へ誘導するため、コードブロックは省略（追加変数は要確認）。

## 進捗表示付きインストール

```sh
npm install --verbose electron
```

低速回線向け。アセットと SHASUM ファイルを再ダウンロードするには `force_no_cache` 環境変数を `true` にする（公式記載、コマンド例なし）。

## EACCESS 時の権限回避

> **警告**: `sudo` で `--unsafe-perm=true` を付けて npm を実行すると、インストールスクリプトが root 権限で動作する。使い捨て環境（コンテナ・検証 VM）に限り使用し、まず npm の権限設定の修正（公式リンク先）を試すこと。

```sh
sudo npm install electron --unsafe-perm=true
```

`EACCESS` エラーが継続する場合に限り公式が示す手順。
