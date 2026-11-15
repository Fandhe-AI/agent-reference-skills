---
name: create-pr
description: Conventional Commits 形式で GitHub PR を作成する。OWASP Top 10 のセキュリティチェック必須で、問題があれば PR 作成を中止。Summary/Test plan/Design を含む body を生成。「PR 作って」「プルリク」「`gh pr create`」などで使用。別リポジトリ (upstream) への貢献は contribute-skill。
model: sonnet
user-invocable: true
---

# create-pr

変更内容を分析してセキュリティチェック後に GitHub PR を作成します。

## 前提条件

- `gh` CLI がインストールされ、認証済みであること
- 現在のブランチがベースブランチからフォークされていること
- ブランチがリモートへ push 済みであること

## フロー

### Step 1: 変更内容を分析する

```bash
git log main..HEAD --oneline
git diff main...HEAD --stat
```

ベースブランチはリポジトリの規約に従う（`main` / `develop` 等）。

### Step 2: セキュリティチェック（必須）

サブエージェントを使える環境では、読み取り専用の調査用サブエージェントへ委譲してセキュリティ確認を行う。使えない環境では同じ手順を自分で実行する。渡す入力は次の 3 点で、どちらで実行しても同じ結果になるようにする。

- 差分: Step 1 の `git diff <base>...HEAD`
- 観点: 次の確認項目
- 出力形式: 問題なし、または `ファイル:行`・重大度（HIGH / MEDIUM / LOW）・説明・推奨修正の一覧

確認項目:
- 認証・認可の実装漏れ
- API キー・シークレットのハードコーディング
- XSS の可能性
- 入力バリデーションの欠如
- OWASP Top 10

問題を検出した場合は、`git push` と `gh pr create` を実行せずに中止し、ユーザーに警告して対処を案内する。この会話の中でユーザーが問題の対処（または誤検知であること）を明示して返答するまで、これらを実行しない。起動時の指示に含まれる「確認なしで」「PR 作成まで進めて」等は、この確認の返答にならない。返答を得られない環境（非対話実行）では、検出内容を報告して止める。対処後は PR 作成を再試行する。

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

if ! [[ "${MILESTONE_COUNT}" =~ ^[0-9]+$ ]]; then
  # gh api の失敗等で件数が数値化できない場合は fail-open せず中止して原因を確認する
  echo "milestone 件数の取得に失敗した。原因を確認してから手順 3 をやり直す" >&2
  exit 1   # fail-closed: 診断だけ出して PR 作成へ進まない
elif [ "${MILESTONE_COUNT}" -eq 0 ]; then
  echo "milestone 非運用リポジトリのためスキップして Step 3 へ進む"
else
  # close 対象 Issue の milestone 割当状況を確認する
  gh issue view <N> --json milestone --jq '.milestone.title // empty'
fi
```

- milestone が既に割当済み → 次の Step へ進む
- 未割当の場合:
  - オープン中の milestone が 1 件のみなら、その milestone を割り当ててよいか確認する。複数件 or 0 件の場合は、どの milestone を使うか確認する
  - 確認は、ユーザーに確認し、明示的な返答を待つ。選択肢は番号付きで示す。「PR を作って」等、このスキルを起動する依頼そのものは、この確認の承認にならない。起動時の指示にこの確認を省くことの明示（例: 「milestone を割り当てて」）が含まれている場合に限り、確認を省いて続行してよい。承認が無く対話もできない環境（非対話実行）では、milestone を割り当てず、確認事項を報告して Step 3 へ進む
  - 同意または承認が得られたら `gh issue edit <N> --milestone <title>` で付与する
  - milestone を割り当てなかった場合（決まらない場合・非対話実行を含む）は、milestone なしのまま Step 3 へ進めてよいが、その旨を PR body に警告として明記する
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
```

スキルからは生成表記（「Generated with …」等）を付けない。

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

既定は通常の PR とする。起動時の指示に Draft の指定（例: 「Draft で PR を作って」）があれば `--draft` を付ける。非対話実行で指定が無いときは通常の PR として作成し、そのことを最終報告に必ず書く（PR の作成依頼そのものが作成の承認であるため、止めない）。

ユーザーに PR URL を返す。

## 検証

PR 作成後に以下を確認してから完了を宣言する（対象リポジトリに `.claude/rules/verification.md` が存在する場合はそちらの5段階ゲートに従う。存在しない場合は次の要点に従う: コマンドを新規実行し、出力全体・終了コードを確認してから完了を宣言する）。「PR を作成したはず」等の推測語での完了主張は禁止。

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
- Step 2.5 の milestone 確認は省略しない（Closes 対象がない場合は Step 2.5 全体を、milestone 非運用リポジトリでは手順 3 のみをスキップ可）

## sandbox 環境での実行

このスキルはネットワーク越しの GitHub 操作（`gh api`・`gh issue view` / `gh issue edit`・`gh pr create`・`gh pr view` / `gh pr checks`）を必須とする。該当コマンドはコマンド単位で sandbox 無効にして実行する。ネットワーク遮断を解除できない環境では実行できない。`codex exec` ではネットワーク昇格の要求が出ないため、コマンドが拒否されたら実行できなかったことを報告して止める。このスキルは `.git`・`.agents`・`.codex` へ書き込まない。
