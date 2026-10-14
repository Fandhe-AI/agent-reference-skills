# 最終レポートのフォーマット

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

```
## implement-issue-tree 完了レポート

### 処理結果サマリー
- 並列度: N
- 完了（merged / closed）: N 件
- スキップ（closed 済み）: N 件
- 失敗（failed）: N 件
- 依存失敗で未着手（blocked）: N 件
- halt により未着手（not-started）: N 件
- ラン中に前提の外部完了を検知し再判定: N 件（0 件ならこの行は省略可）

### 完了イシュー
- #N: タイトル — PR #M (squash merged)
...

### 失敗・未着手イシュー（要確認）
- #N: タイトル — 理由（CI 失敗 / レビュー未解決 / 依存先失敗 / halt / 前 Phase 未完了（phaseGate）等）。blocked の場合は残置 worktree / branch / 最終指摘（`worktree` / `branch` / `lastReviewFinding`。あれば併記）。`phaseGate: true` ランで前 Phase が未完了の場合は「前 Phase 未完了（phaseGate）により未着手: #…」の note になる（本文由来の `dependsOn` 前提失敗とは文言を区別する）。note の issue 番号列挙は 5 件までは「#a, #b」の昇順、6 件以上は「N 件（先頭 5 件: #a, #b, …）」に縮める（ツリー外の前提待ち・子の保留・前提失敗の各 note も同じ。Issue #585）。ツリー外の前提イシューが open（または state 取得不能）の場合は「ツリー外の前提イシュー #… が open のため未着手（close 後に再実行すると着手する）」の note になり、待ちの理由の番号を `outOfTreeDeps` に併記する

### 対象外（out-of-scope）— 各 PR 本文の「対象外」節を参照
- #N（PR #M）: 対象外項目あり（詳細は PR 本文。Issue 化は承認のうえ人手で実施、切り出し先 Issue 番号: TBD）
- #N（PR #M）: 未解決レビューコメント由来の対象外あり（fix 対象外と判断・記録済み。Issue 化は承認のうえ人手で実施、切り出し先 Issue 番号: TBD）

### 未解決コメント（issue 化候補）— 該当があるときのみ出力する（0 件ならこの節ごと省略）
- #N（PR #M）: コメント author — 本文要約（スレッド URL）
  Issue 化は本レポート確認 → ユーザー承認のうえ実施する（承認なしに Issue 操作をしない。手順は「実装対象外（out-of-scope）の扱い」手順 3・4 と同様）
```

返却値: `parent` / `baseBranch` / `parallel` / `phaseGate`（`args.phaseGate` の受理値をそのまま返す） / `phaseOrder`（`phaseGate: true` のときルート直下の子を siblingIndex 昇順に並べた issue 番号列。`phaseGate: false`（既定）では常に `[]`） / `models`（`args.models` を正規化した段階ごとのモデルの上書き。未指定なら `{}`。載っていない段階は既定のモデルで動いた） / `securityReview`（`{ enabled, model }`。`args.securityReview` を有効にしたか、セキュリティ専用の Review に使ったモデル。無効なら `{ enabled: false, model: null }`） / `autoMerge`（クライアント側の実効状態 = `autoMergeRequested && externalChecksConfirmed && externalChecksContextsConfirmed`（3 条件の AND）。opt-in + externalChecks 確定 + 全宣言 App の信頼済み context 宣言のランではクライアント側マージが実際に動くためこの AND 条件が実効値。サーバー側 auto-merge workflow の有無はこの値に反映されない） / `autoMergeRequested`（要求値。`args.autoMerge` の受理値をそのまま返す。opt-out ランでマージ条件を満たしたイシューは `blocked` + `pr` で終端し、マージ待ち PR 一覧として追跡する） / `mergeGuard`（`{ hookDenyOnly: true }`。hook が deny 専用＝carve-out なしであることの明示。hook 導入リポでは opt-in マージと併用不可） / `externalChecks`（確定した外部チェック App 一覧） / `externalChecksConfirmed`（構成が確定していたか。`false` のイシューはマージ直前に停止する） / `externalCheckContexts`（確定した外部チェック App ごとの信頼済み context 一覧 `[{app, contexts}]`） / `externalChecksContextsConfirmed`（全宣言 App が信頼済み context を持つか。`false` ではクライアント側マージ経路が開かない。slug のみの旧形式が 1 件でもあれば `false`、`[]` は空充足で `true`） / `externalChecksObserved`（観測ベースの参考値） / `total` / `done`（各イシューの status。blocked / failed で未解決コメントがあれば `unresolvedComments`、fix 対象外の判断ログがあれば `outOfScope` を含む。Review 非収束等の `blocked` は残置 worktree・branch・最終指摘があれば `worktree` / `branch` / `lastReviewFinding` を含む） / `failures` / `outOfTreeDeps`（ツリー外の前提イシューの分類。`open`: open のため待った番号、`unknown`: state を取得できず open 扱いで待った番号〔fail-closed〕、`closed`: closed / MERGED で制約なしの番号、`ancestors`: ルートの祖先のため待たなかった番号。待ちの理由になったのは `open` と `unknown`。該当イシューの `done` / `failures` の要素にも `outOfTreeDeps`〔そのイシューが待った番号〕が付く） / `notStarted` / `halted` / `blockedStateWrite`（着手できないノードの blocked を状態ファイルへまとめて書いた結果。`requested`: 記録しようとした件数、`unchanged`: 保存済みと同一で書かなかった件数、`attempted`: 書き込みを試みた件数、`written`: 書けた件数、`unwritten`: 書けなかった件数、`unwrittenIssues`: 書けなかった番号の先頭 20 件、`chunks` / `failedChunks`: 書き込みエージェントの回数と失敗した回数。`unwritten` が 0 でなければ `done` の blocked 件数と状態ファイルがその分ずれており、同じ引数で再実行すると書き直される。Issue #585） / `prereqTransitions`（ラン中に前提の外部完了を検知して `failedSet → done` へ遷移させた件の一覧。各要素は `{issue, kind, pr?}`。`kind` は `merged`（PR MERGED を確認）または `closed`（Issue CLOSED を確認）） / `mainWorktreeUntracked`（メイン worktree〔リポジトリルート〕の未追跡ファイル検査結果。`observed`: ラン開始時・終了時の両観測が成立したか。不成立なら `git status` での手動確認を促す。`baselineCount`: 開始時点で既に存在していた未追跡ファイル数。`added`: 本ラン中に新規出現したパスの一覧（sanitize 済み・最大50件）。**自動削除は行わない**警告専用のフィールドで、並行ランや人間の並行作業も拾い得るため帰属は推定）。`mainWorktreeHead`（メイン worktree の HEAD 検査結果、Issue #591。`observed`: 開始時・終了時の両観測が成立したか。`changed`: ブランチ名が変わった、または開始時から detached の場合に sha が動いた。`shaChanged`: 先端 sha が動いたか〔同じブランチでの前進は正規の操作でも起こるため警告対象にしない〕。`baselineRef` / `endRef`: 開始時・終了時の `symbolic-ref`〔detached は空文字、sanitize 済み〕。**自動では戻さない**警告専用のフィールドで、`changed: true` なら `git status` で確認して手動で戻す）。

`agentBudget`（`{ limit, used, enforced, stoppedDispatchAt, starts, starved, neededLimit, held, reached }`。`starts` は本ランで着手した件数。`starved` は本ランで 1 件も着手せず、予算だけが理由の保留ノードがある〔予算枯渇による停滞。halt・新規着手抑止・再開ゲートの理由も成立しているノードは数えない〕とき `true`、`neededLimit` は `held` のうち `budgetOnly` なものの `needed` の最小値〔保留時の観測値に基づく目安。着手の有無に関わらずそのような行があれば値を持ち、無ければ `null`。1000 を超え得て、そのまま `agentCallLimit` に渡せる値とは限らない〕、`held` は予算で保留した全ノード〔他の停止理由と併存するものも含む〕を issue 番号の昇順に並べた観測値の記録で、各要素は `{ issue, kind, resume, used, required, chunks, needed, budgetOnly }`〔`used`・`required`・`chunks` は保留時の値、`needed` = 保留時の `used + required`（ゲートが実際に使ったしきい値。上乗せしない）。note に出す N と同じ値。`chunks` = 未完了数 ÷ 100 の切り上げ（保留時の観測値。first では `required` に入らない）。`budgetOnly` は予算だけが理由か。保留が無ければ、`enforced: false` のときも空配列。次ランの挙動は主張しない。プログラムから読むなら `held`、人が読むなら note〕。`limit` は `args.agentCallLimit`〔既定 1000〕、`used` は本ラン中の `agent()` 呼び出し数、`enforced` は呼び出し数を数える関数へ差し替えられたか〔`false` なら予算ゲートは適用されず全件が従来どおり着手し、`used` は 0〕、`stoppedDispatchAt` は予算不足で新規着手を初めて止めた時点の `used`〔止めていなければ `null`〕、`reached` は `used >= limit`。超過後も呼び出しは止めず、超えた最初の 1 回だけ警告ログを出す。着手・再開できなかったノードの note〔`not-started` と `interrupted`、状態ファイルへ保存する blocked の note〕は成立している停止理由を優先順 halt → 新規着手抑止 → 前提 → 再開ゲート → 予算でそのまま並べる。ゲートの理由が予算保留と併存するときは前回の評価であることを明記する。予算の断片は単独でも併記でも同じ文言で、保留した時点の事実だけを書く〔「保留時の使用 u/L、必要量 r。このランの着手 k 件。保留した時点では args.agentCallLimit が N 以上なら予算検査を通った（次ランの必要量は…変わる）」。N = 保留時の使用量 + 必要量。N が 1000 を超えるときは「（指定できる上限 1000 を超える）」を添え、分割は案内しない。次ランの挙動は予測しない〕。前提（依存ノード）が未完了のノードは、まだ決着していない前提を「前提 #A が未完了のため待機」、既に失敗・ブロックとして記録された前提を「前提 #B は完了していない（失敗・ブロックとして記録済み）」と分けて理由に挙げる）/ `unmonitoredPrs`（`[{ issue, pr, resumable }]`。本ランで PR 番号を得たが、実 monitor が一度も結果を返さなかった PR。上限による打ち切りで監視に進めなかった PR を含み、終了ログにも出す。`resumable: true` は PR の照合と状態ファイルへの `pr` の保存〔`monitoring` 遷移、またはその失敗後の `blocked` 退避保存の `updateState` 成否確認〕が済んだ PR で、再実行すると monitor からの再開を試みる（状態ファイルに再開情報がある。再開が予算保留・ゲート defer・前提待ちになる場合は再開しない）。`resumable: false` は番号を得た直後に打ち切られた、保存に失敗した、照合が不成立のいずれかで、状態ファイルに `pr` が無い（または照合未了）ため再実行しても monitor から再開しない。GitHub 上で PR を手動確認する〔`unverifiedPr` が保存されていれば再実行で再照合される〕。終了ログも両者で案内を分ける。Issue #592）。

`dryRun: true` のランは上の返却値の代わりに次を返して終了する（状態ファイル・worktree・PR・issue へは何も書かない。Issue #585）: `dryRun: true` / `parent` / `baseBranch` / `parallel` / `phaseGate` / `phaseOrder` / `total`（ツリー全体の件数）/ `open`（open のノード数）/ `startable`（`{ count, readyNow, first }`。着手できたノードが全て成功する前提の着手見込み） / `blocked`（`{ count, outOfTree, phaseGate, downstream, optinTestsInvalid, savedBranchMismatch }`。各内訳は `{ count, first }`。`first` は先頭 5 件。分類は ツリー外の open な前提を直接待つ → 前 Phase 未完了の合成辺 → それ以外の下流・子の保留 の順に最初に当てはまる 1 つ。前提は満たすが opt-in テスト宣言不備（`optinTestsInvalid`）・状態ファイルの branch の命名不一致（`savedBranchMismatch`）により通常実行の `runImplement` 冒頭で blocked になる実装ノードは、依存で止まらない場合に限りこの 2 区分へ数える） / `preBlocked`（状態ファイルの照合不成立等で最初から止まる番号） / `undetermined` / `outOfTreeDeps`。
