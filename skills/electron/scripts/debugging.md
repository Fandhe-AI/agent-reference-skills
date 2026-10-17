---
source: https://www.electronjs.org/docs/latest/tutorial/debugging-main-process
---

# Debugging

メインプロセスのデバッグ・REPL・Chromium ログ。出典は debugging-main-process、repl、api/command-line-switches、api/environment-variables。

> **警告**: `--inspect` / `--remote-debugging-port` はデバッガ用ポートを開く。開発マシンまたは使い捨て環境でのみ使用し、製品ビルドや共有ネットワークで有効にしない。

## メインプロセスのインスペクタ有効化

```sh
electron --inspect=9229 your/app
```

既定ポートは `9229`。Chrome の `chrome://inspect` から接続できる。

## 最初の行で停止して起動

```sh
electron --inspect-brk=9229 your/app
```

`--inspect-brk[=port]` は最初の JavaScript 行で実行を一時停止する（debugging-main-process に例コマンドは無く、`--inspect` と同形で記載）。

## メインプロセスの REPL

```sh
./node_modules/.bin/electron --interactive
```

Windows では `electron --interactive` は利用不可（公式記載）。

## レンダラーのリモートデバッグ用ポート

```sh
electron . --remote-debugging-port=9222
```

VS Code 用の launch 構成（tutorial-first-app 記載）でも `"args": [".", "--remote-debugging-port=9222"]` として使われる。

## Chromium ログの出力（環境変数）

```sh
export ELECTRON_ENABLE_LOGGING=true
electron
```

`--enable-logging` と同等。出力先は `ELECTRON_LOG_FILE` または `--log-file=path`（親ディレクトリは存在すること）で指定する。Windows のコンソールでは `set ELECTRON_ENABLE_LOGGING=true`。

## クラッシュ時のスタックトレース表示

```sh
export ELECTRON_ENABLE_STACK_DUMPING=true
electron
```

`crashReporter` を開始している場合は無効（公式記載）。

## 指定ビルドの Electron で起動

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Testing
```

`npm install` で取得したものの代わりに指定ビルドを使う（環境変数ページ記載の例）。
