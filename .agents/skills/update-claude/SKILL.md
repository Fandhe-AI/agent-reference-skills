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
- `npx` が使用できること（`npx skills add` によるスキル補完に使用）。`skills` CLI は固定版（`SKILLS_CLI_VERSION`）で実行する。値と更新手順は「skills CLI のバージョン固定と更新手順」節を参照
- `readlink` コマンドが使用できること（workflow js symlink の stale/dangling 判定に使用。`command -v readlink` で事前確認し、利用できない環境では該当処理を中断する）

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

# implement-issue-tree workflow の確認（-L で symlink 判定し、readlink でターゲットも確認する）
# readlink の存在を事前確認する。利用できない環境では判定を中断する
LINK="<target-repo>/.claude/workflows/implement-issue-tree.js"
EXPECTED_TARGET="../skills/implement-issue-tree/scripts/implement-issue-tree.js"
if ! command -v readlink >/dev/null 2>&1; then
  echo "エラー: readlink コマンドが見つからない。workflow js の stale/dangling 判定を中断する"
elif [ -L "$LINK" ]; then
  echo "symlink ターゲット: $(readlink "$LINK")（期待値: $EXPECTED_TARGET）"
  [ -e "$LINK" ] || echo "警告: dangling symlink（参照先が存在しない）"
elif [ -e "$LINK" ]; then
  echo "実体ファイルとして存在する（symlink ではない）"
else
  echo "workflow js なし"
fi
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
| code-comment-style.md | コメント規約（役割・呼び出し文脈・責務境界の埋め込み方針）があるか |
| out-of-scope-tracking.md | スコープ外事項の追跡規約（Issue 確認→ユーザー承認→起票フロー）があるか |

#### 2-3. Skills 診断

`npx skills add Fandhe-AI/agent-cli-skills` で導入できるスキルのうち、
`skills-lock.json` に含まれていないものを列挙する。

必須スキル（不足していれば追補対象）:
- `create-commit`・`create-pr`・`create-issue`
- `implement-issue`・`implement-issue-tree`
- `implement-review`・`implement-review-pr`
- `update-docs`
- `comment-code`（`code-comment-style.md` 規約に従うコメント追加・補強スキル）

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

# workflow js の symlink 検証（ターゲット一致・参照先解決も確認する）
LINK="<target-repo>/.claude/workflows/implement-issue-tree.js"
EXPECTED_TARGET="../skills/implement-issue-tree/scripts/implement-issue-tree.js"
if ! command -v readlink >/dev/null 2>&1; then
  echo "エラー: readlink コマンドが見つからない。workflow js の symlink 検証を中断する"
elif [ -L "$LINK" ]; then
  echo "symlink ターゲット: $(readlink "$LINK")（期待値: $EXPECTED_TARGET）"
  [ -e "$LINK" ] || echo "警告: dangling symlink"
else
  echo "workflow js: 未配置または非 symlink"
fi
```

- gh auth の認証状態
- sub_issues API の応答（既存 issue 番号を指定。404 = GitHub Apps が有効でない可能性。
  なお `repos/{owner}/{repo}/sub_issues` というリポジトリ直下のエンドポイントは存在しないため使わない）
- workflow js の存在・ターゲット一致（stale でないか）・参照先解決（dangling でないか）

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
- [ ] workflow js: symlink のターゲットが期待値と異なる（stale。旧パスを指したまま）
- [ ] workflow js: symlink の参照先が消失している（dangling）
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
name: <name>
description: "<役割の説明（発火トリガー語を含める）>"
model: <haiku|sonnet|opus|fable>
tools: [必要最小限のツール]
---
```

frontmatter のキーは Claude Code の subagent 定義仕様に従い `name` を使う
（`subagent_type` は Agent ツール呼び出し時のパラメータ名であり、定義キーではない）。

#### 4-2. 不足 Rules を追加する

`.claude/rules/` に追加する。
`delegation.md`・`delegation-impl.md` は Fandhe-AI/agent-cli-skills の実例を参考に
対象リポのパス構成に合わせてカスタマイズする。

`code-comment-style.md` と `out-of-scope-tracking.md` が不足している場合は、
`init-claude` スキルの「3-3. rules/ を生成する」に記載の雛形骨子を参照して生成する。
生成時は対象リポの言語・構成（ドキュメンテーションコメント形式・ディレクトリ構成等）に合わせて調整する。

#### 4-3. 不足スキルを補完する

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

named workflow（`{name: "implement-issue-tree"}`）として呼ばない場合は `.claude/workflows/` への配置自体が不要で、Workflow ツールの `scriptPath` に `.claude/skills/implement-issue-tree/scripts/implement-issue-tree.js` を直接指定すればよい。

named workflow として配置する場合は `cp` ではなく**相対 symlink** を使用する。`cp` で配置すると symlink が実体ファイルに置き換わり、`npx skills add` による更新が named workflow に届かなくなる。

symlink は `readlink` で現在のターゲットを検証し、期待ターゲットと異なる場合（stale）・参照先が消失している場合（dangling）は張り替える。実体ファイル（非 symlink）は上書きしない。対象リポに `dotclaude-via-temp` ルールがある場合はそのルールに従い `_/dotclaude/` 経由で配置する（ない場合は `ln -s` 直接作成でも可）。`readlink` が利用できない環境では stale 判定が正しく行えず（空の `CURRENT_TARGET` により正常な symlink を stale と誤判定しうる）、そのまま張り替え処理へ進むと意図せず既存 symlink を書き換える危険があるため、`command -v readlink` で事前確認し、利用できない場合は自動張り替えを中断してユーザーに手動対応を案内する。

```bash
# .claude/workflows/ への配置・張り替え（named workflow として使う場合のみ）
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

sub_issues API が使用できない場合は GitHub Apps の有効化をユーザーに案内する。

### Step 5: 追補結果を報告する

報告項目:
- 追補したファイル一覧と変更内容
- スキップした項目と理由
- implement-issue-tree の動作前提の充足状況
- ユーザーへの次のアクション案内（手動設定が必要な項目など）

## skills CLI のバージョン固定と更新手順

**Why**: `npx skills add` をバージョン未固定で実行すると、npx はローカルキャッシュに無い場合レジストリのその時点の最新版を確認なしで即時取得・実行する。`skills`（vercel-labs/skills）パッケージが乗っ取られた場合、これは任意コード実行の経路になる。exact 版（`X.Y.Z`。dist-tag・`^`/`~` レンジは禁止）への固定が信頼アンカーになる。

**固定版の決め方**:
1. `npm view skills version` で現在の latest を確認する
2. `npm view skills repository.url` が `vercel-labs/skills` であることを確認する
3. `npm view skills time --json` 等で公開日時が不自然でないことを確認する

**更新手順**:
1. Step 4-3 フェンス内の `SKILLS_CLI_VERSION` を更新する（このスキル内での正の定義箇所はここ 1 箇所のみ）
2. `node --test skills/update-claude/tests/*.mjs` で exact semver・実行行の固定を検証する
3. 1 リポジトリで実際に実行し、差分が正常であることを確認する
4. `chore(update-claude): skills CLI を X.Y.Z へ更新` でコミットする
5. 同じ `skills` CLI を固定する `init-claude` / `sync-skills-lock` の同名節も同時更新することを推奨する（値の同期は必須ではないが、乖離した場合はどちらかの節にその旨を記録する）

**既知の乖離（記録）**: 本節の `SKILLS_CLI_VERSION` の値（`1.5.23`）は、`sync-skills-lock/SKILL.md`・`sync-skills-lock/scripts/skills-lock-update.sh` が固定する `SKILLS_CLI_VERSION` の値（`1.5.22`）と異なる（`init-claude` は本節と同一の値で同期済み）。各スキルは独立した固定版として運用しており同期は必須ではないため、意図的な乖離として記録する。次回いずれかを更新する際は、この乖離が解消したか維持されたかを本行で更新する。

**fail-closed**: 固定版が解決できない場合（該当版の不存在・レジストリ障害等どの原因でも）は `npx` が非ゼロ終了し停止する。未固定 `npx skills add` へのフォールバック再試行は行わない。

## 検証

```bash
# 追補後のファイル一覧確認
find <target-repo>/.claude -type f | sort

# CLAUDE.md の存在確認
ls <target-repo>/CLAUDE.md

# skills-lock.json の更新確認
cat <target-repo>/skills-lock.json 2>/dev/null | head -20

# implement-issue-tree の前提確認（存在確認だけでなく、ターゲット一致・参照先解決も確認する）
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
gh auth status
```

## 注意事項

- `.claude/` が存在しないリポジトリには `init-claude` を案内して処理を中断する
- 既存ファイルの上書きはユーザーの個別承認後のみ実施する
- ユーザーの診断承認なしに変更を開始しない
- `settings.json` の `command` にトークン・シークレットをハードコードしない
- `--no-verify` を含むコマンドを hooks に仕込まない
- `npx skills add` が失敗した場合はエラーメッセージを表示してユーザーに手動手順を案内する
- `skills` CLI は固定版で実行する。固定版の決め方・更新手順は「skills CLI のバージョン固定と更新手順」節を参照
- 対象リポに `dotclaude-via-temp` ルールがある場合はそのルールに従う（ない場合は直接書き込み可）
- Agent の `tools` リストは最小権限原則に従い必要なもののみ列挙する
- セキュリティ問題（秘密情報の混入・インジェクションリスク）を発見した場合は追補を中断してユーザーに警告する
