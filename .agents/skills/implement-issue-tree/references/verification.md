# 検証

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

## 検証

各実装エージェントはテストコマンドを新規実行し、出力全体と終了コードを確認してから完了を宣言する（詳細は `.claude/rules/verification.md`）。「〜のはず」「たぶん通る」等の推測語での完了主張は禁止。テスト出力・終了コードを証拠として引用してから完了を宣言する。

最終レポートの「完了イシュー」に全対象イシューが列挙され、「停止イシュー」が空であることを確認する。

```bash
# 親イシューの直下サブイシューが全て closed か確認（--paginate で 100 件超も全ページ自動取得）
gh api --paginate "repos/{owner}/{repo}/issues/<parent>/sub_issues?per_page=100" \
  --jq '.[] | {number: .number, state: .state, title: .title}'

# 孫まで含む全サブイシューの状態確認（再帰が必要な場合は各 Phase 親でも実行）
gh api --paginate "repos/{owner}/{repo}/issues/<phase-parent>/sub_issues?per_page=100" \
  --jq '.[] | {number: .number, state: .state}'
```

Workflow の返却値（`done`・`failures`・`notStarted`）を確認し、`failures` と `notStarted` が空であることを確認する。

### 非信頼データ境界の適用確認（Issue #87）

`scripts/implement-issue-tree.js` を変更した場合、以下で境界タグ・取り扱い規則が全フェーズに適用されていることを確認する:

```bash
# 構文検証（このファイルはトップレベル await・トップレベル export を含む Workflow harness
# 専用スクリプトのため、単純な node --check では harness 側の実行コンテキストを再現できず
# 構文エラー扱いになる。async 関数でラップしたうえで検証する。トップレベル export は
# meta 以外にも parseExternalChecks・MERGE_EXEC_SCHEMA・MERGE_EXEC_VALID_REASONS・
# classifyMergeExecDispatch・mergeExecutePrompt 等が存在し、関数本体の中に export を
# 残すと node --check が構文エラーになるため、行頭 "export " を全件除去する）
sed -E 's/^export //' scripts/implement-issue-tree.js > /tmp/iit-body.js
{ echo 'async function __wrap(){'; cat /tmp/iit-body.js; echo '}'; } > /tmp/iit-wrapped.mjs
node --check /tmp/iit-wrapped.mjs

# UNTRUSTED_POLICY が COMMON に組み込まれていることを確認
grep -n "UNTRUSTED_POLICY" scripts/implement-issue-tree.js

# untrusted() の適用箇所（planPrompt / implementPrompt / prCreatePrompt / fixPrompt /
# closePrompt / recoverPrompt / recoverImplementPrompt / lowFindingsCommentPrompt）
grep -n "untrusted(" scripts/implement-issue-tree.js

# 副作用エージェント（implement / fix / recover-implement）が Issue 本文を読まないこと
# （--json number,title 限定であること）を目視確認
grep -n "gh issue view" scripts/implement-issue-tree.js

# コンテキスト分離（Issue #144 / #145）の確認
# 監視エージェント（monitorPrompt）に merge / close 権限がないこと、マージ実行エージェント
# （mergeExecutePrompt）がレビュー本文を読まないことを目視確認
grep -n "gh pr merge\|gh issue close" scripts/implement-issue-tree.js

# State プロンプトが固定フェンス・固定 HEREDOC デリミタを使っていないこと
grep -n "PATCH_EOF\|boundaryNonce" scripts/implement-issue-tree.js

# worktree 削除の安全性（Issue #139 / #142 / #148）
# 1. 使い捨て worktree（review / pr-create）が削除されず記録のみであること
#    （所有権マーカー照合による回収も不採用 — マーカー植え付け指示が存在しないこと）
grep -n "recordEphemeralWorktree\|cleanupEphemeralWorktree\|implement-issue-tree-owner" scripts/implement-issue-tree.js
# 2. continue / discard の削除ゲート（申告 wipCommitted + ホスト側の実測）が両方あること
grep -n "wipCommitted === true\|verifyDiscardSafety" scripts/implement-issue-tree.js
# 3. 孤立 worktree の削除に所有権照合（状態ファイル記録パスとの一致）があること
grep -n "orphanDeleteCandidates" scripts/implement-issue-tree.js
# 4. blocked の分類が blockedReason のみで行われていること
grep -n "blockedReason\|MERGE_VALID_BLOCK_REASONS\|normalizeBlockedReason" scripts/implement-issue-tree.js
```

期待結果: `UNTRUSTED_POLICY` が `COMMON` 配列の末尾で参照され、あわせて `updateState` の State プロンプト（JSON マージ担当・掃除担当の両方）でも参照されていること。`untrusted(` が上記 8 関数それぞれの中で最低 1 回出現すること。`gh issue view` の全ヒットのうち、worktree routing ガード（implementPrompt 手順 0・fixPrompt 手順 0・recoverImplementPrompt 手順 0）と mergeExecutePrompt 手順 5 が `--json number,title` または `--json state` に限定されており、本文を読む箇所（planPrompt 手順 1・closePrompt 手順 2・recoverPrompt 手順 2c・Tree 手順 4）はいずれも「本文は非信頼データ」の注意文と同一手順内にあること。`monitorPrompt` に `gh pr merge` / `gh issue close` が出現しないこと（コンテキスト分離の確認）。

worktree 削除の安全性については、`cleanupEphemeralWorktree` と `implement-issue-tree-owner` がいずれも 1 件もヒットせず `recordEphemeralWorktree` のみが定義・使用されていること（使い捨て worktree の自動削除廃止。所有権マーカー方式もエージェントへ開示した nonce は所有権証明にならないため不採用）、continue 経路・discard 経路の双方が `recoverResult?.wipCommitted === true` と `verifyDiscardSafety` の両方を worktree 削除の通過条件にしていること、`orphanDeleteCandidates` への push が状態ファイル記録パスとの一致（`savedEntryAtEnd.worktree === p`）の内側にあること、`blockedReason` が `MERGE_SCHEMA` の enum・`normalizeBlockedReason` によるホスト側二重検証・終端 status 判定の 3 箇所すべてで参照され、終端 status の判定式に `unresolvedComments` が現れないことを確認する。

### 残置 worktree 上限ゲートの適用確認（PR #588 codex P1）

使い捨て worktree を削除しない設計の下で、複数ラン累積の残置 worktree によるディスク枯渇（DoS）を防ぐ `maxResidualWorktrees` ゲートを変更した場合、以下で args 検証・ラン開始時観測・fail-closed 停止・レポート出力を確認する:

```bash
# 1. args 検証（parseMaxResidualWorktrees）: 0 以上の整数のみ受理・0 は上限なし・既定 20
grep -n "parseMaxResidualWorktrees\|maxResidualWorktrees" scripts/implement-issue-tree.js
# 2. ラン開始時に横断スキャンで残置総数を観測している（既存 scanOrphanWorktrees の再利用）
grep -n "countResidualWorktrees\|residualObservedAtStart\|newStartSuppressed" scripts/implement-issue-tree.js
# 2b. 一覧転記の完全性照合（PR #185 codex P1 第 4 ラウンド）— 独立レコードカウントとの件数照合
grep -n "countWorktreeRecords\|independentCount\|scanFailureDetail" scripts/implement-issue-tree.js
# 3. 上限超過時に新規着手のみ抑止（newStartSuppressed による恒久停止は monitoring 再開を対象にしない。
#    ただし monitoring 再開自体は 6 の projected 判定で個別に defer され得る）— dispatch ループの位置確認
grep -n "if (newStartSuppressed) continue" scripts/implement-issue-tree.js
# 3b. ラン中の積み増し再評価（PR #185 codex P1）— 開始時観測 + 本ラン積み増しの比較箇所
grep -n "residualObservedAtStart + ephemeralWorktrees.length > maxResidualWorktrees" scripts/implement-issue-tree.js
# 3c. 並列投入分の予約計上（PR #185 codex P1 第 2 ラウンド）— 予約定数・新規着手集合の確認
grep -n "EPHEMERAL_KIND_MAX\|EPHEMERAL_RESERVE_PER\|newStartActive\|monitoringResumeActive" scripts/implement-issue-tree.js
# 4. 削除ロジックを新設していないこと（この機能で worktree remove / --force を追加していない）
grep -nE "worktree remove|--force" scripts/implement-issue-tree.js
# 5. 最終レポートの残置サマリと返却フィールド
grep -n "residualWorktrees" scripts/implement-issue-tree.js
# 6. monitoring 再開自体も予約込み上限判定で defer する（pet-hub PR #1062 codex-review P1 対応）
grep -n "monitoringResumeGateDeferred" scripts/implement-issue-tree.js
```

期待結果: `parseMaxResidualWorktrees` が `undefined`/`null` を既定 `20` に、`0` を「上限なし（チェック無効）」に、負値・非整数・非数値を throw に振り分けること（純粋関数のため件数比較ロジックを単体スクリプトで検証できる。`count === limit` は非発火・`count === limit + 1` で発火＝「超過」の境界）。`countResidualWorktrees` がメイン worktree のみを除外した**物理総数**を数えること（状態ファイル追跡済み＝使用中の worktree も数える。PR #185 codex P1 第 5 ラウンド。以前の「追跡済み除外」では failed / blocked のまま長期滞留する実装 worktree が毎ラン除外され続け、何件蓄積しても「総数の上限」契約に計上されない過小カウントだった。使用中を数える分は過剰停止側＝fail-closed で安全）。メイン worktree の除外は isMain フラグではなく**位置**（先頭 1 件のみ）で行い、2 件目以降は isMain・path の内容と無関係に必ず 1 件ずつ計上すること（count は常に `entries.length - 1`。PR #185 codex P1 第 6 ラウンド。スキーマは isMain の個数も path の非空も制約しないため、内容ベースの除外・スキップを残すと全件返しつつ複数を isMain: true にする・path を空にする転記で、独立カウントとの件数照合を通過したまま過小計上できる。`git worktree list --porcelain` の先頭レコードは仕様上必ずメイン worktree であり、順序が入れ替わっても除外はちょうど 1 件のため件数は不変で、長さが独立照合済みである以上転記内容では件数を減らせない。path 検証不可レコードは「(検証不可)」として計上する）。ラン開始時の横断スキャンが失敗（`runStartOrphanEntries.length === 0`）した場合は、ゲート有効（`maxResidualWorktrees > 0`）なら `residualObserved` を `false` のままにして `newStartSuppressed` を設定し新規イシューの着手を停止する（fail-closed。`maxResidualWorktrees === 0` の明示オプトアウト時のみ観測失敗でも続行する）こと（PR #185 codex P1。観測不成立を「残置ゼロ＝安全」と誤認する fail-open の防止）。スキャン一覧が非空でも、ゲート有効時は別エージェントが独立に取得したレコード総数（`countWorktreeRecords`。`git worktree list --porcelain | grep -c '^worktree '` の数値 1 個のみを転記）と件数照合し、不一致またはカウント取得失敗も観測失敗として同じ fail-closed 停止に倒すこと（PR #185 codex P1 第 4 ラウンド。一覧は LLM 転記でありスキーマは全レコード返却を保証しないため、一部脱落した非空一覧を観測成功と誤認すると欠落分を数えずゲートが fail-open する。数値 1 個の転記は一覧全体より脱落しにくく、両エージェントの誤りが同じ値に揃わない限り不一致として検出できる。照合はゲート有効時のみ実行しエージェント起動を節約する）。上限超過時に `newStartSuppressed` が設定され、dispatch ループの `isActiveMonitoring` 分岐の**後**に `if (newStartSuppressed) continue` が置かれ、新規着手のみ抑止すること（`newStartSuppressed` による恒久停止は monitoring 再開を対象にしない。ただし monitoring 再開自体は `isActiveMonitoring` 分岐内部の projected 判定〔手順 6〕により、上限超過が見込まれる場合は個別に defer され得る。pet-hub PR #1062 codex-review P1 対応）。さらに dispatch ループは新規着手の直前に毎回 `residualObservedAtStart + ephemeralWorktrees.length` を `maxResidualWorktrees` と比較し、本ランの worktree 新規作成（implement / review / pr-create / fix-routing-error）の積み増しで上限を超えた時点で `newStartSuppressed` を設定して以降の新規着手を止めること（実行中イシュー・monitoring の継続は止めない。PR #185 codex P1）。手順 3c の `EPHEMERAL_RESERVE_PER_NEW_START` は kind ごとの最大生成数宣言テーブル `EPHEMERAL_KIND_MAX` の合計から導出されること（ハードコード定数ではない。現在の宣言は implement: 1〔実装エージェント起動 1 回・新規着手と recover-continue とも isolation: 'worktree' で 1 個作成。物理総数契約に伴い第 5 ラウンドで台帳へ追加〕+ review: 3〔Review ループ上限 3 回・各回 isolation: 'worktree' で新規作成〕+ pr-create: 1〔Review 全通過後に 1 回のみ〕+ fix-routing-error: 1〔routingError は Review / Merge どちらのループでも検出と同時に即終端するため最大 1 回。PR #184 で追加された記録経路〕= 6。fix〔通常の修正再コミット〕は旧 worktree cleanup とペアの置換で純増しないため宣言せず、cleanup 失敗の残置は次ラン開始時の物理総数観測が捕捉する）。implement の台帳記録は実測・予約解放専用であり、ラン終了時の「使い捨て worktree 一覧（手動削除案内）」と孤立スキャンの除外集合（`ephemeralWorktreePaths`）からは implement を除くこと（一覧に載せると failed イシューの未マージ成果の誤削除を誘発し、除外集合に載せると merged 確定済み implement worktree の所有権照合付き取りこぼし回収が消失する）。Workflow の返却値 `ephemeralWorktrees` も implement を除いたフィルタ済み一覧（`disposableWorktrees`）を返すこと（PR #185 Bugbot Medium: 返却値の契約は「手動掃除の対象」のため、未フィルタで返すと消費側が implement worktree を削除可能と誤認する。implement 込みの本ラン積み増し総数は `residualWorktrees.addedThisRun` が別途返す）。`recordEphemeralWorktree` が `EPHEMERAL_KIND_MAX` に未宣言の kind での記録を予約契約違反として警告すること（生成経路の追加と予約定数の乖離を実行時に検出する構造。記録自体は継続し、実測ベースの上限 latch は機能し続ける。PR #185 codex P1 第 3 ラウンド）。`recordEphemeralWorktree` がパスを検証できない場合も `path: ''` で件数を計上すること（PR #185 Bugbot Medium。ランタイムはエージェントの返答内容と無関係に worktree を実際に作成しているため、記録をスキップすると実測・予約解放の両方が過小になり fail-closed が弱まる。空パスのエントリはラン終了時の一覧で「パス不明」と表示する）。`newStartActive` は本ランで新規着手した implement イシューのうち、まだ完了していないイシュー番号の集合であること（verify-close は `isolation: 'worktree'` を使わず worktree を一切作らないため、予約判定 (b) の対象外かつ `newStartActive` にも載せない。PR #185 Bugbot Medium。verify-close に implement と同じ最大増分を課すと上限付近で親クローズが誤って defer / 恒久停止する。実測超過の恒久 latch (a) は従来どおり verify-close にも効く）。monitoring 再開イシュー（`isActiveMonitoring`）は `monitoringResumeActive` で別管理し、review / pr-create は積み増さないが Merge ループの fix-routing-error を最大 1 件記録し得る（PR #184 以降）ため `EPHEMERAL_RESERVE_PER_MONITORING_RESUME`（= `EPHEMERAL_KIND_MAX['fix-routing-error']` = 1）を予約計上すること。この予約は新規着手側（implement 候補）の投入判定を保守的にするだけでなく、`isActiveMonitoring` 分岐の内部で開始前に同じ projected 判定（実測 + 記録済み積み増し + 実行中タスクの残余予約 + 自分自身の `EPHEMERAL_RESERVE_PER_MONITORING_RESUME`）を適用し、超過が見込まれる場合は当該イシューの monitoring 再開自体をこの周回に限り defer すること。この projected 判定は `item.kind === 'implement'` の再開に限定すること（verify-close は `isolation: 'worktree'` を使わず worktree を一切作らないため予約判定 (b) の対象外かつ `newStartActive` にも載せない、という既存の線引きと同じ理由。verify-close ノードとして到達した再開〔`runVerifyClose` 経由〕は Merge ループへ入らず fix-routing-error を積み増さないため予約 0 で対象外。PR #185 Bugbot Medium）。defer 時は `monitoringResumeGateDeferred` に手動介入込みの理由を記録し、ラン終了時の interrupted レポートの「同じ引数で再実行すると再開する」という既定文言を上書きすること（恒久停止はしない——予約は実行中タスクの完了で解放されるため次周回・次回実行で再評価すれば足りる。観測失敗時〔`residualObserved === false`〕はこの判定を素通りし、従来どおり無条件で再開を許可する。pet-hub PR #1062 codex-review P1 対応。修正前は `isActiveMonitoring` の分岐が `newStartSuppressed` と予約込み上限判定より前に無条件で `runOne(item)` を開始しており、monitoring 再開の繰り返しで残置 worktree 上限ゲートを迂回できた）。新規着手の直前に `newStartActive` の各イシューについて「`EPHEMERAL_RESERVE_PER_NEW_START` − 実記録数（`ephemeralWorktrees` を issue 別に集計した数）」を、`monitoringResumeActive` の各イシューについて「`EPHEMERAL_RESERVE_PER_MONITORING_RESUME` − 実記録数」を予約として合算し、「実測（開始時観測 + `ephemeralWorktrees.length`）+ 予約合計 + 着手候補自身の `EPHEMERAL_RESERVE_PER_NEW_START`」が上限を超える場合は投入を止めること（並列投入済みでまだ `recordEphemeralWorktree` に到達していないタスクの今後の積み増しを見込むことで、同一 dispatch 周回での最大 `parallel × EPHEMERAL_RESERVE_PER_NEW_START` 件の超過見落としを防ぐ）。予約起因（`reservedTotal > 0`）の超過見込みは `newStartSuppressed` を設定せず今周回の投入のみ見送る（defer）こと——実行中タスクの完了で `newStartActive` から削除され予約が解放されれば、次周回で再評価し投入が再開されること。予約が 0 件でなお超過が見込まれる場合のみ 3b と同様に `newStartSuppressed` を設定して恒久停止すること（実測は減らないため latch でよい）。手順 4 の `worktree remove` / `--force` のヒットが、既存の削除経路（`sweepClosedWorktrees` 内のスイープ・Recover の discard・`cleanupWorktree`）か、または本ゲートが追加した**人間向け案内文字列・コメント**（`newStartSuppressed.reason` の手動削除案内・ラン終了時警告ログ・返却フィールドのコメント・`monitoringResumeGateDeferred` に記録する defer 理由文字列）のいずれかであり、本ゲートが**実行可能な削除呼び出し**を新設していないこと（削除ロジックを新設しない設計）。返却値 `residualWorktrees`（`observed` / `observedAtStart` / `addedThisRun` / `limit` / `overLimit` / `suppressed` / `paths`）が最終レポートで残置総数と上限比率・8 割警告に反映されること。

### merge-guard hook（deny 専用）・クライアント側自動マージ opt-in 経路の適用確認（PR #182 codex P0 / PR #206 撤回 / opt-in 再有効化）

`scripts/merge-guard-hook.sh` または自動マージ経路を変更した場合、以下で「hook が deny 専用（allow 経路・carve-out なし）であること」と「クライアント側の実マージ経路は opt-in（`autoMerge: true` + `externalChecks` 確定 + 全 App の信頼済み context 宣言）のときのみ G0 ゲート（サーバー側強制の実測）付きで開き、opt-out・`externalChecks` 未確定・context 未宣言（slug のみの旧形式）では回復専用（recoveryOnly）に固定されること。arm 経路（auto-merge の予約）は引き続き存在しないこと」を確認する:

```bash
# 1. hook の構文検証（shellcheck があれば併用）
bash -n scripts/merge-guard-hook.sh
command -v shellcheck >/dev/null && shellcheck scripts/merge-guard-hook.sh

# 2. hook に allow 経路の実ロジックが残っていないこと（ALLOW_RE 定数・grant ファイル参照が 0 件。
#    冒頭コメントの経緯説明での expectedCommand 言及は該当しないため grep -v '^#' で除外）
grep -vE '^\s*#' scripts/merge-guard-hook.sh | grep -nE "ALLOW_RE|expectedCommand|merge-grants/grant-" || echo "allow 経路の実ロジックなし（deny 専用）"

# 3. js から grant / canary / branch-protection ゲートが撤去されていること（0 件）
grep -n "issueMergeGrant\|buildMergeCommand\|ensureMergeGuardActive\|ensureBranchProtection\|IIT_MERGE_GRANT\|MERGE_GRANT_DIR" scripts/implement-issue-tree.js || echo "撤去済み（コメントの言及を除く）"

# 4. boundaryNonce / ensureBoundaryNonceSeed は保持されていること（fix/state 用）
grep -n "function boundaryNonce\|async function ensureBoundaryNonceSeed" scripts/implement-issue-tree.js

# 5. クライアント側マージが opt-in（autoMerge:true + externalChecksConfirmed + externalChecksContextsConfirmed）のみで開くこと
grep -n "const recoveryOnly = lastState === 'ready' && !(autoMergeEnabled && externalChecksConfirmed && externalChecksContextsConfirmed)" scripts/implement-issue-tree.js

# 5b. G0 の外部チェック照合が「宣言 context + App ID の組」の完全一致であること（ruleset 経路。classic 経路は G0 (ii) で非対応辞退するため照合式を持たない。
#     下流 sync PR codex P0 変種 1 対応）と、手順 3 の合格判定対象チェック context の required 化照合
#     （client-only チェックの fail-closed 停止。同変種 2 対応）が存在すること
grep -nF 'select(.integration_id == $appid and .context == $ctx)' scripts/implement-issue-tree.js
grep -n "classic-unsupported" scripts/implement-issue-tree.js
grep -n "client-only" scripts/implement-issue-tree.js
grep -n "issuer-unbound" scripts/implement-issue-tree.js
grep -nF 'any(.n == $r.context and .a == $r.integration_id)' scripts/implement-issue-tree.js
grep -n "externalChecksContextsConfirmed" scripts/implement-issue-tree.js

# 6. PR #206 で撤回したクライアント側 arm の残骸がないこと（0 件。
#    hook の carve-out 正規表現・js の precheck / arm シンボルのいずれも実行可能コードに存在しない）
grep -nE "autoMergePrecheck|autoMergeArmable|autoMergeArmPrompt|AUTO_MERGE_PRECHECK" scripts/implement-issue-tree.js && echo "NG: precheck/arm 残骸あり" || echo "OK: precheck/arm 残骸なし"
grep -vE '^\s*#' scripts/merge-guard-hook.sh | grep -nE -- "--auto --squash|carve" && echo "NG: hook carve-out 残骸あり" || echo "OK: hook carve-out 残骸なし"
```

期待結果: `bash -n` が終了コード 0。手順 2 で hook に allow 経路（grant 照合・`expectedCommand`・完全一致）が **1 件も残っていない**こと。手順 3 で js から grant / canary / branch-protection 関連シンボルが（コメントの経緯言及を除き）**撤去されている**こと。手順 4 で `boundaryNonce` / `ensureBoundaryNonceSeed`（fix / state フェーズの未信頼データ境界トークン用）は**残存**していること。手順 5 で `recoveryOnly` が `lastState === 'ready' && !(autoMergeEnabled && externalChecksConfirmed && externalChecksContextsConfirmed)` であること（opt-out・externalChecks 未確定・信頼済み context 未宣言では merge-exec が `gh pr merge` を出力しない回復専用経路に固定され、opt-in + 確定 + 全 App の context 宣言のときのみマージ経路が開く。マージ経路は monitor の出力を入力に取らず、merge-exec の自己取得 sha による `--match-head-commit` と G0（`server-enforcement-missing` 辞退）を伴うこと — `grep -n "server-enforcement-missing" scripts/implement-issue-tree.js` が schema・プロンプト・終端分岐にヒットし、`grep -n "sanitizeSha(m?.headSha)" scripts/implement-issue-tree.js` が 0 件であることで確認する。さらに G0 の classic 経路がクライアント側自動マージ非対応として無条件で fail-closed 辞退すること（classic の bypass 不能性 — enforce_admins・bypass allowance・実行主体ロール・カスタムロールの bypass 権限 — は write 権限の実行トークンから証明できず、検証に必要な protection 読取自体が admin 権限を要求するため。下流 sync PR #2007 codex P0 / PR #236 Bugbot High 対応）— `grep -n "classic-unsupported" scripts/implement-issue-tree.js` が reason enum・reason 契約記述・手順 2b (ii) のプロンプト・終端分岐にヒットする — と、classic protection API・classic 判定式が G0 から撤去されていること — `grep -n "protection/required_status_checks\|protection/enforce_admins\|required_conversation_resolution\|bypass_pull_request_allowances\|collaborators/" scripts/implement-issue-tree.js` が **0 件** — と、required checks の strict 適用（マージ前の base 最新化必須）を ruleset 経路で検査すること — `grep -n "strict_required_status_checks_policy" scripts/implement-issue-tree.js` が手順 2b (i-c) のプロンプトと reason 契約記述にヒットする — も確認する）。手順 5b で G0 (iv) の外部チェック照合が宣言 context + App ID の組（`integration_id` + `context`）の**完全一致**であること（`select(.integration_id == $appid and .context == $ctx)` が手順 2b (iv) のプロンプトにヒットし、App ID 単独の `select(.integration_id == $appid)]` 照合と classic 側の `select(.app_id ==` 照合が **0 件**であること — classic 経路は G0 (ii) で非対応辞退するため照合式を持たない）、G0 (v) の client-only チェック照合（`client-only` が手順 2b (v) のプロンプト・reason 契約・終端文言にヒット）と、G0 (v-b) の required checks 発行元束縛照合（integration_id が数値でない required check・宣言 integration_id と一致する App 発行の check-run を欠く required context を fail-closed で辞退。required context と同名の成功 commit status による required condition 偽装の遮断 — fandhe-backend sync PR #627 codex P0 対応。`grep -n "issuer-unbound" scripts/implement-issue-tree.js` が reason enum・reason 契約記述・手順 2b (v-b) のプロンプト・終端分岐にヒットし、`grep -nF 'any(.n == $r.context and .a == $r.integration_id)' scripts/implement-issue-tree.js` が手順 2b (v-b) の束縛照合 jq 式にヒットする）と、ホスト側ゲート `externalChecksContextsConfirmed`（args パース・recoveryOnly 判定・返却値にヒット）が存在することも確認する。手順 6 で PR #206 のクライアント側 arm（precheck / arm エージェント・hook carve-out）の残骸が **0 件**であること（upstream の `docs/implement-issue-tree/auto-merge-sample.yml` はサーバー側 workflow のため対象外）。hook テストは `bash -n` に加え、deny 専用ケース群（subagent の全マージ系スペリング → deny、`gh pr merge <n> --auto --squash` を含むあらゆる `gh pr merge` → deny、`gh pr comment @cursor review`・読み取り系・main スレッド → 許可）で判定を確認する。

