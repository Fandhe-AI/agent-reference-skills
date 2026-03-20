# Investigate Slowness

Source: https://biomejs.dev/guides/investigate-slowness

## 初期確認

パフォーマンスの問題が発生した場合、まず以下を確認する:

1. **dist/build フォルダを除外する** -- `!!` を使って完全除外する
2. **プロジェクトルールを無効化する** -- 高度な分析を行うプロジェクトルールがパフォーマンスに影響している可能性がある
3. **node_modules を除外する** -- `!!` を使って完全除外する

```json
{
  "files": {
    "includes": ["!!dist", "!!build", "!!node_modules"]
  }
}
```

## トレーシング

詳細なパフォーマンス分析にはトレーシングを使用する:

```bash
biome lint --log-level=tracing --log-kind=json --log-file=tracing.json
```

## jq による分析

トレーシング出力を jq で解析して、ボトルネックを特定する。

### モジュールグラフの構築時間

```bash
cat tracing.json | jq 'select(.span.name == "update_module_graph_internal")'
```

### 遅い診断分析の特定

```bash
cat tracing.json | jq 'select(.span.name == "pull_diagnostics")'
```

## 注目すべきスパン

- `format_file` -- 個々のファイルのフォーマット処理時間
- `open_file_internal` -- ファイルを開く処理の時間
