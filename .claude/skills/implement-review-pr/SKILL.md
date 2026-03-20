---
name: implement-review-pr
description: GitHub PR の CI・品質・Conventional Commits 準拠をレビューする。
---

# implement-review-pr

GitHub PR の CI ステータス・コード品質・セキュリティをレビューします。

## 前提条件

- `gh` CLI がインストールされ、認証済みであること

## フロー

### Step 1: PR 情報を取得する

```bash
gh pr view <number-or-url>
gh pr diff <number-or-url>
```

### Step 2: CI ステータスを確認する

```bash
gh pr checks <number-or-url>
```

全チェックが pass しているか確認。失敗している場合は詳細をユーザーに報告。

### Step 3: PR タイトルを確認する

Conventional Commits 形式への準拠を確認:
- `type(scope): subject` の形式
- 有効な type（feat / fix / docs / refactor / test / chore / style / build / ci / perf）
- subject が 72 文字以内

### Step 4: コード品質レビュー

Agent ツールに委譲してコード品質を確認:

確認項目:
- アーキテクチャ準拠（コンポーネント階層、配置先）
- 命名規則
- Import ルール
- 不要な再描画リスク
- テストカバレッジ

### Step 5: セキュリティレビュー（必須）

Agent ツールに委譲してセキュリティを確認:

確認項目:
- OWASP Top 10
- API キー・シークレット漏洩
- 入力バリデーション
- 認証・認可の実装
- 機密データの取り扱い

### Step 6: レビューレポートを生成する

```
## PR #123: feat(auth): 新機能追加

### CI Status
✅ All checks passed

### Title Compliance
✅ Conventional Commits 準拠

### Code Review
✅ 問題なし
⚠️ 要改善: `src/Foo.tsx:10` — 説明
❌ 要修正: `src/Bar.tsx:20` — 説明

### Security Audit
✅ セキュリティ問題なし
❌ [HIGH] `src/api.ts:5` — 説明
```

### Step 7: GitHub にレビューコメントを投稿する（オプション）

ユーザーに確認してから投稿:

```bash
gh pr review <number> --comment --body "..."
# または
gh pr review <number> --approve
gh pr review <number> --request-changes --body "..."
```

## 注意事項

- セキュリティ問題（HIGH）がある場合は request-changes を推奨する
- CI が失敗している場合はレビューをブロックすることを推奨する
