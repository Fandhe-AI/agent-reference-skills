---
source: https://vite.dev/guide/cli#vite-preview
---

# Preview and Optimize

`vite preview`（ビルド成果物のローカル確認）と `vite optimize`（依存の pre-bundle、deprecated）のコマンド集。

## 本番ビルドのローカルプレビュー

```sh
vite build
vite preview [root]
```

ビルドディレクトリ（既定 `dist`）で配信する。事前に `vite build` で最新化しておく。既定では `http://localhost:4173`。`appType` の設定に応じて一部の middleware が使われる。

> **警告**: `vite preview` は本番サーバーとして使わない（公式に「not designed for it」と明記）。

## プレビューのポート指定

```sh
vite preview --port 8080
```

```json
{
  "scripts": {
    "preview": "vite preview --port 8080"
  }
}
```

## preview のオプション

```sh
vite preview --host
vite preview --strictPort
vite preview --open
vite preview --outDir dist
```

| Options | Description |
| --- | --- |
| `--host [host]` | Specify hostname |
| `--port <port>` | Specify port |
| `--strictPort` | Exit if specified port is already in use |
| `--open [path]` | Open browser on startup |
| `--outDir <dir>` | Output directory (default: `dist`) |
| `-c, --config <file>` | Use specified config file |
| `--base <path>` | Public base path (default: `/`) |
| `-l, --logLevel <level>` | info \| warn \| error \| silent |
| `--clearScreen` | Allow/disable clear screen when logging |
| `--configLoader <loader>` | `bundle` (default) / `runner` (experimental) / `native` (experimental) |
| `-d, --debug [feat]` | Show debug logs |
| `-f, --filter <filter>` | Filter debug logs |
| `-m, --mode <mode>` | Set env mode |
| `-h, --help` | Display available CLI options |

## 依存の pre-bundle（deprecated）

```sh
vite optimize [root]
vite optimize --force
```

> **警告**: 公式に「Deprecated: the pre-bundle process runs automatically and does not need to be called」と明記されている。通常は実行不要。`--force` はキャッシュを無視して再バンドルする。

`vite optimize` のオプションは `--force` / `-c, --config` / `--base` / `-l, --logLevel` / `--clearScreen` / `--configLoader` / `-d, --debug` / `-f, --filter` / `-m, --mode` / `-h, --help`。
