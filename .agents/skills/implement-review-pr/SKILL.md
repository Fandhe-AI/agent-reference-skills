---
name: implement-review-pr
description: 'GitHub PR の CI ステータス (`gh pr checks`)・コード品質・セキュリティ (OWASP Top 10)・Conventional Commits 準拠をレビューする。`gh pr review --approve/--request-changes/--comment` でレビュー投稿も可能。「PR #N をレビュー」「PR レビューして」などで使用。ローカル diff のレビューには implement-review を使用。'
model: sonnet
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

out-of-scope 項目を検出した場合は本レポートに「対象外とした項目」と対応案を含める（後述の「実装対象外（out-of-scope）の扱い」を参照）。切り出し先 Issue 番号はユーザー承認後の起票で確定するため、レポート時点では 'TBD' と記載する。out-of-scope の収集はレビュー中（Step 4〜5）に行う。

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

## 実装対象外（out-of-scope）の扱い

このスキルは読み取り専用のレビューが原則だが、PR レビューの過程で対応すべきだが現スコープ外と判断した事項（未対応の改善・別機能・技術的負債・後続作業）を検出した場合は、放置せず追跡する。**out-of-scope 検出時に限り、ユーザー承認を得たうえで Issue へのコメント/起票という書き込み操作を行う例外**とする。

### 手順

1. **既存 Issue を確認する**
   対象を実装している既存の open Issue があるか検索する:

```bash
gh issue list --state open --search "${KEYWORD}"
```

   キーワードは `"${KEYWORD}"` でクォートして渡す。

2. **ユーザーに提示して承認を得る**
   out-of-scope 項目・既存 Issue の有無・対応案（既存 Issue へのコメント追加 or 新規起票）をレビューレポートに含めてユーザーに提示する。**承認を得てから実行する**（確認なしに Issue 操作をしない）。

3. **既存 Issue がある場合: コメントを追加する**

```bash
gh issue comment "${ISSUE_NUMBER}" --body "$(cat <<'EOF'
## 実装サポート情報（別作業から検出）

### 検出背景
PR レビュー（PR #N）の過程で発見した事項。

### 関連ファイル・シンボル
- `src/path/to/file.ts` — 対象関数名・クラス名

### パッケージ・サービスから見た役割・影響範囲
（このシンボルの担う境界、呼び出し元/呼び出し先）

### 着手時の注意点・依存関係
（依存パッケージ、順序制約など）
EOF
)"
```

4. **既存 Issue がない場合: 新規起票する**
   `create-issue-tree`（既存ルートへの紐付けは `--root <ルートissue番号>`）または `create-issue` を使用して、適切な親 Issue 配下に起票する。タイトルは Conventional Commits 形式とする。

5. **PR 本文・レビューレポートに明記する**
   out-of-scope 項目はレビュー中（Step 4〜5）に収集し Step 6 のレポートに含める。Issue への書き込み操作は承認後に行う。Step 6 のレビューレポートおよび Step 7 の GitHub レビューコメントには「対象外とした項目」と対応案を記載する。切り出し先 Issue 番号は承認後の起票で確定するため、レポート時点では 'TBD' とし、起票後に確定番号を GitHub コメントで追記する。

> **セキュリティ注記**: `gh` へ渡すキーワード・コメント本文は変数を `"${var}"` でクォートし、本文は HEREDOC（`<<'EOF'`）で渡してインジェクションを防ぐ。

## 注意事項

- セキュリティ問題（HIGH）がある場合は request-changes を推奨する
- CI が失敗している場合はレビューをブロックすることを推奨する
- **sandbox 環境での `GIT_SSL_NO_VERIFY=1` 併用**：詳細は後述の「sandbox 環境での実行」節を参照

## sandbox 環境での実行

sandbox で本スキルを実行する場合、ネットワーク越しの GitHub 操作には `GIT_SSL_NO_VERIFY=1` の併用を検討してください。本スキルの主なリモート操作は `gh pr view` / `gh pr checks` / `gh pr review` で、「リモート書き込み」判定は **要（本スキルは原則 read-only。ただし out-of-scope 追跡のユーザー承認付き Issue 操作を除く）** です。コマンド分類の詳細と TLS 検証無効化の注意事項は [`docs/sandbox-tls.md`](../../docs/sandbox-tls.md) を参照してください。
