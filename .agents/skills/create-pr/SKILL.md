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

### Step 2.5: Closes 対象 Issue の milestone 確認

この PR で close する予定の Issue（same-repo のみ）を特定し、milestone の割当状況を確認する。

1. 候補の特定: 作業対象の Issue 番号（会話文脈）・ブランチのコミットメッセージ中の
   `Closes #N` / `Fixes #N` / `Resolves #N` 参照から候補を挙げる
2. close 可否の確認: 候補ごとに「この PR で当該 Issue が完了するか」を確認する
   （部分実装・関連のみの Issue は close 対象にしない。Step 4 の PR body には
   close 対象のみ `Closes #N` と記載し、それ以外は `Refs #N` 等の関連参照にとどめる）
3. milestone 確認: close 対象と確定した Issue について、以下で割当状況を確認する。
   **milestone 非運用リポジトリのガード**: リポジトリに milestone が 1 件も存在しない場合
   （closed 含む）は milestone 非運用リポジトリとみなし、この手順 3 のみ確認・警告なしで
   スキップして Step 3 へ進む（milestone を使わないリポジトリの PR 作成にノイズを加えない。
   手順 1〜2 の close 可否確認は milestone と無関係の安全確認のためスキップしない）

```bash
# 非運用ガード: MILESTONE_COUNT が 0 なら手順 3 をスキップして Step 3 へ進む
MILESTONE_COUNT=$(gh api "repos/{owner}/{repo}/milestones?state=all" --jq 'length')

# close 対象 Issue の milestone 割当状況を確認する
gh issue view <N> --json milestone --jq '.milestone.title // empty'
```

- milestone が既に割当済み → 次の Step へ進む
- 未割当の場合:
  - オープン中の milestone が 1 件のみなら、その milestone を割り当ててよいかユーザーに確認し、
    同意が得られたら `gh issue edit <N> --milestone <title>` で付与する
  - 複数件 or 0 件の場合はユーザーに確認する。どの milestone を使うか決まらない場合は
    milestone なしのまま Step 3 へ進めてよいが、その旨を PR body に警告として明記する
    （milestone を必須とする CI ゲートがあるリポジトリではそちらが最終防衛線として
    機能する前提とし、本 Step は PR 作成自体をブロックしない）

この PR で close する Issue がない場合はこの Step をスキップする。

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
| Closes 対象 Issue が milestone 未割当のまま PR 作成 → CI で初めて失敗する | Step 2.5 で必ず確認する。milestone を決めきれない場合も PR body に警告を残す |

## 注意事項

- ベースブランチはリポジトリの規約に従う
- セキュリティ問題が未解決の場合は PR 作成を中止する
- Step 2.5 の milestone 確認は省略しない（Closes 対象がない場合のみスキップ可）
- Draft PR を作成する場合は `--draft` フラグを追加する（ユーザーに確認）

## sandbox 環境での実行

このスキルは sandbox 環境では実行できない。ネットワークアクセス・ファイルシステムへの書き込みが必要なため、通常の Claude Code セッションで実行すること。
