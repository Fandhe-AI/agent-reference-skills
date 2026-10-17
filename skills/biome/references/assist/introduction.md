# Assist

## 概要

Biome Assist はコード改善アクションを提供。リンタールールとは異なり、アシストアクションは常にコード修正を提供する。プロパティのソート、式の簡素化、リファクタリングなどを実行。アシストアクション数は公式ページで自動生成される値（言語別の一覧は各 `*-actions.md` 参照）。バグ検出やコーディングスタイルの強制を目的としない。LSP のコードアクション（`codeActionKind`）に近い意味論で、グループに分類される。

## セーフな修正

アシスト修正は一般的に安全に適用できるよう設計。修正がコードを破壊する場合はバグと見なされる。

## IDE での使い方

### VS Code

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit"
  }
}
```

個別アクション:
```json
{
  "editor.codeActionsOnSave": {
    "source.action.useSortedKeys.biome": "explicit"
  }
}
```

### Zed

```json
{
  "code_actions_on_format": {
    "source.fixAll.biome": true
  }
}
```

## CLI での実行

```bash
# アシストのみ実行
biome check --formatter-enabled=false --linter-enabled=false

# 診断エラーを抑制
biome check --enforce-assist=false
```

`check` は既定でアシストを enforce する。`--enforce-assist=false` では未適用アクションがあっても診断エラーを出さない。

## 設定

```json
{
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "useSortedKeys": "on"
      }
    }
  }
}
```

アシストはデフォルトで有効。一部ルールは推奨ルールセットに含まれる。

### preset

`assist.actions.preset` と `assist.actions.[group].preset` は `"recommended"` | `"all"` | `"none"` を取る（`assist.actions.preset` の既定は `"recommended"`）。

```json
{
  "assist": {
    "actions": {
      "preset": "recommended",
      "source": {
        "preset": "all",
        "useSortedKeys": "off"
      }
    }
  }
}
```

- 優先順位: 個別アクション設定 > グループ preset > `assist.actions.preset`
- `preset` が `"none"` でも、個別アクションを明示的に有効化できる
- `recommended`（boolean）も残るが、同時指定時は `preset` が優先

## 抑制

アシストアクションの抑制は `analyzer/suppressions.md` を参照。

## グループ

- **source**: 保存時に安全に適用可能なアクション
