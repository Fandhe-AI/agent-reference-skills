---
name: create-pr
description: Conventional Commits 形式で GitHub PR を作成する。OWASP Top 10 のセキュリティチェック必須で、問題があれば PR 作成を中止。Summary/Test plan/Design を含む body を生成。「PR 作って」「プルリク」「`gh pr create`」などで使用。別リポジトリ (upstream) への貢献は contribute-skill。
model: sonnet
---

# create-pr

変更内容を分析してセキュリティチェック後に GitHub PR を作成します。

## 前提条件

- `gh` CLI がインストールされ、認証済みであること
- 現在のブランチがベースブランチからフォークされていること

## フロー

### Step 1: 変更内容を分析する

```bash
git log main..HEAD --oneline
git diff main...HEAD --stat
```

ベースブランチはリポジトリの規約に従う（`main` / `develop` 等）。

### Step 2: セキュリティチェック（必須）

Agent ツールでセキュリティ確認を行う。

確認項目:
- 認証・認可の実装漏れ
- API キー・シークレットのハードコーディング
- XSS の可能性
- 入力バリデーションの欠如
- OWASP Top 10

問題が見つかった場合はユーザーに警告し、対処後に PR 作成を再試行するよう案内する。

### Step 3: PR タイトルを生成する

Conventional Commits 形式: `type(scope): subject`

例:
```
feat(auth): ソーシャルログイン機能を追加
fix(api): レスポンスのエラーハンドリングを修正
```

### Step 4: PR body を生成する

```markdown
## Summary

- 変更内容の箇条書き

## Test plan

- [ ] 動作確認手順1
- [ ] 動作確認手順2
- [ ] エッジケース確認

## Design

- Figma: （あれば記載）

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

### Step 5: PR を作成する

```bash
gh pr create \
  --base main \
  --title "type(scope): subject" \
  --body "$(cat <<'EOF'
...
EOF
)"
```

ユーザーに PR URL を返す。

## 検証

PR 作成後に以下を確認してから完了を宣言する（詳細は `.claude/rules/verification.md`）。「PR を作成したはず」等の推測語での完了主張は禁止。

```bash
# PR が作成されたことと CI ステータスを確認する
gh pr view <pr-number>
gh pr checks <pr-number>
```

## よくある失敗

| 問題 | 回避策 |
|------|--------|
| セキュリティ問題を検出しても PR 作成を続行する | Step 2 で問題を発見したら即座に処理を中止し、ユーザーに警告して修正を依頼する |
| PR URL を返さずに完了する | `gh pr create` の出力から PR URL を取得してユーザーに提示する |
| Conventional Commits 形式に準拠しないタイトルをつける | `type(scope): subject`（72文字以内）の形式を厳守する |

## 注意事項

- ベースブランチはリポジトリの規約に従う
- セキュリティ問題が未解決の場合は PR 作成を中止する
- Draft PR を作成する場合は `--draft` フラグを追加する（ユーザーに確認）

## sandbox 環境での実行

このスキルは sandbox 環境では実行できない。ネットワークアクセス・ファイルシステムへの書き込みが必要なため、通常の Claude Code セッションで実行すること。
