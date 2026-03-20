# turbo watch

```bash
turbo watch [tasks]
```

コードの変更をもとにタスクを再実行する。

## 動作レベル

- **デフォルト**: パッケージレベル。ファイルが1つでも変わると全タスク再実行
- **`futureFlags.watchUsingTaskInputs` 有効化**: タスクの `inputs` グロブに基づいてフィルタリング

## persistent タスクとの関係

| ケース | 推奨 |
|---|---|
| 組み込みウォッチャー付き（`next dev` 等） | `"persistent": true` でマークし `turbo watch` は使わない |
| モノレポ非対応のウォッチャー | `"interruptible": true` でマークし、変更検知時に再起動 |

persistent タスクは `turbo watch` に無視される。

## 制限事項

- キャッシュ: 現在実験的（`--experimental-write-cache` で使用可能）
- ソース管理下のファイルへ書き込むタスクは無限ループの恐れあり
