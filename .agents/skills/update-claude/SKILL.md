---
name: update-claude
description: >
  既存の .claude/ 体系（CLAUDE.md・Agents・Rules・Skills・hooks）を診断し、理想形との差分を提示して
  ユーザー承認後に追補・充実させる。「.claude 充実させて」「CLAUDE.md 充実させて」「Agent 整備して」
  「claude 体系アップデート」「Rules 追加して」などで使用。新規セットアップは init-claude を使用。
  npx skills add 不足分の補完・implement-issue-tree の前提確認・既存資産の破壊なし差分更新が特徴。
model: opus
user-invocable: true
argument-hint: "<対象リポジトリのパス（省略時はカレントディレクトリ）>"
---

# update-claude

既存の `.claude/` 体系を診断し、理想形（日本語運用・カテゴリ別 Agent・Rules 整備・
委譲ルール・model 配分・SessionStart hooks・implement-issue-tree 前提）との差分を提示して
ユーザー承認後に差分のみ追補する。既存の Agent・Rules・CLAUDE.md は**上書き前に確認**を取る。

`.claude/` が存在しないリポジトリには `init-claude` を使用する。

## 使い方

```
update-claude [対象リポジトリのパス]
```

パスを省略した場合はカレントディレクトリを対象とする。

## 前提条件

- 対象リポジトリに `.claude/` ディレクトリが存在すること
- `gh` CLI がインストールされ、認証済みであること（`gh auth status` で確認）
- `npx` が使用できること（`npx skills add` によるスキル補完に使用）

## フロー

### Step 1: 対象リポジトリと既存 .claude/ を調査する

```bash
# .claude/ の存在確認
ls <target-repo>/.claude/ 2>/dev/null || echo ".claude/ が存在しない"

# 既存 Agent の一覧
find <target-repo>/.claude/agents -name "*.md" 2>/dev/null | sort

# 既存 Rules の一覧
find <target-repo>/.claude/rules -name "*.md" 2>/dev/null | sort

# 既存 Skills の一覧
ls <target-repo>/.claude/skills/ 2>/dev/null | sort

# hooks 確認
cat <target-repo>/.claude/settings.json 2>/dev/null || echo "settings.json なし"

# CLAUDE.md の確認
cat <target-repo>/CLAUDE.md 2>/dev/null | head -80 || echo "CLAUDE.md なし"

# skills-lock の確認
cat <target-repo>/skills-lock.json 2>/dev/null | head -30 || echo "skills-lock.json なし"

# implement-issue-tree workflow の確認
ls <target-repo>/.claude/workflows/implement-issue-tree.js 2>/dev/null || echo "workflow js なし"
```

`.claude/` が存在しない場合は `init-claude` を案内して処理を中断する。


### Step 2: 理想形との差分を診断する

以下の観点で現状を診断し、ギャップ一覧を作成する。

#### 2-1. Agent 診断

| 診断項目 | 確認内容 |
|---------|---------|
| カテゴリ分割 | research / implement / testing / quality / docs のカテゴリ分割があるか |
| 技術レイヤ別 builder | リポの技術レイヤに対応した builder Agent が存在するか |
| model 配分 | 実装・調査=sonnet / 機械的=haiku / 横断判断=opus または fable（fable は Opus 上位の最上位 tier）が守られているか |
| 最小権限 | Agent の `tools` リストが必要最小限か |
| 委譲 Agent | skill-author / agent-author / rules-author / docs-writer に相当する Agent があるか |

#### 2-2. Rules 診断

| 診断項目 | 確認内容 |
|---------|---------|
| delegation.md | 調査モードの委譲原則・パスベース切り替え表があるか |
| delegation-impl.md | 作成・編集モードの委譲マッピングがあるか |
| coding 規約 | リポの主要言語に対応したコーディング規約があるか |
| security.md | OWASP Top 10・秘密情報混入防止の記載があるか |
| japanese-style.md | 日本語出力スタイルの記載があるか |
| conventional-commits.md | Conventional Commits 詳細規約があるか |

#### 2-3. Skills 診断

`npx skills add Fandhe-AI/agent-cli-skills` で導入できるスキルのうち、
`skills-lock.json` に含まれていないものを列挙する。

必須スキル（不足していれば追補対象）:
- `create-commit`・`create-pr`・`create-issue`
- `implement-issue`・`implement-issue-tree`
- `implement-review`・`implement-review-pr`
- `update-docs`

#### 2-4. hooks 診断

| 診断項目 | 確認内容 |
|---------|---------|
| SessionStart | 日本語・委譲・Conventional Commits・--no-verify 禁止のリマインダーがあるか |
| PostToolUse | 言語に応じた自動整形フックがあるか |

#### 2-5. CLAUDE.md 診断

| 診断項目 | 確認内容 |
|---------|---------|
| 委譲方針 | パスベース切り替え表・model 配分表があるか |
| Sub-agents 一覧 | カテゴリ別 Agent の表があるか |
| Rules 一覧 | ルールファイルの表があるか |
| Current Skills | 導入済みスキル一覧があるか |

#### 2-6. implement-issue-tree 前提診断

```bash
gh auth status
# sub_issues は issue 番号付き `issues/{n}/sub_issues` のみ有効（リポジトリ直下に
# sub_issues エンドポイントは存在しない）。既存 issue があれば番号を指定して疎通確認する
# （issue が未作成なら gh auth status のみで前提確認とする）
gh api "repos/<owner>/<repo>/issues/<既存issue番号>/sub_issues" 2>&1 | head -5
ls <target-repo>/.claude/workflows/implement-issue-tree.js 2>/dev/null
```

- gh auth の認証状態
- sub_issues API の応答（既存 issue 番号を指定。404 = GitHub Apps が有効でない可能性。
  なお `repos/{owner}/{repo}/sub_issues` というリポジトリ直下のエンドポイントは存在しないため使わない）
- workflow js の存在

### Step 3: ギャップ一覧をユーザーに提示して承認を得る

以下の形式でギャップ一覧を提示する。

```
## .claude/ 診断結果

### 不足・追補が必要な項目

#### Agents
- [ ] <カテゴリ>/<Agent名>.md: <不足理由>
- ...

#### Rules
- [ ] delegation.md: 存在しない
- [ ] coding-<lang>.md: 主要言語（<lang>）対応規約が存在しない
- ...

#### Skills（npx skills add で補完可能）
- [ ] <スキル名>: skills-lock.json に含まれていない
- ...

#### hooks
- [ ] SessionStart: settings.json に SessionStart hook がない
- [ ] PostToolUse: <lang> の自動整形フックがない
- ...

#### CLAUDE.md
- [ ] 委譲方針表: パスベース切り替え表がない
- ...

#### implement-issue-tree 前提
- [ ] workflow js: .claude/workflows/implement-issue-tree.js が存在しない
- ...

### 既存資産（上書き確認が必要な項目）

以下は既に存在します。変更する場合は個別に確認します。
- <ファイルパス>: <現在の状態の要約>
```

**ユーザーの承認なしに追補・変更を開始しない。**

承認の粒度:
- 「全て追補する」→ Step 4 に進む
- 「項目を絞って追補する」→ 対象を確認してから Step 4 に進む
- 「既存ファイルを上書きする場合」→ 上書き前に個別確認を取る

### Step 4: 差分を追補する

承認された項目のみ追補する。既存ファイルは**上書き確認を取った項目のみ**変更する。

#### 4-1. 不足 Agent を追加する

`.claude/agents/<category>/<name>.md` に追加する。
対象リポに `dotclaude-via-temp` ルール（`_/dotclaude/` 経由）が存在する場合はそのルールに従う。
存在しない場合は `.claude/` へ直接書き込んで良い。

```yaml
---
subagent_type: <name>
description: "<役割の説明（発火トリガー語を含める）>"
model: <haiku|sonnet|opus|fable>
tools: [必要最小限のツール]
---
```

#### 4-2. 不足 Rules を追加する

`.claude/rules/` に追加する。
`delegation.md`・`delegation-impl.md` は Fandhe-AI/agent-cli-skills の実例を参考に
対象リポのパス構成に合わせてカスタマイズする。

#### 4-3. 不足スキルを補完する

```bash
cd <target-repo>
npx skills add Fandhe-AI/agent-cli-skills
```

`skills-lock.json` が更新されることを確認する。

#### 4-4. hooks を追補する

`settings.json` に SessionStart hook を追加・更新する。

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '<リポ名>: 日本語でやりとり / 作業は subagent へ委譲し main 消費を抑える / Conventional Commits 厳守 (--no-verify 禁止) / implement-issue は計画承認後に実装'"
          }
        ]
      }
    ]
  }
}
```

セキュリティ注意事項:
- `command` の値に API キー・トークン・パスワードを埋め込まない
- ユーザー入力をそのまま `command` に展開しない

PostToolUse 自動整形フックは言語のツール存在確認後に提案し、ユーザーが希望する場合のみ追加する。

#### 4-5. CLAUDE.md を更新する

不足セクション（委譲方針表・Sub-agents 一覧・Rules 一覧・model 配分表・Current Skills）を追補する。
**既存セクションを上書きする場合は承認済み項目のみ変更する。**

#### 4-6. implement-issue-tree の前提を整備する

workflow js が存在しない場合の案内:

named workflow（`{name: "implement-issue-tree"}`）として呼ばない場合は `.claude/workflows/` への配置自体が不要で、Workflow ツールの `scriptPath` に `.claude/skills/implement-issue-tree/script/implement-issue-tree.js` を直接指定すればよい。

named workflow として配置する場合は `cp` ではなく**相対 symlink** を使用する。`cp` で配置すると symlink が実体ファイルに置き換わり、`npx skills add` による更新が named workflow に届かなくなる。

```bash
# .claude/workflows/ への配置（named workflow として使う場合のみ）
mkdir -p <target-repo>/.claude/workflows/

# 既に symlink が存在する場合はそのままにする（実体ファイルを上書きしない）
if [ ! -e "<target-repo>/.claude/workflows/implement-issue-tree.js" ]; then
  # .claude/workflows/ から見た相対パスで symlink を作成する
  ln -s ../skills/implement-issue-tree/script/implement-issue-tree.js \
        <target-repo>/.claude/workflows/implement-issue-tree.js
else
  echo "既に存在する（symlink か実体かを確認: ls -la <target-repo>/.claude/workflows/implement-issue-tree.js）"
fi
```

sub_issues API が使用できない場合は GitHub Apps の有効化をユーザーに案内する。

### Step 5: 追補結果を報告する

報告項目:
- 追補したファイル一覧と変更内容
- スキップした項目と理由
- implement-issue-tree の動作前提の充足状況
- ユーザーへの次のアクション案内（手動設定が必要な項目など）

## 検証

```bash
# 追補後のファイル一覧確認
find <target-repo>/.claude -type f | sort

# CLAUDE.md の存在確認
ls <target-repo>/CLAUDE.md

# skills-lock.json の更新確認
cat <target-repo>/skills-lock.json 2>/dev/null | head -20

# implement-issue-tree の前提確認
ls <target-repo>/.claude/workflows/implement-issue-tree.js 2>/dev/null || echo "workflow js: 未配置"
gh auth status
```

## 注意事項

- `.claude/` が存在しないリポジトリには `init-claude` を案内して処理を中断する
- 既存ファイルの上書きはユーザーの個別承認後のみ実施する
- ユーザーの診断承認なしに変更を開始しない
- `settings.json` の `command` にトークン・シークレットをハードコードしない
- `--no-verify` を含むコマンドを hooks に仕込まない
- `npx skills add` が失敗した場合はエラーメッセージを表示してユーザーに手動手順を案内する
- 対象リポに `dotclaude-via-temp` ルールがある場合はそのルールに従う（ない場合は直接書き込み可）
- Agent の `tools` リストは最小権限原則に従い必要なもののみ列挙する
- セキュリティ問題（秘密情報の混入・インジェクションリスク）を発見した場合は追補を中断してユーザーに警告する
