# Commit Conventions

コミット規約の目的・フォーマット・スコープの扱い。

> **参照元**: https://commitlint.js.org/concepts/commit-conventions

## 概要

コミット規約（Commit conventions）により、チームは git 履歴にセマンティックな意味を付与できる。`type`、`scope`、`breaking changes` などの構造化された情報を含めることで、ツールがプロジェクトリリースに有用な情報を導出できるようになる。

## コミット規約が可能にすること

- **自動化されたリッチな changelog の生成** — コミットの type や scope に基づいて変更履歴を自動生成
- **自動バージョンバンプ** — breaking changes や feature の有無からセマンティックバージョニングを自動決定
- **テストハーネスの実行フィルタリング** — 変更された scope に基づいてテストの実行範囲を制御

## 基本フォーマット

[Conventional Commits](https://www.conventionalcommits.org/) 仕様に基づく標準的なコミットメッセージの構造:

```
type(scope?): subject

body?

footer?
```

| 要素 | 必須 | 説明 |
|------|------|------|
| `type` | 必須 | コミットの種類（`feat`, `fix`, `chore` など） |
| `scope` | 任意 | 変更の影響範囲（括弧で囲む） |
| `subject` | 必須 | 変更の簡潔な説明 |
| `body` | 任意 | 変更の詳細な説明 |
| `footer` | 任意 | breaking changes や issue 参照など |

`?` が付いている要素は省略可能。

### コミットメッセージの例

```
feat(lang): add Polish language
```

```
fix(middleware): ensure Range requests adhere to RFC 2616

Add one new dependency, use `range-parser` (Express dependency) to compute
range. It is tested in the determine-length case.

Fixes #2310
```

## 複数スコープのサポート

commitlint は複数スコープをサポートしている。スコープのセグメントはデリミタ（区切り文字）で分割できる。

### デフォルトデリミタ

デフォルトで使用可能なデリミタは以下の 3 つ:

- `/`（スラッシュ）
- `\`（バックスラッシュ）
- `,`（カンマ）

### 複数スコープの例

```
feat(ui/button): add hover animation
```

```
fix(api,auth): resolve token refresh issue
```

### デリミタのカスタマイズ

使用可能なデリミタのセットは `scope-delimiter-style` ルールでカスタマイズできる。

```javascript
export default {
  rules: {
    'scope-delimiter-style': [2, 'always', '/'],
  },
};
```

これにより、許可されるデリミタをプロジェクトの規約に合わせて制限・変更できる。
