---
source: https://vite.dev/guide/cli#vite
---

# Dev

開発サーバー `vite` の起動とオプション。`vite dev` / `vite serve` は `vite` の alias。

## 開発サーバーの起動

```sh
vite [root]
```

```sh
vite serve some/sub/dir
```

root を変更した場合、設定ファイル（`vite.config.js`）もプロジェクト root 内で解決されるため移動が必要。scaffold 済みプロジェクトでは `npm run dev`（`"dev": "vite"`）で起動できる。

## 主なオプション付き起動

```sh
vite --host
vite --port 3000
vite --port 3000 --strictPort
vite --open
vite --cors
vite --force
vite -c vite.config.custom.ts
vite --base /sub/
vite -m staging
```

`--force` はオプティマイザーのキャッシュを無視して再バンドルする。依存を link / unlink した場合の再最適化にも使う（troubleshooting 記載）。

## オプション一覧

| Options | Description |
| --- | --- |
| `--host [host]` | Specify hostname (`string`) |
| `--port <port>` | Specify port (`number`) |
| `--open [path]` | Open browser on startup (`boolean \| string`) |
| `--cors` | Enable CORS (`boolean`) |
| `--strictPort` | Exit if specified port is already in use (`boolean`) |
| `--force` | Force the optimizer to ignore the cache and re-bundle (`boolean`) |
| `--experimentalBundle` | Use experimental full bundle mode (this is highly experimental) (`boolean`) |
| `-c, --config <file>` | Use specified config file (`string`) |
| `--base <path>` | Public base path (default: `/`) (`string`) |
| `-l, --logLevel <level>` | info \| warn \| error \| silent (`string`) |
| `--clearScreen` | Allow/disable clear screen when logging (`boolean`) |
| `--configLoader <loader>` | `bundle` (default) / `runner` (experimental) / `native` (experimental) |
| `--profile [name]` | Start built-in Node.js inspector and write the profile to `<name>.cpuprofile` |
| `-d, --debug [feat]` | Show debug logs (`string \| boolean`) |
| `-f, --filter <filter>` | Filter debug logs (`string`) |
| `-m, --mode <mode>` | Set env mode (`string`) |
| `-h, --help` | Display available CLI options |
| `-v, --version` | Display version number |

> **警告**: `--experimentalBundle` は公式 CLI 表で「highly experimental」と明記されている。本番プロジェクトでの利用は使い捨て環境での検証後に限る。`--configLoader runner` / `native` も experimental。

## ヘルプとバージョンの確認

```sh
npx vite --help
npx vite --version
```
