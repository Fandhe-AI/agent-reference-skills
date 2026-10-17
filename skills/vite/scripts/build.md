---
source: https://vite.dev/guide/cli#vite-build
---

# Build

本番ビルド `vite build` のコマンド集。

## 本番ビルド

```sh
vite build [root]
```

scaffold 済みプロジェクトでは `npm run build`（`"build": "vite build"`）。出力先の既定は `dist`。

## 主なオプション付きビルド

```sh
vite build --outDir out
vite build --assetsDir static
vite build --target es2020
vite build --sourcemap
vite build --sourcemap hidden
vite build --minify terser
vite build --manifest
vite build --base /sub/
vite build -m staging
```

## ファイル変更で再ビルド（watch）

```sh
vite build --watch
```

`-w, --watch` で Rolldown watcher が有効になり、バンドル対象のファイル変更で再ビルドする。設定ファイルとその依存の変更はビルドコマンドの再起動が必要。`build.watch` で `WatcherOptions` を直接調整することもできる。

## SSR ビルド

```sh
vite build --ssr [entry]
```

指定エントリーをサーバーサイドレンダリング用にビルドする。`--ssrManifest [name]` で SSR manifest json を出力できる。

## オプション一覧

| Options | Description |
| --- | --- |
| `--target <target>` | Transpile target (default: `"baseline-widely-available"`) |
| `--outDir <dir>` | Output directory (default: `dist`) |
| `--assetsDir <dir>` | Directory under outDir to place assets in (default: `"assets"`) |
| `--assetsInlineLimit <number>` | Static asset base64 inline threshold in bytes (default: `4096`) |
| `--ssr [entry]` | Build specified entry for server-side rendering |
| `--sourcemap [output]` | Output source maps for build (default: `false`) (`boolean \| "inline" \| "hidden"`) |
| `--minify [minifier]` | Enable/disable minification, or specify minifier (default: `"oxc"`) (`boolean \| "oxc" \| "terser" \| "esbuild"`) |
| `--manifest [name]` | Emit build manifest json |
| `--ssrManifest [name]` | Emit ssr manifest json |
| `--emptyOutDir` | Force empty outDir when it's outside of root |
| `-w, --watch` | Rebuilds when modules have changed on disk |
| `-c, --config <file>` | Use specified config file |
| `--base <path>` | Public base path (default: `/`) |
| `-l, --logLevel <level>` | info \| warn \| error \| silent |
| `--clearScreen` | Allow/disable clear screen when logging |
| `--configLoader <loader>` | `bundle` (default) / `runner` (experimental) / `native` (experimental) |
| `--profile [name]` | Write Node.js inspector profile to `<name>.cpuprofile` |
| `-d, --debug [feat]` | Show debug logs |
| `-f, --filter <filter>` | Filter debug logs |
| `-m, --mode <mode>` | Set env mode |
| `-h, --help` | Display available CLI options |
| `--app` | Build all environments, same as `builder: {}` (experimental) |

> **警告**: `--emptyOutDir` は root 外の outDir を強制的に空にする。`--outDir` に意図しないディレクトリを指定すると内容が削除されるため、対象パスを確認してから実行する。`--app` は experimental。
