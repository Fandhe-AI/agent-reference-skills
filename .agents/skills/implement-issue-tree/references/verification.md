# 検証

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

## 検証

各実装エージェントはテストコマンドを新規実行し、出力全体と終了コードを確認してから完了を宣言する（詳細は `.claude/rules/verification.md`）。「〜のはず」「たぶん通る」等の推測語での完了主張は禁止。テスト出力・終了コードを証拠として引用してから完了を宣言する。

最終レポートの「完了イシュー」に全対象イシューが列挙され、「停止イシュー」が空であることを確認する。

```bash
# 全子孫（ひ孫以下を含む）を最下層まで再帰して状態を確認する。
# preview-tree.sh は 100 件超のページングと循環保護付きで全ノードを辿り、各ノードの [open]/[closed] を表示する。
bash skills/implement-issue-tree/scripts/preview-tree.sh <parent>

# 手動で確認する場合: 直下を取得し、sub_issues_summary.total > 0 の子について同じ呼び出しを繰り返す
# （closed の子も辿る。total が 0 のノードだけが leaf）
gh api --paginate "repos/{owner}/{repo}/issues/<parent>/sub_issues?per_page=100" \
  --jq '.[] | {number: .number, state: .state, total: .sub_issues_summary.total}'
```

Workflow の返却値（`done`・`failures`・`notStarted`）を確認し、`failures` と `notStarted` が空であることを確認する。

以降の節は `dev/implement-issue-tree/scripts/implement-issue-tree.src.js`（開発ファイル）または生成物 `scripts/implement-issue-tree.js` を変更したときの確認手順。決定的に固定できる部分は回帰テストが担うため、各節では「どのテストが何を固定するか」と、テストが拾わない手動確認だけを書く。

### Workflow 起動可否の検証（Issue #277）

前提: 編集は `dev/implement-issue-tree/scripts/implement-issue-tree.src.js` に対して行い、`node dev/implement-issue-tree/scripts/build-workflow.mjs` で生成物 `scripts/implement-issue-tree.js`（Workflow へ渡すのはこちら）を再生成してから本節を実行する。生成時の acorn 照合と中止条件は `build-workflow.mjs` 冒頭と SKILL.md を参照。生成物と開発ファイルの同期は `dev/implement-issue-tree/tests/build-workflow.test.mjs`（鮮度ゲート）が固定する。

起動可否の判定実装は `dev/implement-issue-tree/tests/lib/workflow-script-contract.mjs` の 1 箇所に集約され、CI の `workflow-loadability.test.mjs` と下の手動コマンドが同じ実装を使う。テストと開発専用ファイルは上流（`Fandhe-AI/agent-cli-skills`）の `dev/implement-issue-tree/` にだけあり、下流の vendoring 先には配布されない。そのため下のコマンドは上流のリポジトリルートで実行する（`workflow-loadability.test.mjs` は上流の `js-tests` ジョブが CI で実行する）。

```bash
node --test dev/implement-issue-tree/tests/workflow-loadability.test.mjs
node dev/implement-issue-tree/tests/lib/workflow-script-contract.mjs \
  skills/implement-issue-tree/scripts/implement-issue-tree.js
```

**行頭 `export ` 全件除去後の `node --check` は使用禁止**: `export` の混入自体を検査前に消すため、壊れたスクリプトでも常に通る。`workflow-script-contract.mjs` は meta 宣言の `export` だけを除去し、残りはランタイムと同じ評価形態（`AsyncFunction`）の構文解析に委ねる。

**ランタイム評価形態の前提（実測に基づく。公式ドキュメント未記載）**: Workflow ランタイムは `export const meta` 宣言のみを特別扱いし、残りを async 関数ボディ相当（トップレベル `return`・`await` を許容）として評価する。この評価形態もサイズ上限も公式ドキュメントには明記がない。前提が崩れた場合の検知は下の probe を使う。

**サイズ上限**: ハード上限 524,288 B（512 KiB）は実測値で、公式ドキュメント由来ではない。運用予算は 512,000 B（ハード上限まで 12 KiB の余裕。次の超過時は引き上げずにプロンプト本文の圧縮か生成器の見直しを判断する）。計測はディスク上のバイト数（`statSync().size`）。

**実ハーネスに対する乖離検知 probe（人手・CI では実行しない）**:

1. `export const meta` のみを持つ最小スクリプトを用意し、Workflow として起動する
2. 同スクリプトに top-level `export` を 1 つ足して起動し、`SyntaxError` になることを確認する
3. 起動時は `name` 指定ではなく絶対パスの `scriptPath` を使う（`name` 指定はセッション開始時のキャッシュを参照するため、修正直後は古い版で失敗する）
4. 結果を下表へバージョン・実施日とともに追記する
5. 再実行トリガ: Claude Code・Workflow ハーネスのバージョン更新時、またはテストスイートが予測しなかった起動失敗が観測されたとき
6. 乖離が確認された場合: `dev/implement-issue-tree/tests/lib/workflow-script-contract.mjs` の評価形態（`AsyncFunction` ラップ・`stripMetaExport` の対象）を実測に合わせて更新し、`workflow-loadability.test.mjs` へ対応する変異ケースを追加する

| Claude Code バージョン | 実施日 | 結果 |
| --- | --- | --- |
| （未実施） | — | Workflow 起動用のツールを持つ環境で未実施。次回バージョン更新時または実施可能な環境で実施し、この行を更新すること |

**履歴コミットに対する回帰検知能力の実証（一回限りの手動実行。CI テストではない）**: 上流リポジトリ専用（`git show <sha>:...` は git 履歴を使うため、履歴を持たない下流では実行しない）。

```bash
git show efae3ab:skills/implement-issue-tree/scripts/implement-issue-tree.js \
  | node dev/implement-issue-tree/tests/lib/workflow-script-contract.mjs -
# 期待: oversize-hard（528,837 B > 524,288）と parse-error の 2 違反、exit 1

git show 1b5a647:skills/implement-issue-tree/scripts/implement-issue-tree.js \
  | node dev/implement-issue-tree/tests/lib/workflow-script-contract.mjs -
# 期待: parse-error のみ（379,538 B でサイズは通る）、exit 1
```

CI では恒久的な回帰検知能力を `workflow-loadability.test.mjs` の変異ケース（現行ソースへの export 注入）が担う。

### 非信頼データ境界の適用確認（Issue #87）

以下の grep は、生成物が束縛名（変数・関数・引数）を短縮するため、識別子を探すものは開発ファイル（`.src.js`）に対して流す。文字列リテラル・プロパティ名を探すものは生成物のままでよい（改名されない）。

```bash
# UNTRUSTED_POLICY が COMMON に組み込まれていること
grep -n "UNTRUSTED_POLICY" dev/implement-issue-tree/scripts/implement-issue-tree.src.js
# untrusted() の適用箇所（planPrompt / implementPrompt / prCreatePrompt / fixPrompt /
# closePrompt / recoverPrompt / recoverImplementPrompt / lowFindingsCommentPrompt の 8 関数）
grep -n "untrusted(" dev/implement-issue-tree/scripts/implement-issue-tree.src.js
# 副作用エージェント（implement / fix / recover-implement）が Issue 本文を読まないこと（--json number,title 限定）
grep -n "gh issue view" scripts/implement-issue-tree.js
# コンテキスト分離（Issue #144 / #145）: monitorPrompt に merge / close 権限がなく、mergeExecutePrompt がレビュー本文を読まないこと
grep -n "gh pr merge\|gh issue close" scripts/implement-issue-tree.js
# State プロンプトが固定フェンス・固定 HEREDOC デリミタを使っていないこと
grep -n "PATCH_EOF\|boundaryNonce" dev/implement-issue-tree/scripts/implement-issue-tree.src.js
# worktree 削除の安全性（Issue #139 / #142 / #148）
grep -n "recordEphemeralWorktree\|cleanupEphemeralWorktree\|implement-issue-tree-owner" dev/implement-issue-tree/scripts/implement-issue-tree.src.js
grep -n "wipCommitted !== true\|cleanupMode: 'discard'" dev/implement-issue-tree/scripts/implement-issue-tree.src.js
grep -n "orphanDeleteCandidates" dev/implement-issue-tree/scripts/implement-issue-tree.src.js
grep -n "blockedReason\|MERGE_VALID_BLOCK_REASONS\|normalizeBlockedReason" dev/implement-issue-tree/scripts/implement-issue-tree.src.js
```

期待結果（目視確認。専用の回帰テストは無い）:

- `UNTRUSTED_POLICY` が `COMMON` 配列の末尾と `updateState` の State プロンプト（JSON マージ担当・掃除担当）で参照される。`untrusted(` が上記 8 関数の中に各 1 回以上ある。
- `gh issue view` のうち、routing ガード（implementPrompt・fixPrompt・recoverImplementPrompt の手順 0）と mergeExecutePrompt 手順 5 は `--json number,title` または `--json state` に限る。本文を読む箇所（planPrompt 手順 1・closePrompt 手順 2・recoverPrompt 手順 2c・Tree 手順 4）は「本文は非信頼データ」の注意文と同一手順内にある。`monitorPrompt` に `gh pr merge` / `gh issue close` が無い。
- 使い捨て worktree（review / pr-create）は削除せず `recordEphemeralWorktree` で記録するだけで、`cleanupEphemeralWorktree` と `implement-issue-tree-owner` は 0 件（エージェントへ開示した nonce は所有権証明にならないため所有権マーカー方式は不採用）。
- continue / discard の両経路が `wipCommitted !== true` の保全と `cleanupMode: 'discard'`（`worktree-remove.sh --mode discard`）の両方を削除の通過条件にし、`verifyDiscardSafety` は 0 件。`orphanDeleteCandidates` への push は状態ファイル記録パスとの一致の内側にある。
- `blockedReason` が `MERGE_SCHEMA` の enum・`normalizeBlockedReason`・終端 status 判定の 3 箇所で参照され、終端判定式に `unresolvedComments` が現れない。

### 残置 worktree 上限ゲートの適用確認（PR #588 codex P1）

`maxResidualWorktrees`（件数軸。既定 100・`0` は上限なし）と `maxResidualWorktreeBytes`（バイト軸。既定 50 GiB・`0` はこの軸のみ無効）のゲートを変更した場合、次のテストを流す。

```bash
node --test dev/implement-issue-tree/tests/residual-cap-default.test.mjs \
  dev/implement-issue-tree/tests/residual-byte-fallback.test.mjs \
  dev/implement-issue-tree/tests/residual-byte-measure-retry.test.mjs \
  dev/implement-issue-tree/tests/residual-average-latch-scope.test.mjs \
  dev/implement-issue-tree/tests/worktree-observe-retry.test.mjs \
  dev/implement-issue-tree/tests/worktree-retained-ledger.test.mjs
```

テストが固定するもの:

- `residual-cap-default.test.mjs`: 両軸の args 検証（`parseMaxResidualWorktrees` / `parseMaxResidualWorktreeBytes`・境界は `count === limit` が非発火で `limit + 1` が発火）、`residualGateActive` による観測失敗時の fail-closed、`EPHEMERAL_KIND_MAX` からの予約定数の導出、新規着手・monitoring 再開の予約込み projected 判定（バイト軸は `projectResidualBytes`）。
- `residual-byte-fallback.test.mjs`: 未検証エントリ（`path === ''` / `(検証不可:`）があるときの物理一覧への測定対象差し替え。成立すれば実測を続け、不成立のときだけ `kib = null` → `newStartSuppressed` に倒す。`worktreePath` を 4 スキーマの `required` にする。フォールバックのパスは削除経路へ追加しない。
- `residual-byte-measure-retry.test.mjs`: 測定結果の転記失敗・agent 例外・出力欠落の有界な再測定（合算最大 2 回）。`count` 一致の `err>0` や型・範囲不正は再測定しない（Issue #566・#571）。
- `worktree-observe-retry.test.mjs`: 一覧と独立カウントを `observeWorktreeList` が組で取り、食い違えば最大 3 組まで取り直して一致した組だけを採用する（並行ランの作成・削除に備える。Issue #735）。3 組とも食い違えば fail-closed。
- `worktree-retained-ledger.test.mjs`: 台帳の kind 別の扱い（`ephemeralWorktrees` は `implement`・`replacement`・`retained` を除いた `disposableWorktrees`、保持分は `retainedWorktrees`）。

テストが拾わない手動確認:

```bash
# 件数軸・バイト軸のゲートが削除ロジックを新設していないこと
grep -nE "worktree remove|--force" scripts/implement-issue-tree.js
```

ヒットは既存の削除経路（`sweepClosedWorktrees` のスイープ・Recover の discard・`cleanupWorktree`）か、人間向けの案内文字列・コメントだけであること。実行可能な削除呼び出しを新設しない設計である。また、返却値 `residualWorktrees`（`observed` / `observedAtStart` / `addedThisRun` / `limit` / `overLimit` / `suppressed` / `paths`）が最終レポートの残置総数・上限比率・8 割警告に反映されることを確認する。

設計の要点（判断根拠）:

- 残置総数はメイン worktree を除いた物理総数で数える。除外は内容ではなく位置（先頭 1 件）で行う（`count = entries.length - 1`）。使用中を数える分は過剰停止側で安全。
- ラン開始時の観測失敗は、ゲート有効なら fail-closed で新規着手を止める。観測不成立を「残置ゼロ」と誤認させない。
- 予約起因の超過見込みは `newStartSuppressed` を立てず今周回の投入だけ見送る（予約は実行中タスクの完了で解放される）。予約 0 でなお超過なら恒久停止する。
- verify-close は worktree を作らないため予約判定の対象外。monitoring 再開の projected 判定は `item.kind === 'implement'` に限る。
- ラン中の再測定が失敗した場合は、floor を超える成長を見逃さないため `newStartSuppressed` を設定する。

### メイン worktree への一時ファイル残置防止・未追跡ファイル検査の適用確認（Issue #497）

`TEMP_FILE_POLICY` の挿入先、測定スクリプトの `tf` 単一代入と `"$tf"` 参照、`ORPHAN_BYTES_SCHEMA` の `count` 必須化とホスト側の件数照合、メイン worktree の未追跡検査（ラン開始直後と `return` 前の 2 回の差分を `mainWorktreeUntracked` とログ警告で報告・状態ファイル自身は除外するが `mktemp` 残骸は除外しない・削除は一切しない）は `dev/implement-issue-tree/tests/temp-file-placement.test.mjs` が固定する。

```bash
node --test dev/implement-issue-tree/tests/temp-file-placement.test.mjs
# 目視補助: 引用なしの変数展開によるリダイレクトが残っていないこと
grep -nE '> *\.lines|> *\$[a-zA-Z_]+\.lines[^"'"'"']' dev/implement-issue-tree/scripts/implement-issue-tree.src.js
# 検出経路が削除呼び出しを追加していないこと
grep -nE "rm -rf|git clean|git worktree remove" scripts/implement-issue-tree.js
```

### merge-guard hook（deny 専用）・クライアント側自動マージ opt-in 経路の適用確認（PR #182 codex P0 / PR #206 撤回 / opt-in 再有効化）

`scripts/merge-guard-hook.sh` または自動マージ経路を変更した場合に確認する。契約は、hook が deny 専用（allow 経路・carve-out なし）であること、クライアント側のマージ経路が opt-in（`autoMerge: true` + `externalChecks` 確定 + 全 App の信頼済み context 宣言）のときだけ G0（サーバー側強制の実測）付きで開くこと、それ以外は回復専用（`recoveryOnly`）に固定されること、arm 経路（auto-merge の予約）が存在しないこと。

テストが固定するもの:

- `g0-gates.test.mjs`・`merge-gate.test.mjs`: G0 の判定語（`server-enforcement-missing` / `classic-unsupported` / `client-only` / `issuer-unbound`）、宣言 context + App ID の組の完全一致、required checks の発行元束縛、classic 経路の無条件辞退、`externalChecksContextsConfirmed` を含む `recoveryOnly` 判定。
- `merge-guard-repo-settings.test.mjs`・`merge-guard-approve.test.mjs`・`merge-guard-grep-failclosed.test.mjs`: hook の deny 専用ケース（マージ系の全スペリング・`gh pr merge --auto --squash` を含むあらゆる `gh pr merge`・リポジトリ設定の書き込み・レビュー承認）と、許可すべき読み取り系。
- `script-static-guard.test.mjs`: スクリプトにマージ・承認・設定変更・force push・`--no-verify` の綴りが無いこと。

```bash
# 1. hook の構文検証（shellcheck があれば併用）
bash -n scripts/merge-guard-hook.sh
command -v shellcheck >/dev/null && shellcheck scripts/merge-guard-hook.sh

# 2. hook に allow 経路の実ロジックが残っていないこと（コメント行は除外）
grep -vE '^\s*#' scripts/merge-guard-hook.sh | grep -nE "ALLOW_RE|expectedCommand|merge-grants/grant-" || echo "allow 経路の実ロジックなし（deny 専用）"

# 3. grant / canary / branch-protection ゲートと、PR #206 で撤回した arm の残骸が無いこと
grep -n "issueMergeGrant\|buildMergeCommand\|ensureMergeGuardActive\|ensureBranchProtection\|IIT_MERGE_GRANT\|MERGE_GRANT_DIR" dev/implement-issue-tree/scripts/implement-issue-tree.src.js || echo "撤去済み（コメントの言及を除く）"
grep -nE "autoMergePrecheck|autoMergeArmable|autoMergeArmPrompt|AUTO_MERGE_PRECHECK" dev/implement-issue-tree/scripts/implement-issue-tree.src.js && echo "NG: precheck/arm 残骸あり" || echo "OK: precheck/arm 残骸なし"
grep -vE '^\s*#' scripts/merge-guard-hook.sh | grep -nE -- "--auto --squash|carve" && echo "NG: hook carve-out 残骸あり" || echo "OK: hook carve-out 残骸なし"

# 4. boundaryNonce / ensureBoundaryNonceSeed は保持されていること（fix / state 用）
grep -n "function boundaryNonce\|async function ensureBoundaryNonceSeed" dev/implement-issue-tree/scripts/implement-issue-tree.src.js

# 5. G0 から classic protection API の判定式が撤去されていること（0 件）
grep -n "protection/required_status_checks\|protection/enforce_admins\|required_conversation_resolution\|bypass_pull_request_allowances\|collaborators/" scripts/implement-issue-tree.js
```

`bash -n` は終了コード 0、手順 2・3・5 は 0 件（コメントの経緯言及を除く）、手順 4 は残存すること。upstream の `docs/implement-issue-tree/auto-merge-sample.yml` はサーバー側 workflow のため手順 3 の対象外。

### Review の diff 比較基準（Issue #315）

`reviewPrompt()` と `fixPrompt()` の push 前分岐を変更した場合、比較基準が `origin/<base-branch>` の 3 点ドット diff に統一されていること、3 拠点（SKILL.md / reviewPrompt / fixPrompt の push 前分岐）が乖離していないことを確認する。ローカル base ref を基準にすると、ローカルが origin より遅れているだけで無関係な祖先コミットの差分がレビュー対象に混入する（実測では diff の大半がノイズになり Review が収束しなかった）。`origin/<base-branch>` なら比較点は分岐点に固定され、ラン中に origin が進んでも fetch なしで動かない。

`dev/implement-issue-tree/tests/review-diff-base.test.mjs` が固定する: 群 A（reviewPrompt 契約・「origin/ なし」の負のアサーション）、群 B（SKILL.md と script の乖離防止・fixPrompt 含む）、群 C（一時 git リポジトリでの A〜D の `--name-only` 実測シナリオ）、群 D（base 最新化契約。`remote.origin.fetch` を持たない remote で、保存先を省いた `git fetch origin <base>` は `refs/remotes/origin/<base>` を作らず、保存先つき refspec は作る・前進させる。Issue #361）。

```bash
node --test dev/implement-issue-tree/tests/review-diff-base.test.mjs
# 目視補助: 比較・分岐点操作系の git コマンドで origin/ なしの ${baseBranch} が 0 件であること
#（fetch は動詞集合に含めないため、正常運用の `git fetch origin ${baseBranch}` は誤検出しない）
grep -nE 'git (diff|merge|checkout|rebase|rev-parse)[^`]*\$\{baseBranch\}' skills/implement-issue-tree/scripts/implement-issue-tree.js | grep -vF 'origin/${baseBranch}'
# SKILL.md の <base-branch> も git コマンド位置では origin/<base-branch> であること
grep -n '<base-branch>\|<base>' skills/implement-issue-tree/SKILL.md
wc -c skills/implement-issue-tree/scripts/implement-issue-tree.js
```

1 つ目の grep は出力 0 件、`wc -c` は 512,000 B 以下であること。base 最新化の失敗時（レビュー直前に無条件で実行する `git fetch origin <base-branch>:refs/remotes/origin/<base-branch>` が失敗、またはその後も ref を解決できない場合。既存 ref が残っていても安全とみなさない）は Review を実施せず `state: "blocked"` / `highestSeverity: "none"` で終端し、summary に理由を書く。`blocked` はコード指摘（needs-fix）と区別され、呼び出し元は fix を起動せず即終端する（`grep -n "比較基準 origin"` と `grep -n "r?.state === 'blocked'"` でプロンプト文言とループ制御を確認する）。

### 依存ブロックの再判定（Issue #442）

`classifyDispatchReadiness` / `selectPrereqProbeTargets` / `applyPrereqTransitions` / `probePrereqCompletion` またはスケジューラ（dispatch ループ・cascade）を変更した場合、blocked の即時確定が dispatch ループ内へ復活せず、唯一の choke point（cascade）に一元化されていることを確認する。

`dev/implement-issue-tree/tests/dep-reeval.test.mjs` が固定する: 純粋関数 5 種、受入条件 3（前提 merged への遷移 → 下流の再判定）、駆動部配線の source-scan、MERGED 判定が `prBindingProblem` と同じ結び付け照合（別 issue の MERGED PR を受理しない・Issue #533 の再現ケース）。

```bash
node --test dev/implement-issue-tree/tests/dep-reeval.test.mjs
# 駆動部（境界マーカーより下）の markBlockedByDeps 呼び出しが cascade の 1 箇所だけであること → 1
awk '/__IMPLEMENT_ISSUE_TREE_DRIVER_START__/,0' dev/implement-issue-tree/scripts/implement-issue-tree.src.js | grep -c "await markBlockedByDeps(item, failedDeps)"
```

出力が 2 以上なら dispatch ループ内の即時確定が復活、0 なら cascade 側が壊れている。

## opt-in テスト記録ゲートの適用確認（Issue #495）

`validateOptinCommandForm` / `parseOptinTestCommands` / `parseOptinTestDeclarations` / `sanitizeOptinTestRuns` / `restoreOptinFixState` / `optinRecordMarkerLine` / `renderOptinRecordSection` / `classifyOptinRecordGate` / `combineOptinRecordGate` / `observeOptinRecord` / `mergeExecutePrompt` の `expectedHeadSha` を変更した場合の手順。純粋関数・状態復元・封筒の照合と 2 回観測の一致・宣言なしイシューでのプロンプト出力完全一致（既定無効の確認）は `dev/implement-issue-tree/tests/optin-tests-gate.test.mjs` が固定する。

```bash
# 1. merge-exec のコンテキスト分離（Issue #145 / #160）が退行していないこと。
#    mergeExecutePrompt の関数本体に限って数える（ファイル全体への grep -c は fixPrompt 等にヒットして退行を見逃す・PR #503）
awk '/^function mergeExecutePrompt\(/{f=1;print;next} f&&/^function /{exit} f' \
  dev/implement-issue-tree/scripts/implement-issue-tree.src.js | grep -c 'optin'
awk '/^function mergeExecutePrompt\(/{f=1;print;next} f&&/^function /{exit} f' \
  dev/implement-issue-tree/scripts/implement-issue-tree.src.js | grep -c -- '--json body'

# 2. マージ前ゲートが新規マージ経路（!recoveryOnly）にのみ配線されていること（ドライバ部に 1 箇所）
grep -n 'observeOptinRecord(' dev/implement-issue-tree/scripts/implement-issue-tree.src.js

# 3. ビルド鮮度・サイズ
node dev/implement-issue-tree/scripts/build-workflow.mjs --check
wc -c skills/implement-issue-tree/scripts/implement-issue-tree.js

# 4. 回帰テスト
node --test dev/implement-issue-tree/tests/optin-tests-gate.test.mjs
```

手順 1 は両方 `0`、手順 2 は 1 箇所、手順 3 は `--check` 通過かつ 512,000 B 以下、手順 4 は全 pass・fail 0 であること。

### state 書込みエージェントの StructuredOutput 未返却 fail-safe（Issue #493）

`runStateAgent` / `updateStateDetailed` / `updateState` / `initAllPending` / `persistPerWorktreeByteReserveHighWater` / `loadState`、または `classifyStateWriteFailureStatus` / `classifyUncaughtFailureStatus` を変更した場合、state 系 5 ラベル（`state:update` / `state:cleanup` / `state:init-all` / `state:high-water` / `state:load`）と blocked の一括記録用 `state:update-batch`（Issue #585・`writeBlockedStateChunk`）が `runStateAgent` 経由のままで、呼び出し元の終端分類が新設の純粋関数に一元化されたままであることを確認する。

`dev/implement-issue-tree/tests/state-write-fallback.test.mjs` が固定する: 層 1（スタブ agent の振る舞い）、層 2（純粋関数の入出力表）、層 3（配線の source-scan。`STATE_AGENT_MODEL_CHAIN` 以外に `state:*` を直書きしないことを含む）。`dev/implement-issue-tree/tests/pr-saved-failsafe.test.mjs` は Merge ループ fail-safe 契約（Issue #465）への非退行確認。

```bash
node --test dev/implement-issue-tree/tests/state-write-fallback.test.mjs \
  dev/implement-issue-tree/tests/pr-saved-failsafe.test.mjs
# 目視補助: 終端分類関数が runOne の catch・reviewing / monitoring 遷移・Recover の掃除ゲートから参照されること
grep -n "classifyStateWriteFailureStatus\|classifyUncaughtFailureStatus\|knownPrByIssue" dev/implement-issue-tree/scripts/implement-issue-tree.src.js
wc -c skills/implement-issue-tree/scripts/implement-issue-tree.js
```

2 つの `node --test` が全 pass・fail 0、`wc -c` が 512,000 B 以下であること。
