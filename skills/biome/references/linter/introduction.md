# Linter

## 概要

Biome リンターは複数言語のコードを静的解析し、エラー検出とモダンなコーディングプラクティスを強制する。ルール総数は公式ページで自動生成される値（JS/TS 単独では 2.5.15 で 469 ルール、`javascript-rules.md` 参照）。

ルールは `use*`（推奨・強制）と `no*`（禁止）の命名規約を持つ。違反時に診断を出し、多くのルールは code fix を提供する。フォーマットを検査するルールは無く、整形は Biome formatter の担当。複数言語で動く language-agnostic ルール（例: `noUselessEscapeInString` は JS / CSS）もある。

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
- `--skip=<GROUP|RULE>`: 特定ルール/グループ除外
- `--only=<GROUP|RULE>`: 特定ルール/グループのみ実行（例: `--only=correctness/noUnusedVariables`）
- `--write`: 安全な修正を適用

glob は shell が展開する（Biome は glob 非対応）。`./src/**/*.test.{js,ts}` のような指定は避け、`includes` 設定を使う。

## セーフ修正とアンセーフ修正

- **セーフ修正**: コードの意味論を変更しないことが保証。`--write` で自動適用
- **アンセーフ修正**: プログラムの意味を変更する可能性。`--write --unsafe` で適用

## 設定

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "preset": "recommended",
      "suspicious": {
        "noDebugger": "off"
      }
    }
  }
}
```

`linter.rules.preset`（`"recommended"` | `"all"` | `"none"`、既定 `"recommended"`、2.5.0 で追加）が `recommended: true` の後継。`recommended` は非推奨で次期メジャーで削除予定（`biome migrate` で移行）。グループ単位でも `linter.rules.[group].preset` を指定でき、明示的なルール設定が最優先。推奨ルールを無効化するには `"preset": "none"`（旧 `"recommended": false`）。

### 重大度レベル
- `"error"`, `"warn"`, `"info"`, `"on"`（ルール既定の重大度）, `"off"`
- `error` は常に CLI を異常終了させる。`warn` は `--error-on-warnings` 指定時のみ異常終了。`info` は終了コードに影響しない

### 重大度のグループ単位変更
- グループ全体の有効/無効・重大度: `"a11y": "off"`

### ルールオプション
- `{ "level": "error", "options": { ... } }` 形式（例: `useNamingConvention` の `strictCase`）

### コード修正制御
- `"none"`, `"safe"`, `"unsafe"` をルールごとに設定（`{ "level": "warn", "fix": "unsafe" }`）

### グループ管理
- グループ全体の有効/無効: `"a11y": "off"`

### ルール / グループのスキップと限定実行
- `biome lint --skip=style --skip=suspicious/noExplicitAny`
- `biome lint --only=style/useNamingConvention --only=a11y`（`--only` 指定ルールが設定で無効なら、推奨ルールは `error`、それ以外は `warn` で実行）

## Rule pillars

ルールは (1) エラーの説明（診断メッセージ）、(2) なぜ発火したか（note）、(3) 何をすべきか（code action、無ければ note）の 3 点を満たすべきとされる。

## ドメイン

`"react"` / `"solid"` / `"test"` 等、技術単位でルールを束ねる。`package.json` の依存から自動有効化され、`linter.domains` で `"recommended"` / `"all"` / `"off"` を指定。詳細は `domains.md`。

## マイグレーション

`biome migrate eslint` で ESLint 設定を移植し、`biome lint --suppress --reason "suppressed due to migration"` で新規検出を一括抑制できる。ルールの由来は `*-sources.md` 参照。

## ルールカテゴリ（8 グループ）

| カテゴリ | 説明 |
|---------|------|
| accessibility (a11y) | アクセシビリティ問題を防止 |
| complexity | 複雑なコードを検出・単純化 |
| correctness | 確実に不正確または無用なコードを検出 |
| nursery | 開発中の実験的ルール |
| performance | パフォーマンス最適化の機会を検出 |
| security | セキュリティ脆弱性を検出 |
| style | 一貫したスタイルを強制 |
| suspicious | 不正確である可能性が高いコードを検出 |

## エディタ統合

保存時のセーフ修正: `source.fixAll.biome` コードアクション

エディタの抑制コードアクション表示の制御:
- `source.suppressRule.inline.biome`: インライン抑制アクションの表示可否
- `source.suppressRule.topLevel.biome`: トップレベル抑制アクションの表示可否

nursery グループは stable では明示的 opt-in が必要で、セマンティックバージョニングの対象外（nightly では既定で有効）。style グループは既定で警告のみ。

## Scanner（v2+）

プロジェクトドメインルールが有効な場合、モジュールグラフ分析と型推論を実行する Scanner が起動。
- 約 2,000 ファイルで ~2s のオーバーヘッド
- TypeScript 型スキャン時は node_modules の依存関係も含むためメモリ使用量が増加
