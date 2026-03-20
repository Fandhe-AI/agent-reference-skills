# 環境変数

| 変数 | デフォルト | 説明 |
|------|-----------|------|
| `BIOME_LOG_PREFIX_NAME` | `server.log.` | ログファイル名プレフィックス |
| `BIOME_LOG_PATH` | — | ログファイル保存先ディレクトリ |
| `BIOME_CONFIG_PATH` | — | 設定ファイルパスの明示的指定 |
| `BIOME_BINARY` | — | Biome バイナリの上書き指定 |

使用例:
```bash
BIOME_BINARY=/path/to/biome npx @biomejs/biome format .
```
