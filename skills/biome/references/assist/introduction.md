# Assist

## 概要

Biome Assist はコード改善アクションを提供。リンタールールとは異なり、アシストアクションは常にコード修正を提供する。プロパティのソート、式の簡素化、リファクタリングなどを実行。現在 6 つのアシストアクションが利用可能。

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

## グループ

- **source**: 保存時に安全に適用可能なアクション
