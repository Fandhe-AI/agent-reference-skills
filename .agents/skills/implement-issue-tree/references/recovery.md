# 中断・失敗からの再開

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

## 中断・失敗からの再開

実行中の状態は `_/issue-trees/<親イシュー番号>.json` に自動保存される。セッションが中断・強制終了した場合でも、**同じ `args` で再実行するだけで再開できる**。

```bash
# 状態ファイルの確認
cat _/issue-trees/42.json
```

状態ファイルの `status` フィールドは以下の値を取る:

| status | 意味 | 再開時の挙動 |
|--------|------|------------|
| `pending` | 未着手 | 最初から実行 |
| `planning` | 計画立案中（中断） | **Recover phase が残骸 worktree / branch の有無を確認**。残骸あり → continue（Implement で継続）/ discard（掃除して Plan から新規）に分岐。残骸なし → Plan から通常実行。PR 未作成のため重複 PR は発生しない |
| `implementing` | 実装中（中断） | **Recover phase が残骸 worktree / branch の有無を確認**。残骸あり → continue（Implement で継続）/ discard（掃除して Plan から新規）に分岐。残骸なし → Plan から通常実行。PR 未作成のため重複 PR は発生しない |
| `reviewing` | レビュー中（中断） | **Recover phase が残骸 worktree / branch の有無を確認**。残骸あり → continue（Implement で継続）/ discard（掃除して Plan から新規）に分岐。残骸なし → Plan から通常実行。push 前 review フローのため PR 未作成。impl 手順 0b-a で open PR を検索し、0b-b でリモートブランチ（push 成功・PR 作成失敗ケース）を検出して回復する |
| `monitoring` | 監視中（中断） | **impl をスキップし monitor ループから再開**（PR 番号・ブランチ・fixCount を引き継ぐ） |
| `merged` | マージ済み | スキップ（完了扱い） |
| `closed` | クローズ済み | スキップ（完了扱い） |
| `failed` | 失敗 | Recover phase が残骸の有無を確認して再実行（continue / discard に分岐） |
| `blocked` | 依存失敗・halted・Review/Merge 非収束（未解決レビューコメント・対象外コメント起因を含む、イシュー固有の品質ブロック。halt の連続カウントには乗せない）。監視エージェント由来の blocked はこの状態へ落ちるのが `blockedReason: quality` の場合のみで、`unrecoverable`（PR の未マージクローズ等）は `failed` になる | **`pr` 保存済み（PR 作成後の Merge 非収束）なら impl をスキップし monitor ループから再開**（PR 番号・ブランチ・fixCount を引き継ぐ。人間がレビュースレッドを resolve した後の再実行で既存 PR のマージ監視を続行する）。`pr` なし（依存失敗・push 前の Review 非収束等）は Recover phase が残骸の有無を確認して再実行（continue / discard に分岐） |
| `skipped` | GitHub 側で closed 済み | スキップ（変更なし） |

`monitoring` 中断、および `pr` 保存済みの `blocked` からの再開では、保存された `pr`（PR 番号）・`branch`・`fixCount`（修正済み回数）を引き継いで monitor ループから再開する。`fixCount` の上限（6 回）は引き継いだ値に基づいて判定される。

`planning` / `implementing` / `reviewing` からの再開では、まず Recover phase が残骸 worktree / branch の有無を確認する。**残骸がある場合**は Recover が「途中作業を継続できるか」を判断し、continue なら既存 branch を checkout して Implement で継続、discard なら worktree と branch を掃除して Plan から新規実行する。**残骸がない場合**は通常の Plan → Implement から再実行する。いずれの経路でも push 前 review フローのため PR 未作成の状態で中断している。impl 手順 0b-a が既存 open PR のブランチを検出して続きから作業し、その PR 番号は PR Create フェーズが `--head <branch>` の再検出で引き継ぐ（重複 PR も `gh pr create` の失敗も起こさない）。「push 成功・PR 作成失敗」のケース（状態 `failed`・`branch` 保存済み）では impl 手順 0b-b がリモートブランチを検出して push 済みコミットを保持したまま回復する。

**重要遷移の書き込み検証と副作用の分離:** `reviewing`（branch / worktree の記録）と `monitoring`（`pr` の記録）への遷移は、失敗すると重複実装・重複 PR につながるため書き込み成功を検証し、1 回リトライしても失敗する場合は先へ進まず終端する。この検証は通常経路だけでなく Recover の continue 経路（回復 Implement 後の `reviewing` 遷移）にも同じ契約で適用される。このとき **worktree 削除を同じ `updateState` 呼び出しに載せない**（Issue #143）。`updateState` は「JSON マージ」と「掃除」の AND を 1 つの `ok` として返すため、状態書き込みは成功して削除だけが失敗した場合（worktree が locked、Recover の discard で既に削除済み等）でも書き込み失敗と誤認され、正常に実装できたイシューが `failed` 終端になる。旧 worktree の削除は書き込み成功後に別呼び出し（`preserveWorktreeField: true`）で非致命的に行い、失敗はラン終了時の最終スイープに委ねる。同様に、Low 指摘の PR コメント投稿は `monitoring` 遷移（`pr` の永続化）より**後**に、かつ try/catch 付きで行う（Issue #136。投稿失敗・例外で PR 番号が未保存のまま `failed` 終端になると、次回実行が monitoring 再開経路へ入れず既存 PR を放置したまま重複 PR を作りうる）。

**Recover の判断軸は Review とは別**である。Review は「正しいか・マージできるか」を判定するのに対し、Recover は「この途中作業から継続するのが妥当か」を判断する。動かない・未完成でも方向が妥当なら continue（残りは Implement が完成させる）。未 commit 変更は Recover が WIP commit として branch へ退避してから worktree を削除するため、continue / discard どちらの経路でもデータを失わない。worktree の削除は continue / discard いずれでも退避完了を申告・実測の 2 段で検証してから行う（Step 2 の削除ゲート参照）。

状態ファイルの `worktree` フィールドには実装エージェントが動作した worktree の絶対パスが記録される。Recover phase はこのフィールドと `git worktree list --porcelain` を使って残骸を特定する。

### worktree の自動削除

**merged 確定時**に、状態ファイルの更新と同じエージェント内で worktree を自動削除する。削除は `git worktree remove --force <path>` で実行し（squash merge 済みのため force でよい）、削除後に `git worktree prune` を実行する。削除完了後、状態ファイルの `worktree` フィールドは空文字に更新されるため、残骸の有無を状態ファイルから判別できる。`remove --force` が locked 等で失敗した場合は `git worktree unlock` してから再試行し、それでも失敗すれば実在確認・メインリポ非該当を確認した上で `rm -rf` にフォールバックする（さらに失敗しても非致命として継続し、次回ランのスイープに委ねる）。

**fix のたびに古い worktree は削除され、常に最新の 1 つだけが追跡される**。fix エージェントも `isolation: 'worktree'` で動作するため、fix のたびに新しい worktree が作成される。fix 完了後に旧 worktree を自動削除し、状態ファイルの `worktree` フィールドを新しいパスに更新する。これにより fix を複数回繰り返しても残骸 worktree が蓄積しない。

**review / pr-create の worktree は自動削除しない（記録のみ）**。この 2 つは `isolation: 'worktree'` で動作するが成果物を保持しない（review は読み取り専用の判定のみ、pr-create は push 完了時点で成果が origin 上に存在する）ため保持価値はない。しかし削除に使えるのはエージェントが返した `worktreePath` だけであり、これは「そのエージェント用に作られた worktree である」ことをホスト側で確認できない自己申告値である。パス検証（`sanitizeWorktreePath`）は文字種を見るだけのため、誤応答や、レビュー対象テキスト（PR 本文・レビューコメント）経由のプロンプトインジェクションで並列実装中の別イシューの worktree パスを返させると、未コミットの実装成果ごと `git worktree remove --force` で失う。

そのため**自動削除は廃止**し、返却されたパスの記録とラン終了時のログ一覧出力のみを行う（Workflow の返却値 `ephemeralWorktrees` でも確認できる）。最終スイープ（`sweepClosedWorktrees`）の削除対象にも入らない（`updateState` の `cleanupWorktree` を経由しないため構造的に候補にならない）。これは「推測に基づく削除をしない」という `sweepEligiblePaths` の設計方針と一貫する。残った worktree は一覧を見て手動で削除する。所有権マーカー（nonce）方式による回収もコミット 2539cbb で意図的に不採用とした（下表参照。nonce は未信頼データを読むエージェント自身に開示済みで所有権証明にならず、削除ロジックを新設すること自体が誤削除リスクを招く）。

**削除しない代わりに、残置総数の上限 + fail-closed 停止でディスク枯渇を防ぐ**（PR #588 codex P1、fail-closed 化とラン中の積み増し再評価は PR #185 codex P1）。使い捨て worktree を削除しないと、ツリー実装を反復するたびに review / pr-create の worktree が単調増加し、無人運用でディスクが枯渇して後続ジョブを失敗させ得る（AGENTS.md「リソース枯渇（DoS）耐性」）。単一ラン内の記録（`ephemeralWorktrees`）はラン開始ごとに空初期化され複数ラン累積を捕捉できないため、**ラン開始時に横断スキャン（`scanOrphanWorktrees`）で過去ラン分も含む worktree の物理総数を観測**（メイン worktree のみ除外。状態ファイル追跡済み＝使用中も数える。以前の追跡済み除外では failed / blocked のまま長期滞留する実装 worktree が何件蓄積しても計上されず「総数の上限」契約に反した。PR #185 codex P1 第 5 ラウンド）し、`maxResidualWorktrees`（既定 100・`0` で無効。旧既定 20 では 1 イシュー消化あたり実測 4〜6 件の積み増しで 1 ラン 3 件着手が頭打ちになったため Issue #348 で引き上げ。「削除しない設計」自体は不変）を**超過**していたら新規イシューの着手を fail-closed で停止する（削除は一切行わない。この恒久停止は既に実行中のイシューの継続を止めない。monitoring 再開の新規開始自体は別途 projected 判定の対象——後述）。観測は未信頼テキストを読まない host 指示専用エージェントが構造化スキーマで返す既存の orphan scan を再利用する。停止時はレポートに残置パス一覧を出し、利用者は `git worktree list` で確認して不要な worktree を `git worktree remove` で手動削除してから再実行する。ラン開始時のスキャン（`runStartOrphanEntries`）が失敗した場合は、ゲート有効（`maxResidualWorktrees > 0`）なら観測不成立を「残置ゼロ＝安全」と誤認せず `newStartSuppressed` を設定して新規イシューの着手を停止する（fail-closed。`maxResidualWorktrees === 0` の明示オプトアウト時のみ観測失敗でも続行。返却値 `residualWorktrees.observed: false`）。スキャン一覧が非空でも観測成功とは扱わない——一覧は LLM エージェントの転記でありスキーマは全レコード返却を保証しないため、ゲート有効時は別エージェントが独立取得したレコード総数（`countWorktreeRecords`）と件数照合し、不一致・カウント取得失敗も観測失敗として同じ fail-closed 停止に倒す（PR #185 codex P1 第 4 ラウンド。転記の一部脱落による過小カウントで新規着手を許す fail-open の防止）。dispatch ループはラン開始時の一度きりの判定に加え、新規着手の直前に毎回「開始時観測 + 本ラン積み増し（`ephemeralWorktrees.length`）」を上限と再評価し、本ランの worktree 新規作成（implement / review / pr-create / fix-routing-error。fix は旧 worktree cleanup とペアの置換で純増しないため台帳外とし、cleanup 失敗の残置は次ラン開始時の物理総数観測が捕捉する）の積み増しで上限を超えた時点でも以降の新規着手を停止する（実行中イシューの継続は止めない。merged 確定時に掃除された implement worktree 分は差し引かないため実測は物理増分の上界＝過大側で安全）。さらに並列投入済みでまだ記録に到達していない分の今後の積み増しを見込み、新規着手イシューごとに `EPHEMERAL_RESERVE_PER_NEW_START`（kind ごとの最大生成数宣言テーブル `EPHEMERAL_KIND_MAX` の合計から導出。現在 implement ×1 + review ×3 + pr-create ×1 + fix-routing-error ×1 = 6。生成経路を追加するときは同テーブルへの宣言が必須で、未宣言 kind の記録は実行時に契約違反として警告される）から、monitoring 再開イシューごとに `EPHEMERAL_RESERVE_PER_MONITORING_RESUME`（= 1。Merge ループの fix-routing-error 分。PR #184 以降は monitoring 再開も積み増し得るため）から、それぞれ実記録数を差し引いた予約を `newStartActive` / `monitoringResumeActive` 経由で計上し、実測 + 予約 + 着手候補分が上限を超える投入を止める（予約起因は defer・実測超過は恒久停止。PR #185 codex P1 第 2 ラウンド）。**monitoring 再開自体もこの予約込み判定の対象**（`item.kind === 'implement'` の再開に限る。verify-close ノードの再開は Merge ループへ入らず予約 0 のため対象外）であり、`isActiveMonitoring` 分岐は `runOne` 起動前に自分自身の `EPHEMERAL_RESERVE_PER_MONITORING_RESUME` を含めた projected 判定を行い、超過が見込まれる場合は当該周回の再開のみ defer する（pet-hub PR #1062 codex-review P1 対応。修正前は無条件で `runOne` を起動しており、monitoring 項目を順次再開し続けると上限を無視して残置数を際限なく増やせた）。ラン終了時は「開始時観測 + 本ラン積み増し」の残置総数と上限比率をレポートし、8 割接近で早期警告を出す（返却値 `residualWorktrees`）。

**件数上限の既定値引き上げ（20→100）だけでは配布先リポジトリごとのディスク消費差を捉えられない**（codex-review 指摘・PR #390）。件数軸の根拠は本リポジトリ 1 件のみの実測（≈ 3.4 MB/件）であり、追跡ファイル量が大きい配布先では 100 件の既定値でも旧既定比で最大 5 倍のディスクを消費するまで着手を止めない。これを補うため、リポジトリ非依存の絶対閾値である `maxResidualWorktreeBytes`（既定 2 GiB。Issue #348 検討案 B）をラン開始時観測の第2軸として併用する。判定は件数軸との OR（どちらか一方でも超過すれば着手を止める＝安全側）。残置パス一覧全件へ `du -sk` を実行して合計し、測定不能（1 件でも失敗）は 0 で補わず観測失敗として fail-closed に倒す（`countResidualWorktrees` の「検証不可」計上と同じ理由）。バイト軸も「新規着手・monitoring 再開の予約計上」を件数軸と同じ形で行う（`item.kind === 'implement'` の monitoring 再開に限り、`projectResidualBytes` が新規着手と同じ直前 projection を毎回再評価する。ただし予約単位は件数軸の離散個数テーブルではなく、`perWorktreeByteReserve`（1 worktree あたりのバイト floor 値）に未確定台帳件数を乗じたバイト量である）。バイト軸のラン開始時観測に失敗した場合（`residualBytesObserved === false`）は、件数軸の観測失敗時と同じ fail-closed 方針を採るが、作用先は 2 つの独立した機構に分かれる: 新規着手は `newStartSuppressed` の latch により当該ラン全体で恒久停止する一方、monitoring 再開は `monitoringResumeGateDeferred` により当該周回の projected 判定のみを defer する（観測不能のまま fix-routing-error worktree の新規作成を許すと容量を確認できないまま超過し得るため）。新規着手側の恒久停止が monitoring 再開側の defer を代替するわけではなく、両者は別々に評価される。`perWorktreeByteReserve`（開始時に確定する容量予約の floor 値。実使用量の上界ではない。ただし `maxResidualWorktreeBytes / EPHEMERAL_RESERVE_PER_NEW_START` を上限にクランプ済み——メイン worktree の測定値に gitignored なビルド成果物・依存関係が含まれ過大評価になった場合でも、残置 0 件・実行中タスク 0 件の 1 件目着手候補が予約のみで恒久停止しないようにするため。クランプは実測ベースの超過検知を弱めない。Issue #348 codex-review High 指摘）だけでは、ビルド成果物等で floor を超えて成長した実消費を検知できないため、`remeasureResidualBytesIfDue` が `BYTE_REMEASURE_LEDGER_INTERVAL` 件の使い捨て worktree 積み増しごとに間引きながら `du` を再実行してラン中の実測し直しを行い、さらに新規着手（implement）の直前には台帳増分によらず必ず実測し直す（`remeasureResidualBytesNow`。台帳が増えない間の worktree 成長を着手判定へ反映するため — PR #390 codex-review P1 第 4 ラウンド。`du` の実行コストは「同一 dispatch 周回内は 1 回」の間引きで有界化する設計判断）。再測定が失敗した場合も projection のみへのフォールバックは fail-open になるため、開始時観測失敗時と同じ fail-closed（`newStartSuppressed` 設定・新規着手停止）に倒す。

**エージェントの `worktreePath` 省略・空文字による台帳未検証エントリは、実測失敗ではなく物理一覧フォールバックで回復を試みる**（Issue #404）。`recordEphemeralWorktree` はパスを検証できなかった生成も件数の過小評価を防ぐため `path: ''` で台帳へ計上する。旧実装の `remeasureResidualBytesNow` はこの未検証エントリが 1 件でも残っていれば測定を即座に失敗させ、`newStartSuppressed` latch で新規着手全体（worktree を作らない verify-close ノードを含む）を恒久停止させていた——エージェントの自己申告フィールド 1 個の欠落という回復可能な情報欠落が、回復を一切試みないまま恒久停止に直結する設計だった。修正後は未検証エントリが残っているとき、まず `buildPhysicalByteMeasureTargets` でその時点の `git worktree list --porcelain` 物理一覧（メイン worktree を除く全件・独立レコードカウントとの件数照合付き）へ測定対象を差し替えて実測を継続する。「自己申告パス欠落分を per-issue 突き合わせで補完する」方式ではなくこの方式を採る理由は 2 つある: (1) review / pr-create / fix 系 worktree は隔離 worktree 内で `git checkout --detach` するため `git worktree list` 上は detached になり、`branchMatchesIssue` の branch 照合で帰属を特定できない。命名（`wf_<runId>-…`）による突き合わせも、ホストが Workflow ランタイムから `runId` を決定的に取得する手段を持たないため使えない。(2) バイト軸ゲートの目的（ホスト上の残置 worktree の総ディスク消費を測る）に帰属特定は不要——ラン開始時観測（`countResidualWorktrees`）も既に「メイン worktree を除く物理総数・総量」を対象にしており、物理一覧全件の `du` はどの worktree のパス申告が欠けたかに関わらず正しい実測値を与える。物理一覧は並行ラン・手動 worktree も含み得るため過大側（過剰停止側）にしかずれず、安全方向を維持する。フォールバックで得たパスは**測定専用**で、削除経路（`sweepEligiblePaths`・cleanup・`git worktree remove`）には一切流さない（本節冒頭の「自己申告パス由来の削除は所有権を証明できず廃止済み」という方針を変更しない）。フォールバック自体が成立しない（一覧取得不成立・独立カウントとの件数不一致・`sanitizeWorktreePath` を通らないパス混入）場合のみ、従来どおり fail-closed（`newStartSuppressed` を立てて新規着手を停止）に倒す。副次的に、4 エージェントスキーマ（`IMPL_SCHEMA`/`REVIEW_SCHEMA`/`PR_CREATE_SCHEMA`/`FIX_SCHEMA`）の `worktreePath` を `required` 化し、schema 検証のリトライでモデル側の省略自体を減らした（「pwd を確定できない場合のみ空文字」の契約は維持——空文字はこのホスト側フォールバックが受け止めるため required 化しても穴にならない）。

検討して不採用とした代替案:

| 案 | 不採用の理由 |
|----|------------|
| isolation ランタイムが発行した worktree ID / path との照合 | ランタイムは作成パスをホストへ返さないため、照合材料そのものが存在しない |
| 状態ファイル記録済みパスを保護する消極的レジストリ | 並列実行では別イシューの Implement エージェントが `worktreePath` を返す前＝未登録の窓があり、その窓を塞げない |
| エージェント起動前後の `git worktree list` 差分 | 並列の worktree 作成と競合して一意に定まらず、レースで誤削除に倒れる |
| ホスト発行 nonce をエージェント自身に cwd へ所有権マーカーとして書かせ、ラン終了時にマーカー照合の上で回収する | nonce は未信頼データ（diff・PR 本文）を処理するエージェント自身へプロンプトで開示されるため所持証明にならない。プロンプトインジェクションを受けたエージェントが `git worktree list` から別の clean worktree を選び、既知の nonce をその配下へ書いてそのパスを返せば、状態ファイル未登録の worktree（利用者の手動 worktree・並行ラン）を全ゲート通過で削除できてしまう。ランタイムが作成パスをホストへ返さない以上、「信頼済みホストが実際に作成・登録したパス」を削除根拠にできず、自動削除は復活させない |

**ラン終了時に worktree スイープを実行する**。個別の削除経路が状態ファイル書き込み失敗等で取りこぼした残骸を回収する最終防衛線であり、クローズ（merged / closed）に至ったイシューの実装 worktree（impl / fix）を残さないことを保証する。使い捨て worktree（review / pr-create）は前述のとおり削除を試みないためスイープの対象外であり、ログ一覧から手動で掃除する。削除対象は**本ラン内で削除を試みた worktree パスの集合**と、後述の孤立 worktree スキャンでブランチ名一致・merged / closed 確定した worktree に限定され、かつ `git worktree list` に実在するものだけを削除する。「観測した全パスから保持リストを引く」方式は採らない（状態ファイルへの書き込みが失敗した worktree が「削除候補には載るが保持リストには載らない」状態になり、実装中・レビュー中の worktree が未コミット変更ごと消える。書き込み失敗が fail-safe ではなく fail-destructive に倒れる）。パスの命名規約からの推測は行わないため、並行して走る別ランの worktree・利用者が手動で作った worktree は構造的に対象になり得ない（ホスト側の worktree 命名規約に依存しない設計。命名規約に依存した絞り込みは、規約の想定が外れたときの失敗方向が `git worktree remove --force` による削除過多になるため採用しない）。観測がゼロなら削除を一切行わない（fail-safe）。保持されるのは failed / blocked / monitoring イシューが記録した worktree で（monitoring は halt 等で中断したイシュー。状態ファイルが指す worktree の実体だけ消えると乖離が生じるため保持する）、ブランチは削除しない（未 push のコミットを持つ可能性があるため、ブランチの寿命は worktree の寿命と切り離す）。スイープ結果は Workflow の返却値 `sweptWorktrees` で確認できる。

なお、削除候補への登録は「削除を試みる地点」（`updateState` の `cleanupWorktree` 処理）で、実際の削除を行うエージェント呼び出しより**前**に行う。このため状態ファイルへの書き込みが失敗しても候補には残り、スイープ本来の目的（書き込み失敗で追跡から漏れた残骸の回収）が維持される。逆に、まだ削除を試みていない worktree は候補に載らないため削除され得ない。

**孤立 worktree の自動検出（orphan scan）**。エージェントが worktree 作成後・`worktreePath` 返却前にクラッシュすると、そのパスは状態ファイルにも削除候補にも載らず、checkout 済みの branch だけが残って次回実行の checkout を失敗させ続けることがある。これに対処するため、ラン開始時とラン終了時の両方で `git worktree list --porcelain` を取得し、ブランチ名（`<type>/<issueNumber>-<short-name>`）を実行キューの issue 番号と照合する。命名規約からの推測は行わず、ブランチ名一致のみを根拠にする。ラン開始時に一致した孤立 worktree は状態ファイルへ記録して Recover の対象に載せ、ラン終了時に一致したものは対応イシューが merged / closed 確定であれば削除候補へ、それ以外（failed 等）は削除せず状態ファイルへ記録して次回 Recover に委ねる。

**中断・失敗後の残骸 worktree は、再実行時に Recover phase が自動処理する**。continue 判定の残骸は Recover が worktree を削除してから Implement で既存 branch を checkout し、discard 判定（空 worktree・方向違い等）は Recover が worktree と branch を削除する。ただし worktree の削除は continue / discard いずれの経路でも「Recover の `wipCommitted: true` 申告」と「ホスト側の読み取り専用エージェントによる未 commit 変更なしの実測」の**両方**を満たした場合にのみ実行する（Step 2 の削除ゲート参照）。満たせない場合は残骸を削除せず `failed` で保全し、次回ランの Recover に委ねる。手動で worktree を削除したり、削除確認に答えたりする必要はない。

**failed / blocked の worktree のうち Recover が discard と判定しなかったものは削除しない**（デバッグ・手動再開用に残る）。不要になった場合は状態ファイルの `worktree` フィールドを参照して手動で削除する:

```bash
# 状態ファイルで worktree パスを確認
cat _/issue-trees/42.json | jq '.items | to_entries[] | select(.value.status == "failed") | {issue: .key, worktree: .value.worktree}'

# 手動削除
git worktree remove <worktree-path>
git worktree prune
```

### 実装エージェントによる既存 PR・リモートブランチの再利用

実装エージェントは着手時に以下の順で回復手順（手順 0b）を実行する。

**0b-a（open PR 検索）**: `gh pr list --state open` でイシュー番号に対応する open PR が既に存在しないかを確認する。既存 PR が見つかった場合は新規 PR を作らず、そのブランチを取得して続きから作業し、そのブランチ名を branch として返す（実装フェーズの `prNumber` はホスト側で常に 0 として扱われるため PR 番号は返さない）。PR 番号の再利用は PR Create フェーズが担い、同じブランチに対する open PR を `gh pr list --state open --head <branch>` で再検出し、base ブランチと head sha の一致を検証したうえでその番号を `prNumber` として返す（Issue #135。検証の詳細は Step 5.5 参照）。これにより中断再開時や monitoring フォールバック時に重複 PR の作成も `gh pr create` の失敗も起きない。

**0b-b（リモートブランチ再利用）**: open PR が見つからない場合、`git ls-remote --heads origin` でイシュー番号を含むリモートブランチ（命名規約 `<type>/<N>-<short-name>`）が残っていないか確認する。「push 成功・PR 作成失敗」で残ったブランチを検出し、`git fetch origin <branch> && git checkout -B <branch> origin/<branch>` でそのブランチを取得して push 済みコミットを保持したまま続きを実装する。`origin/<base>` から新規作成し直さないため、push 済みコミットが孤児化しない。このブランチ名を branch として返し、prNumber は 0 のまま（PR は後続の PR Create フェーズが作成する）。

### 状態ファイルが壊れている場合

状態ファイルが存在するが JSON パースに失敗している場合、**ワークフローはエラー停止する**（壊れたファイルを無視してフレッシュスタートすると重複 PR・重複実装が発生する危険があるため）。

エラーメッセージ例:
```
状態ファイル（_/issue-trees/42.json）の読み込みまたは JSON パースに失敗した。
ファイルを手動で確認・修復してから再実行すること。
削除してフレッシュスタートする場合は `rm _/issue-trees/42.json` を実行する。
```

対処方法:
```bash
# 状態ファイルの内容を確認する
cat _/issue-trees/42.json

# 修復できる場合: jq で検証・修正してから再実行
jq . _/issue-trees/42.json

# 完全にやり直す場合: 削除してから再実行（進捗は失われる）
rm _/issue-trees/42.json
```

### 最初からやり直す場合

状態ファイルを削除してから再実行する:

```bash
rm _/issue-trees/42.json
# 再実行
```

### 状態ファイルについて

- パス: `_/issue-trees/<親イシュー番号>.json`（メインリポルート相対）
- `_/` は git 管理外のローカルディレクトリ（`.gitignore` 対象）であり、状態ファイルは git にコミットされない
- 同一セッション内での再開は Workflow ツールの `resumeFromRunId` パラメータも利用できる（Workflow ツールが journal から自動再開する）
- サンプル: `skills/implement-issue-tree/sample/state-example.json` を参照

