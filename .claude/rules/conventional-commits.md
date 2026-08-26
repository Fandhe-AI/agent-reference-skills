---
description: Conventional Commits (CC) 形式のコミットメッセージ詳細規約。type・scope・subject・body・footer・Breaking Change の書式を定める。
applies_to: create-commit, create-pr, implement-issue
---

# Conventional Commits 規約

## フォーマット

```
type(scope): subject

[body]

[footer]
```

## type 一覧

| type | 用途 |
|------|------|
| `feat` | 新機能の追加 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみの変更 |
| `refactor` | 機能変更なしのコードリファクタリング |
| `test` | テストの追加・修正 |
| `chore` | ビルドプロセス・補助ツール等の変更 |
| `style` | コードスタイルのみの変更（空白・フォーマット等） |
| `build` | ビルドシステムや外部依存関係の変更 |
| `ci` | CI 設定・ワークフローの変更 |
| `perf` | パフォーマンス改善 |

## scope（任意）

変更対象のモジュール・ディレクトリ名を小文字で記述する。複数にまたがる場合は省略可。

例: `feat(auth):`・`fix(api):`・`chore(skills):`

## subject 制約

- **72 文字以下**
- 命令形・現在形で記述（「追加した」ではなく「追加する」「追加」）
- 日本語可
- 末尾にピリオド不要

良い例:
```
feat(auth): ソーシャルログイン機能を追加
fix(api): レスポンスのエラーハンドリングを修正
docs(skills): create-commit の使い方を更新
```

## body（任意）

- 変更の背景・理由を記述
- 件名から1行空けて記述
- 72 文字/行を目安に折り返す

## footer（任意）

- `Co-Authored-By:` で共同著者を記録
- `Refs #<issue>` で Issue を参照

## Breaking Change

以下のいずれかで表現する:

```
feat!: 認証 API の仕様を変更

# または

feat(auth): 認証 API を刷新

BREAKING CHANGE: レスポンス形式が v1 と互換性なし。移行手順は docs/ 参照。
```

- `type!` の `!` 接尾辞、または body に `BREAKING CHANGE:` フッターを記述
- 両方書いても良い

## pre-commit フック

**`--no-verify` の使用は絶対に禁止**。フックが失敗した場合は原因を調査・修正してから再コミットする。フック回避はセキュリティ・品質チェックの迂回につながるため認めない（詳細は `./security.md`）。

## コミット実行パターン

```bash
git commit -m "$(cat <<'EOF'
type(scope): subject

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

HEREDOC を使うことでシングルクォート・特殊文字を安全に扱う。
