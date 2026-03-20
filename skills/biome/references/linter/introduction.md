# Linter

## 概要

Biome リンターは複数言語のコードを静的解析し、エラー検出とモダンなコーディングプラクティスを強制する。461 のルールを提供。

## CLI での使い方

```bash
# リント実行
biome lint ./src ./public

# 安全な修正を適用
biome lint --write ./src

# 危険な修正も適用
biome lint --write --unsafe ./src
```

### CLI オプション
- `--skip=<RULE>`: 特定ルール/グループ除外
- `--only=<RULE>`: 特定ルールのみ実行（例: `--only=correctness/noUnusedVariables`）
- `--write`: 安全な修正を適用

## セーフ修正とアンセーフ修正

- **セーフ修正**: コードの意味論を変更しないことが保証。`--write` で自動適用
- **アンセーフ修正**: プログラムの意味を変更する可能性。`--write --unsafe` で適用

## 設定

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noDebugger": "off"
      }
    }
  }
}
```

### 重大度レベル
- `"error"`, `"warn"`, `"info"`, `"on"`, `"off"`

### コード修正制御
- `"none"`, `"safe"`, `"unsafe"` をルールごとに設定

### グループ管理
- グループ全体の有効/無効: `"a11y": "off"`

## ルールカテゴリ

| カテゴリ | 説明 |
|---------|------|
| accessibility | アクセシビリティ問題を防止 |
| complexity | 複雑なコードを検出・単純化 |
| correctness | 確実に不正確または無用なコードを検出 |
| nursery | 開発中の実験的ルール |
| performance | パフォーマンス最適化の機会を検出 |
| security | セキュリティ脆弱性を検出 |
| style | 一貫したスタイルを強制 |
| suspicious | 不正確である可能性が高いコードを検出 |

## エディタ統合

保存時のセーフ修正: `source.fixAll.biome` コードアクション

## Scanner（v2+）

プロジェクトドメインルールが有効な場合、モジュールグラフ分析と型推論を実行する Scanner が起動。
- 約 2,000 ファイルで ~2s のオーバーヘッド
- TypeScript 型スキャン時は node_modules の依存関係も含むためメモリ使用量が増加
