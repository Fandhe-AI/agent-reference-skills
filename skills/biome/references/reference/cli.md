# CLI

## 主要コマンド

### biome check — 統合チェック
フォーマッタ、リンター、インポート整列を実行。

```bash
biome check --write         # 安全な修正適用
biome check --write --unsafe  # 危険な修正も含む
```

オプション:
- `--formatter-enabled=<true|false>`
- `--linter-enabled=<true|false>`
- `--format-with-errors=<true|false>`
- `--staged`: ステージ済みファイルのみ
- `--changed`: 変更ファイルのみ

### biome lint — リンター
```bash
biome lint --write          # 安全な修正
biome lint --write --unsafe  # 危険な修正も含む
```

オプション:
- `--suppress`: コメント抑制で対応
- `--reason=<STRING>`: 抑制理由
- `--only=<RULE>`: 特定ルール実行（例: `correctness/noUnusedVariables`）
- `--skip=<RULE>`: 特定ルール除外

### biome format — フォーマッター
```bash
biome format --write
```

オプション:
- `--stdin-file-path=<PATH>`: stdin 入力時の拡張子指定
- `--staged`, `--changed`

### biome ci — CI 環境用
読み取り専用。ファイル修正なし。`--write`/`--fix` オプションなし。
```bash
biome ci .
```

### biome init — 初期化
```bash
biome init
```
デフォルト設定の biome.json を作成。

### biome migrate — 設定移行
```bash
biome migrate --write           # v2 設定移行
biome migrate eslint --write    # ESLint 移行
biome migrate prettier --write  # Prettier 移行
```

### biome search — パターン検索（実験的）
GritQL パターンでコード検索。

### biome explain — ドキュメント表示
CLI 機能のドキュメントを表示。

### biome clean — ログクリア
デーモンログをクリア。

### biome rage — デバッグ情報
デバッグ情報を出力。

### biome start / stop — デーモン制御
デーモンサーバーの起動/停止。

## グローバルオプション

| オプション | 説明 |
|-----------|------|
| `--reporter=<形式>` | 出力形式（default, json, json-pretty, github, junit, summary, gitlab, checkstyle, rdjson, sarif） |
| `--reporter-file=<PATH>` | レポート出力先ファイル |
| `--diagnostic-level=<info\|warn\|error>` | 診断レベル（デフォルト: info） |
| `--max-diagnostics=<NUMBER>` | 表示診断上限（デフォルト: 20） |
| `--config-path=<PATH>` | 設定ファイルパス指定 |
| `--verbose` | 詳細出力 |
| `--colors=<off\|force>` | 色出力制御 |
| `--error-on-warnings` | 警告でも終了コード 1 |
