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
| `reviewing` | レビュー中（中断） | **Recover phase が残骸 worktree / branch の有無を確認**。残骸あり → continue（Implement で継続）/ discard（掃除して Plan から新規）に分岐。残骸なし → Plan から通常実行（impl 手順 0b-a で open PR を検索し、0b-b でリモートブランチを検出して回復する）。push 前 review フローのため PR 未作成 |
| `monitoring` | 監視中（中断） | **impl をスキップし monitor ループから再開**（PR 番号・ブランチ・fixCount・baseMergeCount・optinFixState を引き継ぐ。optinFixState は opt-in テスト宣言があるイシューのみ意味を持つ） |
| `merged` | マージ済み | スキップ（完了扱い） |
| `closed` | クローズ済み | スキップ（完了扱い） |
| `failed` | 失敗 | Recover phase が残骸の有無を確認して再実行（continue / discard に分岐） |
| `blocked` | 依存失敗・halted・Review/Merge 非収束（未解決レビューコメント・対象外コメント起因を含む、イシュー固有の品質ブロック。halt の連続カウントには乗せない）。監視エージェント由来の blocked はこの状態へ落ちるのが `blockedReason: quality` と `unbound`（手順 1 の PR 照合不成立。状態ファイルを書き換えない `state-unverified`）の場合で、`unrecoverable`（PR の未マージクローズ等）は `failed` になる。前提の外部完了（Issue CLOSED / PR MERGED）をラン中に検知した場合は `merged` / `closed` へ遷移し（この遷移自体は halt 後も継続する）、**halt 発生前に限り**下流を同一ラン内で再判定する。halt 後に検知した場合は遷移・状態記録は行われるが下流の同一ラン内再判定は行われず、次回ランで反映される（次回ランを待たずに解消するため本行の再開対象から外れる。この遷移で `merged` / `closed` へ落ちた項目の残置実装 worktree は、終了時 sweep（本節前掲の worktree スイープ）の削除候補になる — 人手マージ済みのため契約上問題ないが、未コミット変更が残る想定は禁物）。Merge ループ中のエージェント呼び出し（monitor / merge-exec / merge-verify / base-merge / fix）が StructuredOutput を返さず終了した場合（例外・null 返却いずれも）も、Merge ループ突入時点で `pr` は必ず保存済みのため `blocked`（次回実行で monitoring 再開）に分類する。`failed`（Recover → 再実装）に倒すと重複 PR を作りうるため（詳細は下記「StructuredOutput 未返却時の fail-safe」節） | **`pr` 保存済み（PR 作成後の Merge 非収束）なら impl をスキップし monitor ループから再開**（PR 番号・ブランチ・fixCount・baseMergeCount・optinFixState を引き継ぐ。人間がレビュースレッドを resolve した後の再実行で既存 PR のマージ監視を続行する）。`pr` なし（依存失敗・push 前の Review 非収束等）は Recover phase が残骸の有無を確認して再実行（continue / discard に分岐）。Review 非収束の `blocked`（push 前のため `pr: 0`）は monitoring 再開ではなく必ずこの経路（Recover → 通常 Implement）から再着手する。ルートノード（verify-close）が StructuredOutput を返さず終了した場合は `pr` / `worktree` の概念がないため `blocked`（halt 非カウント）に分類し、次回実行時に verify-close を素のまま再実行する（冪等なため重複作用はない）。エージェントが応答した上で `closed: false` と判定した場合は `failed` |
| `skipped` | GitHub 側で closed 済み | スキップ（状態は変更しない。ただし人手マージ済みの実装 worktree は上記「closed 後始末」で破棄し、状態を `merged` へ更新する） |

**ツリー外の前提イシュー待ちの `blocked`**: ツリー外の前提（`args.parent` 配下に無い `dependsOn` 番号）が open のため未着手になったイシューは `blocked`（`pr: 0`。PR 作成済みで monitoring 再開情報が有効な場合は `pr` を保持）で記録される。ツリー外前提の state は状態ファイルに保存せず毎ランの Tree フェーズで取得し直すため、前提を close してから同じ `args` で再実行すると、そのイシューは通常どおり着手（PR 作成済みなら monitor から再開）される。state を取得できなかった番号は open 扱いで待つ（fail-closed）ため、gh の認証・レート制限等の一過性要因なら解消後に再実行する。

**対象外ラベル待ちの `blocked`**（`args.skipLabels`。Issue #720）: ラベルが付いた open ノードは Plan / Implement を起動せず `blocked`（halt 非カウント。note は「対象外ラベル（<label>）のため未着手（close するかラベルを外して再実行すると着手する）」）で記録され、それを `dependsOn` に持つ後続・子の完了を待つ親も連鎖して `blocked` になる。ラベルは状態ファイルに保存せず毎ランの Tree フェーズで取得し直すため、**そのイシューを close するか、ラベルを外してから同じ `args` で再実行する**と、close は「すでに closed」として前提が満たされ、ラベルを外したイシューは通常どおり着手される。ラベルの一覧を取得できなかった場合（gh の認証・レート制限等）は、どのノードに付いているか分からないためツリー内の open ノードを全て待たせる（fail-closed。note は「対象外ラベル（…）の一覧を取得できず未着手（再実行で再取得する）」）。一過性要因を解消して再実行する。ラン中に対象外ノードが外部で close された場合は、ラン中の前提完了プローブが検知して後続を再判定する。

`monitoring` 中断、および `pr` 保存済みの `blocked` からの再開では、保存された `pr`（PR 番号）・`branch`・`fixCount`（修正済み回数）・`baseMergeCount`（base 取り込み済み回数）を引き継いで monitor ループから再開する。`fixCount` の上限（6 回）・`baseMergeCount` の上限（`args.maxBaseMerges`。既定 3）は、いずれも引き継いだ値に基づいて判定される（独立した 2 つの予算軸）。opt-in テスト宣言があるイシューでは `optinFixState`（`{ attempted: boolean, runs: [...], headSha }`。post-push fix が `pushed: true` を報告したラウンドごとに更新）も引き継ぎ、`restoreOptinFixState` がマージ前ゲート（`combineOptinRecordGate`）の判定材料 `lastFixOptin`（`{ runs, headSha }`）の初期値として復元する。`attempted: true` なのに `runs` を復元できない場合は宣言コマンド全件を `not-run` とみなし fail-closed で不合格にする。`headSha` が現在の HEAD の headRefOid と一致する場合のみ `runs` の非 pass がマージ前ゲートを不合格にする（PR 本文のマーカー自体が HEAD sha に束縛されているため、これは多層防御であり主防御ではない）。

`planning` / `implementing` / `reviewing` からの再開では、まず Recover phase が残骸 worktree / branch の有無を確認する。**残骸がある場合**は Recover が「途中作業を継続できるか」を判断し、continue なら既存 branch を checkout して Implement で継続、discard なら worktree と branch を掃除して Plan から新規実行する。**残骸がない場合**は通常の Plan → Implement から再実行する。いずれの経路でも push 前 review フローのため PR 未作成の状態で中断している。impl 手順 0b-a が既存 open PR のブランチを検出して続きから作業し、その PR 番号は PR Create フェーズが `--head <branch>` の再検出で引き継ぐ（重複 PR も `gh pr create` の失敗も起こさない）。「push 成功・PR 作成失敗」のケース（状態 `failed`・`branch` 保存済み）は `branch` が残骸として Recover phase を起動するため impl 手順 0b には到達しない。continue の回復 Implement は手順 2 で既存 branch を checkout した後、`git fetch origin <branch>:refs/remotes/origin/<branch>` → `git merge --ff-only refs/remotes/origin/<branch>` でローカルをリモート tip へ追従させ、push 済みの base 取り込みコミット（PR Create が detached HEAD から push しローカル ref を更新しないもの）を保持したまま回復する。ff 不能（分岐）なら `git merge --no-edit refs/remotes/origin/<branch>` でリモート tip を取り込み、force なしの通常 push で反映できる形に戻す。push 済みコミットは rebase・amend・reset・squash で書き換えない。それでも次の PR 作成が diverged で止まると、ローカルとリモートの sha を note に残して `blocked`（halt を数えない）になる。この状態は次ランでも Recover → continue に入る。人が止めるときは、どちらを正とするか確かめ、リモートを正とするならローカルの `refs/heads/<branch>` をリモートへ合わせてから再実行する（強制 push は人の判断でのみ行う）。

**重要遷移の書き込み検証と副作用の分離:** `reviewing`（branch / worktree の記録）と `monitoring`（`pr` の記録）への遷移は、失敗すると重複実装・重複 PR につながるため書き込み成功を検証し、1 回リトライしても失敗する場合は先へ進まず終端する。この検証は通常経路だけでなく Recover の continue 経路（回復 Implement 後の `reviewing` 遷移）にも同じ契約で適用される。このとき **worktree 削除を同じ `updateState` 呼び出しに載せない**。`updateState` は「JSON マージ」と「掃除」の AND を 1 つの `ok` として返すため、状態書き込みは成功して削除だけが失敗した場合（worktree が locked、Recover の discard で既に削除済み等）でも書き込み失敗と誤認され、正常に実装できたイシューが `failed` 終端になる。旧 worktree の削除は書き込み成功後に別呼び出し（`preserveWorktreeField: true`）で非致命的に行い、失敗はラン終了時の最終スイープに委ねる。同様に、Low 指摘の PR コメント投稿は `monitoring` 遷移（`pr` の永続化）より**後**に、かつ try/catch 付きで行う（投稿失敗・例外で PR 番号が未保存のまま `failed` 終端になると、次回実行が monitoring 再開経路へ入れず既存 PR を放置したまま重複 PR を作りうる）。

### StructuredOutput 未返却時の fail-safe（Issue #465）

Merge ループ（`runMergeLoop` = monitor → merge-exec → merge-verify → base-merge → fix の反復）に
入る時点で、対象イシューの PR は必ず作成済みである（`impl.prNumber` は `runImplement` が PR 作成
成功後にのみ `runMergeLoop` を呼ぶため、ループ内では常に truthy）。この agent 呼び出しが
StructuredOutput を返さず終了した（呼び出し先が `null` / `undefined` を返す、または
`isolation: 'worktree'` 経由の呼び出しが例外で reject する）場合、host 側は例外・null 返却の
いずれも同じ経路へ合流させたうえで `blocked`（次回実行の monitoring 再開）へ分類する。`failed`
（Recover → 通常 Implement 経路。再 PR 作成を含む）に倒すと、既に存在する PR に対して重複 PR を
作りうるため。

対象は「PR が既に存在する Merge ループ内」に限る。**Plan / Implement / Review / Recover /
PR Create（PR 作成前。`pr: 0`）の失敗分類には一切触れない**。これらは `failed`
（halt カウント対象）のままであり、システミックなモデル障害は依然として「3 イシュー連続失敗で
新規着手停止」に到達する（halt 防御はこの fail-safe の影響を受けない）。monitor に限り、null・例外のとき 1 回だけ即時再試行する（Issue #531）。monitor は `gh run rerun --failed` や `@cursor review` 投稿といった副作用を実行し得るため、再試行は書き込みを禁止する観測専用の指示を付けた同一プロンプトで行い、flaky 再実行 1 回・催促 1 回の上限を超えないようにする（副作用が必要なら `blocked` / `quality` で返す）。書き込みを伴う fix は 1 回目が push 済みの可能性があり、再実行すると pushed:false の no-op でホストが push と thread resolve を把握できなくなるため再試行せず従来どおり `blocked` へ倒す。再試行後も失敗した場合の `blocked` と、それ以外の経路では
このランの中で自動リトライを一切行わない（`monitorsLeft` の消費は起こるが、ただちに終端する）。効果は「次回実行が
Recover→再実装ではなく monitoring 再開に入れるようになる」ことだけであり、実行者（人間）の
トリガーなしに勝手に再試行され続けるものではない。

ルートノード（verify-close）は `pr` / `worktree` の概念を持たない冪等な検証のため、
StructuredOutput 未返却は `blocked`（halt 非カウント）に分類し、次回実行時に verify-close を
素のまま再実行する（重複作用は起きない）。エージェントが応答した上で `closed: false` と判定した
場合（「まだ子イシューが残っている」等の実際の判定）は `failed`。

### state 書込みエージェント自身の StructuredOutput 未返却（Issue #493）

前節の fail-safe は Merge ループ内のエージェント（monitor / merge-exec / merge-verify /
base-merge / fix）の未返却だけを対象にしており、**状態ファイル書込みを担う state 系エージェント
自身**（`state:update` / `state:update-batch` / `state:cleanup` / `state:init-all` / `state:high-water` / `state:load`。
いずれも既定 haiku）の未返却は救えない。このエージェントが StructuredOutput を返さず終了すると、
実装済み・PR 作成済みの item まで catch-all の `failed`（halt カウント対象）に落ち得る。

state 系呼び出しは共通ヘルパー `runStateAgent` を経由する。haiku が例外・`null`・schema 不適合
（StructuredOutput 未返却相当）で終わった場合、**同一プロンプト文字列（バイト一致・patch を
組み直さない）で 1 回だけ sonnet へフォールバックする**。haiku・sonnet とも失敗した場合のみ
`outputMissing: true` として呼び出し元へ返す（例外は投げない）。フォールバックのリトライが
安全な理由は、state 系操作がいずれも冪等（patch の再マージは同値になる・worktree/branch 削除は
実在確認してから行う・高水位は縮めない・初期化は既存エントリを上書きしない）であるため。

`outputMissing` は次のように終端 status へ写像する（純粋関数 `classifyStateWriteFailureStatus`
に一元化）:

- state 書込みエージェントが haiku / sonnet とも StructuredOutput を返さなかった
  （`outputMissing: true`）かつ PR 未作成（`prNumber` が 0 以下）→ **`blocked`**（halt 非
  カウント）。push 前の遷移（reviewing 遷移・Recover の掃除ゲート）は状態ファイルへ書けなかった
  可能性があるが、PR がまだ存在しないため再実装しても重複 PR の危険はなく、次回実行時は状態
  ファイルの既存値（`implementing` 等）から Recover 経由で再開する。
- `outputMissing: true` かつ PR が既に存在する（`prNumber > 0`。PR 作成後の monitoring 遷移）
  場合は、この `blocked` 遷移自体の状態ファイルへの永続化（`terminalSaved`）が確認できたときに
  限り **`blocked`** とする。永続化できていなければ **`failed`**（halt カウント対象）に倒す。
  永続化されないまま `blocked` として扱うと、状態
  ファイルに `pr` が残らず次回実行が monitoring を再開できず、通常 dispatch から再実装・PR 再
  作成に進み得るため。
- 状態書込みエージェントが応答した上でのシステム的な失敗（`ok: false`。jq 失敗・権限不足等）は
  **`failed`**（halt カウント対象）を維持する。フォールバックで隠さない。

`runOne` の catch-all（想定外の例外）も同様の理由で分類する。PR 作成成功直後・monitoring 再開時
に issue 番号→PR 番号を記録する `knownPrByIssue` を参照し、PR が既に存在する場合は想定外の例外を
`blocked`（次回 monitoring 再開）に倒し、PR 未作成の想定外例外は `failed` を維持する
（純粋関数 `classifyUncaughtFailureStatus`）。

`state:load`（Restore フェーズの状態ファイル読込・初期化）が haiku / sonnet とも未返却の場合は
停止する（fail-closed は維持。壊れた・未永続化の状態で続行すると重複 PR・重複実装の危険がある）。
ただし文言は「初期化に失敗した」という誤ったメッセージにはせず、未返却専用の案内（ファイル自体の
破損ではないため、そのまま再実行すればよい旨）にする。

### 状態ファイル読込の内容照合と PR 照合

`state:load` が大きな状態ファイルをツール出力のプレビューでしか読めず、残りの items を推測で
埋めて返す事故があった（PR 番号を issue 番号からの連番で捏造し、件数は実ファイルと一致）。
件数や型の検査では検出できないため、読込結果は内容で照合する。

- 別コンテキストの `state:load-verify` が、`scripts/state.sh verify`（読み取り専用）を実行し、項目ごとの
  `jq -jcS '.items[$k]'` の sha256 を封筒 `{nonce, payload, sha256}` で返す（Issue #603 計画 C の P5。
  かつては同じ計算のコマンドをプロンプトに埋め込み、エージェントが書き写して実行していた）。1 回 100 件の
  ページで、ホストが全ページを順に取る。このエージェントには読込結果を渡さない（鸚鵡返し・結託を防ぐ）
- ホストは読込結果の各項目を `jq -jcS` と同じ正規形へ直列化し、純 JS の sha256 で再計算する。
  一致した項目だけを採用する（`verifyLoadedItems`）
- スクリプトは実ファイルの数値キー一覧の sha256（`keysSha256`）と件数（`keysCount`）も計算して封筒の
  全ページに載せる。ホストは全ページの `entries`（`[{k, h}]`）から `hashes` を組み立て、そのキー一覧から
  同じ正規形を作って照合し、件数も突き合わせて、両エージェントが同じ項目を読み落とした場合や件数を
  合わせた捏造を検出する。封筒の nonce・sha256・入力（ファイルとページ）もホストが照合するため、転記の
  誤り・別の呼び出し（ラン開始時と終了時の再読込を含む）の封筒の流用・別のページの観測は受理されない
  （sha256 を自分で計算できる悪意あるエージェントの偽装は検出できない。残余リスク）。壊れた・読めない
  ファイル（シンボリックリンク・`.items` や高水位の型違いを含む）はスクリプトが `error` として返し（`nofile` にしない）、ホストは sonnet へ回さず停止する。項目が 5000 件（50 ページ）を超える
  ファイルも、1 ページ目の直後に専用の文で停止する（再実行・退避では解消しない）
- `state:load` が件数を読み切らず先頭 5 件で止まる事故があった（Issue #535）。読込側へ終了条件を
  負わせず、`check.hashes`（実ファイルのキー集合の正本）に対し未返却・不一致のキーをホストが
  特定し、ホストが組み立てた `jq -c --argjson k '[...]'` を実行する `state:load-fill` で 5 件ずつ
  再取得する（塊は並列・最大 2 巡）。キーは数値表記のみを `JSON.stringify` で埋め込み、
  要求したキーの項目だけを受理し、取得分も同じハッシュ照合を通す。2 巡後も採用できない
  キーは従来どおり `state-unverified` で止め、ログに残存キーを出す
- 照合自体が成立しない（`state:load-verify` が haiku / sonnet とも不成立、既存のはずのファイルを
  検証側が見つけられない、またはキー一覧の sha256 が一致しない）場合はランを停止する（新規着手 0 件）。そのまま再実行し、
  解消しなければ状態ファイルを退避して内容を確認する。ファイルが無く新規作成した場合だけは
  状態なしで続行する
- 照合が成立し、読込側・検証側のキー集合の和のうち採用できなかった issue（不一致・検証側の
  ハッシュ欠落・読込側だけにあるキーを含む）は `state-unverified` として
  `blocked`（halt 非カウント）で止め、新規の実装・PR 作成をさせない（依存する後続も止まる）。
  実装手順 0b の既存 PR 検出は open PR の検索に依存し、MERGED / CLOSED の PR や検索に掛からない
  PR を拾えないため、重複防止をそれだけに委ねない。状態ファイル自体は書き換えない
- 検証側にハッシュが無いことは「実ファイルに無い」証明にならない（取りこぼしと捏造を区別
  できない）ため、読込側だけにあるキーも状態なしにはしない
- 高水位（容量予約）は検証側（`state.sh verify` の封筒）の値を採り、読込側の書き写しは使わない
  （0 へ置き換えて続行すると、過去の実測に基づく容量予約を失い並列着手時に容量を過小評価するため。
  読込側との一致を停止条件にすると、読込側が 0 / 0 と返しただけで正しい状態ファイルでも毎回止まる）
- ラン開始時・末尾の孤立 worktree の記録・削除は、全項目を照合できた場合だけ行う
- 依存ブロック・未着手で `blocked` にする項目でも、`state-unverified` や branch が別 issue の
  命名の項目は保存済み `pr` を 0 でクリアしない（次回の照合で止めるため。`prClearPatch`）

monitoring 再開の前に、`pr-bind:#N` が保存済み PR の `state` / `headRefName` /
`baseRefName` / `isCrossRepository` / `closingIssuesReferences` を取得し、ホストが照合する
（`prBindingProblem`）。PR が実在し、fork からの PR でなく、base が `args.branch` で、期待ブランチが本 issue の命名で `headRefName` と一致し、
`closingIssuesReferences` が空か本 issue を含む場合だけ再開する。これら 4 項目（`headRefName` / `baseRefName` / `isCrossRepository` / `closingIssues`）は `MERGE_VERIFY_SCHEMA` の必須項目で、取得失敗時は照合が必ず不成立になる値（空文字 / `true` / `[-1]`）を返させる（空配列は「紐付け無し」の正当値で、失敗値にしない）。一致しない場合も、`gh` の一時的な
失敗で照合できない場合も、再開も close も通常の実装（Recover・新規 PR 作成）もせず、状態ファイルを
書き換えないまま `state-unverified` の `blocked`（halt 非カウント）で終える（MERGED / CLOSED の
既存 PR は open PR の検索に掛からず、通常の実装へ進むと再実装・重複 PR になり得るため。元の再開情報の
まま人が確認して再試行できる）。主な判別は `headRefName` が担う（`closingIssuesReferences` は
PR 本文から導出され鸚鵡返しされ得るため補助条件に留める）。pr-create が報告した新規 PR も、
Merge ループへ渡す前に同じ照合を通し、不一致なら `blocked` で終端する（PR 番号は照合中のクラッシュで
失わないよう照合より先に、再開用の `pr` ではなく `unverifiedPr` として保存し、照合が通れば `pr` へ
昇格させる。この保存は成否を確認して 1 回だけ再試行し、それでも失敗したら照合へ進まず、番号と手動
確認の要否を結果に英語で残して `state-unverified` で終える。次回ランは `unverifiedPr` を照合し、
成立すればその番号で monitoring を再開して `pr` へ昇格させ、不成立なら `state-unverified` で止めて
新規の実装・PR 作成をさせない）。monitor が手順 1 の照合不成立を返した場合
（`blockedReason: "unbound"`）も、状態ファイルを書き換えずに `state-unverified` の `blocked` で終える。`state-unverified` で止めた issue の保存済み `pr` は、前提完了プローブの
ホスト既知 PR に渡さない（照合できない MERGED PR を根拠に前提を完了扱いにしない。人手で issue が
CLOSED になった場合の遷移は従来どおり）。前提完了プローブの MERGED 受理には、PR 番号の一致に加え `prBindingProblem` と同じ結び付け照合（実在・同一リポジトリ・base・headRefName 完全一致・closingIssues。期待ブランチはホスト決定の `knownBranchByIssue` → 状態ファイルの `branch` で、エージェントへ渡さない）が必要で、不成立は MERGED とせず issue CLOSED 判定へ落とす（Issue #533）。opt-in 前の MERGED 確認で
照合が不一致の場合も `blocked` で終端する。merge-verify による
merged（`already-merged` を含む）の受理にも同じ照合を課し、monitor・merge-exec の手順 1 にも同じ
照合を指示する。再開判定（`isActiveMonitoring`）は、保存済みブランチがその issue の命名
（`<type>/<N>-`）であることも要求する。保存済みブランチが別 issue の命名のエントリも、
`runImplement` の冒頭で同じく状態を書き換えずに `state-unverified` の `blocked` で終え、Recover・
再開の対象にしない（メモリ上だけ捨てると、マージ更新の `updateState` で別 issue の `pr` / `worktree`
が新しい branch と組み合わさって状態ファイルに残るため）。

`blockedReason` は状態ファイルへ永続化されるフィールドではない。
`isActiveMonitoring()` は `status`（`'monitoring'` または `'blocked'`）と `pr > 0` と `branch`
の妥当性（issue の命名一致を含む）のみで再開判定しており、`blockedReason` を読まない。同一ラン内のメモリ上変数として
note・ログ文言の合成にのみ使われる。

**Recover の判断軸は Review とは別**である。Review は「正しいか・マージできるか」を判定するのに対し、Recover は「この途中作業から継続するのが妥当か」を判断する。動かない・未完成でも方向が妥当なら continue（残りは Implement が完成させる）。未 commit 変更は WIP commit として branch へ退避してから worktree を削除するため、continue / discard どちらの経路でもデータを失わない。worktree の削除は continue / discard いずれでも退避完了を申告・実測の 2 段で検証してから行う（Step 2 の削除ゲート参照）。

Recover の機械的な部分 — 対象ブランチの解決・WIP commit（フックを通す。`--no-verify` なし）・`origin/<base>` の取得・base との差分の有無 — は `scripts/recover-prep.sh`（`run-verified.sh` 経由。Issue #603 第 9 弾）が決定的に行い、Recover エージェントは結果の行 `RECOVER_PREP_RESULT {…}` の `branch`・`worktreeMissing`・`wipCommitted` を返却へ写して、継続か破棄かの判断と回復ブリーフの作成だけを行う。退避完了（`wipCommitted: true`）の根拠はコミットの終了コードではなく、コミット後の同じ観測（`git -c core.excludesFile= status --porcelain=v2 -uall --ignore-submodules=none`）が空であること。フックの拒否・フックによる書き換え・submodule 内の未コミットの変更・入れ子の git リポジトリ・コンフリクト中・観測不能は `false` で、`failed` で保全される。メイン worktree・未登録のパス・git がそのパス自身を指さない worktree・detached HEAD・base と同名の HEAD は対象を確定せず（`resolved: false`）、何も書かない。base の取得に失敗したときの差分は `unknown`（空とは見なさない）。詳細は `./script-trust-model.md` の第 9 弾。

**detached の worktree に残った子孫コミット（Issue #731）**: Review の fix が detached HEAD にコミットしたままブランチの ref へ反映されずに終わると、live の worktree が detached になり、対象ブランチを HEAD から確定できない。`recover-prep.sh` は、状態ファイルのブランチ先端が worktree の HEAD の祖先（または同一）で、そのブランチをどの worktree も checkout しておらず、マージ等の途中でもないときだけ、旧値つきの `git update-ref` でブランチを HEAD まで fast-forward し、HEAD の旧値（oid）を指定した `git update-ref --no-deref --stdin` の `symref-update` と付け直し先ブランチ先端（`refs/heads/<branch>` が観測した HEAD の oid のまま）の `verify`（同じ 1 トランザクションで、間に積まれたコミットや競合したブランチ先端の移動があれば全体が拒否され detached のまま保全する。git 2.51 未満では失敗して保全）で worktree をそのブランチへ付け直してから通常の live として進める（結果の行の `detached:"attached"`）。分岐・先行・使用中・途中状態・記録なし・ref の更新失敗は従来どおり `resolved:false`・`reason:detached` で保全する（`detached` に理由の語が入る）。付け直しのあとは `worktree-remove.sh --expect-branch` の照合が通るので、継続・破棄とも自動で進む。

**実装 worktree は detached で終わる**: Implement（新規・回復）は、コミットを積み、追跡ファイルに未コミットの変更が無いこと（`git status --porcelain --untracked-files=no` が空）を確かめたあと `git checkout --detach` でブランチを worktree から外して終了する。Review の fix は隔離された別 worktree で動き、自分の worktree の外へ `git -C`・`cd` で触れられない。fix は `git worktree list --porcelain` でブランチを checkout 中の worktree を探し、無ければ旧値つきの `git update-ref` で先端を進め、あれば何も触らずに中止して `commitFailed` で返す（使用中のブランチだけを動かすと、その worktree の index・作業ツリーと食い違う）。このため Review 以降の状態の `worktree` は最初から detached で、中断後の再実行は上の付け直し（Issue #731）を通る（git 2.51 未満では付け直せず保全になる）。実体を手で消した detached の登録は `prunable-detached` として保全側に倒れる（「実体の無い登録と全体の prune」の段落）。実装が detach を忘れて fix が中止したときは、ホストが旧 worktree（ブランチ上）を `--expect-branch` つきで片づけ、次の実行で Recover が fix の worktree を引き取る。

**使用中ブランチの解放（Issue #755）**: 作業ブランチを握ったままの worktree が残ると（Implement が detach を実行しなかった・過去の中断状態など）、fix は先端を更新できず `commitFailed` になり、Recover も `detached: in-use` で確定できない。同一セッション内では lock の pid（セッションのプロセス）が常に生きているため、`worktree-remove.sh` は `retained-locked` で保持し、削除で解消することもできない。そこで `recover-prep.sh` は、握り手が次の条件をすべて満たすときだけ、握り手の HEAD を先端のコミットへ detached にして（握り手の git ディレクトリの `HEAD.lock` を排他作成した下で、HEAD の symref が対象ブランチのままか・先端と一致するかを確かめて rename で確定する。git の `update-ref --stdin` は同じ HEAD を `symref-verify` と更新の 1 トランザクションに入れられないため、git 自身の更新と同じロックで確認と書き込みの間の切り替えを排除する。files ref バックエンド以外・ロックが取れない場合は書かず保全。コミットも index・作業ツリーも動かない非破壊の操作）ブランチを解放する。(1) メイン worktree でも回復対象自身でもない、(2) lock の理由が Claude Code の worktree の形（`claude agent|session … (pid N)`。**lock の pid が終了済み、またはこのスクリプトの祖先プロセス = このランのセッションのときだけ**。稼働中の別セッションの worktree は clean な瞬間でも解放しない〔解放後のコミットがその detached HEAD に積まれるため〕。所有を確認できなければ保全）、(3) 汚れが無い、(4) HEAD が先端と一致する、(5) マージ等の途中でない、(6) ブランチ先端が付け直す HEAD の祖先または同一（分岐なら握り手にも触れない）。1 件でも資格の無い握り手（lock の無い利用者の worktree・手動の lock・汚れ・途中状態・メイン worktree）があれば何も書かず、従来どおり `detached: in-use` のまま保全する。解放された握り手は先端のコミットに detached で残り（失われるコミットは無い）、後始末は sweep と次ランの `worktree-remove.sh` が担う。解放に成功すると続けて通常の付け直し（上の Issue #731）へ進み `attached` になる。
ホストは最初の Review fix の前（`fixCount === 0` のときだけ）に、非隔離の機械的 agent（`free:#N`）で `recover-prep.sh --mode free` を 1 回実行して同じ解放を試みる。結果は助言的で、失敗・例外でも fix は起動する（握り手が残れば従来どおり `commitFailed` となり、次回の Recover が上の手順で回収する）。

**commitFailed 終端の報告（Issue #743）**: Review の fix が `commitFailed` で終わるとき、状態の書込みに失敗した場合は状態の worktree が旧のまま残り（fix コミットは新しい detached worktree にしかない）、旧 worktree の削除を確認できなかった場合（lock・未コミット変更・初期化済み submodule 等）はブランチが旧に checkout されたまま残る。どちらも警告ログと実行結果の失敗記録（reason）に「新・旧 worktree のパス・ブランチ・HEAD（fix の summary にあれば）」が出る（状態ファイルの note には入らない）。書込み失敗では旧 worktree の後始末も行われないため、書込み失敗と旧 worktree 保持は同時に起き得て、警告には両方が併記される。旧 worktree が保持されているとき（書込み失敗との併記を含む）は、状態の `worktree` を新パスへ書き換えて再実行してはならない（旧がブランチを使用中のため Recover が fix コミットを取り込めない）。先に旧 worktree を確認して `worktree-remove.sh` の確認つき経路で片づけ、そのうえで（書込み失敗なら状態の `worktree` を新パスへ直してから）同じ args で再実行する（Recover が新を引き取る）。

状態ファイルの `worktree` フィールドには実装エージェントが動作した worktree の絶対パスが記録される。Recover phase はこのフィールドと `git worktree list --porcelain` を使って残骸を特定する（`recover-prep.sh` が一覧との照合まで行う）。

### worktree の自動削除

**merged 確定時**に、状態ファイルの更新に続けて worktree を自動削除する。削除は `scripts/worktree-remove.sh remove --mode superseded` の 1 回の呼び出しで行い（squash merge 済みのため汚れていても `git worktree remove --force` で消す）、登録の確認・lock の扱い・汚れの確認・削除・`git worktree prune` を同じプロセスで行う。削除できた（または元から無い）ときだけ、状態ファイルの `worktree` フィールドを空文字に更新するため、残骸の有無を状態ファイルから判別できる。保持した worktree の記録は消さない。**lock は `claude agent … (pid N)` の形で pid のプロセスが無いときだけ外す**（生きている agent の worktree と手動の lock は外さず保持する）。submodule に未記録の変更がある worktree、メイン worktree、登録されていないパスも消さない。`rm -rf` へのフォールバックは持たず、消せなかったものは保持して報告し、次回ランのスイープか手動に任せる（非致命）。詳細は `./script-trust-model.md` の「第 7 弾」節。

**fix のたびに古い worktree は削除され、常に最新の 1 つだけが追跡される**。fix エージェントも `isolation: 'worktree'` で動作するため、fix のたびに新しい worktree が作成される。fix 完了後に旧 worktree を自動削除し、状態ファイルの `worktree` フィールドを新しいパスに更新する。これにより fix を複数回繰り返しても残骸 worktree が蓄積しない。

**review / pr-create の worktree は自動削除しない（記録のみ）**。成果物を保持しない（review は読み取り専用の判定のみ、pr-create は push 完了時点で成果が origin 上に存在する）ため保持価値はないが、削除に使えるのはエージェントが返した `worktreePath` だけで、これは「そのエージェント用に作られた」ことをホストが確認できない自己申告値である。`sanitizeWorktreePath` は文字種しか見ないため、誤応答やレビュー対象テキスト経由のプロンプトインジェクションで並列実装中の別イシューの worktree パスを返させると、未コミットの実装成果ごと失う。そのため返却パスの記録とラン終了時のログ一覧（返却値 `ephemeralWorktrees`）だけを行い、最終スイープ（`sweepClosedWorktrees`）の削除対象にも入らない（`updateState` の `cleanupWorktree` を経由しないため構造的に候補にならない）。残った worktree は一覧を見て手動で削除する。

**削除しない代わりに、残置総数の上限 + fail-closed 停止でディスク枯渇を防ぐ**。

- **件数軸**: ラン開始時に横断スキャン（`scanOrphanWorktrees`）で過去ラン分も含む物理総数（メイン worktree のみ除外。追跡済みも数える）を観測し、`maxResidualWorktrees`（既定 100・`0` で無効）を**超過**していたら新規イシューの着手を fail-closed で停止する（削除はしない。実行中イシューの継続は止めない）。停止時のレポートの残置パス一覧を `git worktree list` で確認し、不要なものを `git worktree remove` で手動削除してから再実行する。
- **観測失敗は停止側に倒す**: スキャン失敗（ゲート有効時）は `newStartSuppressed` で新規着手を停止する（返却値 `residualWorktrees.observed: false`）。一覧は LLM の転記なので、別エージェントが独立取得した総数（`countWorktreeRecords`）と件数照合し、不一致・取得失敗も観測失敗とする。不一致は最大 3 組まで取り直し、一致した組が得られないときだけ失敗とする（並行ランによる一時的な食い違いで止めないため。Issue #735）。
- **ラン中の積み増し**: 新規着手と monitoring 再開（`item.kind === 'implement'` のみ）の直前に毎回「開始時観測 + 本ラン積み増し（`ephemeralWorktrees.length`）+ 未到達分の予約」を上限と再評価する（予約起因は defer・実測超過は恒久停止）。予約は新規着手 1 件あたり `EPHEMERAL_RESERVE_PER_NEW_START`（現在 6 = implement 1 + review 3 + pr-create 1 + fix-routing-error 1。`EPHEMERAL_KIND_MAX` の合計）、monitoring 再開 1 件あたり `EPHEMERAL_RESERVE_PER_MONITORING_RESUME`（1）で、実記録数を差し引いて計上する。生成経路を足すときは `EPHEMERAL_KIND_MAX` への宣言が必須（未宣言 kind は警告）。fix は旧 worktree cleanup とのペアで純増しないが、旧が保持されたときは両方を台帳へ載せる（`./script-trust-model.md` の第 7 弾「既知の挙動」）。
- ラン終了時は残置総数と上限比率をレポートし、8 割接近で早期警告を出す（返却値 `residualWorktrees`）。

**バイト軸**: 件数軸の既定値は 1 リポジトリの実測（≈ 3.4 MB/件）に基づき、配布先ごとの消費差を捉えられないため、第 2 軸として `maxResidualWorktreeBytes`（既定 50 GiB）を併用する。判定は件数軸との OR で、残置パス全件へ `du -sk` を実行して合計する。測定不能（1 件でも失敗）は 0 で補わず観測失敗として fail-closed に倒す。

- 予約は件数軸と同形で、単位は `perWorktreeByteReserve`（1 worktree あたりのバイト floor）に未確定台帳件数を乗じた量（`projectResidualBytes`）。floor は `maxResidualWorktreeBytes / EPHEMERAL_RESERVE_PER_NEW_START` にクランプ済みで、メイン worktree の測定値が gitignored な成果物で過大になっても、残置 0 件の 1 件目が予約だけで恒久停止しない。
- 開始時観測の失敗（`residualBytesObserved === false`）は、新規着手は `newStartSuppressed` で当該ラン全体を恒久停止し、monitoring 再開は `monitoringResumeGateDeferred` で当該周回だけ defer する（2 つは独立した機構）。
- floor を超える実消費の成長は、`remeasureResidualBytesIfDue`（`BYTE_REMEASURE_LEDGER_INTERVAL` 件ごと）と、新規着手（implement）直前の `remeasureResidualBytesNow` が `du` を再実行して拾う。再測定の失敗は `newStartSuppressed` に倒す。
- 全件測定は成功し、空き容量ゲート専用の `rawPerWorktreeByteReserve` の更新用測定だけが失敗した場合は `lastByteRemeasureOutcome.reserveStale = true` を立てるだけで `failed` にしない。monitoring 再開の defer は `failed || exceeded || reserveStale` の OR で、当該周回限り（次回の更新成功で戻る）。

**実ディスク空き容量ゲート（`df` 実測）**: `df` の値は次の実測までキャッシュされるため、`projectFreeDiskReserveBytes` が実測時の台帳長（`freeDiskMeasuredAtLedgerCount`）と判定直前との差分を「未測定の増分」として必要バイト数へ足す。

**`worktreePath` の省略・空文字による台帳の未検証エントリ**（`path: ''`）は、実測失敗ではなく物理一覧フォールバックで回復する。1 件で測定を失敗させると verify-close を含む新規着手全体が恒久停止するためである。`buildPhysicalByteMeasureTargets` が `git worktree list --porcelain` の物理一覧（メイン worktree を除く全件・独立カウントとの件数照合付き）へ測定対象を差し替える。バイト軸は総消費の測定で帰属特定は要らず（review / pr-create / fix は detached で branch 照合できず、命名照合もホストが `runId` を得られず使えない）、一覧は並行ラン・手動 worktree を含んで過大側にしかずれない。得たパスは**測定専用**で削除経路（`sweepEligiblePaths`・cleanup・`git worktree remove`）には流さない。一覧取得不成立・件数不一致・`sanitizeWorktreePath` を通らないパスの混入でフォールバックが成立しないときだけ `newStartSuppressed` で停止する。4 エージェントスキーマ（`IMPL_SCHEMA` / `REVIEW_SCHEMA` / `PR_CREATE_SCHEMA` / `FIX_SCHEMA`）は `worktreePath` を `required` とし、省略自体を減らす。

検討して不採用とした自動削除の代替案:

| 案 | 不採用の理由 |
|----|------------|
| isolation ランタイムが発行した worktree ID / path との照合 | ランタイムは作成パスをホストへ返さず、照合材料が存在しない |
| 状態ファイル記録済みパスを保護する消極的レジストリ | 別イシューの Implement が `worktreePath` を返す前＝未登録の窓を塞げない |
| エージェント起動前後の `git worktree list` 差分 | 並列の worktree 作成と競合して一意に定まらず、誤削除に倒れる |
| ホスト発行 nonce をエージェントに cwd へマーカーとして書かせ、ラン終了時に照合して回収する | nonce は未信頼データを処理するエージェント自身へ開示されるため所持証明にならず、インジェクションを受けたエージェントが別の clean worktree に nonce を書けば、未登録の worktree を全ゲート通過で削除できてしまう。自動削除は復活させない |

**ラン終了時に worktree スイープを実行する**。書き込み失敗等で個別の削除経路が取りこぼした残骸を回収する最終防衛線で、クローズ（merged / closed）したイシューの実装 worktree（impl / fix）を残さない。使い捨て worktree（review / pr-create）は対象外で、ログ一覧から手動で掃除する。削除対象は**本ラン内で削除を試みたパスの集合**と、孤立 worktree スキャンでブランチ名一致・merged / closed 確定したものに限り、`git worktree list` に実在するものだけを削除する。「観測した全パスから保持リストを引く」方式（書き込み失敗した実装中の worktree が未コミット変更ごと消える）と、命名規約からのパス推測（並行ラン・手動の worktree を巻き込む）は採らない。観測がゼロなら何も消さない。failed / blocked / monitoring が記録した worktree は保持し、ブランチは削除しない（未 push のコミットを持ち得るため、寿命を worktree と切り離す）。結果は返却値 `sweptWorktrees`。削除候補への登録は削除エージェント呼び出しより**前**（`updateState` の `cleanupWorktree`）に行うので、状態の書き込みが失敗しても候補に残る。

**人手マージで自動 close した実装ノードの後始末（closed 後始末。Issue #632）**。既定の `autoMerge: false` で止まった PR を人手でマージすると `Closes #N` でイシューが自動 close し、再実行はそのノードを「すでに closed」で skip する。この skip は終了時 sweep の対象外のため、状態が `blocked` / `monitoring` で `worktree` と `pr`（無ければ `unverifiedPr`）を記録した実装ノード（`kind: implement`）に限り、skip の直後に次の順で後始末する。

1. PR を `pr-bind`（`checkPrBinding` と同じ結び付きの照合）で取得し、`state == MERGED` と `headRefOid`（40 桁）を確かめる。
2. `worktree-remove.sh remove --mode discard --path <worktree> --head <headRefOid>` で破棄する。discard なので汚れ・初期化済み submodule・lock は保持し `--force` を使わず、ブランチは消さない（ignore 対象だけが残る worktree は汚れに数えない）。`--head` は worktree の HEAD を読み、違えば `retained-head-mismatch`、一致でも detached なら `retained-detached` で保持する（`headRefOid` は自己申告で、detached 上の未 push のコミットは消すと失われる。squash マージは base との差分で未 push を見分けられないため、PR の head との一致を根拠にする）。
3. 削除できたとき（worktree が既に無い `not-registered` を含む）だけ、状態を `merged`（`pr` 確定・`unverifiedPr: 0`・`worktree: ""`）へ更新する。掃除を先に行うのは、保持された場合に `blocked` / `monitoring` のまま再試行の入口を残すため。

次のいずれかでは**status も worktree も触らず**ログと skip エントリの note に理由だけを残す: 未マージの CLOSED・結び付き不成立・`headRefOid` を取得できない・HEAD 不一致・detached・lock・汚れ・掃除の結果なし・dryRun・状態の内容照合不成立（`state-unverified` を含む）。命名規約外のブランチ名の PR（`unverifiedPr` だけの項目）も何も消さない。HEAD が PR の head と違う worktree（Update branch の後にマージした PR、別 worktree から fix を push した PR など）は保持されるので、中身を確認して手動で削除する。保持した worktree は残置の件数・バイトに数えるが、計上済み（開始時の観測・置換で引き継いだパス・台帳。`isWorktreeCounted`）のパスは `recordRetainedWorktree` が重ねて載せない。置換で引き継いだパスの保持は `noteSlotRetained` が覚えて返却の `retainedWorktrees` に出る。残置件数は同一ラン内で減らないので、上限の解除は次のランになる。後始末は best-effort で、ノードは完了扱いのまま。

**後始末の上限と再試行**。成立しない候補は状態が変わらず毎ラン再試行され、1 件あたり 2〜3 回（最大 6 回）のエージェント呼び出しを使うため、2 つの歯止めを設ける。

- (a) 1 ランで試みる候補は最大 10 件（`CLOSED_CLEANUP_PER_RUN_MAX`）で、**試行回数の少ない順**（未試行が先・同数はキュー順）に試す。一過性の結果（OPEN・fork・pr-bind の部分取得や失敗・`retained-locked`・`retained-unobservable` など）は記録されず、キュー順だと先頭 10 件が毎ラン枠を使い切って後ろが `defer-cap` のままになる。そのため試した候補の項目へ `closedCleanupAttempts: <整数>`（記録されずに終わった試行の回数。ランタイムに `Date.now()` が無いので時刻でなく回数）を書く（`status`・`worktree`・`pr` は書かず、書けなくても後始末は壊れない）。超過分と予算不足（残りが 6 + 20 回未満。着手し得る open の実装ノードが残るときはその 1 件分の 30 回も予約）の見送りは次のランへ回り、件数は結果の `closedCleanup`（`run` / `defer-cap` / `defer-budget`）に出る。
- (b) 決定的に成立しなかった候補は、項目に `closedCleanupTried: { pr, worktree, reason }` を書き、同じ `pr` と `worktree` の間は次のランから再試行しない（`closedCleanupAttempts` は順番を回すだけで、こちらが再試行そのものを止める）。`reason` は次の 3 値。
  - `binding`: pr-bind の 4 項目（`isCrossRepository` が false・`baseRefName` と `headRefName` が空でない・`closingIssues` に取得不能の `-1` がない）をすべて取得できたうえで結び付きが成立しないとき。部分取得は番兵を含み得るので記録しない。`isCrossRepository: true` は取得不能の既定値と本物の fork が区別できないので、fork も記録しない。
  - `not-merged`: 未マージの CLOSED。
  - `retained`: 掃除の結果行の `worktree` が `retained-dirty` / `retained-submodule` / `retained-head-mismatch` / `retained-detached` / `retained-broken` / `retained-unregistered` のとき。`retained-broken`（`.git` 破損・git の対象が worktree 自身でない）は読み直しても解消しない。`retained-head-mismatch` は unborn の HEAD への `--head` を、`retained-detached` は実体の無い detached・HEAD 0000… の登録を含む。一過性か区別できない失敗は、毎ランの pr-bind と掃除のやり直しで `defer-cap` が詰まるより安全なので記録側へ倒す。
- **記録しない一過性の失敗**: `retained-locked`（生きている lock。セッション終了で外れ得る）・`retained-unobservable`（`git status` の失敗など観測の失敗で、汚れや不一致を確認したわけではない）・PR の取得失敗・`headRefOid` の取得失敗・掃除の結果なし・非 0 終了・launcher の不一致（`run-verified.sh` の exit 3 / 4）・例外・OPEN の PR。記録は書かず、(a) の `closedCleanupAttempts` だけを増やして次のランで再試行する。

記録が今の `pr` と `worktree` に一致する間、その候補は次のランから飛ばされる（`pr-bind` も起動しない）。`status`・`worktree`・`pr` は書き換えないので、保持した worktree が sweep や孤立スキャンで消える経路は増えない。**記録が再試行を止める条件はファイルシステムではなく記録そのもの**で、人が worktree を直したり削除したりしても記録が残る限り再試行されない。再試行したいときは `_/issue-trees/<親>.json` の該当項目から `closedCleanupTried` を消す（`jq 'del(.items["<N>"].closedCleanupTried)'`。他の実行が走っていないときに行う）。`pr` か `worktree` が別の値に更新された項目（Recover で新しい worktree を作った場合など）は記録が古くなり、自動的に再び候補になる。

**実体の無い登録と全体の prune（Issue #641）**。人が worktree を手で消すと git の登録だけが残る。`worktree-remove.sh` の全体 `git worktree prune` は `safe_prune` の 1 か所だけで、実体の無い登録のうち detached または HEAD が 0000…（ブランチ ref が無く、登録がコミットの唯一の参照かもしれない）のものが 1 件でもあればスキップする（結果の `pruneSkipped`）。**そのような登録が残る間は、ほかの実体の無い登録も prune されず**、残置上限の件数軸（prunable も数える）に効き続ける。対象に結び付いた登録は prune に頼らず 1 件ずつ消す（`--branch` を持つ登録を `git worktree remove` で消してからブランチを消す。lock あり・detached・HEAD 0000… は消さず、`holder` に保持の語を出してブランチも残す。`--path` の結果は上書きしない）。prune は実際に何かを消したときだけ走る。登録は無いが実体のあるパスは、closed 後始末（`--head`）や Recover（`--expect-branch`）で `retained-unregistered` として保持し、merged にして追跡から外さない。

残りを手で片づける手順は次のとおり。コミットが要るなら先に救済 ref を作り、**ref ができたことを `git rev-parse --verify refs/heads/<救済名>` で確かめてから**、その登録を `git worktree remove -- <パス>`（lock があれば先に `git worktree unlock -- <パス>`）で消す。手動の全体 `git worktree prune` は使わない（未救済の登録も消えてコミットを失う。使うなら `git worktree list --porcelain` で実体の無い登録をすべて確かめ、detached・HEAD 0000… の登録がすべて救済不要か救済 ref 作成済みのときに限る）。救済 ref の sha の取り方は 2 通りある。

1. 通常の detached: `git worktree list --porcelain` の該当エントリの `HEAD` の sha を使い、`git branch <救済名> <sha>` で拾う。
2. HEAD が `0000…`: porcelain の sha はコミットを指さないので使えない。worktree 管理ディレクトリ（`$(git rev-parse --git-common-dir)/worktrees/<名前>`。`<名前>` は `ls` で探す）の HEAD の reflog から取る。`sha="$(tail -n 1 "$(git rev-parse --git-common-dir)/worktrees/<名前>/logs/HEAD" | awk '{print $2}')"` が最後に HEAD が指したコミット（各行は `旧sha 新sha …`）で、`git branch <救済名> "${sha}"` で拾う（`git log -g` はこの形で HEAD を解決できない）。reflog が無い・空のとき（`core.logAllRefUpdates=false` など）は救済できない。

git の auto-gc は `gc.worktreePruneExpire`（既定 3 か月）を過ぎた実体の無い登録を prune するので、登録による保全には時間の限りがある。

**孤立 worktree の自動検出（orphan scan）**。エージェントが worktree 作成後・`worktreePath` 返却前にクラッシュすると、パスがどこにも載らず checkout 済みの branch だけが残り、次回の checkout を失敗させ続けることがある。ラン開始時と終了時に `git worktree list --porcelain` を取得し、ブランチ名（`<type>/<issueNumber>-<short-name>`）の一致だけを根拠に実行キューの issue 番号と照合する（命名規約からの推測はしない）。開始時の一致は状態ファイルへ記録して Recover の対象にし、終了時の一致は、対応イシューが merged / closed 確定なら削除候補へ、それ以外（failed 等）は削除せず記録して次回 Recover に委ねる。

**中断・失敗後の残骸 worktree は、再実行時に Recover phase が自動処理する**。continue 判定の残骸は worktree を削除してから Implement で既存 branch を checkout し、discard 判定（空 worktree・方向違い等）は worktree と branch を削除する。ただし削除は continue / discard いずれの経路でも「Recover の `wipCommitted: true` 申告」と「ホスト側の読み取り専用エージェントによる未 commit 変更なしの実測」の**両方**を満たした場合にのみ実行する（Step 2 の削除ゲート参照）。満たせない場合は削除せず `failed` で保全し、次回ランの Recover に委ねる。手動で worktree を削除したり、削除確認に答えたりする必要はない。

**規約外ブランチで継続できず `blocked` にした後に、人が worktree を削除して再実行する場合**（Issue #637）。Recover が discard・`worktreeMissing`・保存済みと解決のブランチがどちらも空のときだけ、ホストが `worktree-remove.sh check-absent`（削除を一切しない）を 1 回呼ぶ。

- `absent`（登録も実体も無い）: 何も呼ばず、状態を `planning`（branch・worktree 空・`pr: 0`）にして新規 Plan へ進み、旧パスを後続の superseded 掃除へ渡さない。
- `prunable`（登録だけ残り、lock なし・ブランチ上）: planning の前に `worktree-remove.sh remove --mode discard --path <旧パス> --require-missing` を 1 回（`--branch` なし = ブランチ ref は残す）呼んで旧登録だけを片づける。`--require-missing` は確認と削除が別プロセスであることの TOCTOU（確認後にそのパスへ worktree が作り直される）を塞ぎ、削除の直前に同じプロセスで実在を読んで、実体があれば `retained-present`（登録が無いのに実体があれば `retained-unregistered`、有無を確かめられなければ `retained-unobservable`）で何も消さない。結果が `removed` でなくても planning へ進み、保持した旧パスは残置の台帳に載せ、ログに『実体が作り直された場合を含み、その実体は消していない』と残す（状態の `worktree` 記録は保持の間は消えず、最終スイープの候補にもならない）。
- 実体がある・detached や lock のある prunable・判定できない・結果なし: 何も削除せず `failed` で止まる。

このモードは prune をしない。パスは照合の前に正規化し（末尾の `/` と `/.`・連続する `/`・途中の `/./` を畳む。`..` は入力検証が拒否する）、大小だけが違う登録との一致は `unknown` で保全する。ホストはラン開始時に特定したメイン worktree を `--repo-root` で渡し、スクリプトが共通 git ディレクトリを照合する（違う・求められないときは `unknown`。別のリポジトリで実行されても `absent` に倒れない）。`prunable-detached`（HEAD が detached または `0000…`）が 1 件でもあれば `remove` と `sweep` の自動の全体 prune はスキップされるので、並列ランの別イシューの掃除では消えない。止まったときの手当ては語ごとに違う。

- `prunable-detached`: 先に救済 ref を作ってから登録を片づける（手順は「実体の無い登録と全体の prune」の段落。拾った後は対象を指定した `git worktree remove -- <パス>` で消し、全体の prune は使わない）。
- `prunable-locked`: 媒体が戻らないと確かめてから unlock する。unlock 後は HEAD がブランチ上なら lock なしの `prunable` として自動で進み、detached や `0000…` なら `prunable-detached` になって上の手当てが要る。
- `present` / `unregistered-present`: 実体を手で確かめて、削除または退避してから再実行する。

**failed / blocked の worktree のうち Recover が discard と判定しなかったものは削除しない**（デバッグ・手動再開用に残る）。不要になった場合は状態ファイルの `worktree` フィールドを参照して手動で削除する:

```bash
# 状態ファイルで worktree パスを確認
cat _/issue-trees/42.json | jq '.items | to_entries[] | select(.value.status == "failed") | {issue: .key, worktree: .value.worktree}'

# 手動削除
git worktree remove -- <worktree-path>
```

### 残置 worktree による容量予約の膨張と掃除（Issue #496）

**症状**: 実ディスク空き容量ゲートのログで、1 worktree あたりの予約が不自然に大きく（数十 GiB 単位）、未着手 leaf が一斉に `blocked` になる。実ディスクには十分な空きがあるのに新規着手が全件止まる場合、この症状を疑う。

**原因**: isolation worktree は `<main>/.claude/worktrees/<runId>-N` に、メイン worktree 配下として作られる。前ランの worktree が削除されずに残っていると、その中身（依存関係・ビルド成果物込みで 1 件あたり数〜十数 GiB）がメイン worktree の du に丸ごと含まれ、実際には無関係な二重計上になる（ネストした残置分は別途、残置バイト軸の測定でも個別に計上済みのため、実際の容量が計上から漏れることはない）。加えて、この膨張した見積りが「縮めない」方針の高水位フィールド（`.perWorktreeByteReserveHighWater`）へ永続化されると、worktree を手動で掃除しても次ラン以降に膨張値が引き継がれ続ける。

**自動是正**: 2 段構えで自動的に是正される。(1) メイン worktree の内容測定（`measureMainWorktreeContentBytes`）が、メイン worktree 配下にあるネストした linked worktree のパスを検出し、その分を差し引いてから見積りを確定する。(2) ラン開始時に、永続化済みの高水位が旧形式（`perWorktreeByteReserveHighWaterVersion` が現行版と不一致）なら無効化し、現行版でも実測との乖離が大きい（残置実測サンプルが十分にあり、かつ永続化値が直近の見積りを大きく超える）場合は 1 ランあたり最大半減までの段階的引き下げを行う。いずれも自動処理であり、手動リセットは通常不要。

**手動掃除の手順（自動是正では回復しない・実行中のランが無いことを確認してから行う）**:

```bash
# 1. 対象を確認する
git worktree list --porcelain

# 2. 削除前に、未 push のコミットや未コミットの変更が無いことを確認する
#    （worktree パスは前段の出力から。<path> を置き換える）
#    pr-create / fix の worktree は detached HEAD や upstream 未設定のブランチのことがあり、
#    `@{u}` は解決できず失敗する。`--not --remotes` はどちらでも動き、upstream に依存しない
git -C <path> status --porcelain
git -C <path> log HEAD --not --remotes --oneline || echo "確認失敗: 削除を中止し原因を調べる"

# 3. failed / blocked のイシューが保持する worktree でないことも確認する
#    （状態ファイルの worktree フィールドと突き合わせる）
cat _/issue-trees/<親イシュー番号>.json | jq '.items | to_entries[] | {issue: .key, worktree: .value.worktree}'

# 4. 手順 2 の出力が空、かつ確認コマンドが成功（終了コード 0）した場合のみ次へ進む。
#    出力が 1 行でもある、またはコマンド自体が失敗した場合は削除しない。
#    上記いずれの保持理由も無いと確認できたパスのみ削除する
git worktree remove --force -- <path>

# 5. 未登録の残骸が無いか確認する（git worktree list に載っていないものだけを対象にする）
du -sh <main>/.claude/worktrees
ls <main>/.claude/worktrees
```

**high-water のリセット**（自動是正が効かない・手動で強制的に 0 へ戻したい場合のみ。通常は不要）:

```bash
tmp=$(mktemp "_/issue-trees/<親イシュー番号>.json.XXXXXX")
jq '.perWorktreeByteReserveHighWater = 0 | .perWorktreeByteReserveHighWaterVersion = 2' \
  _/issue-trees/<親イシュー番号>.json > "$tmp" && mv "$tmp" _/issue-trees/<親イシュー番号>.json

# 確認
jq '{hw: .perWorktreeByteReserveHighWater, v: .perWorktreeByteReserveHighWaterVersion}' \
  _/issue-trees/<親イシュー番号>.json
```

**既知の制約**: パス表記の揺れ（シンボリックリンク経由の `/var` と `/private/var` 等）でメイン worktree のパスとネストしたパスの接頭辞が一致しない場合、その linked worktree は除外されず過大見積りのまま残る（安全側にしか倒れない）。

**注意点**: `git worktree remove --force` は未コミットの変更を破棄する。状態ファイルの `.items` フィールドは手動編集の対象にしない（high-water 系のフィールドのみを触る）。

### 実装エージェントによる既存 PR・リモートブランチの再利用

実装エージェントは着手時に以下の順で回復手順（手順 0b）を実行する。

**0b-a（open PR 検索）**: `gh pr list --state open` でイシュー番号に対応する open PR が既に存在しないかを確認する。既存 PR が見つかった場合は新規 PR を作らず、そのブランチを取得して続きから作業し、そのブランチ名を branch として返す（実装フェーズの `prNumber` はホスト側で常に 0 として扱われるため PR 番号は返さない）。PR 番号の再利用は PR Create フェーズが担い、同じブランチに対する open PR を `gh pr list --state open --head <branch>` で再検出し、base ブランチと head sha の一致を検証したうえでその番号を `prNumber` として返す（検証の詳細は Step 5.5 参照）。これにより中断再開時や monitoring フォールバック時に重複 PR の作成も `gh pr create` の失敗も起きない。

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

### opt-in テスト記録不足による blocked からの復旧（Issue #495 → PR #503 3 巡目で HEAD sha 束縛）

イシュー本文で opt-in テストを宣言している場合、マージ前ゲートが PR 本文の pass 記録不足を理由に
`blocked`（`blockedReason: quality`）で停止することがある（新規マージ経路のみ。回復専用経路では
このゲートは起動しない）。終端理由には不足しているコマンド一覧が記録される。

マーカー行は **現在の HEAD sha に束縛された記録だけがカウントされる**（`<!-- optin-test-record:
<40 桁 sha> <pass|fail|not-run> <コマンド> -->`）。base 取り込み・別の push で HEAD が変わった
後は、それより前に書かれた記録（古い sha のもの）は自動的に「存在しないもの」として扱われる
ため、**PR 本文を書き換えるときは必ず現在の HEAD の sha で書く**。古い sha のまま `pass` へ
書き換えても、マージ前ゲートの grep はどの行にも一致せず不合格のまま停止する。

復旧手順:

1. 対象 PR のブランチを手元で checkout し、終端理由に挙げられたコマンドを実際に実行する。
2. `git rev-parse HEAD` で現在の HEAD sha（PR の `headRefOid` と同一のはず。`gh pr view <N>
   --json headRefOid` で突き合わせて確認するとよい）を控える。
3. PR 本文の「## opt-in テスト実行記録」節にある該当マーカー行を、手順 2 の sha と実行結果に
   合わせて `<!-- optin-test-record: <手順 2 の sha> pass <コマンド> -->` へ書き換える
   （直上の人間可読行 `- opt-in テスト結果: <コマンド> => <result>` も合わせて pass へ直す。
   `gh pr edit <N> --body-file` 等で更新する。書式は SKILL.md「opt-in テストの宣言」節参照。
   古い sha のマーカー行は残っていても実害はない — 現在の HEAD と一致しないため無視されるだけ
   だが、本文の可読性のため削除してもよい）。
4. 同じ `args` で再実行する（`monitoring` 再開から継続し、マージ前ゲートが更新済みの pass 記録を
   確認して継続する）。

**PR 本文の更新だけでは不十分な場合**: 終端理由が「post-push fix の
実測」に基づく不合格（状態ファイルの当該イシューエントリに `optinFixState.attempted: true` があり
`runs` に非 pass が残っている、または `unbound: true` の場合。これを **latch** と呼ぶ）は、
`combineOptinRecordGate` が状態ファイルの永続化済み実測を PR 本文の pass マーカーより優先する。
ただしこれは `optinFixState.headSha` が現在の HEAD の headRefOid と**一致する場合、または
`unbound: true` の場合のみ**働く。

**latch は設計上意図した fail-closed であり、手順 1〜4（PR 本文の書き換え）や再実行だけでは
解除されない。**
ホストは fix エージェントの自己申告テスト実行を直接観測できないため、latch を自己申告のみで
自動解除する経路は用意していない（SHA 一致は実行の証明にならないため。詳細は `automerge-design.md`「opt-in 記録 latch は
fail-closed で停止する」節を参照）。latch が原因で `blocked` のまま止まっている場合の解消方法は
次の 2 つに限られる:

1. **宣言テストが実際に pass する新しいコミットを push する。** Merge ループの post-push fix が
   宣言済み opt-in テストを再実行して pass し、push が成立すれば、新 HEAD の sha に束縛された
   pass 記録へ `optinFixState` が自動的に置き換わり、latch は新 HEAD で解消する（既存経路。
   人間の介入は「テストを実際に pass させて push する」ことのみで、状態ファイルの編集は不要）。
2. **人間が内容を確認したうえで GitHub 上で手動マージする。** 手動マージ後に同じ args で
   再実行すると、次回実行は opt-in ゲートより前の独立確認によりマージ済みを検出し、opt-in
   ゲートで再度 `blocked` にはならず、イシュークローズ確認まで自動的に完了する（Issue #509）。

**状態ファイルの `optinFixState` を削除する・`attempted: false` へ書き換える等で latch を
迂回する手順は存在しない（意図的に用意していない。安全弁の迂回になるため）。** `headSha` が
現在の HEAD と一致しない（base 取り込み等で HEAD がさらに進んだ・latch ではない通常の陳腐化）
場合はこの実測は無視されるため、latch には該当せず手順 1〜4 のみで解消する。

宣言そのものが `args.optinTestCommands`（承認一覧）に無いか許可形式外（
先頭トークンが許可ランナー外・シェルメタ文字を含む等）で `blocked` になった場合は、実装は
一切起動していない。イシュー本文の `<!-- optin-tests: ... -->` マーカーを `args.optinTestCommands`
のいずれかと正規化後に文字列完全一致する値へ修正するか、`args.optinTestCommands` へ当該
コマンドを追加してから同じ `args` で再実行する（SKILL.md「opt-in テストの宣言」節参照）。
`args.optinTestCommands` の要素自体が許可形式外の場合はラン起動時にエラーで停止するため
（実装は起動しない）、`args.optinTestCommands` の当該要素を修正してから再実行する。

### 状態ファイルについて

- パス: `_/issue-trees/<親イシュー番号>.json`（メインリポルート相対）
- `_/` は git 管理外のローカルディレクトリ（`.gitignore` 対象）であり、状態ファイルは git にコミットされない
- 同一セッション内での再開は Workflow ツールの `resumeFromRunId` パラメータも利用できる（Workflow ツールが journal から自動再開する）
- サンプル: `skills/implement-issue-tree/sample/state-example.json` を参照

