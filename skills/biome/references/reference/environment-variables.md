# 環境変数

| 変数 | デフォルト | 説明 |
|------|-----------|------|
| `BIOME_DISTRIBUTION` | — | `biome upgrade` が検出するインストール元の上書き（`npm` / `homebrew` / `standalone`） |
| `BIOME_LOG_FILE` | — | `check` / `lint` / `format` / `ci` 等の内部 CLI ログの出力先ファイル |
| `BIOME_LOG_PATH` | — | デーモンのログファイル保存先ディレクトリ |
| `BIOME_LOG_PREFIX_NAME` | `server.log` | デーモンのログファイル名プレフィックス |
| `BIOME_LOG_LEVEL` | `none` | 内部ログレベル（`none` / `info` / `warn` / `error` / `debug` / `tracing`） |
| `BIOME_LOG_KIND` | `pretty` | 内部ログ形式（`pretty` / `compact` / `json`）。ログ有効化には `BIOME_LOG_LEVEL` も設定 |
| `BIOME_CONFIG_PATH` | — | 設定ファイルまたはディレクトリのパス |
| `BIOME_THREADS` | 自動 | `biome ci` が使うワーカースレッド数 |
| `BIOME_WATCHER_KIND` | `recommended` | デーモンのファイル監視方式（`recommended` / `polling` / `none`） |
| `BIOME_WATCHER_POLLING_INTERVAL` | `2000` | `polling` 時のポーリング間隔（ミリ秒） |
| `BIOME_BINARY` | — | `@biomejs/biome` npm パッケージが使う Biome バイナリの上書き指定 |
| `RUST_BACKTRACE` | — | Biome が panic した際にバックトレースを出力（Rust の環境変数であり Biome 固有ではない） |

使用例:
```bash
BIOME_BINARY=/path/to/biome npx @biomejs/biome format .
BIOME_LOG_FILE=biome-debug.log BIOME_LOG_LEVEL=debug biome check .
BIOME_WATCHER_KIND=polling BIOME_WATCHER_POLLING_INTERVAL=1000 biome start
```

## Notes

- `BIOME_LOG_DIR` は 2.0.0 で削除された。代わりに `BIOME_LOG_PATH` を使う
- `BIOME_WATCHER_KIND=polling` はネットワークドライブ等で有効。`none` ではデーモンとエディタ連携がファイル変更を検出しない
