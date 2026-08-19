---
name: init-claude
description: >
  任意の対象リポジトリに Claude Code の .claude/ 体系（CLAUDE.md・Agents・Rules・Skills・hooks）を
  初期セットアップする。「claude セットアップして」「.claude 作って」「CLAUDE.md 初期化」「Agent 整備して」
  「claude-code セットアップ」などで使用。既存 .claude/ の差分充実は update-claude を使用。
  implement-issue-tree が動く前提（gh auth / sub_issues / workflow js）の整備まで含む。
model: opus
user-invocable: true
argument-hint: "<対象リポジトリのパス（省略時はカレントディレクトリ）>"
---

# init-claude

任意のリポジトリに Claude Code の `.claude/` 体系を初期セットアップする。
日本語運用・目的別 Agent（カテゴリ分割）・Rules 整備・スキル導入・委譲による main 消費抑制・
model 配分・SessionStart hooks・implement-issue-tree の動作前提まで一括構成する。

既存の `.claude/` が存在するリポジトリには `update-claude` を使用する。

## 使い方

```
init-claude [対象リポジトリのパス]
```

パスを省略した場合はカレントディレクトリを対象とする。

## 前提条件

- `gh` CLI がインストールされ、認証済みであること（`gh auth status` で確認）
- 対象リポジトリで `git` が初期化済みであること
- `npx` が使用できること（`npx skills add` によるスキル導入に使用）。`skills` CLI は固定版（`SKILLS_CLI_VERSION`）で実行する。値と更新手順は「skills CLI のバージョン固定と更新手順」節を参照
- `readlink` コマンドが使用できること（workflow js symlink の stale/dangling 判定に使用。`command -v readlink` で事前確認し、利用できない環境では該当処理を中断する）

## フロー

### Step 1: 対象リポジトリを調査する

対象ディレクトリのルートを特定し、以下を把握する。

```bash
# 言語・フレームワーク検出
ls <target-repo>/
cat <target-repo>/package.json 2>/dev/null || true
cat <target-repo>/Cargo.toml 2>/dev/null || true
cat <target-repo>/pyproject.toml 2>/dev/null || true

# ディレクトリ構成（最大深度 3）
find <target-repo> -maxdepth 3 -not -path '*/.git/*' -not -path '*/node_modules/*' | head -80

# ビルド・テストコマンドの確認
cat <target-repo>/Makefile 2>/dev/null | head -40 || true
cat <target-repo>/.github/workflows/*.yml 2>/dev/null | head -60 || true
```

調査で把握する情報:
- 主要言語・フレームワーク（Rust / TypeScript / Python など）
- ディレクトリ構成（crates/ / src/ / packages/ など）
- ビルドコマンド（`cargo build` / `npm run build` / `make` など）
- テストコマンド（`cargo test` / `npm test` / `pytest` など）
- 既存の `.claude/` ディレクトリの有無

既存の `.claude/` がある場合は `update-claude` スキルへ誘導して処理を中断する。

### Step 2: 構成案を設計してユーザーに提示・承認を得る

調査結果をもとに以下の構成案を設計する。

#### Agents 設計方針

技術レイヤ別の builder Agent と横断サポート Agent を組み合わせる。

| カテゴリ | Agent 例 | model |
|---------|---------|-------|
| research | explorer（コードベース横断調査）, reference-researcher（外部仕様調査） | sonnet |
| implement | 技術レイヤ別 builder（例: api-builder, web-builder, core-builder） | sonnet |
| testing | test-runner, e2e-runner | sonnet |
| quality | reviewer, security-auditor, linter | haiku / sonnet |
| docs | docs-writer | haiku |

- 実装系 Agent はリポの技術レイヤに合わせてカスタマイズする
  （例: Rust workspace → クレート別 builder / TypeScript monorepo → パッケージ別 builder）
- 複雑な横断判断・アーキテクチャ設計は opus または fable（fable は Opus 上位の最上位 tier。特に大規模設計や複雑な横断判断が必要な場面に限定する）
- 調査・生成・レビューは sonnet
- 機械的集計・frontmatter lint・ドキュメント更新は haiku

#### Rules 設計方針

以下を標準として生成し、リポ特性に応じて追加する。

| ファイル | 内容 |
|---------|------|
| `delegation.md` | 調査・設計フェーズの委譲原則・パスベース切り替え |
| `delegation-impl.md` | 作成・編集フェーズの委譲マッピング |
| `coding-<lang>.md` | 言語別コーディング規約（Rust / TypeScript / Python 等） |
| `security.md` | OWASP Top 10・秘密情報混入防止 |
| `japanese-style.md` | 日本語出力スタイル |
| `conventional-commits.md` | Conventional Commits 詳細規約 |
| `code-comment-style.md` | コメント規約（役割・責務・呼び出し文脈を埋め込む）。規約（rule）は init-claude が生成し、規約に従ってコメントを追加・補強する `comment-code`（skill）は npx skills add で導入される |
| `out-of-scope-tracking.md` | 実装対象外の追跡規約（スコープ外事項を放置しない） |

#### Skills 設計方針

`npx skills add Fandhe-AI/agent-cli-skills` で以下を導入する。

- `create-commit` — Conventional Commits コミット作成
- `create-pr` — PR 作成
- `create-issue` — Issue 作成
- `implement-issue` — Issue 単体実装
- `implement-issue-tree` — Issue ツリー並列実装
- `implement-review` — レビュー対応
- `implement-review-pr` — PR レビュー対応
- `update-docs` — CLAUDE.md 更新
- `comment-code` — `code-comment-style.md` 規約に従ったコメント・ドキュメンテーションコメントの追加・補強

#### hooks 設計方針

- **SessionStart**: 日本語・委譲・Conventional Commits・`--no-verify` 禁止のリマインダー
- **PostToolUse**: 言語に応じた自動整形（Rust: `rustfmt` / TypeScript: `biome` または `prettier` / Python: `ruff` など）

#### model 配分表（CLAUDE.md に記載）

| 用途 | model |
|------|-------|
| 複雑な横断判断・アーキテクチャ設計 | opus または fable（fable は特に大規模設計・横断判断の最上位 tier） |
| 調査・生成・実装・レビュー | sonnet |
| 機械的集計・lint・ドキュメント更新 | haiku |

上記の構成案（Agent 一覧・Rules 一覧・model 配分・hooks・Skills）を**ユーザーに提示し承認を得てから**次の Step に進む。

### Step 3: .claude/ 一式を生成する

承認後、以下の順で生成する。対象リポに `dotclaude-via-temp` ルール（`_/dotclaude/` 経由）がない場合は
対象リポの `.claude/` へ直接書き込んで良い。

サブステップの実行順は **3-1（CLAUDE.md 骨子）→ 3-2（agents/）→ 3-3（rules/）→ 3-4（settings.json）→ 3-5（スキル導入）→ 3-6（CLAUDE.md 確定）** の順とする。CLAUDE.md は Agent・Rules・Skills の一覧を参照するため、3-1 では確定済みの項目（Overview / Repository Structure 等）のみ記載し、`Sub-agents` / `Rules` / `Current Skills` の各表は 3-2〜3-5 完了後に 3-6 で実体に合わせて確定する。

#### 3-1. CLAUDE.md の骨子を生成する

対象リポのルートに `CLAUDE.md` の骨子を作成する。以下のセクションを含めるが、`Sub-agents` / `Rules` / `Current Skills` は 3-2〜3-5 で実体を生成するまで見出しのみ（プレースホルダ）とし、内容は 3-6 で確定する。

```markdown
# CLAUDE.md

## Overview
リポジトリの概要（調査結果から生成）

## Repository Structure
ディレクトリ構成ツリー（3〜4階層）

## 委譲方針（必読）
main の役割・パスベース切り替え表・model 配分表

## Sub-agents
（3-1 では見出しのみ。カテゴリ別 Agent 一覧の表は 3-2 完了後に 3-6 で確定する）

## Rules
（3-1 では見出しのみ。ルールファイル一覧の表は 3-3 完了後に 3-6 で確定する）
（標準セット: delegation / delegation-impl / coding-<lang> / security / japanese-style /
  conventional-commits / code-comment-style / out-of-scope-tracking）

## Current Skills
（3-1 では見出しのみ。導入済みスキル一覧は 3-5 完了後に 3-6 で確定する）

## Conventions
Conventional Commits・セキュリティレビュー・日本語出力・ユーザー承認フローなど

## hooks（settings.json）
SessionStart / PostToolUse の説明
```

#### 3-2. agents/ を生成する

Step 2 で設計した Agent を `.claude/agents/<category>/<name>.md` に作成する。
各 Agent は以下の frontmatter を持つ。

```yaml
---
name: <name>
description: "<役割の説明>"
model: <haiku|sonnet|opus>
tools: [必要最小限のツール]
---
```

frontmatter のキーは Claude Code の subagent 定義仕様に従い `name` を使う
（`subagent_type` は Agent ツール呼び出し時のパラメータ名であり、定義キーではない）。

#### 3-3. rules/ を生成する

Step 2 で設計したルールを `.claude/rules/` に作成する。
`delegation.md`・`delegation-impl.md` は本リポの実例（Fandhe-AI/agent-cli-skills）を参考に
対象リポのパス構成に合わせてカスタマイズする。

`code-comment-style.md` と `out-of-scope-tracking.md` は以下の雛形骨子をベースに、
対象リポの言語・構成に合わせて調整して生成する。

##### code-comment-style.md の雛形骨子

```markdown
# コメント規約

## 目的

後続の読み手（Claude を含む）は渡された情報からしか判断できない。
コメントはパッケージ・サービス・モジュール視点での役割と、他ファイル・他サービスとの
文脈を埋め込み、ファイル単体で文脈が伝わる状態にする。

## 何を書くか

- このファイル・モジュール・関数の役割と責務境界（1〜2行要約をドキュメンテーションコメントで）
- 呼び出し元・呼び出し先の文脈（「〜から呼ばれる」「〜を呼んで〜を返す」）
- 他ファイル・他サービスとの契約（インターフェース・プロトコル・前提条件）
- 非自明な前提・副作用・エラー処理の意図

## 何を書かないか

- コードを読めば分かる逐語説明（`i++  // i をインクリメント` 等）
- 陳腐化しやすい実装詳細の重複（コードと2重に管理しない）

## ドキュメンテーションコメントの形式

言語慣習に従う（Rust: `///`、TypeScript/JavaScript: `/** */`、Python: docstring 等）。
パッケージ・モジュール・公開 API の入口には必ず1〜2行の役割要約を付ける。
```

##### out-of-scope-tracking.md の雛形骨子

```markdown
# 実装対象外の追跡規約

## 目的

実装・レビュー中にスコープ外と判断した事項を放置しない。
後で埋もれるのを防ぐため、発見したタイミングで Issue に記録して追跡可能にする。

## フロー

1. **検出**: 実装・レビュー中にスコープ外と判断した事項をメモする
2. **既存 Issue の確認**:
   ```bash
   gh issue list --search "${KEYWORD}" --state open
   ```
   キーワードは `"${KEYWORD}"` でクォートして渡す。
3. **ユーザーに承認を得る**: 既存 Issue への追記か新規起票かをユーザーと確認する
4. **記録**:
   - 既存 Issue がある場合:

```bash
gh issue comment "${ISSUE_NUMBER}" --body "$(cat <<'EOF'
（本文をここに記述）
EOF
)"
```

   - 存在しない場合: `create-issue-tree` または `create-issue` で適切な親 Issue 配下に起票
5. **元 PR・レビューに切り出し先を記録**: コメントまたは PR 本文に切り出し先の Issue 番号を記載する

## 注意

- ユーザーの承認なしに勝手に Issue を起票しない
- スコープ外の修正を現在の PR に混入させない（別 Issue・別 PR で対処する）
```

#### 3-4. settings.json を生成する

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '<リポ名>: 日本語でやりとり / 作業は subagent へ委譲し main 消費を抑える (delegation.md, delegation-impl.md) / Conventional Commits 厳守 (--no-verify 禁止) / implement-issue は計画承認後に実装'"
          }
        ]
      }
    ]
  }
}
```

言語に応じた PostToolUse 自動整形フックを提案し、ユーザーが希望する場合は追加する。

セキュリティ注意事項:
- `command` の値に API キー・トークン・パスワードを埋め込まない
- ユーザー入力をそのまま `command` に展開しない

#### 3-5. スキルを導入する

```bash
cd <target-repo>
# skills CLI (vercel-labs/skills) は固定版でのみ実行する（未固定 npx はレジストリ
# 乗っ取り時の任意コード実行経路になる）。正の定義箇所・更新手順は下記
# 「skills CLI のバージョン固定と更新手順」節を参照。
SKILLS_CLI_VERSION="1.5.23"   # 正の定義箇所。更新手順は下記節を参照
npx --yes "skills@${SKILLS_CLI_VERSION}" add Fandhe-AI/agent-cli-skills || {
  echo "エラー: skills@${SKILLS_CLI_VERSION} の実行が失敗しました（該当版の不存在・レジストリ障害等、原因は問わない）。未固定 npx skills add へのフォールバックは行わない。原因を確認してから再実行する。" >&2
  exit 1
}
```

`skills-lock.json` が生成されることを確認する。

#### 3-6. CLAUDE.md を確定する

3-2〜3-5 で生成した Agent・Rules・導入スキルの実体をもとに、3-1 で見出しのみとした
`Sub-agents` / `Rules` / `Current Skills` の各表を実際の一覧（subagent_type / model /
ファイル名 / 導入スキル名）で埋めて確定する。未存在の項目を列挙したまま残さない。

### Step 4: implement-issue-tree の動作前提を確認する

```bash
# gh auth と sub_issues API の確認
gh auth status
# sub_issues は issue 番号付き `issues/{n}/sub_issues` のみ有効（リポジトリ直下に
# sub_issues エンドポイントは存在しない）。既存 issue があれば番号を指定して疎通確認する
# （issue が未作成なら gh auth status のみで前提確認とする）
gh api "repos/<owner>/<repo>/issues/<既存issue番号>/sub_issues" 2>&1 | head -5

# workflow js の参照確認（-L で symlink か実体かを判定し、readlink でターゲットも
# EXPECTED_TARGET と比較して stale（向き先が期待と異なる）も検出する）
# readlink の存在を事前確認する。利用できない環境では空の CURRENT_TARGET により
# 正常な symlink を stale と誤判定しうるため、その場合は判定自体を中断する
if ! command -v readlink >/dev/null 2>&1; then
  echo "エラー: readlink コマンドが見つからない。workflow js の stale/dangling 判定を中断する。readlink を導入するか、手動で ls -la <target-repo>/.claude/workflows/implement-issue-tree.js を確認する"
else
  EXPECTED_TARGET="../skills/implement-issue-tree/scripts/implement-issue-tree.js"
  LINK="<target-repo>/.claude/workflows/implement-issue-tree.js"
  if [ -L "$LINK" ]; then
    CURRENT_TARGET="$(readlink "$LINK")"
    echo "symlink 現在のターゲット: $CURRENT_TARGET"
    if [ ! -e "$LINK" ]; then
      echo "警告: dangling symlink（参照先が存在しない）"
    elif [ "$CURRENT_TARGET" != "$EXPECTED_TARGET" ]; then
      echo "警告: stale symlink（期待ターゲット $EXPECTED_TARGET と不一致）"
    fi
  elif [ -e "$LINK" ]; then
    echo "実体ファイルとして存在する（symlink ではない）"
  else
    echo "workflow js が存在しない"
  fi
fi
```

不足・stale・dangling のいずれかがある場合は以下の対処方法をユーザーに案内する。

**workflow js の配置・張り替え方法:**

named workflow（`{name: "implement-issue-tree"}`）として呼ばない場合は `.claude/workflows/` への配置自体が不要で、Workflow ツールの `scriptPath` に `.claude/skills/implement-issue-tree/scripts/implement-issue-tree.js` を直接指定すればよい。

named workflow として配置する場合は `cp` ではなく**相対 symlink** を使用する。`cp` で配置すると `npx skills add` による更新が named workflow に届かなくなる。

symlink 配置は `readlink` で現在のターゲットを検証し、期待ターゲットと異なる場合（stale）・参照先が消失している場合（dangling）は張り替える。実体ファイル（非 symlink）は上書きしない。`readlink` が利用できない環境では stale 判定が正しく行えず（空の `CURRENT_TARGET` により正常な symlink を stale と誤判定しうる）、そのまま張り替え処理へ進むと意図せず既存 symlink を書き換える危険があるため、`command -v readlink` で事前確認し、利用できない場合は自動張り替えを中断してユーザーに手動対応を案内する。

```bash
if ! command -v readlink >/dev/null 2>&1; then
  echo "エラー: readlink コマンドが見つからない。stale/dangling を正しく判定できないため workflow js の自動張り替えを中断する。readlink を導入するか、手動で symlink の張り替えを行う: ls -la <target-repo>/.claude/workflows/implement-issue-tree.js"
else
  EXPECTED_TARGET="../skills/implement-issue-tree/scripts/implement-issue-tree.js"
  LINK="<target-repo>/.claude/workflows/implement-issue-tree.js"

  if [ -L "$LINK" ]; then
    # 既存 symlink: ターゲット不一致（stale）または参照先消失（dangling）なら張り替える
    if [ "$(readlink "$LINK")" != "$EXPECTED_TARGET" ] || [ ! -e "$LINK" ]; then
      if [ -d "$LINK" ]; then
        # $LINK がディレクトリを指す symlink の場合、mv "$TMP_LINK" "$LINK" は
        # リンク自体を置換せず参照先ディレクトリ内へ TMP_LINK を移動してしまい、
        # 同名ファイルがあればユーザー資産を上書きし得る。安全のため張り替えを拒否する
        echo "エラー: $LINK はディレクトリを指す symlink のため自動では張り替えない。内容を確認し、意図しない参照先であれば手動で削除してから再実行する: ls -la $LINK"
      else
        echo "張り替え前のターゲット: $(readlink "$LINK")"
        # 新リンクを競合しない一時パスへ先に作成し、成功を確認してから mv で
        # 既存リンクを置換する（先に rm すると mkdir/ln 失敗時に旧リンクが失われるため）。
        # create 分岐と同様、過去の失敗で TMP_LINK が残存している場合は上書きせず案内する
        TMP_LINK="<target-repo>/_/dotclaude/workflows/implement-issue-tree.js"
        if [ -e "$TMP_LINK" ] || [ -L "$TMP_LINK" ]; then
          echo "エラー: 過去の失敗などで一時リンク $TMP_LINK が残存している。内容を確認し、意図しない参照先でなければ削除してから再実行する: ls -la $TMP_LINK"
        elif mkdir -p "$(dirname "$TMP_LINK")" && ln -s "$EXPECTED_TARGET" "$TMP_LINK"; then
          if mv "$TMP_LINK" "$LINK"; then   # 既存 symlink はここで初めて置換される（旧リンクは直前まで生存）
            rmdir <target-repo>/_/dotclaude/workflows 2>/dev/null
            rmdir <target-repo>/_/dotclaude 2>/dev/null
          else
            echo "エラー: symlink の置換 (mv) に失敗。一時リンク $TMP_LINK が残存している可能性があるため、内容を確認し必要なら手動で削除してから再実行する: ls -la $TMP_LINK"
          fi
        else
          echo "エラー: 新しい symlink の作成に失敗。既存の symlink は保持される"
        fi
      fi
    fi
  elif [ -e "$LINK" ]; then
    # 実体ファイル: ユーザー資産の可能性があるため上書きせず警告のみ
    echo "実体ファイルが存在するため symlink 化しない。symlink 化するか確認: ls -la $LINK"
  else
    # 不在: 新規作成（張り替え分岐と同様に、一時パスへ先に作成し mkdir/ln の成功を
    # 確認してから mv する。過去の失敗で TMP_LINK が残存している場合は上書きせず案内する）
    TMP_LINK="<target-repo>/_/dotclaude/workflows/implement-issue-tree.js"
    if [ -e "$TMP_LINK" ] || [ -L "$TMP_LINK" ]; then
      echo "エラー: 過去の失敗などで一時リンク $TMP_LINK が残存している。内容を確認し、意図しない参照先でなければ削除してから再実行する: ls -la $TMP_LINK"
    elif mkdir -p "$(dirname "$TMP_LINK")" && ln -s "$EXPECTED_TARGET" "$TMP_LINK" && mkdir -p "$(dirname "$LINK")"; then
      mv "$TMP_LINK" "$LINK"
      rmdir <target-repo>/_/dotclaude/workflows 2>/dev/null
      rmdir <target-repo>/_/dotclaude 2>/dev/null
    else
      echo "エラー: 新しい symlink の作成、または配置先ディレクトリの作成に失敗。$LINK は未作成のまま"
    fi
  fi

  # 設置後チェック: symlink 不在（作成/置換失敗）と dangling（参照先未解決）を区別する
  if [ -L "$LINK" ]; then
    # symlink としては存在する場合のみ resolve 失敗（dangling）を判定する
    [ -e "$LINK" ] || echo "警告: 張り替え後もなお dangling（期待ターゲット自体が未 vendored の可能性）。npx skills add で再取得を案内"
  else
    # symlink 自体が存在しない場合は create/replace 失敗（TMP_LINK 残骸等）が原因のため、
    # npx skills add の再実行では復旧しない。上記のエラーログを確認して原因を解消してから
    # 手動で ln -s するか再実行するよう案内する
    echo "エラー: $LINK に symlink が作成されていない。上記エラーの原因（TMP_LINK 残存・mkdir/ln/mv 失敗等）を解消し、必要なら手動で ln -s $EXPECTED_TARGET $LINK を実行してから再確認する"
  fi
fi
```

### Step 5: 生成結果を報告する

報告項目:
- 生成したファイル一覧（CLAUDE.md・Agents・Rules・settings.json）
- 導入したスキル一覧（`npx skills add` の結果）
- implement-issue-tree の動作前提の充足状況
- ユーザーへの次のアクション案内（PostToolUse hooks の追加・Agent のカスタマイズなど）

## skills CLI のバージョン固定と更新手順

**Why**: `npx skills add` をバージョン未固定で実行すると、npx はローカルキャッシュに無い場合レジストリのその時点の最新版を確認なしで即時取得・実行する。`skills`（vercel-labs/skills）パッケージが乗っ取られた場合、これは任意コード実行の経路になる。exact 版（`X.Y.Z`。dist-tag・`^`/`~` レンジは禁止）への固定が信頼アンカーになる。

**固定版の決め方**:
1. `npm view skills version` で現在の latest を確認する
2. `npm view skills repository.url` が `vercel-labs/skills` であることを確認する
3. `npm view skills time --json` 等で公開日時が不自然でないことを確認する

**更新手順**:
1. Step 3-5 フェンス内の `SKILLS_CLI_VERSION` を更新する（このスキル内での正の定義箇所はここ 1 箇所のみ）
2. `node --test skills/init-claude/tests/*.mjs` で exact semver・実行行の固定を検証する
3. 1 リポジトリで実際に実行し、差分が正常であることを確認する
4. `chore(init-claude): skills CLI を X.Y.Z へ更新` でコミットする
5. 同じ `skills` CLI を固定する `update-claude` / `sync-skills-lock` の同名節も同時更新することを推奨する（値の同期は必須ではないが、乖離した場合はどちらかの節にその旨を記録する）

**既知の乖離（記録）**: 本節の `SKILLS_CLI_VERSION` の値（`1.5.23`）は、`sync-skills-lock/SKILL.md`・`sync-skills-lock/scripts/skills-lock-update.sh` が固定する `SKILLS_CLI_VERSION` の値（`1.5.22`）と異なる（`update-claude` は本節と同一の値で同期済み）。各スキルは独立した固定版として運用しており同期は必須ではないため、意図的な乖離として記録する。次回いずれかを更新する際は、この乖離が解消したか維持されたかを本行で更新する。

**fail-closed**: 固定版が解決できない場合（該当版の不存在・レジストリ障害等どの原因でも）は `npx` が非ゼロ終了し停止する。未固定 `npx skills add` へのフォールバック再試行は行わない。

## 検証

```bash
# 生成ファイルの一覧確認
find <target-repo>/.claude -type f | sort

# CLAUDE.md の存在確認
ls <target-repo>/CLAUDE.md

# skills-lock.json の存在確認
ls <target-repo>/skills-lock.json

# implement-issue-tree の前提確認
gh auth status

# workflow js の symlink 検証（存在確認だけでなく、ターゲット一致・参照先解決も確認する）
LINK="<target-repo>/.claude/workflows/implement-issue-tree.js"
EXPECTED_TARGET="../skills/implement-issue-tree/scripts/implement-issue-tree.js"
if ! command -v readlink >/dev/null 2>&1; then
  echo "エラー: readlink コマンドが見つからない。symlink ターゲット検証を中断する"
elif [ -L "$LINK" ]; then
  echo "symlink ターゲット: $(readlink "$LINK")（期待値: $EXPECTED_TARGET）"
  [ -e "$LINK" ] && echo "参照先: 解決OK" || echo "参照先: dangling（未解決）"
else
  echo "workflow js: 未配置または非 symlink"
fi
```

## 注意事項

- 既存の `.claude/` がある場合は処理を中断して `update-claude` を案内する
- ユーザーの構成案承認なしに `.claude/` の生成を開始しない
- `settings.json` の `command` にトークン・シークレットをハードコードしない
- `--no-verify` を含むコマンドを hooks に仕込まない
- `npx skills add` が失敗した場合はエラーメッセージを表示してユーザーに手動手順を案内する
- `skills` CLI は固定版で実行する。固定版の決め方・更新手順は「skills CLI のバージョン固定と更新手順」節を参照
- 言語別 PostToolUse 整形フック（rustfmt / biome / prettier / ruff）は対象リポのツール存在確認後に提案する
- Agent の `tools` リストは最小権限原則に従い必要なもののみ列挙する
