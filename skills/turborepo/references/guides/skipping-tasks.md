# タスクのスキップ

キャッシュヒットを超えた最適化として、コード変更がないワークスペースの CI タスクを完全にスキップする。

## 主要コマンド

```bash
turbo query affected --packages web
turbo query affected --tasks test --packages web
turbo query affected --packages web --base main --head HEAD
```

## --exit-code フラグ

| 戻り値 | 意味 |
|---|---|
| `0` | 影響なし（スキップ可能） |
| `1` | 影響あり（タスク実行が必要） |
| `2` | エラー |

```bash
turbo query affected --packages web --exit-code
```

## シェルスクリプトでの使用例

```bash
#!/bin/bash
AFFECTED=$(turbo query affected --packages web)
COUNT=$(echo "$AFFECTED" | jq '.data.affectedPackages.length')
if [ "$COUNT" -eq 0 ]; then
  echo "No affected packages, skipping tasks"
  exit 0
fi
turbo run test --filter=web
```

## Git 履歴の注意点

シャロークローンでは全パッケージが変更済みとして扱われる場合がある。適切な履歴取得には以下を推奨:

```bash
git fetch --filter=blob:none --depth=0
```

## 重要

`turbo-ignore` は非推奨。`turbo query affected` への移行を推奨。
