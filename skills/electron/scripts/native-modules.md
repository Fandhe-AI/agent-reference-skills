---
source: https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules
---

# Native Modules

ネイティブ Node モジュールの Electron 向け再ビルド。出典は using-native-node-modules と windows-arm（`https://www.electronjs.org/docs/latest/tutorial/windows-arm`）。

## @electron/rebuild による再ビルド

```sh
npm install --save-dev @electron/rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

Electron の ABI は Node.js と異なるため再ビルドが必要。Electron Forge 使用時は開発モードと配布物作成時に自動で使われる。

## npm の環境変数による直接インストール

```sh
# Electron's version.
export npm_config_target=1.2.3
# The architecture of your machine
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://electronjs.org/headers
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

`1.2.3` は使用する Electron のバージョンに置き換える。

## node-gyp による手動ビルド

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

## カスタムビルドの Electron 向けビルド

```sh
npm rebuild --nodedir=/path/to/src/out/Default/gen/node_headers
```

公開リリースと一致しないカスタムビルド用。

## Windows on ARM 向けの arm64 インストール

```bat
set npm_config_arch=arm64
npm install
```

`node_modules` を空にしてから実行する（Command Prompt）。ネイティブモジュールがある場合は追加手順があり、公式 windows-arm ページを参照。
