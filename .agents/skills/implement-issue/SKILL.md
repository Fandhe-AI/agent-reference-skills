---
name: implement-issue
description: 'GitHub Issue を読み込み、`_/local-plans/<issue-number>-<slug>.md` に詳細計画を作成して**ユーザー承認後**にコードを実装する。実装後はセキュリティレビュー (OWASP Top 10) → テスト実行 → Conventional Commits でコミット。Issue 番号や URL を渡された実装依頼、「Issue #N を実装して」「この Issue を着手」などで使用。'
model: opus
---

# implement-issue

GitHub Issue を読み込み、計画確認後にコードを実装します。

## フロー

### Step 1: Issue を取得する

Issue URL または番号から内容を取得:

```bash
gh issue view <url-or-number>
```

### Step 2: コードベースを調査して実装計画を作成する

Issue の内容をもとに関連コードを調査し、`_/local-plans/` に詳細な計画ファイルを作成する。

#### 2-1. 関連コードを調査する

以下を並行して調査:
- 変更対象ファイルの現状（Glob / Grep / Read）
- 再利用可能な既存コンポーネント・ユーティリティ
- 該当 API エンドポイント
- 同様の実装パターン

#### 2-2. 計画ファイルを `_/local-plans/` に保存する

ファイル名: `<issue-number>-<issue-slug>.md`（例: `_/local-plans/42-add-auth.md`）

計画の必須セクション:

```markdown
# [Issue タイトル]

## Context
Issue の背景・目的・なぜこの変更が必要か。

## Approach
実装方針。選択肢がある場合は採用理由も記述。

## File Changes

| ファイルパス | 変更内容 |
|-------------|---------|
| `src/...` | 〜を追加 |
| `lib/...` | 〜を修正 |

## Reuse
再利用する既存実装のパスと用途。

## Test Plan
- [ ] 動作確認手順
- [ ] エッジケース確認
```

### Step 3: ユーザーに計画を提示して承認を待つ

作成した計画ファイルの内容を表示し、ユーザーの承認を得てから実装を開始する。
**承認なしに実装を開始してはならない。**

### Step 4: コードを実装する

CLAUDE.md やプロジェクトの規約に従って実装する。
広範な変更の場合は `isolation: "worktree"` を使用して安全に実施。

### Step 5: セキュリティレビュー（必須）

Agent ツールでセキュリティ確認を行う。

確認項目:
- OWASP Top 10
- API キー・シークレットのハードコーディング
- 入力バリデーション
- XSS の可能性

問題が見つかった場合は修正してから次のステップに進む。

### Step 6: テストを実行する

プロジェクトのテストコマンドを実行する。テストが失敗した場合は修正する。

### Step 7: コミットを作成する

`create-commit` スキルを使用して Conventional Commits 形式でコミットを作成する。

## 注意事項

- ユーザーの承認なしに実装を開始しない
- セキュリティ問題が未解決のままコミットしない
- 大きな変更はステップを分けてコミットする
- **sandbox 環境での `GIT_SSL_NO_VERIFY=1` 併用**：詳細は後述の「sandbox 環境での実行」節を参照

## sandbox 環境での実行

sandbox で本スキルを実行する場合、ネットワーク越しの GitHub 操作には `GIT_SSL_NO_VERIFY=1` の併用を検討してください。本スキルの主なリモート操作は `gh issue view` / `gh issue comment` で、「リモート書き込み」判定は **要（本スキルは主に API 経由）** です。コマンド分類の詳細と TLS 検証無効化の注意事項は [`docs/sandbox-tls.md`](../../docs/sandbox-tls.md) を参照してください。
