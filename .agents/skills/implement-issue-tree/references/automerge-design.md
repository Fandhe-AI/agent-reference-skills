# 自動マージのサーバー側委譲とクライアント側自動マージの設計 / branch protection

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

### 自動マージのサーバー側委譲と merge-guard hook（deny 専用・best-effort）

**クライアント側の自動マージは `autoMerge: true` + `externalChecks` 確定（全 App の信頼済み context 宣言込み）の opt-in ランでのみ実行する**（次節「クライアント側自動マージの設計」参照。opt-out 既定ではマージしない。auto-merge の予約（arm）は提供しない）。以下は hook ベースのマージ認可とクライアント側 arm を採らない理由である（opt-in のマージは monitor 出力のマージ経路からの分離と G0 サーバー側強制の実測で成立させる。次節参照）。「host が発行する grant（正規マージコマンド全文 = `expectedCommand`）を hook が完全一致で照合する allow 経路」では「未承認マージを許可しない証明可能な境界」を作れない。この基盤は `agent()` 単位のツール allowlist・credential 分離を提供せず、**未信頼のレビュー本文を読む monitor エージェントも merge-exec と同じ Bash・`gh` 認証・FS を共有する**。monitor は Bash を持ち通常のファイル作成も hook を通るため、`gh pr view` で HEAD を取得 → 任意 nonce で `grant-<pr>.json` を自作 → その `expectedCommand` を実行できる（**grant 偽造**）。この基盤には hook 専用の秘密注入経路がなく（`settings.json` の env はセッション全体 = subagent の Bash 含めて共有）、**hook が検証でき subagent が読めない鍵を持てない**ため、署名 / MAC による偽造防止も実装不能。よって偽造不能なマージ認可を hook で検証することは原理的に不可能である。

「agent ベースの precheck（autoMergeArmable）+ hook の `gh pr merge <n> --auto --squash` carve-out + 専用 arm エージェント」によるクライアント側 arm も、次の 3 点の欠陥があるため**採らない**:

1. **carve-out の認可欠陥**: hook の carve-out はランの `autoMerge` 設定・precheck 結果・agent の役割と一切結び付かず、共有 `gh` 認証を持つ**任意の subagent に任意 PR の arm を許可**してしまう。プロンプトインジェクションを受けた monitor 等が `autoMerge: false` の opt-out ランでも arm できる。
2. **precheck の自己申告**: `autoMergeArmable` は agent の構造化出力を認可根拠にしており、誤認・捏造で全フィールドが安全側の値になり得る。この基盤は host が `gh` を直接実行できないため、ホスト決定的コードによる実測はそもそも実装不可能。
3. **「予約のみ」前提の虚偽**: `gh pr merge --auto` は対象 PR が既に全要件を満たしていれば**即時マージ**する。「予約のみで即時マージしない」という hook コメント・arm プロンプトの前提は成立しない。

いずれも「権限分離できない基盤では、境界を実装できるまで自動マージを無効化する」という原則へ立ち返る根拠である。したがって:

- **クライアント側の自動マージは opt-in（`autoMerge: true` + `externalChecks` 確定 + 全 App の信頼済み required check context 宣言（`{"app", "context"}` の組。slug のみの旧形式は fail-closed））でのみ実行**: opt-out（既定）では新規マージ経路を開かない（recoveryOnly 機構により `ready` 到達時は回復専用経路へ固定。merge-exec は `gh pr merge` を出力しない）。opt-in 判定はホストの決定的コード（args パース）のみ。opt-in の実マージは「monitor 出力のマージ経路からの分離 + G0 サーバー側強制の実測」を前提とする（次節「クライアント側自動マージの設計」参照）。
- **grant / canary / branch-protection ランタイムゲート・precheck / arm / hook carve-out は用意しない**（grant と precheck 出力は偽造可能で allow の根拠にならず、carve-out は認可と結び付かない全 subagent への開放になる）。opt-in ランでもこれらは使わない。
- **merge-guard hook は deny 専用**（下記）。**承認境界ではなく、迂回可能な best-effort の攻撃面削減**にすぎない。hook を導入したリポでは subagent の `gh pr merge` が deny されるため、opt-in のクライアント側マージと hook は併用できない。
- opt-out ランの PR はマージ可能状態の `blocked` で停止し、マージは **GitHub 上で人間が行う**か、下記の**サーバー側 auto-merge workflow** が行う。

### クライアント側自動マージの設計（重要）

opt-in ランのクライアント側マージは、未信頼のレビュー本文を読む monitor の虚偽出力による未承認マージ誘導に対して次の 3 層で対処する:

1. **monitor 出力のマージ経路からの完全分離**: monitor が返す `ready` / `headSha` はマージ経路の入力に一切使われない。`ready` は merge-exec をいつ起動するかというタイミングにのみ影響し（虚偽 `ready` の効果は merge-exec の空振り 1 回に限られる）、`headSha` は診断用の記録にすぎない。merge-exec のプロンプトに渡るのはホスト導出の boolean（allowMerge）と args 由来の検証済み値のみである。
2. **merge-exec の自己取得再検証**: マージ判定に使う HEAD sha・チェック状態別件数・未解決スレッド件数・外部チェック起動は、未信頼テキスト（レビュー本文・Issue 本文・チェック名）を一切読まない merge-exec が `gh` の enum / 件数出力から自ら取得する。マージは自己取得 sha による `--match-head-commit` 付き squash merge のみ（照合とマージの間の push 競合や誤った sha の代入はサーバー側で拒否される）。
3. **G0 ゲート = サーバー側強制の実測**: merge-exec はマージ実行前に、ベースブランチのサーバー側強制を件数・真偽値のみの API 出力で実測確認し、確認できなければ `server-enforcement-missing` で辞退して `blocked` 終端する（fail-closed）。確認対象は (a) required status checks が 1 件以上、(b) その bypass 不能性 —「全適用 ruleset の `bypass_actors` が空（org 継承 ruleset はこの認証で bypass 検証を保証できないため辞退し、サーバー側 workflow へ委譲）」（存在確認だけでは bypass actor に登録された主体（マージ実行主体を含み得る）が保護を迂回できる）— classic branch protection のみのリポジトリは**クライアント側自動マージ非対応**として `classic-unsupported` で辞退する（classic の bypass 不能性 — `enforce_admins`・bypass allowance・マージ実行主体のロール・カスタムリポジトリロールの「Bypass branch protections」権限 — は write 権限の実行トークンから決定的に証明できず、検証に必要な `branches/<branch>/protection` 系エンドポイントの読取自体が admin（Administration read）権限を要求する。admin 主体を許すと bypass 不能を証明できないため、classic 経路に検証可能な通過条件は存在しない。ruleset ベースの branch protection（`bypass_actors` 空 + context 束縛が read 権限で検証可能）への移行、またはサーバー側 workflow への委譲で対応する）—、(c) **レビュースレッド解消の必須化**（`required_review_thread_resolution`）、(d) **外部チェック App を確定した構成では、args.externalChecks で宣言した信頼済み check context と App ID の組（`context` + `integration_id`）の完全一致で束縛された required status check の存在**（context 名単独は同名偽装が可能で認可根拠にならず、App ID 単独は同一 App が生成する対象レビュー用チェックとは別の無関係な context の required 化でも通過してしまうため、組の完全一致のみを合格とする — サーバー側 workflow の G6 と同型）、(e) — **欠番。`strict_required_status_checks_policy` は G0 の確認対象に含めない**（後述の「strict を G0 の要件にしない理由」節。strict は鮮度制御であって bypass 不能性の制御ではなく、並列ランを構造的に止めるため要件に含めない）、(f) **クライアント側（手順 3）で合格判定の対象になる全チェック context の required 化**（HEAD sha 上の check-run / commit status のうち required status checks に含まれない context の件数を jq の集合差で照合し、1 件でもあれば辞退する。context 文字列自体はコンテキストへ入れず件数のみを読む。required でない client-only チェックは失敗していてもサーバー側のマージ条件にならず、共有 `gh` 認証を持つ別エージェントの直接マージで迂回できるため）、(g) **required status checks 全エントリの発行元束縛**（ruleset 宣言の `integration_id` が数値であり、HEAD sha 上に `integration_id` と一致する App 発行（`.app.id`）の check-run が required context ごとに存在することを jq の件数照合で確認する。`integration_id` が null・欠落の required check は任意の発行元で条件を満たせるため、共有 `gh` 認証を持つ別エージェントが required context と同名の成功 commit status を HEAD に作成すると required condition 自体を偽装して直接マージできるため。commit status は発行元 App 束縛を持たないため合格根拠にせず、束縛を証明できなければ `issuer-unbound` で辞退する。復旧は required checks を GitHub App 発行の check-run に統一し ruleset へ `integration_id` を設定する）。(c)(d)(f)(g) により、クライアント側でゲートする条件（未解決スレッド 0 件・外部チェック合格・CI 全 green の判定対象全件）はサーバー側でも強制される。**マージ可否の実強制は GitHub の branch protection であり**、この実行基盤はエージェント単位の認証分離を提供しない（プロンプト指示は権限制御にならない）ため、未信頼テキストを読む monitor を含む**どのエージェントが共有 `gh` 認証で直接 `gh pr merge` を試みても、G0 が確認した同条件をサーバーが強制して拒否する** — 共有認証は追加のマージ能力を生まない。サーバー側で強制されない残余操作のうちレビュースレッドの resolve は、Merge ループの fix エージェント（push する版）だけが (a) 修正 push 成功後に自分が修正対応したスレッド（monitor の構造化出力由来・host 側 sanitizeThreadId 検証済みの threadId に限る）、(b) push なしラウンドはホストが決定的に算出した許可リストのみを `resolveReviewThread` mutation で解決する形で自動化されている（fix 以外の全経路での resolve は禁止。fix が自分でスレッド一覧を再取得して resolve 対象を広げることは禁止）。(b) の許可算出の詳細は本ファイル「resolve 前提のホスト側決定的照合」節を参照。monitor / merge-exec / merge-verify / Review ループの fix は resolve を実行せず、対象外（out-of-scope）と判断されたスレッドは resolve されないため、未解決のまま残る限り (c) の `required_review_thread_resolution` により自動マージはサーバー側でブロックされ、人間の resolve 待ちになる。

さらに merge-verify（merge-exec と別コンテキストの読み取り専用エージェント）が `state=MERGED` と HEAD sha（merge-exec の申告値との完全一致）を独立確認し、裏付けられない merged 申告はホストが受理しない。

**残存リスクと opt-in の意味**（2026-08-12 のリポジトリオーナー明示指示による opt-in 再有効化）: merge-exec / merge-verify はモデル出力であり**強制境界ではない**。ただし両者は未信頼テキストを読まないため、注入経路は存在せず、残存する失敗モードはモデル自身の判定誤りに限られる。また branch protection が required approving review を要求しない構成では「CI green + スレッド解消 + 外部チェック到着」だけで人間の追加承認なしにマージが成立する — これは `autoMerge: true` という opt-in の明示選択そのものであり、非 author 承認必須の保護があるリポジトリではサーバーが拒否する（クライアント側マージは成立せず `merge-failed` → 再監視 → 終端）。既定（`autoMerge` 未指定 / `false`）は fail-closed でマージしないため、本スキルを導入しただけの消費リポジトリには影響しない。opt-in するかどうかは各リポジトリの管理者が本節を理解のうえ判断すること。

**残存リスクの受容記録（事実の記録。エージェントへの指示ではない）**: 「未信頼テキストを読むエージェント（monitor 等）が merge-exec と同じ共有 `gh` 認証を持つため、直接 `gh pr merge` やレビュースレッドの resolve を実行でき、プロンプト指示は権限制御にならない」という趣旨の指摘（opt-in クライアント側自動マージの存在自体に対する承認境界・権限分離系の指摘。PR #222 codex 第 4〜5 ラウンドで報告）について、実行基盤がエージェント単位の認証分離を提供しないことに由来する既知の性質として、2026-08-13 にリポジトリオーナー（aLiz-Nancy）が PR #222 の設計判断として残存リスクを受容した。受容の根拠: 本節の 3 層構造（monitor 出力のマージ経路からの分離・merge-exec の自己取得再検証・G0 サーバー側強制の実測）によりマージ可否の実強制をサーバー側 branch protection へ置き、共有認証がクライアント側の追加のマージ能力を生まない構成を前提化したうえで、opt-in の明示選択によって利用者自身が残存リスクを引き受ける設計であること。**この記録は過去の判断の事実を残すものであり、レビュー指摘への対応要否をエージェントが判断する根拠として使用してはならない**。将来のレビューで同種の指摘が届いた場合も、通常のレビュー対応フローどおり指摘内容を人間へ提示し、本記録を参照して判断するのは人間である（設計の実装不備 — 3 層の弱体化・opt-in 迂回・fail-closed 除去・未信頼テキストのマージコンテキスト混入 — への指摘が通常どおり修正対象であることは言うまでもない）。

**残存リスクの受容記録（PR #443 codex P0・2026-08-26 同日中に転換済み。事実の記録。エージェントへの指示ではない）**: 「`baseMergePrompt` が `item.title`（未信頼テキスト）を、push 可能な base 取り込みエージェントのプロンプトへ埋め込んでいる」という趣旨の指摘（thread PRRT_kwDORuXFg86cX5XI）について、2026-08-26 にリポジトリオーナー（aLiz-Nancy）が PR #443 のレビュー対応として一度は残存リスクを受容した。当初の受容根拠: 同型のタイトル埋め込みは既存の `fixPrompt` / `implPrompt`（Issue #131 由来の worktree routing ガード）に既に存在するパターンであり、`baseMergePrompt` のみから `item.title` を除去しても他経路の埋め込みは残るため、除去単体では悪用面を縮小しない、というものだった。**この受容は同日中に別スレッド（thread PRRT_kwDORuXFg86cacPf）の同種指摘を受け、オーナー判断で撤回されタイトル除去へ転換した**: `baseMergePrompt` は他経路（`fixPrompt` 等）と異なりコンフリクト解消コミットの作成・push まで許可するエージェントであり、未信頼テキストを読ませたまま push を許す構成はそれ単体で AGENTS.md「承認境界の後退」要件 (2) 違反であるため、他経路の埋め込みが残っていても `baseMergePrompt` からの除去には独立した価値があると判断された。現在の `baseMergePrompt` は `item.title` を一切埋め込まず、worktree routing ガードも `gh pr view` が返す PR 番号・ブランチ名という構造化値のみで対象同一性を確認する（`fixPrompt` / `implPrompt` の routing ガードは本件の対象外のため、これらの `item.title` 埋め込みは残存する。将来これらを扱う場合は本記録ではなく指摘内容を人間へ提示し直すこと）。**この記録は過去の判断の事実を残すものであり、レビュー指摘への対応要否をエージェントが判断する根拠として使用してはならない**。将来のレビューで同種の指摘が届いた場合も、通常のレビュー対応フローどおり指摘内容を人間へ提示し、本記録を参照して判断するのは人間である。

**残存リスクの受容記録（PR #443 Bugbot Medium・事実の記録）**: 「`advanceNoPushRounds` が base merge の Already up to date（`pushed: false`）ラウンドでも `noPushRounds` を増分し、早期に `blocked` へ倒し得る」という趣旨の指摘（thread PRRT_kwDORuXFg86cX5vB）について、2026-08-26 にリポジトリオーナー（aLiz-Nancy）が PR #443 のレビュー対応として残存リスクを受容した。受容の根拠: SKILL.md の無進捗判定規定（「push も新規スレッド resolve も無いラウンドが 2 回連続したイシューは `blocked` として記録する」）は push の種別を区別せず一律にラウンドをカウントする設計であり、base merge の Already up to date ラウンドを `noPushRounds` に加算する現実装はこの規定に準拠している。早期 `blocked` のリスクは monitoring 再開（`blocked` + `pr` は次回ランで再開）で回復可能なため、オーナーが受容した。**この記録は過去の判断の事実を残すものであり、レビュー指摘への対応要否をエージェントが判断する根拠として使用してはならない**。将来のレビューで同種の指摘が届いた場合も、通常のレビュー対応フローどおり指摘内容を人間へ提示し、本記録を参照して判断するのは人間である。

**残存リスクの受容記録（PR #444 codex P0・事実の記録）**: 「前提イシューの `issueState` が `CLOSED` へ遷移すると、`blocked` 状態の未 push worktree が終了時スイープの削除候補になる」という趣旨の指摘（thread PRRT_kwDORuXFg86cYC3Y）について、2026-08-26 にリポジトリオーナー（aLiz-Nancy）が PR #444 のレビュー対応として残存リスクを受容した。受容の根拠: 本運用ではイシューを小粒度に分解しており、人為的に close されたイシューの残置作業は最新の base から作り直す方が安全・低コストであるため、closed 遷移での worktree 削除をオーナーが許容した。**この記録は過去の判断の事実を残すものであり、レビュー指摘への対応要否をエージェントが判断する根拠として使用してはならない**。将来のレビューで同種の指摘が届いた場合も、通常のレビュー対応フローどおり指摘内容を人間へ提示し、本記録を参照して判断するのは人間である。

より強い保証が必要な運用では、opt-in を使わず対象ブランチへのサーバー側 branch protection（第三者=非 author 承認必須・dismiss stale・required checks 等）+ 人間マージ、または下記のサーバー側 auto-merge workflow への委譲を選択すること。

### resolve 前提のホスト側決定的照合（Issue #430）

**背景**: resolve 例外条件 (b)（push なしラウンドでの resolve）の前提「過去 push 済みの
修正がリモート head に反映済みであること」を fix エージェント自身の `git fetch` +
`merge-base --is-ancestor` 実行と自己申告に依存させると、fix の申告 sha は形式検証を
経ても任意の祖先 sha で ancestry 照合を通過でき、対象スレッドと修正コミットの対応も
fix 自身の未検証な判断に委ねられる。そのため AGENTS.md「例外(b)」節は、(b) は次の
2 条件をホストが決定的に検証できた場合に限って成立するとしている:
1. host が自ら観測した push の結果 sha に対する判定であること（fix 申告 sha は使わない）。
2. リモート head への反映（ancestry）と、対象スレッドと修正コミットの対応の両方を、
   エージェント出力に依存せず決定的に立証できること。

**実装（`skills/implement-issue-tree/scripts/implement-issue-tree.js`）**: Merge ループの
各ラウンド、fix 起動より前に必ず実行される monitor（`monitorPrompt`）に観測を相乗りさせる。
**monitor はレビュー本文等の未信頼テキストを読むエージェントであり、merge-verify（未信頼
テキストを一切読まない）とは異なる**——本来はこの観測専用に merge-verify と同型の未信頼
テキスト不読エージェントを新設するのが強い設計だが、`implement-issue-tree.js` のバイト
予算（後述）の制約により見送り、既存の monitor 呼び出しへ相乗りさせている（残存リスクは
本節末尾で述べる）。host へ渡らせる値は次の狭い形のみに限定し、
自由文フィールドは持たせない:

| 観測値 | 内容 |
|---|---|
| `headSha` | `gh pr view --json headRefOid`（既存の診断用フィールド。手順 1 で毎ラウンド取得） |
| `compareStatus` | ホストが渡した前回観測 sha（`prevSha`）から今回 `headSha` までの `gh api repos/{owner}/{repo}/compare/<prevSha>...<headSha>` の `.status`（`identical` / `ahead` / `behind` / `diverged`）。`prevSha` が空なら省略、取得失敗時は `unknown` |
| `changedFiles` | 同じ compare の `.files[].filename`（上限 200 件） |
| `path`（`unresolvedComments` の各要素） | GraphQL `reviewThreads` の `path` フィールド（手順 5 の走査に相乗り） |

ホストは純粋関数でこの観測値から決定的に許可リストを算出する（`skills/implement-issue-tree/tests/resolve-host-proof.test.mjs` が契約を固定）:

- **`applyResolveProofObservation(proofState, obs, lastRoundPushed)`**: 直前ラウンドの
  `fix.pushed` が `true` で、かつ今回の `compareStatus` が `ahead` のときだけ「push がリモートに
  実在した」と認定し、`proofState.pushHead` を今回 `headSha` へ進め、`changedFiles`（
  `sanitizeRepoRelPath` 通過分のみ・上限 200）を `proofState.files` へ合算する。`identical` は
  push 申告はあっても前進していないため `pushHead` を据え置き、`behind` / `diverged`（
  force-push 等の履歴書き換え）・`unknown`（取得不能）・`headSha` 形式不正は `proofState` を
  `{ head, pushHead: '', files: [] }` へ全体リセットする（fail-closed。誤って (b) の許可を
  広げるより機会損失を選ぶ）。fix の申告 sha は一切参照しない。
- **`computePermittedNoPushResolveIds(proofState, unresolvedComments)`**: `proofState.pushHead`
  が未確立なら常に空配列を返す。確立していれば、`unresolvedComments` のうち `path` が
  `proofState.files` に含まれるスレッドの `threadId` のみを返す（path 一致による上界判定）。
- **`sanitizeRepoRelPath`**: 先頭 `/`・`..`・制御文字を拒否する repo 相対パス検証（GraphQL
  `path` 由来の値を `changedFiles` 突き合わせに使う前に通す）。

`resolveProof`（`{ head, pushHead, files }`）は **プロセス内限定**で保持し、状態ファイルへは
永続化しない。resume 直後は必ず空から再測定するため、resume 直後の 1 ラウンドは (b) が
不成立になり得るが、これは `lastRoundPushed` の resume 時初期値 `false` と同じ fail-closed
方針であり、cross-resume の状態不整合を構造的に排除する（何が壊れうるかを検証する対象自体を
無くす）。

**fix プロンプトへの伝達**: `fixPrompt` の手順 5 は (a) push 成功時は「自分が修正対応した
スレッド」を resolve、(b) push なしラウンドは **ホストが渡した許可リスト
（`permittedNoPushResolveIds`）のみ** resolve可（空なら resolve 禁止）と明記する。fix 自身の
`git fetch` + `merge-base --is-ancestor` による確認・ファイル内容の反映確認による代替経路は
指示しない（自前確認による対象拡大の禁止を明記）。

**受理側フィルタ**: `runMergeLoop` は `pushed: false` ラウンドで fix が申告した
`resolvedThreadIds` を、その時点の `permittedNoPushResolveIds` との積のみ「検証済み resolve」
として `countNewlyResolvedThreads`（noPushRounds 進捗計上）・`resolvedThreadsLogLine`（成功
ログ）へ渡す。リスト外の申告は警告ログのみに留め、進捗計上・成功記録から除外する（fix が
プロンプト指示を守らずリスト外を申告しても、host 側の記録・判定は汚染されない）。

**(b) 経路の恒久無効化（2026-08-21）**:

観測エージェント（monitor）が未信頼テキストを読む点は上述のとおりで、注入されたレビュー
本文の影響を受けた monitor が虚偽の `compareStatus: ahead` と都合の良い `changedFiles` を
返せば、ホストはそれをそのまま実測値として信用し許可対象が広がり得る（`sanitizeSha` /
enum / `sanitizeRepoRelPath` はいずれも「値の形式」しか検証せず「値の真偽」は検証しない）。
`lastRoundPushed`・境界 (c)（許可判定は monitor 自身が返す未解決一覧に限定）・fix 自身の
「修正対応した」という判断・次周回 monitor の独立再検出という多重防御だけでは、host が
`gh api compare` を自ら実行して裏取りできない（Workflow ランタイムに直接シェル実行手段が
ない）という構造的制約を埋め合わせられないと判断し、**`computePermittedNoPushResolveIds`
は proofState の内容に関わらず常に空リストを返す**（fail-closed）。(b) 経路
（push なしラウンドでの resolve）は現在**恒久的に不成立**であり、resolve が成立するのは
(a)（当該ラウンドの push が成功した場合の自己修正スレッド resolve）のみである。
`applyResolveProofObservation` による状態遷移（`resolveProof.pushHead` / `files` の算出）
自体は維持しているが、その出力は `computePermittedNoPushResolveIds` で使われないため
実質的に不使用である。未信頼テキストを一切読まない専用の proof エージェント
（merge-verify と同型の新設）が本来の強い設計だが、`implement-issue-tree.js` のバイト
予算制約により見送りが継続しており、follow-up 課題として残る。

**旧残存リスク（(b) 恒久無効化により現在は非該当。設計判断の記録として残す）**:

- path 一致は「そのファイルを変更した push があった」ことの上界であり「その変更が当該
  指摘を実際に修正した」ことの証明ではない（`変更した ≠ 修正した`）。上記 (2)(3)(4) が
  同様に補う。
- 観測間（monitor 呼び出しの間）に第三者が push すると `ahead` 連鎖が壊れず誤って files
  集合が広がり得るが、これは単一 writer（本ワークフロー）が対象ブランチを専有する運用を
  前提とした残存リスクであり、path 対応それ自体を無効化するものではない。

**auto-merge のサーバー側委譲（upstream の `docs/implement-issue-tree/auto-merge-sample.yml`）**: auto-merge のサンプル workflow は**意図的に vendored 配布しない**（skills/ 配下ではなく upstream（Fandhe-AI/agent-cli-skills）の `docs/implement-issue-tree/auto-merge-sample.yml` に置かれ、`npx skills add` で消費リポジトリへ自動コピーされない）。各リポジトリの runner 方針・信頼 author・opt-in variable は相反し得るため（public は GitHub ホステッド必須 / private は self-hosted 必須 等）、導入する場合は upstream（Fandhe-AI/agent-cli-skills）の `https://github.com/Fandhe-AI/agent-cli-skills/blob/main/docs/implement-issue-tree/auto-merge-sample.yml` を参照し、自リポジトリの方針に合わせて runner（`AUTOMERGE_RUNNER`）・信頼 author（`TRUSTED_AUTHOR`）・opt-in variable（`AUTOMERGE_OPTIN`）を設定した上で `.github/workflows/auto-merge.yml` へ**手動配置**する。この workflow は **`schedule`（cron。既定 15 分間隔）+ `workflow_dispatch` のみ**をトリガーとする **cron スイープ方式**で動作し、リポジトリ設定変数 **`TRUSTED_AUTHOR`**（PR 作成専用 automation identity の login。未設定なら何もせず終了）の open PR をサーバー側 REST API（`--paginate` 全ページ列挙 + `user.login` 完全一致選別。`--limit` 固定だと上限超過分が恒久的に漏れるため）から列挙し、各 PR に対して arm（`GITHUB_TOKEN` での `gh pr merge --auto --squash` 実行）の前に**認可ゲートと絞り込みの 2 段判定**を行う。**PR イベント系トリガー（`pull_request` / `pull_request_target`）を一切使わない理由**: `pull_request` は same-repo PR で **PR head 側の workflow ファイルを secrets 付きで実行する**ため `AUTOMERGE_RULESET_TOKEN` 窃取経路になり、`pull_request_target` も checkout 禁止を守る限り窃取は防げるものの「PR という PR 作成主体が起こせる事象を契機に secrets（`AUTOMERGE_RULESET_TOKEN`・write 権限 `GITHUB_TOKEN`）を持つジョブが起動する」構造自体が残り、組織 CI 規約（secrets 露出トリガーの追加は P0/P1）に抵触し将来の保守変更で未信頼 PR データが混入する余地も残る。cron スイープでは**実行契機・実行コンテキストのいずれにも PR 由来の値が一切含まれず**（イベント payload に PR が存在しない）、この問題クラス自体が構造的に排除される。arm の遅延は最大でポーリング間隔に収まる。workflow 内では**リポジトリのコードを一切 checkout・実行しない**（`actions/checkout` の追加禁止。サンプルは `gh api` / `gh pr list` / `gh pr view` の読み取り呼び出しと jq の判定のみで構成し、`runs-on: ${{ vars.AUTOMERGE_RUNNER }}`（runner は repo variable で指定し**フォールバックなし** — runner 方針は public / private で正反対のため既定値の直書きはどちらかの規約に必ず違反する。public リポはリポジトリ設定変数 `AUTOMERGE_RUNNER=ubuntu-latest`、Fandhe-AI の private リポ（GitHub ホステッド指定が CI 規約違反の組織方針）は `AUTOMERGE_RUNNER=self-hosted` を設定し、未設定では job が起動しない = fail-closed）+ `timeout-minutes: 10` を明示し、さらに job レベルの明示 opt-in ゲート `if: ${{ vars.AUTOMERGE_OPTIN == 'true' }}` を置く（repo variable は admin のみ設定可能で PR 作成主体には偽造不能なサーバー側 opt-in シグナルとなり、設定しない限り workflow は何もしない）。**認可ゲート**: author 一致・命名規則ブランチ・`Closes #N` マーカーは、いずれも共有 `gh` 認証を持つ PR 作成主体（プロンプトインジェクションを受けたエージェント含む）が自ら満たせる**偽造可能な provenance であり、認可根拠にならない**。そこで workflow 自身が arm 前にベースブランチの branch protection / ruleset を GitHub API で**実測検証**し、(G1) **required status checks が 1 件以上**構成済み、(G2) **required approving review count >= 1** 構成済み（GitHub は PR author の自己承認をサーバー側で拒否するため、これが「PR 作成主体が生成できない非 author 承認」という偽造不能シグナルになる）、(G3) **dismiss stale reviews（承認後 HEAD 更新で承認失効）が有効**、(G4) **ベースブランチに適用される全 ruleset の bypass actor がゼロ**（`bypass_actors` が 1 件でもあればその actor による merge が G1〜G3 の保護を迂回できるため、まず ruleset の列挙が完全であること — 実効ルール全要素に数値 `ruleset_id` と既知の `ruleset_source_type`（Repository / Organization）があり、ルールがあるのに ID が 0 件という不整合がないこと — を検証した上で、ソース種別ごとに詳細取得先をルーティング（Repository → `repos/{owner}/{repo}/rulesets/{id}`、Organization → `orgs/{org}/rulesets/{id}` — org 継承 ruleset の ID を repo 側エンドポイントで引くと 404 になり、repo 側のみの実装では org ruleset 適用ブランチが恒久的に検証不能 = 一切 arm されなくなるため）し、各 ruleset 詳細の `bypass_actors` が**配列型かつ空**であることを確認する。ID 欠落・非配列・null・未知ソース種別・取得失敗はすべて arm しない（org ruleset の詳細取得には token に組織レベルの Administration: read が別途必要で、無い場合も fail-closed だが原因をログで明示する）。ruleset 詳細の `bypass_actors` は Administration: read 権限がないと応答に含まれず、workflow の `GITHUB_TOKEN`（contents / pull-requests write のみ）では取得できないため。`GITHUB_TOKEN` のままでは推奨構成の ruleset 保護下で G4 が常に検証不能となり一切 arm されない — G4 の詳細取得**のみ**リポジトリ secret **`AUTOMERGE_RULESET_TOKEN`**（fine-grained PAT / GitHub App token。必要権限は **Administration: read のみで write 不要**。arm 実行は `GITHUB_TOKEN` が行う権限分離構成）で行う。token を要求するのは **ruleset 由来の実効ルールが 1 件以上あるときのみ**で、適用 ruleset が 0 件（classic branch protection のみで G1〜G3 充足）なら G4 は検証対象なしの空充足として token 不要で通過する（ただし実効ルール API の取得自体に失敗した場合は「0 件」と区別して arm しない）。ruleset が 1 件以上あるのに secret 未構成（空）の場合は G4 を検証不能とみなし arm しない）、(G5) **required conversation resolution（レビュースレッド全解消の必須化）が有効**（無効だと任意 check 1 件 + 承認 1 件でレビュースレッド未解消のまま即時マージが成立し得る。classic は `required_conversation_resolution`、ruleset は pull_request ルールの `required_review_thread_resolution` で判定）、(G6) **workflow 冒頭の設定変数 `REQUIRED_EXTERNAL_CHECKS`（`<check context 名>:<App ID>` のカンマ区切り。既定例は `Cursor Bugbot:1210556` = Cursor Bugbot の App ID）に列挙した各組が、required status checks に「context 名 + App ID」の完全一致で App 束縛付きにすべて存在する**（args の `externalChecks` 契約が要求する Cursor 等の外部レビュー到着を、サーバー側マージ条件（required checks）として担保するための検証。context 名の存在だけでは同名 check を別 App や same-repo の Actions workflow が作成して偽装できるため、classic は `.checks[].app_id`、ruleset は `integration_id` との組で検証し、`app_id` / `integration_id` が null・欠落のエントリ — App 束縛のない legacy `contexts` を含む — は充足根拠として受理しない。設定値の書式不正も arm しない。空文字は外部チェック不使用の明示選択として通過するが、その場合外部レビュー到着はサーバー側で一切担保されない）、(G7) **classic branch protection を認可入力に採用する場合、`enforce_admins` 有効に加えて明示 bypass 経路が存在しない**こと（`required_pull_request_reviews.bypass_pull_request_allowances` に登録された users / teams / apps は `enforce_admins` が有効でも PR レビュー要件（G2/G3）を明示的に迂回でき、automation App / user が登録された構成では非 author 承認なしの即時マージが成立し得る。実 API 仕様では未設定の表現が「キー欠落」と「キーありで値 null」の 2 形態を取り（`restrictions` は未設定時に `null` を返すのが正常応答であり、null を unsafe 扱いすると classic-only リポで G1〜G6 が恒久 fail する）、「キー欠落または null = 未設定として通過」「object 型 = users / teams / apps がすべて配列型かつ空の場合のみ通過」とし、非 object・非配列・要素ありは classic を認可入力から除外して ruleset 側のみで判定する）、(G8) は**欠番**であり arm 条件に含めない（required status checks の strict 適用（`strict_required_status_checks_policy` / classic の `strict`）は鮮度の制御であって bypass 不能性の制御ではなく、G1〜G7 が担う認可の強度は strict の有無で変わらない。strict = true は 1 件マージするたびに他の open PR を up-to-date でなくし、`implement-issue-tree` の並列ランを構造的に停止させるため要件に含めない。後述の「strict を G0 の要件にしない理由」節。クライアント側 G0 の (i-c) も同じ理由で意図的な非要件である）、の **G1〜G7 すべて**を満たす場合のみ arm し、1 つでも欠ければその PR は arm せずスキップして次の PR へ進む（**fail-closed**。classic branch protection API と ruleset 実効ルール API `GET /rules/branches/{branch}` の両方に対応し、取得・解析失敗も「保護なし」側へ倒す。判定は jq で真偽値のみ取り出し、base ブランチ名は jq の `@uri` で URL エンコードしてから API パスへ展開する。`release/1.0` 等の `/` 入りブランチ名を生のまま展開すると 404 → fail-closed で本来 arm 可能な PR が永遠に arm されない）。この構造では、偽造 PR が仮に arm されてもサーバー側で非 author の人間承認と required checks が揃わない限りマージされず、人間の承認境界を迂回できない。**これらの branch protection がマージの実強制であり、arm は「承認とチェックが揃った時点で自動的にマージが完了する」利便性だけを担う**。**絞り込み条件（認可根拠ではない。誤爆防止の対象限定のみ。3 条件の AND）**: (1) **PR author がこのスキルの PR 作成専用 automation identity（bot / machine user。リポジトリ設定変数 `TRUSTED_AUTHOR` に `your-automation-bot[bot]` 等の login を設定）に完全一致**すること（REST API の `--paginate` 全ページ列挙 + `user.login` 完全一致選別。draft は除外）。**人間の個人アカウント（リポジトリ owner 含む）の指定は禁止**（その人物が手作業で作る通常 PR まで arm 対象になるため。専用 identity が未整備なら workflow を配置せず人間マージ運用に留める）。(2) head ブランチがこのスキルの命名規約 `<type>/<N>-<short-name>` にアンカー付き正規表現で**厳密一致**すること。(3) PR 本文にこのスキルの PR Create フェーズが必ず書き込む生成物マーカー **`Closes #<N>`（N はブランチ名のイシュー番号と同一）が行として存在**すること。permissions は `contents: write` + `pull-requests: write` の最小構成（pull-requests: write は auto-merge の有効化、contents: write はマージ実行権限として `enablePullRequestAutoMerge` / マージコミット作成に必要。contents を read に落とすと arm が常に権限エラーで失敗し、スイープが per-PR skip の green 終了になるため auto-merge が黙って一切成立しなくなる。checkout・push は行わないためこれ以上は要求しない）で、PR タイトル・本文等の未信頼テキストは run スクリプトへ一切展開しない（シェルが参照するのは整数検証済みの PR 番号・リポジトリ名・正規表現一致確認済みの head ブランチ名・URL エンコード済みの base ブランチ名のみ。本文マーカーは `gh pr view --json body --jq` の test() で真偽値だけを取り出して判定する）。この方式では arm の実行主体がエージェントと権限・実行環境を共有しない GitHub Actions であり、クライアント側の subagent には arm 経路が存在せず、arm しても保護未構成ならマージに至らないため、前述のクライアント側 arm の認可欠陥は構造的に発生しない。ランは PR をマージ可能状態（`blocked`）まで進めて停止し、監視中にサーバー側 auto-merge によって PR が MERGED になった場合は monitor の手順 1 が検出して already-merged 経路で正常完了する。

**merge-guard hook（`scripts/merge-guard-hook.sh`）— 導入は任意**: 入れると subagent（monitor 等）からのマージ系コマンドを deny する多層防御の一層になる。PreToolUse hook の deny は `bypassPermissions` でも迂回できない。ただし前述のとおりこれは承認境界ではなく、間接実行や未知のスペリングは防げない。

**hook の判定ポリシー（allow 経路なし。deny 専用）:**

| 対象コマンド（subagent = `agent_id` あり 発行時） | 判定 |
|------|------|
| `gh pr merge`（あらゆる形） | **無条件 deny**（grant による例外なし） |
| `gh api .../pulls/<n>/merge`（REST merge） | deny |
| `gh api repos/<o>/<r>/merges`（REST ブランチマージ） | deny |
| `gh api graphql`（`mergePullRequest` / `enablePullRequestAutoMerge` / `mergeBranch`） | deny（`mergeBranch` は PR を経由せず head ref を base へ直接マージする迂回経路のため含める） |
| `gh pr review --approve` | deny |
| `gh alias`（set / import 等すべて）・`gh extension` | deny（別名・拡張経由の迂回封じ） |
| 上記以外（`gh pr comment` の催促・読み取り系等） | 許可 |
| main スレッド（`agent_id` なし）の全コマンド | 制限対象外（人間の監督下の対話コンテキスト。`jq` 不在時もロックアウトされない） |
| subagent の入力で `jq` 不在・hook 入力のパース失敗 | 拒否（fail-closed） |

deny 判定は 2 段構えである。**最前段（raw コマンドに対する存在検知）**で、意味的デコードが必要な難読化構文 — ANSI-C クォート `$'...'`（`$'\x67\x68'` 等の 16/8/Unicode エスケープ）と IFS 由来展開（`$IFS` / `${IFS}` / `${IFS%?}` 等）— を含むコマンドを即 deny する（正当な `gh` コマンドはこれらを使わない前提。過検知は fail-closed 方向）。続く**正規化段**で、行継続（`\`+改行）除去 → 改行の空白化 → `${IFS}` / `$IFS` の空白置換 → クォート文字除去 → 単独バックスラッシュの全除去 → 連続空白圧縮を行い、`g''h pr merge`（クォート分割）・`g\h pr merge`（バックスラッシュ）・`gh${IFS}pr${IFS}merge`（IFS 分割）といった直接実行形を塞ぐ。なお deny 対象は **`gh` サブコマンドの文字列照合のみ**であり、`gh` を経由しない直接実行 — `git merge` + `git push` によるローカルマージ・`curl -X PUT .../pulls/N/merge` 等の REST 直接呼び出し — や、**間接実行**（`eval`・base64 復元・コマンド置換 `$(...)`・変数間接呼び出し等）は文字列照合では原理的に防げない残存リスクである。これらは hook が best-effort（承認境界ではない）であることの帰結であり、実強制は「自動マージを行わない」方針とサーバ側 branch protection（`gh` 迂回にもサーバ側で効く）が担う。

**導入手順**: 対象リポジトリの `.claude/settings.json` の `hooks.PreToolUse` に本 hook を登録する（`jq` の導入が前提。`jq` 不在時は subagent のコマンドが fail-closed で deny される。main スレッドは `agent_id` を含まない入力の入口判定により `jq` 不在でも許可される）:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/skills/implement-issue-tree/scripts/merge-guard-hook.sh"
          }
        ]
      }
    ]
  }
}
```

`command` のパスは導入形態に合わせる（「使い方」節の `scriptPath` の 3 レイアウトと同一区分。**同じ導入形態なら js と hook は同じルート配下**にある）:

- **upstream `skills/` レイアウト**: `"$CLAUDE_PROJECT_DIR"/skills/implement-issue-tree/scripts/merge-guard-hook.sh`
- **`.agents/skills/` に vendored**（`npx skills add` で導入した downstream リポジトリ）: `"$CLAUDE_PROJECT_DIR"/.agents/skills/implement-issue-tree/scripts/merge-guard-hook.sh`
- **`.claude/skills/` symlink 経由**（本リポジトリ内部参照）: `"$CLAUDE_PROJECT_DIR"/.claude/skills/implement-issue-tree/scripts/merge-guard-hook.sh`

登録後、スクリプトに実行権限があることを確認する（`chmod +x`）。hook を導入しなくても、opt-out（既定）ランではクライアント側から自動マージが起きることはない（opt-out ではクライアント側は新規マージ・arm 自体を行わないため。opt-in ランのマージは前述の 3 層で制御する）。hook は監査ログ・多層防御の一層として任意で導入する。

### branch protection（マージ判定の本体。人間マージ・サーバー側 auto-merge の両運用で必要）

対象ベースブランチには**サーバー側 branch protection / ruleset を設定することを強く推奨**する（ランタイムゲートではなく運用推奨）。compromised なローカルエージェントもサーバー側ルールは迂回できない。人間がマージする運用でも、upstream の `docs/implement-issue-tree/auto-merge-sample.yml` によるサーバー側 auto-merge 運用でも、マージ可否の判定はここが本体になる。特に、注入された monitor 等が仮に何らかの経路でマージを試みても止まるよう、次を設定する:

- **第三者（非 author）承認必須**（`required_approving_review_count >= 1` かつ `require_last_push_approval` 相当）。automation identity 自身は承認を作れない（`gh pr review --approve` は hook で deny、サーバ側も PR author = automation 時の自己承認を拒否）
- **承認後 HEAD 更新で承認失効**（`dismiss_stale_reviews`。古い承認の再利用を防ぐ）
- **PR を経由しない通常直接 push の禁止、かつ force push 禁止**（`allow_force_pushes=false`）。force push 禁止だけでは通常 push を塞げないため両方
- **管理者を含む enforcement**（classic: `enforce_admins=true` かつ `bypass_pull_request_allowances` 未設定 / ruleset: `enforcement=active` かつ automation を含む `bypass_actors` なし）
- **required status checks 1 件以上**（サーバー側 auto-merge 運用では特に必須。`gh pr merge --auto` は要件が既に満たされた PR を即時マージするため、required checks 未設定のまま workflow を配置すると arm 時点でそのままマージされ得る）。外部レビュー App（Cursor 等）を使う場合はその check context を **App 束縛付き（App 指定付き required check。classic は `app_id`、ruleset は `integration_id`）** で required checks に含める（`externalChecks` 契約のサーバー側対応。サーバー側 workflow の G6 とクライアント側 G0 (d) のいずれも context 名 + App ID の組で包含を検証し、App 指定なしのエントリ・宣言 context と異なる context のエントリでは充足できない。required checks に登録する context は `args.externalChecks` で宣言する context と一致させること）
- **required status checks の strict 適用は無効にする**（classic: `strict=false` / ruleset: `strict_required_status_checks_policy=false`）。理由は次節。**有効にすると本スキルの並列ランが構造的に停止する**
- **required conversation resolution（レビュースレッド全解消の必須化）**（未解消スレッドを残したままの auto-merge 完了を防ぐ。G5 が有効性を検証する）

### strict を G0 の要件にしない理由

`strict_required_status_checks_policy`（マージ前の base 最新化 = up-to-date 必須）は **`false` を前提とする**。G0 は要件に含めず、値を読まない。

**並列ランを構造的に止めるため（実運用上の理由）**: strict = true では 1 件マージするたびに、同じ base を持つ他の open PR がすべて「base が古い」状態になる。本スキルは `parallel >= 2` で複数 PR を同時に走らせるため、1 件目のマージ直後に残り全 PR が `BLOCKED` へ落ち、それぞれ base 更新 → 全チェック再実行 → その間にまた別の PR がマージ、という直列化と再実行のループに陥る。並列度を上げるほど収束しなくなり、実質的に自動マージが成立しない。

**セキュリティ上の要件ではないため（設計上の理由）**: G0 の主張は「共有 `gh` 認証のどのエージェントが直接 `gh pr merge` を試みても、サーバーが同条件で拒否する」ことである。strict は **鮮度**（チェックが現在の base に対して走ったか）の制御であって、**bypass 不能性**（誰がマージ条件を迂回できるか）の制御ではない。strict = false でもサーバーの受理集合とクライアントの受理集合は一致し、G0 の主張は成立する。strict を外すことで通るようになるマージは、サーバー側でも同様に通るマージだけである。

**strict = false で残るリスクと補い方**: 「古い base に対して成功したチェック結果のままマージされ、マージ後の base が壊れ得る」（意味的コンフリクト）。テキストコンフリクトは merge-exec の手順 1 が `mergeable` を自己取得して `CONFLICTING` を検出し `not-mergeable` で終端するため、この経路では通らない。意味的コンフリクトについては、**ラン完了後にベースブランチの CI が green であることを確認する**運用で補う（本スキルの前提条件「マージ先ブランチが CI green」は次のランの入力条件でもある）。

**マージ実行より前の段階（monitor）でも CONFLICTING を検出する**: merge-exec の `not-mergeable` は「マージ実行直前の最終防御」だが、それより前に PR が base とコンフリクトしていると `pull_request` トリガーの CI check-run が 1 件も作られず、チェック総数 0 件のまま `blocked` へ落ちて自動回復しない状態になり得る（並列ランで兄弟イシューの PR が先にマージされ、後続 PR の作成時点の base が既に古いケース）。monitor は手順 1 で `mergeable` も取得し、`state: OPEN` かつ `CONFLICTING` を検出したら CI 監視を待たず `state: conflicting` を返す。

**push 直後に CI 起動を確認し、monitor の 0 件経路を塞ぐ**: 上記の手順 1 検出でも、「push 前ゲートを通過した後に兄弟 PR がマージされて base が動いた」ケースでは、最初の monitor ラウンドを消費するまでコンフリクトが分からない。また monitor 手順 2（`gh pr checks --watch` を最大 4 回再実行）が再実行を使い切った後に総数確認へ進まないと、総数 0 件時の `mergeable` 再判定を一度も通らずに `timeout` を返し得る（`timeout` は専用分岐なく次ラウンドへ回るため、監視枠 7 ラウンドを空費した末に `failed` 終端する）。対策は 3 点:

1. **push 直後の CI 起動確認**: `prCreatePrompt`（PR 番号確定後）と `fixPrompt(pushAfterFix: true)`（push 検証の直後）で、head の**チェック総数**（`repos/{owner}/{repo}/commits/<head>/check-runs` の `total_count` + `commits/<head>/status` の `statuses` 件数の合計。`gh pr checks` / merge-exec と同じ集計定義〔gh 公式実装 `pkg/cmd/pr/checks/aggregate.go`〕であり、check-run を作らず commit status のみを発行する CI で 0 件と誤判定しないため）と `gh pr view --json mergeable` を 30 秒間隔・最大 5 分で観測し、`checksStarted` / `mergeableAfterPush`（`MERGEABLE` / `CONFLICTING` / `UNKNOWN`）を返す。`mergeable` は push 直後しばらく `UNKNOWN` のため確定を待つが、上限到達時は `UNKNOWN` のまま返す（推測で `CONFLICTING` へ倒さない）。既存返却値（`prNumber` / `pushed`）の意味は変えず、スキーマ上も任意フィールドとする（旧エージェント出力との互換）。
2. **ホスト側ルーティング**: `mergeableAfterPush: CONFLICTING` を受けたら、次の monitor ラウンドを起動せず（監視枠も消費せず）既存の `conflicting` 分岐へ直行する。この値は**自己申告でありマージ判定には使わない**（分岐ヒント限定）。誤申告の最悪ケースは `baseMergeCount` を 1 消費するだけで `maxBaseMerges` により有界であり、`expectedRepo` 未確定ガード・上限到達時の `blocked`（quality）終端もそのまま効く。両値は状態ファイルへ `pushChecksStarted` / `pushMergeable` として永続化する（診断用。再開時は monitor が実測し直す）。
3. **monitor の 0 件直行と `timeout` の限定**: 手順 2 は `--watch` の前に head のチェック総数（check-run + commit status の合計）を取得し、確定値が 0 件なら総数 0 件の判定へ直行する（`checksTotal` として返す）。両 API のどちらかが失敗した場合は**取得失敗**として扱い、`checksTotal` を省略して `--watch` へ進む（取得失敗を 0 件へ倒すと、チェックが実際に動いている PR をコンフリクト扱いへ落とす）。再実行の枯渇時も `timeout` ではなく総数確認へ進む。手順 7 の `timeout` は「チェックが 1 件以上存在し pending のまま監視上限に達した場合」に限定し、ホストは `state: timeout` かつ `checksTotal === 0` を受理せず `conflicting` へ再判定する（`checksTotal` を省略した応答は `timeout` として扱う）。

**CONFLICTING は fix ループへは回さず独立の base 取り込みエージェントへ回す**: 上記の monitor 由来 `conflicting`、および merge-exec の `not-mergeable`（`classifyMergeExecDispatch` により同じ `conflicting` へ写像される）はいずれも品質問題ではないため、レビュー指摘対応の `fixCount`（上限 6）を消費しない。ホストは独立予算 `baseMergeCount`（`args.maxBaseMerges`。既定 3・上限 10）で管理される base 取り込み専用エージェント（`baseMergePrompt`）を起動する。**ただしこの起動は `args.repo`（人間が明示する owner/repo）で期待リポジトリ `expectedRepo` が確定している場合に限る**。エージェント自己申告値（外部チェック観測エージェントの申告 `repo` 等）は信頼境界に使わない。`args.repo` 未指定のランでは `expectedRepo` が空文字のまま確定し（形式不正〔`isValidRepoSlug` 不通過〕は `parseRepoArg` が起動時にエラーで停止し、ラン自体が始まらない — 誤記の黙読み替え禁止）、`baseMergePrompt` を一切起動せず conflicting は即 `blocked` / `blockedReason: "quality"` で終端する（fail-closed。以下の `maxBaseMerges` 上限到達時と同じ終端形だが、こちらは起動前のゲート）。このエージェントはレビュー指摘の修正・スレッド resolve・PR 本文編集の権限を持たず、base の取り込み・コミット・push のみを担う。コンフリクトは種別を問わず解消しない。通常ファイルの内容コンフリクトは編集する権限を持たず（build/lint/test で妥当性確認できないため）、submodule（gitlink）ポインタのコンフリクトも双方がポインタを変更した状態のため base 側の機械的採用は PR 側の gitlink 更新を黙って破棄する。いずれも解消を試みず `commitFailed: true` で停止する。内容コンフリクトの検出時はあわせて `conflict: true` を返し、ホストは failed 終端せず同一周回で `lastState = 'needs-fix'` に設定して fix 経路（`fixPrompt` の push 前 base 最新化ゲート = `runVerification=true`。build/lint/test を正当に実行でき `fixCount`〔上限 6〕で有界）へ委譲する（コミット未作成のため `baseMergeCount` は消費しない。`conflict` はエージェント自己申告だが、誤申告の最悪ケースは検証付き・有界の fix 経路へ余分に回るだけで安全側）。base 取り込みマージコミットの subject は host のリテラル固定値 `chore: base ブランチの変更を取り込む` であり、push 権限を持つこのエージェントは commitlint 設定・コミット履歴を含むリポジトリ内ファイルを一切読まない（読み取り専用 subject 算出エージェント方式はプロンプト指示のみでランタイム強制されないため採らず、未信頼読取を自動 base 取り込み経路から排除する）。固定 subject が commit-msg hook に拒否された場合（分岐 (c)）は `commitFailed: true` に加えて `hookRejected: true` を返し、ホストは `conflict` と同様に failed 終端せず fix 経路（`runVerification=true` の push 前 base 最新化ゲート。commitlint 対応 subject で解消・検証・push できる）へ委譲する。`conflict` / `hookRejected` を伴わない `commitFailed`（branch / base fetch 失敗・checkout 失敗・subject 未確定等）は failed 終端する。push 後は `gh pr view` で `mergeable`（UNKNOWN なら再試行）と push 後 headRefOid に対する check-run の起動有無を確認して `mergeableAfter` / `checksStarted` としてホストへ返すが、これらは**ログ専用**でありマージ判定・分岐には使わない（実際の判定は次ラウンドの monitor がサーバー側の実値を独立に再観測して行う。エージェント自己申告をマージ経路の入力にしない設計原則を維持する）。`baseMergeCount` が `maxBaseMerges` に達すると `blocked` / `blockedReason: "quality"` で終端する（halt 非カウント。`fixCount` 上限到達時の `needs-fix` は自動修正予算が尽きており自動化の外側でしか状態が変わらないため `unrecoverable` とするが、base コンフリクトは human が PR ブランチへ直接 base を取り込んで push すれば解消し得る。解消後は次回 monitor が `conflicting` を返さず本分岐自体を通らないため、同じ根拠で `unrecoverable`（`status: "failed"`）を流用せず `blocked` とする。SKILL.md・args-example.json の「コンフリクトは blocked 終端」という公開契約とも一致させる）。

**補償策の成立確認（base CI プローブ）**

**対象ブランチの扱い**: 本スキルは `args.branch` で任意のマージ先（`release/1.0` 等）を指定できる。プローブは以下の理由から**対象（マージ先）ブランチを検査する**（`@<branch>` で明示。省略時のみ既定ブランチへフォールバック）。既定ブランチを無条件に検査する設計は採らない。

1. スクリプト本体は既にブランチ正当である。G0 は `repos/{o}/{r}/rules/branches/${encodeURIComponent(baseBranch)}` を検査し、merge-exec は `baseRefName != baseBranch` を `wrong-target` で終端する。人間実行のプローブも同じく対象ブランチを検査して揃える。
2. 本節の散文は既に対象ブランチ前提で書かれている（「不成立時の扱い」1. は「マージ先ブランチへ push トリガの最低限のビルド/テストを追加する」としている）。プローブ手順もこの前提に揃える。
3. 代替案（既定ブランチ以外での `autoMerge: true` を G0 で fail-closed 辞退する案）はコストが高い。merge-exec の権限境界は実行してよい `gh` 呼び出しを逐一列挙する設計であり、`gh repo view --json defaultBranchRef` を意図的に狭く保っている境界へ手を入れる必要がある上、正当な `branch` 指定を一律で拒否する挙動になる。そのため採らない。G0 に専用の辞退理由コードは設けない（プローブは人間・呼び出し側が実行する運用手順であり、ランタイムゲートではないため）。

上記の補償策は「マージ先ブランチへの push で CI が起動する」ことに暗黙依存している。push トリガの workflow が無い、`on.pull_request` 相当の `paths` フィルタで該当 head では起動しない、または**起動した push run が意味的コンフリクトを検出できない workflow（常時起動する軽量ドキュメント用 workflow 等）に限られ、本来必要なテスト workflow が含まれない**リポジトリでは、この依存が満たされず補償策が構造的に成立しない。「push イベントの run が 1 件でもあれば green」という判定は、後者のケース（必要な workflow が起動せず、無関係な軽量 workflow のみ成功）を green と誤判定してしまうため、判定は **push run の存在だけでなく、意味的コンフリクト検出に必須な workflow 集合が実際に起動し尽くしたことの被覆確認**を要件に含める。

- **双方向で検証不能になること**: 前提条件「マージ先ブランチが CI green」はランの入口条件でもあるため、push CI が無いリポでは*ラン前の前提確認*も*ラン後の補償確認*も同じ理由で成立しない。「実行されていない」を「green」と読み替えてはならない。
- **必須 workflow 集合の決め方**: 呼び出し側が事前に対象リポジトリの `.github/workflows/*.yml` と `.github/workflows/*.yaml`（GitHub Actions は両拡張子を等しく認識する。`*.yml` のみの確認だと `.yaml` 拡張子の workflow を見落とし必須集合が過小になり得る）を確認し、`on.push` を持ち意味的コンフリクトを検出できる workflow（ビルド・テスト等のジョブを含む workflow。常時起動するだけの軽量ドキュメント用 workflow は含めない）の**ファイル先頭 `name:` の値**（Actions UI・`gh run list --json workflowName` の `workflowName` に表示される workflow レベルの名前であり、workflow 内の個々の job 名ではない。yaml のファイル名でもない）を必須集合として列挙する。あわせて `on.push.branches` / `on.push.branches-ignore` が**対象ブランチ**を含むかを確認する（`branches: [main]` に固定された workflow は `release/1.0` 等の対象ブランチでは起動しないため、必須集合は対象ブランチ基準で選び直す。既定ブランチ用に決めた必須集合をそのまま流用しない）。この列挙はプローブが自動導出しない（`paths` フィルタの評価はプローブの外で人間または呼び出し側が行う）。必須集合が空・未指定のリポジトリはプローブ対象外とし判定不能として扱う。**必須集合は JSON 配列で渡す**。GitHub Actions の workflow レベル `name:` にはカンマを含められるため（例: `name: Build, Test`）、カンマ区切り文字列では区切り文字と衝突し、存在しない複数名へ誤分割される。JSON 配列（例: `["CI","Build, Test"]`）であればカンマ入りの名前も 1 要素として保持できる。旧カンマ区切り形式は**受理しない**（フォールバック解釈もしない。判定不能として拒否し新形式へ誘導する）。
- **`workflowName` は同名衝突があり得る識別子**: GitHub Actions は複数の workflow ファイルが同一の `name:` を持つことを許容する仕様のため、`workflowName` のみで必須集合と観測結果を突き合わせると、必須 workflow とは無関係な同名の軽量 workflow が成功しただけで `required_missing` が空になり green と誤判定し得る（本来必須の workflow が `paths` フィルタ等で未起動でも検出できない）。そのためプローブは判定の直前に**対象リポジトリの全 active workflow を `name` → `path` で列挙し、必須集合の各名前がちょうど 1 つの `path` にのみ対応することを確認する**。対応する `path` が 0 件（該当名の active workflow が存在しない）でも複数件（同名衝突）でも、`workflowName` による同定が意味をなさない点は同じであるため、いずれも判定不能として扱う（fail-closed。0 件の復旧は必須集合の名前指定を見直すこと、複数件の復旧は該当 workflow の `name:` を一意な値へ変更すること）。ただしこの 1:1 検証は「現在の active workflow 構成において名前が曖昧でない」ことしか保証しない。run 側の突き合わせを引き続き `workflowName` の文字列一致だけで行うと、対象 workflow が過去に無効化・改名され、無効化前は同じ名前を持っていた**別の**workflow の run（現在は active workflow 一覧に存在しない）まで一致してしまい得る（なりすまし）。そのためプローブは 1:1 検証で確定した名前を対応する `id`（workflow データベース ID。改名を跨いでも同一 workflow を指す安定な識別子）へ解決し、run 側は `workflowDatabaseId` との id 一致で同定する（後述のプローブ手順・スクリプト参照）。
- **`--paginate` と `--jq` の併用は 1 回の `jq` 呼び出しに集約する**: `gh api --paginate --jq '<filter>'` は `--jq` のフィルタを**ページごとに独立して適用**し、結果を JSON 値として連結出力する仕様のため、`group_by(.name)` のようにページを跨いで集約する必要がある処理をそのまま渡すと、同名 workflow が別ページに分かれた場合に検出できない（ページ内でしか重複を見ない）。そのため、workflow 一覧の取得は `--paginate --slurp` で全ページの生レスポンスを 1 つの配列へ集約し、その**生 JSON を外部の `jq` へパイプ**して `.[].workflows[]` を展開する。`gh api` は `--slurp` と `--jq` の併用を拒否する（`the --slurp option is not supported with --jq or --template`）ため、`--paginate --slurp --jq '<filter>'` と書くと 1 リポも判定できない。`2>/dev/null` でエラーを捨てていると全リポが判定不能へ倒れ、fail-closed なので危険側ではないものの補償策が丸ごと無効化される。外部 `jq` に依存するため、実行前に `command -v jq` で存在確認して不在なら判定不能とする（同じ制約と対処は `../SKILL.md` の「(B) 人間の診断専用」ブロックにも記載がある）。
- **プローブ手順**: 対象ブランチはエントリの `@<branch>`（`implement-issue-tree` の `args.branch` と同一値を明示する）で指定する。**省略時のみ** `gh repo view --json defaultBranchRef` で既定ブランチへフォールバックする（`main` 決め打ち禁止は既定ブランチ解決時も同様）。ブランチ名は `jq -sRr '@uri'` でエンコードしてから API パスへ展開する（`release/1.0` 等の `/` 対策）。head sha の存在確認は終了コードではなく HTTP status で行う（`gh api` はエラーも stdout に出すため）。続いて `gh api repos/<repo>/actions/workflows --paginate --slurp | jq '[.[].workflows[] | select(.state == "active") | {name, path, id}]'` で全ページを集約した active workflow の `name`→`path`→`id` 対応を取得し（`--slurp` と `--jq` は併用不可のため外部 `jq` へパイプする。`jq` 不在時は判定不能。**パイプの終了ステータスも確認する**。`set -o pipefail` 下でも、代入結果を使う前に明示チェックしないと、先行ページだけで有効な JSON 配列が生成された場合に後続ページの取得失敗を見逃し、ページを跨ぐ同名 workflow を検出できないまま通過し得る）、必須集合の各名前について対応する `path` の件数を数える。1 件ちょうどでない名前（0 件・複数件のいずれも）が 1 つでもあればその時点で判定不能として次のリポへ進む（`gh run list` を呼ぶ前に fail-closed）。1 件に確定した名前は対応する `id`（workflow データベース ID）へ解決し、以降の run 突き合わせの同定根拠として使う（`workflowName` の文字列一致のみだと、無効化・改名された別 workflow が過去に同じ名前を持っていた場合の run まで拾い得るため — 詳細は次項）。次に `gh run list -R <repo> -c <head> -L 100 --json workflowName,workflowDatabaseId,status,conclusion,event,headBranch` を取得し、応答が配列であることを検証したうえで**配列長が取得上限 100 件に到達していないことも検証する**（到達時は取得できた分だけを集計すると取得範囲外の失敗・未完了 run を見落とすため、判定不能として扱う。件数を上げる場合もこの上限チェック自体は必須のまま残す）。`gh run list -c <head>` は commit SHA のみで絞り込み、headBranch を見ないため、同じ SHA を指す feature branch・別ブランチ・tag への push run も混入し得る（feature branch 上で必須 workflow が成功した後、その SHA が base へ fast-forward されても base push が paths 条件等で起動しなかった場合、feature-branch 側の run だけで required_missing が空かつ全件 success となり、base CI 未実行にもかかわらず green と誤判定される）。そのため push run の絞り込みは **`event == "push"` かつ `headBranch == <対象ブランチ名>`** を必須条件とし、この 2 条件を満たす run について**必須 workflow の充足は `workflowDatabaseId` を前段で解決した `id` と突き合わせて判定する**（`workflowName` は表示・ログ用の補助情報に留め、同定根拠には使わない。値はシェルへ展開せず jq 内の比較に閉じる。比較対象は呼び出し側が `--arg` で渡す必須集合の文字列と、そこから解決した `id` の JSON のみ）。**集計の直前に対象ブランチの head sha を再取得し、プローブ冒頭で取得した head と一致することを確認する**（workflow 一覧取得・run list 取得の間に base が更新されると、古い head の run がすべて成功していても現在の base に未検証の新しいコミットがある状態を green と誤判定し得るため。不一致は判定不能として次のリポへ進む。取り直して再測はしない — その場で再取得すると同じ競合が再発し得るため、呼び出し側が改めてプローブを実行する）。`while` / `for` ループはインライン実行不可の環境があるため 1 ファイルにしてから `bash <file> '<repo>[@<branch>]:["workflow1","workflow2"]'` で実行する（`ruleset-policy.md` 手順 A / 手順 B と同型。必須 workflow 集合は JSON 配列で渡す。呼び出し側はシェルの引用符でエントリ全体をクォートすること）。1 リポの判定不能で全体を止めない（`exit` ではなく `continue` で次のリポへ進む）。

  ```bash
  #!/usr/bin/env bash
  # base CI プローブ: 対象（マージ先）ブランチ head で「意味的コンフリクト検出に必須な
  # workflow 集合」が push イベントで起動し尽くし、かつ全件が失敗・未完了・判定不能なしで
  # 完了しているかを判定する。引数は 'owner/repo[@branch]:["workflowName1","workflowName2"]' の
  # 並び（コロンの後に必須 workflow の name: 値を JSON 配列で列挙する — Issue #363。
  # GitHub Actions の workflow 名にはカンマを含められるため、カンマ区切り文字列では区切りと
  # 衝突し誤分割される。必須集合は呼び出し側が .github/workflows/*.yml と *.yaml の両方を
  # 事前確認して決め打つ — 常時起動する軽量ドキュメント用 workflow のみを根拠に green 判定
  # しないため）。`@branch` は対象ブランチ（`implement-issue-tree` の `args.branch` と同一値）
  # を明示する。省略時のみ既定ブランチへフォールバックする（後方互換: 既存の
  # "owner/repo:[...]" 形式はそのまま動く。ただし旧カンマ区切り "owner/repo:workflow" 形式は
  # JSON として不正なため判定不能で拒否する — 黙って誤分割する経路を残さない）。1 リポの
  # 判定不能で全体を止めない（continue で継続）。
  set -uo pipefail

  # 外部 jq への依存を先に確認する。本スクリプトは workflow 一覧の集約に
  # `gh api --paginate --slurp | jq` を使う（gh は --slurp と --jq を併用できない）。
  # jq が無いと全リポが「判定不能」になり、補償策が丸ごと無効化されたことに
  # 気づけないため、ここで止める（SKILL.md の (B) 診断コマンドと同じ扱い）。
  command -v jq >/dev/null || { echo "jq が見つからないためプローブを中断する" >&2; exit 1; }

  for entry in "$@"; do
    target="${entry%%:*}"       # owner/repo[@branch]
    required_json="${entry#*:}"
    if [ "${required_json}" = "${entry}" ] || [ -z "${required_json}" ]; then
      echo "${target}: 判定不能 — 必須 workflow 集合が未指定（'owner/repo[@branch]:[\"name1\",\"name2\"]' 形式で明示すること）"; continue
    fi

    # 必須集合は JSON 配列（要素 1 個以上・全要素が非空文字列）のみを受理する。
    # 旧カンマ区切り形式（例: "CI,Lint"）は JSON として不正なため、ここで判定不能へ
    # 落ちて gh API を一切呼ばずに終端する（fail-closed。カンマ入りの workflow 名を
    # 存在しない複数名へ黙って誤分割する経路を残さないため — Issue #363）。
    if ! printf '%s' "${required_json}" | jq -e 'type == "array" and length >= 1 and all(.[]; type == "string" and length > 0)' >/dev/null 2>&1; then
      echo "${target}: 判定不能 — 必須 workflow 集合が JSON 配列でない（旧カンマ区切り形式は受理しない。'[\"name1\",\"name2\"]' 形式で指定すること）"; continue
    fi

    # リポジトリ名に @ は使えず、git の refname は : を含められないため、
    # 「最初の : の手前 = owner/repo[@branch]、最初の @ の手前 = owner/repo」で
    # 一意に分解できる。誤パースは fail-open 方向（判定不能を回避してしまう）の
    # ため、%%/# の等価トリックではなく case による明示分岐にして目視・テストで
    # 確認できる形にする。
    case "${target}" in
      *@*) repo="${target%%@*}"; branch="${target#*@}"; branch_explicit=1 ;;
      *)   repo="${target}";     branch="";              branch_explicit=0 ;;
    esac
    case "${repo}" in
      */*/*|*/) echo "${target}: 判定不能 — owner/repo 形式でない"; continue ;;
      */*) : ;;
      *) echo "${target}: 判定不能 — owner/repo 形式でない"; continue ;;
    esac

    # "@" が明示されたのに branch が空（"owner/repo@:workflow" 等）は、指定対象を
    # 検査できないまま既定ブランチへ fail-open フォールバックしてはならない。
    # 明示指定の有無を branch_explicit で保持し、空なら判定不能で終端する。
    if [ "${branch_explicit}" = 1 ] && [ -z "${branch}" ]; then
      echo "${target}: 判定不能 — @ の後にブランチ名が空（既定ブランチへフォールバックしない）"; continue
    fi

    if [ -n "${branch}" ]; then
      # 対象ブランチが明示指定された場合は gh repo view を呼ばない（API 呼び出し
      # 削減に加え、既定ブランチ取得の失敗が明示指定ランを巻き込むのを防ぐ）。
      # 空白・タブ・制御文字・非 ASCII を含むブランチ名は fail-closed で判定不能
      # とする（LC_ALL=C の非印字検出。git は非 ASCII ブランチ名を許容するが、
      # このプローブでは同定の確実性を優先し判定不能側へ倒す）。
      if printf '%s' "${branch}" | LC_ALL=C grep -q '[^ -~]' || printf '%s' "${branch}" | grep -q '[[:space:]]'; then
        echo "${target}: 判定不能 — ブランチ名に空白・非印字・非 ASCII 文字を含む"; continue
      fi
    else
      branch=$(gh repo view "${repo}" --json defaultBranchRef --jq '.defaultBranchRef.name' 2>/dev/null)
      case "${branch}" in
        ""|*" "*) echo "${repo}: 判定不能 — defaultBranchRef を取得できない"; continue ;;
      esac
    fi
    branch_enc=$(printf '%s' "${branch}" | jq -sRr '@uri')

    code=$(gh api -i "repos/${repo}/commits/${branch_enc}" 2>/dev/null | awk 'NR==1{print $2}')
    if [ "${code}" != "200" ]; then
      echo "${repo}@${branch}: 判定不能 (HTTP ${code:-?}) — head sha を取得できない"; continue
    fi
    head=$(gh api "repos/${repo}/commits/${branch_enc}" --jq '.sha' 2>/dev/null)
    if ! printf '%s' "${head}" | grep -Eq '^[0-9a-f]{40}$'; then
      echo "${repo}@${branch}: 判定不能 — head sha が 40 桁 hex でない"; continue
    fi

    # workflowName は同名衝突があり得る識別子（複数 workflow ファイルが同一 name: を
    # 持てる仕様）。必須集合の各名前が active workflow のちょうど 1 path に対応する
    # ことを確認する（0 件・複数件のいずれも run list の workflowName 突き合わせが
    # 同定根拠にならないため fail-closed）。--paginate と --jq を素朴に組み合わせると
    # jq フィルタがページ単位で適用され、ページを跨いだ同名重複を検出できない
    # （group_by(.name) がページ内でしか集約されない）。そのため --slurp で全ページの
    # 生レスポンスを 1 配列に集約してから 1 回の jq 呼び出しで展開する。
    # --slurp は --jq と併用できない（gh が
    # "the --slurp option is not supported with --jq or --template" で拒否する）ため、
    # gh 側は生 JSON を出すだけにして外部の jq へパイプする。併用形のまま
    # 2>/dev/null を付けると全リポが「判定不能」へ倒れ、fail-closed ではあるが
    # 補償策そのものが無効化される。
    # `pipefail` はパイプの非ゼロ終了をコマンド全体の終了ステータスへ伝えるが、
    # 代入した後に終了ステータスを確認しないと効果がない。先行ページだけで
    # 有効な JSON 配列が返るとページ跨ぎの取得失敗を素通しし、後続ページにある
    # 同名 workflow を見落として「ちょうど1 path」判定を誤らせ得るため、
    # 代入自体を if で囲んで fail-closed にする。
    if ! workflows=$(gh api "repos/${repo}/actions/workflows" --paginate --slurp 2>/dev/null \
                  | jq '[.[].workflows[] | select(.state == "active") | {name, path, id}]' 2>/dev/null); then
      echo "${repo}@${branch}: 判定不能 — workflow 一覧の取得が失敗（ページ取得の途中失敗を含む）"; continue
    fi
    if ! printf '%s' "${workflows}" | jq -e 'type == "array"' >/dev/null 2>&1; then
      echo "${repo}@${branch}: 判定不能 — workflow 一覧を取得できない"; continue
    fi
    bad_hit=$(printf '%s' "${workflows}" | jq -r --argjson req "${required_json}" '
      $req as $required |
      (group_by(.name) | map({name: .[0].name, count: length})) as $counts |
      [
        $required[] | . as $n |
        (([$counts[] | select(.name == $n) | .count][0]) // 0) as $c |
        select($c != 1) | "\($n):\($c)"
      ] | join(" / ")')
    if [ -n "${bad_hit}" ]; then
      echo "${repo}@${branch}: 判定不能 — 必須 workflow 名が active workflow のちょうど1 path に対応しない（0件=未存在 / 複数件=同名衝突）: ${bad_hit}"; continue
    fi

    # 必須集合の各名前を、直前の1:1検証で確定した active workflow の `id`
    # （workflow データベース ID。path 変更・名前変更を跨いでも同一 workflow を指す
    # 安定な識別子）に解決しておく。run 側の突き合わせを workflowName の文字列一致
    # のみに頼ると、対象 workflow が無効化・改名された後に残る過去の run（無効化
    # 前は同じ名前で存在した別 workflow の run を含む）まで拾い、その run が
    # たまたま成功していれば green を偽装できてしまう（同名だが別 workflow という
    # なりすまし）。id 束縛によりこの偽装経路を塞ぐ。
    required_map=$(printf '%s' "${workflows}" | jq -c --argjson req "${required_json}" '
      . as $wfs |
      $req as $required |
      [ $required[] | . as $n | { name: $n, id: ($wfs[] | select(.name == $n) | .id) } ]')

    runs=$(gh run list -R "${repo}" -c "${head}" -L 100 \
            --json workflowName,workflowDatabaseId,status,conclusion,event,headBranch 2>/dev/null)
    if ! printf '%s' "${runs}" | jq -e 'type == "array"' >/dev/null 2>&1; then
      echo "${repo}@${branch}: 判定不能 — run list の応答が配列でない"; continue
    fi
    total_count=$(printf '%s' "${runs}" | jq 'length' 2>/dev/null)
    if ! printf '%s' "${total_count}" | grep -Eq '^[0-9]+$'; then
      echo "${repo}@${branch}: 判定不能 — 取得件数を数値として読めない"; continue
    fi
    if [ "${total_count}" -ge 100 ]; then
      echo "${repo}@${branch}: 判定不能 — run list が取得上限 100 件に到達（切り捨ての可能性。ページングで全件取得するか件数を上げて再測する）"; continue
    fi

    # workflow 一覧取得・run list 取得の間に base が更新され得るため、集計直前に
    # head sha を再取得して冒頭で取得した head と一致するか確認する。不一致のまま
    # 集計すると、古い head の run が全件成功していても現在の base に未検証の
    # 新しいコミットがある状態を green と誤判定する（strict=false が前提にする
    # 「ラン完了後の base CI green」補償策そのものを無効化する）。ここでは
    # continue で次のリポへ進むのみとし、その場での取り直しはしない
    # （同じ競合が再発し得るため、呼び出し側が改めてプローブ全体を再実行する）。
    # 再取得自体が認証切れ・ネットワーク断・レート制限で失敗した場合、stderr を
    # 捨てたままだと recheck が空文字や非 SHA になり得る。それを head と単純比較
    # すると API 障害を「base head 更新のレース」と誤分類し、運用者を再測定へ
    # 誘導してしまう（実際の障害の是正から遠ざける）。そこで冒頭の head 取得と
    # 同様に HTTP status での成否確認 → 40 桁 hex 形式の検証を先に行い、
    # 「API 障害」と「実際の SHA 不一致」を別メッセージで区別する。
    recheck_code=$(gh api -i "repos/${repo}/commits/${branch_enc}" 2>/dev/null | awk 'NR==1{print $2}')
    if [ "${recheck_code}" != "200" ]; then
      echo "${repo}@${branch}: 判定不能 — 集計中の head 再取得に失敗（HTTP ${recheck_code:-?}）。base 更新のレースと区別できないため判定不能とする"; continue
    fi
    recheck=$(gh api "repos/${repo}/commits/${branch_enc}" --jq '.sha' 2>/dev/null)
    if ! printf '%s' "${recheck}" | grep -Eq '^[0-9a-f]{40}$'; then
      echo "${repo}@${branch}: 判定不能 — 集計中の head 再取得が 40 桁 hex を返さない（API 応答異常）"; continue
    fi
    if [ "${recheck}" != "${head}" ]; then
      echo "${repo}@${branch}: 判定不能 — 集計中に base head が更新された（旧: ${head:0:8} / 新: ${recheck:0:8}）"; continue
    fi

    # -c で 1 リポ 1 行にする（複数リポを並べたときに目視で差分を追えるようにするため）。
    # `gh run list -c "${head}"` は commit SHA のみで絞り込み、headBranch を見ない
    # ため、同じ SHA を指す feature branch・別ブランチ・tag への push run も
    # 混入し得る（feature branch 上で必須 workflow が成功した後、その SHA が
    # base へ fast-forward されても base push が paths 条件等で起動しなかった
    # 場合、feature-branch 側の run だけで required_missing==[] かつ全件 success
    # となり、base CI 未実行にもかかわらず green と誤判定される）。そのため
    # push run の絞り込みは `.headBranch == $b`（対象ブランチ）を必須条件に含める。
    # 必須 workflow の充足判定は `workflowName` の文字列一致ではなく
    # `workflowDatabaseId` を `required_map` の `id`（直前で 1:1 検証済みの active
    # workflow に解決済み）と突き合わせる。名前一致のみだと、無効化・改名された
    # 別 workflow の過去 run が同じ `workflowName` を持っていた場合にそれを本物と
    # 誤認し得る（なりすまし）。id 束縛によりこの経路を塞ぐ。
    # 集計は必須 workflow の run（$rp）に限定する（必須外の skipped/neutral/失敗は
    # 補償策の合否と無関係のため除外。push_total は push CI の構造的不在検出のため
    # 全 run（$p）を数える — Issue #364）。$rp は $req_ids（必須集合の id 集合）との
    # workflowDatabaseId 突き合わせで抽出する。必須集合自身の run が skipped/neutral
    # で完了した場合は $rp 内で引き続き unknown に計上し green へ倒さない（厳格側の
    # 設計は必須集合の内側で維持する）。
    printf '%s' "${runs}" | jq -c --arg r "${repo}" --arg b "${branch}" --arg h "${head:0:8}" --argjson reqmap "${required_map}" '
      [.[] | select(.event == "push" and .headBranch == $b)] as $p |
      ($reqmap | map(.id)) as $req_ids |
      [$p[] | select(.workflowDatabaseId | IN($req_ids[]))] as $rp |
      ($rp | map(.workflowDatabaseId)) as $seen_ids |
      ($reqmap | map(select(([.id] - $seen_ids) | length > 0) | .name)) as $missing |
      {
        repo: $r, branch: $b, head: $h,
        push_total: ($p | length),
        required_push_total: ($rp | length),
        required_missing: $missing,
        incomplete: ([$rp[] | select(.status != "completed")] | length),
        failed:     ([$rp[] | select(.status == "completed" and .conclusion != null
                       and ((.conclusion | IN("failure","cancelled","timed_out","action_required","startup_failure","stale")))
                     )] | length),
        unknown:    ([$rp[] | select(.status == "completed"
                       and ((.conclusion // "") | IN("success",
                            "failure","cancelled","timed_out","action_required","startup_failure","stale") | not)
                     )] | length)
      }'
  done
  ```

  実行例（`Fandhe-AI/agent-cli-skills` で実測。本リポは `.github/workflows/ci.yml` のみが `on.push` を持ち、workflow レベルの `name:` は `CI` の1本のため必須集合は JSON 配列 `["CI"]`）。フォールバック形（`@branch` 省略、既定ブランチ `main` を検査）:

  ```
  $ bash probe.sh 'Fandhe-AI/agent-cli-skills:["CI"]'
  {"repo":"Fandhe-AI/agent-cli-skills","branch":"main","head":"b1edb268","push_total":1,"required_push_total":1,"required_missing":[],"incomplete":0,"failed":0,"unknown":0}
  ```

  対象ブランチ明示形（`@branch` で非既定ブランチを検査。本リポの `ci.yml` は `push: branches: [main]` のため非既定ブランチでは push run が起動せず `push_total: 0` = 補償策不成立になる）:

  ```
  $ bash probe.sh 'Fandhe-AI/agent-cli-skills@fix/352-post-failure-compensation:["CI"]'
  {"repo":"Fandhe-AI/agent-cli-skills","branch":"fix/352-post-failure-compensation","head":"b140607f","push_total":0,"required_push_total":0,"required_missing":["CI"],"incomplete":0,"failed":0,"unknown":0}
  ```

  fail-closed 経路も同じスクリプトで実測している（`gh run list` へ到達する前に打ち切られる）:

  ```
  $ bash probe.sh 'Fandhe-AI/agent-cli-skills:["NoSuchWorkflow"]'
  Fandhe-AI/agent-cli-skills@main: 判定不能 — 必須 workflow 名が active workflow のちょうど1 path に対応しない（0件=未存在 / 複数件=同名衝突）: NoSuchWorkflow:0

  $ bash probe.sh 'Fandhe-AI/agent-cli-skills'
  Fandhe-AI/agent-cli-skills: 判定不能 — 必須 workflow 集合が未指定（'owner/repo[@branch]:["name1","name2"]' 形式で明示すること）

  $ bash probe.sh 'Fandhe-AI/agent-cli-skills@no/such/branch:["CI"]'
  Fandhe-AI/agent-cli-skills@no/such/branch: 判定不能 (HTTP 422) — head sha を取得できない
  ```

  旧カンマ区切り形式は JSON として不正なため判定不能で拒否される（gh API を呼ぶ前に終端する。カンマ入りの名前を存在しない複数名へ誤分割する経路がないことの直接証拠）:

  ```
  $ bash probe.sh 'Fandhe-AI/agent-cli-skills:CI,Lint'
  Fandhe-AI/agent-cli-skills: 判定不能 — 必須 workflow 集合が JSON 配列でない（旧カンマ区切り形式は受理しない。'["name1","name2"]' 形式で指定すること）
  ```

  集計直前の head 再確認による判定不能も実測している（`recheck` を強制的に不一致させたスクリプトで検証。実運用ではこの分岐は base head が本当に更新された場合にのみ通る）:

  ```
  $ bash probe_forced_mismatch.sh 'Fandhe-AI/agent-cli-skills:["CI"]'
  Fandhe-AI/agent-cli-skills@main: 判定不能 — 集計中に base head が更新された（旧: 1dacc6b6 / 新: deadbeef）
  ```

  判定は以下の表に従う。

  各行は上から順に評価し、最初に条件が一致した行の判定を採用する（下の行の条件は
  「それより上のすべての行の条件が成立しなかった」ことを前提とする。特に `red` 行は
  `required_missing != []` の場合には成立せず、その場合は下の「補償策不成立」行が
  先に一致するため、`required_missing` が空でない状態のまま `red` 判定になることはない。
  同様に `failed >= 1` は `unknown` の値によらず `red` 行が先に一致する — `unknown` 行を
  `failed` 行より先に置くと、両方が正の場合に実測された失敗（`failed`）が「合否不明」に
  丸められ、実際に壊れている base を「再測すればよい」判定不能へ誤分類してしまうため、
  `failed`（実測された不合格）を `unknown`（合否に分類できない conclusion）より優先して
  評価する）。

  | 条件（上から順に評価） | 判定 | 意味 |
  |------|------|------|
  | `push_total == 0` | 補償策不成立 | push トリガ workflow が無い / `paths` フィルタで除外された（`push_total` は必須外を含む push run 全件で判定する。「push CI の構造的不在」検出はこの全件基準でのみ意味を持つ） |
  | 取得件数が 100 件に到達 | 判定不能 | 取得範囲外に失敗・未完了 run がある可能性を排除できない |
  | 権限・API 障害で判定に到達できない | 判定不能 | 記録して再測する（green にも不成立にも倒さない） |
  | `push_total >= 1` かつ `required_missing != []` | 補償策不成立 | push run はあるが必須 workflow の一部が起動していない（軽量 workflow のみ成功等）。`failed`/`incomplete`/`unknown` の値によらずこの行が優先し、green にも red にも倒さない |
  | `push_total >= 1` かつ `required_missing == []` かつ `incomplete >= 1` | 未完了 | 必須 workflow の run（`required_push_total` 件）に未完了が残る。完了を待って再測する（green と扱わない） |
  | `push_total >= 1` かつ `required_missing == []` かつ `incomplete == 0` かつ `failed >= 1` | red | 必須 workflow は全件起動しており補償策は成立するが、必須 workflow の run に失敗が含まれ base が壊れている。`unknown` が同時に正でもこの行が優先する（実測された失敗を合否不明へ丸めない） |
  | `push_total >= 1` かつ `required_missing == []` かつ `incomplete == 0` かつ `failed == 0` かつ `unknown >= 1` | 判定不能 | 必須 workflow の run に合否分類できない conclusion（`neutral`/`skipped` 等）が混在し、かつ実測された失敗はない。green へ倒さない |
  | `push_total >= 1` かつ `required_missing == []` かつ `failed == 0` かつ `incomplete == 0` かつ `unknown == 0` | green | 必須 workflow が全件起動し尽くし、その run（`required_push_total` 件）全件が健全に完了。**必須外 run の結果（skipped/neutral/失敗を問わず）は判定に影響しない**。補償策が成立し base は健全 |

  **集計対象は前段で `id` 解決した必須 workflow の run（`$rp`）に限る。** `failed`/`incomplete`/`unknown` はいずれも `$rp` のみを走査し、必須集合に含まれない run（必須外の `paths` フィルタ付き軽量 workflow 等）は `push_total`（全 push run件数。構造的不在検出専用）を除き集計に含めない。これにより、必須外の workflow が `skipped`/`neutral` で完了しても green 判定を妨げない。一方、**必須 workflow 自身**の run が `skipped`/`neutral` で完了した場合は `$rp` 内で引き続き `unknown` に計上し、厳格側の判定（green へ倒さない）を維持する。`push_total`（全 push run。`$p` の件数）と `required_push_total`（必須 run のみ。`$rp` の件数）は出力レベルで区別する。

  `failed` は `cancelled` / `timed_out` / `action_required` / `startup_failure` / `stale` を失敗側に数える。**合格（green への算入）は `success` のみに限定する**。`neutral` / `skipped` は失敗側にも算入しないが合格側にも入れず `unknown` 側へ計上する（意味的コンフリクト検出の補償策としては「本当に実行され成功した」ことの確認が目的であり、`neutral`/`skipped` は「実行されたが判定不能」を意味するため green へ倒さない。SKILL.md の CI 全 green 判定が任意チェックの `skipped`/`neutral` を許容するのとは前提が異なる — こちらは必須 workflow の健全完了を確認する補償策であるため厳格側に倒す）。`required_missing` は必須集合の各 workflow を、実際に push イベントで観測された run の `workflowDatabaseId` 集合と id 突き合わせした結果、対応する run が見つからなかった名前の一覧であり、空配列であることは「必須 workflow（同定済みの id が一致する run に限る）が全件起動した」ことの直接証拠になる（個々の workflow ごとの conclusion 追跡は不要 — 必須 run の `failed`/`incomplete`/`unknown` が 0 であれば、起動した必須 workflow の run 全件が `success` で完了したことを意味する）。
- **不成立時の扱い（3 択・順に推奨）**:
  1. マージ先ブランチへ push トリガの最低限のビルド/テストを追加する（`paths` フィルタで除外されないことをプローブで実測確認する）。これが本則。
  2. `autoMerge: true` を使わない（マージ可能状態で停止し人間がマージする）。補償策不成立のリポでは既定の非 opt-in 運用を推奨とする。
  3. やむを得ず `autoMerge: true` を使う場合は「補償策 適用外」であることを記録したうえで、ラン完了後に **base を最新化した状態での検証を最低 1 回** 実施する（例: マージ後の base から一時ブランチを切って PR CI を 1 回起動し、意味的コンフリクトの有無を確認する）。実施も記録もしない運用は選択肢に含めない。
- **実測記録の陳腐化に関する注意**: リポジトリ構成は変わるため、判断は測定日付とセットで記録し、`autoMerge` 運用を開始・再開するたびに再測する。

サーバー側 auto-merge 運用ではさらに **repo 設定で auto-merge を許可**する（Settings → General → Allow auto-merge）。なお upstream（Fandhe-AI/agent-cli-skills）の `https://github.com/Fandhe-AI/agent-cli-skills/blob/main/docs/implement-issue-tree/auto-merge-sample.yml`（`docs/implement-issue-tree/auto-merge-sample.yml`）は上記のうち **required checks >= 1・非 author 必須承認 >= 1・dismiss stale reviews・適用全 ruleset の bypass actor ゼロ・required conversation resolution 有効・`REQUIRED_EXTERNAL_CHECKS`（外部レビュー App の check context 名 + App ID の組）の required checks への App 束縛付き包含、の 6 点を arm 前に API で実測検証し、未構成・検証不能なら arm しない（fail-closed）**（strict 適用は検証しない〔G8 は欠番〕。前節「strict を G0 の要件にしない理由」参照）。classic branch protection は `enforce_admins` が有効かつ明示 bypass 経路（`bypass_pull_request_allowances` / `restrictions` の users / teams / apps）が存在しない場合のみ認可入力として採用し（G7。キー欠落または null = 未設定の正常応答のため通過（`restrictions` は未設定時 null が正常応答）、object は全リストが空配列の場合のみ通過）、また読み取り API が管理者権限を要求し workflow の `GITHUB_TOKEN` では読めないことがあるため、**ruleset での構成（bypass actor なし）を推奨**する（実効ルール API は読み取り権限で取得できる）。ruleset 運用ではさらにリポジトリ secret **`AUTOMERGE_RULESET_TOKEN`**（Administration: read のみの fine-grained PAT / GitHub App token。write 不要。org 継承 ruleset を使う場合は組織レベルの Administration: read も併せて付与）の設定が必要で、ruleset が 1 件以上適用されるのに未構成だと G4（ruleset 詳細の bypass actor 検証）が検証不能となり一切 arm されない（fail-closed）。適用 ruleset が 0 件（classic のみで G1〜G3 充足。enforce_admins 必須）の運用ではこの secret は不要（G4 は空充足で通過）。なお workflow のトリガーは `schedule`（cron）+ `workflow_dispatch` のみの cron スイープ方式とし、`pull_request` / `pull_request_target` は使わない（PR イベントを契機に secrets 付きジョブを起動する構造自体を排除する。「自動マージのサーバー側委譲と merge-guard hook」節参照）。加えてリポジトリ設定変数 **`TRUSTED_AUTHOR`**（automation identity の login。未設定ならスイープは何もしない）・**`AUTOMERGE_OPTIN`**（文字列 `true` を設定しない限り job ごとスキップされる明示 opt-in ゲート）・**`AUTOMERGE_RUNNER`**（runner ラベル。フォールバックなしのため未設定では job が起動しない）の 3 つの設定が必要で、いずれか未設定なら動かない（fail-closed）。workflow 内でリポジトリのコードを checkout・実行してはならない。


### 救済ラウンドの終端分類

merge 監視ループ（`runMergeLoop`）は「強制スレッド再走査の救済ラウンド」機構を持つ（SKILL.md の「強制スレッド再走査の救済ラウンド」節参照）。本節はその終端分類の判定表と設計根拠を記録する。実装は `reconcileRescueRoundState(lastState, rescueRoundActive, timeoutExecReason)`（`scripts/implement-issue-tree.js`）、回帰テストは `tests/merge-loop-rescan.test.mjs`。

**設計上の制約**:

1. 救済ラウンドが monitor 由来の `timeout` で終端しても、`terminalStatus` を `blocked`（halt 非カウント）から `failed`（halt カウント）へ化けさせない（救済機構のない経路と同じく `blocked` に保つ）。
2. `lastState` は書き換えず、「終端 status だけを品質ブロック（`blocked`）へ分類する」指示を返す（`lastState` を `'unresolved-comments'` へ書き換えると fix ループを誤って起動させる）。
3. 判定地点はラウンド末尾（monitor 結果の直後）ではなく、救済ラウンドであることを「予約 → 今ラウンドの `active` フラグへ移送」した上で、ループ退出後の単一 choke point（`break` / `continue` / `while` 条件 `false` のすべてが通る）に置く（ラウンド末尾で判定すると、同一ラウンドで merge-exec が返す一過性 reason（`head-moved` / `checks-not-green` / `merge-failed`）を `classifyMergeExecDispatch` が `lastState` を `timeout` へ写像するケースを見逃す）。
4. choke point での判定内容は timeout の出所別に分類する（出所を問わず一律 `blocked` にすると、恒常的な merge-exec 失敗（特に `merge-failed`）が halt 連続カウントに一切算入されず、同じ救済経路へ再入し続けて halt 防御を迂回できる）。

**timeout の出所と判定表**:

| 出所 | 発生経路 | `timeoutExecReason` | 終端分類 |
|------|---------|---------------------|---------|
| monitor 由来 | 監視エージェント自身が `timeout` を返す（merge-exec は起動しない） | `''`（空） | `blocked`（halt 非カウント。次回ラン monitoring 再開対象） |
| merge-exec 由来 | monitor が `ready` → merge-exec が `head-moved` / `checks-not-green` / `merge-failed` → `classifyMergeExecDispatch` が `timeout` へ写像 | `'head-moved'` / `'checks-not-green'` / `'merge-failed'`（分岐条件のリテラル） | 既定の `failed`（halt カウント対象） |
| （救済ラウンド外） | `rescueRoundActive === false` | 問わない | 分類を変えない（既定の `failed` のまま。実失敗を隠さない） |

`timeoutExecReason` が想定外の非空値を持つ場合も merge-exec 由来（`failed`）側へ倒す（fail-closed。halt 防御を弱める方向のフォールバックを作らない）。

**設計根拠**:

- **monitor 由来を `blocked` に留める理由**: 救済は「未解決スレッドの内容を取り直すための追加試行」であり、観測に失敗しても「未解決スレッドが残っている」という元の品質ブロックの事実は変わらない。
- **merge-exec 由来を `failed` へ戻す理由**: 救済ラウンドの再走査自体は成立しており（`forceThreadRescan` は monitor が `unresolved-comments` / `ready` を返した時点で解除済み）、未解決スレッドが残っているとは断定できない。実体はマージ操作そのものの失敗である。
- **3 reason を一律 `failed` にする理由（パリティであり新しい厳格化ではない）**: 救済ラウンド**外**の同じ reason は現状すでに、監視予算が尽きた時点で `failed` 終端になる。救済ラウンド内だけ `blocked` へ倒すと、恒常的な merge 失敗ほど halt 防御から逃れやすくなるという逆転が生じる。一律 `failed` は非救済ラウンドとの対称性（パリティ）であり、`tests/merge-loop-rescan.test.mjs` の「対称ケース」テストが両者の結果一致を検証する。
- **運用上の帰結（明記する）**: monitor の楽観的 `ready` と merge-exec の `checks-not-green` が食い違うケースは、救済ラウンドで起きた場合も次回ラン自動再開（`blocked`）ではなく `failed` 終端になる。追跡は失われない — `lastExecDeferralNote`（一過性 reason の直近の見送り理由）が終端 note へ運ばれる。

**配線（`timeoutExecReason` の受け渡し）**:

`roundTimeoutExecReason`（ループ外で宣言・ラウンド先頭で `''` へリセット）が出所を運ぶ。宣言をループ外に置く理由は `forceThreadRescanBudgetUsed`（延長ラッチ・ラウンドを跨いで**保持する**契約）と同じ「ループ内宣言だと毎ラウンド初期化される」ためではなく、choke point・一過性 reason 分岐・ラウンド先頭リセットの 3 箇所すべてから同一変数を参照・代入する必要があるという JS のスコープ上の都合にすぎない。むしろ意味は逆で、この変数は**ラウンドを跨いで保持してはならない**（リセットを落とすと前ラウンドの merge-exec 由来 reason が今ラウンドの monitor 由来 timeout へ漏れ、`blocked` が静かに `failed` へ化ける）。一過性 reason 分岐（`head-moved` / `checks-not-green` / `merge-failed`）は分岐条件の**リテラル** `execReason` のみを代入し、エージェント自己申告の自由テキスト（`execSummaryText`）は代入しない（A03 インジェクション対策。分類入力に未検証文字列を混入させない）。`tests/merge-loop-rescan.test.mjs` の構造アサーションがリセット位置・代入内容の両方を固定する。

## opt-in テスト実行記録ゲート（Issue #495）

`#[ignore]` 付きテストや opt-in の e2e ターゲットのように既定の CI・テストでは走らないテストを
受入条件に含むイシューについて、イシュー本文の宣言（`<!-- optin-tests: ... -->`）に基づき、
実装エージェントへ実行と記録を必須化し、マージ前に PR 本文の pass 記録を確認するゲート。
宣言が無いイシューでは一切の分岐に入らない（既定無効）。

**ゲートを merge-exec の内部ではなく直前のホスト側 choke point に置く理由**: merge-exec は
Issue 本文・PR 本文・レビュー本文を一切読まないコンテキスト分離契約を持つ（
`MERGE_CONTEXT_COMMON` と冒頭の権限境界段落、本書の「監視とマージ実行の分離」節）。ここに
`gh pr view --json body` を追加すると、正規化した形であってもこの契約に例外が増え、既存の検証
項目（`verification.md` の確認事項・回帰テストの群 E）と矛盾する。「マージゲートの合格条件に
加える」という要求は、merge-exec に到達する前に同じ合格条件で止めることで実現し、
`mergeExecutePrompt` / `MERGE_EXEC_SCHEMA` / `classifyMergeExecDispatch` はこのゲートのために変更しない。

**検証は別コンテキストの読み取り専用エージェント（`optinRecordVerifyPrompt`）が行う**。PR 本文は
一時ファイルへ落とし、宣言コマンドごとの pass / 非 pass マーカー行数のみを返す（本文テキスト・
コマンド文字列はコンテキストにも返却値にも含めない）。ホスト側 `classifyOptinRecordGate` が
「pass 行が 1 件以上、かつ同一コマンドの pass 以外の記録行が 0 件」を合格条件とし、取得失敗・
件数不一致・非整数・負数はすべて不合格側へ倒す（fail-closed）。

**記録は実装エージェントの自己申告であり、権限境界・品質保証ではない（手続き遵守ゲート）**。
偽の pass 記録を書くことは原理的に排除できない（PR 本文は write 権限者が編集できるため、
人間が手元で実行して記録を更新する正規の復旧手順と同一の経路を通る）。マージ可否の実強制は
G0（サーバー側 branch protection の実測）が担い、本ゲートはそれに重ねる手続き上の
確認にすぎない。

### 記録の HEAD sha 束縛（PR #503 3 巡目 codex P1）

**マーカー行自体が「どの HEAD に対する結果か」を束縛していないと**、base 取り込み
（`baseMergePrompt`）は opt-in テストを再実行しない設計のまま HEAD を進めるため、その後に
古い pass マーカーが PR 本文に残っていれば、`classifyOptinRecordGate` は件数だけを見て合格に
してしまう（後述の `optinFixState` による多層防御が効かないケース — 例えば post-push fix を経由せず
base 取り込みだけで HEAD が進んだラウンド — でも同様に fail-open になる）。

そのためマーカー行に検証対象の HEAD sha を刻む。書式は
`<!-- optin-test-record: <40 桁 sha> <pass|fail|not-run> <コマンド> -->` とする
（`optinRecordMarkerLine(sha, result, command)`。sha・result は固定形式で空白を含まないため
コマンド文字列（空白を含み得る）の前に置き、`grep -cxF` の完全一致だけでパースが一意になる）。
記録を書くエージェント（`prCreatePrompt` 手順 0d・`optinRecordUpdateInstructions` 手順 a）は
`git rev-parse HEAD`（＝実際に push した／する HEAD）を自分で取得してマーカーへ埋め込む。

`optinRecordVerifyPrompt` は `gh pr view --json body,headRefOid` を単一呼び出しで取得し、
headRefOid が 40 桁 sha として取得・検証できなければ `fetchFailed: true` と同じ扱いで全件不合格
にする。妥当なら、宣言コマンドごとに **その headRefOid に対する** pass / fail / not-run の 3 種類
を固定文字列 `-cxF` で数える（sha が一致しない行はどの grep にも一致せず自動的に集計から除外
される）。`classifyOptinRecordGate` はこの headRefOid 自体の検証を主要な合否入力に含める
（headRefOid が無効なら `fetchFailed` と同じく全件不合格）。この結果、base 取り込み・fix 前の
記録・全く別のラウンドで書かれた記録は、現在の HEAD と sha が一致しない限り「存在しないもの」
として扱われ、pass 以外の判定へ自動的に倒れる。

**TOCTOU 対策として merge-exec へ期待 HEAD sha を渡す**（`mergeExecutePrompt` のパラメータ
`expectedHeadSha`）。`optinRecordVerifyPrompt` が確認した headRefOid とマージ実行時点の実際の
HEAD がずれる（ゲート確認後に別の push が入る）競合を防ぐため、merge-exec は手順 2 で自己取得
した headRefOid がこの期待値と一致することを追加で確認し、不一致なら既存の `reason: head-moved`
（このラウンドは再試行され、次ラウンドの monitor が実状態を観測し直す）で辞退する。
`--match-head-commit` には merge-exec 自身の自己取得値のみを使い、`expectedHeadSha`
は一致条件を**追加**するだけでマージ許可を広げる入力にはならない — 「monitor 出力をマージ経路
の入力に使わない」という分離原則と矛盾しない。宣言テストが無い
イシューでは `expectedHeadSha` は空文字のまま渡され、`mergeExecutePrompt` の出力（`optin` 文字列
・`--json body` を含まないコンテキスト分離契約を含む）は完全に不変（回帰テストの群 E で
`expectedHeadSha` 指定時もこの分離契約が退行しないことを確認している）。

**base 取り込み経路（`baseMergePrompt`）はテストを再実行しない**。HEAD が
進むため記録は sha 不一致で自動的に無効になり、次のゲート確認は不合格になる。ホストはこれを
既存の `blocked` 終端（`blockedReason: quality`）として扱う（fix ループへ自動で回す専用の
再ディスパッチは実装していない — 既存の停止性・fixCount 予算を変更する追加の状態遷移になり
リスクが見合わないため。次回実行時に monitoring 再開でゲートを再評価すれば、人間または別ラウンド
の fix が現在の HEAD で記録を更新した時点で自然に解消する）。

**この「自動で回す専用の再ディスパッチは実装していない」は、`lastFixOptin` 由来の override
（下記「opt-in 記録 latch は fail-closed で停止する」節の latch）が働いているケースにも
同じく適用される。** `isOptinLatchActive` の判定結果は終端メッセージの出し分けにのみ使い、
latch が原因でも原因でなくても常に同じ `blocked` 終端へ合流する（同一周回での自動再
ディスパッチは行わない）。latch 由来の不合格からの復旧経路は同節記載の 2 経路のみに限る。

### post-push fix の実測の永続化（`optinFixState`。PR #503 2 巡目 codex P0 → 3 巡目で headSha を追加）

Merge ループの post-push fix（`pushAfterFix: true`）が opt-in テストを再実行した結果は、
`lastFixOptin`（プロセスローカルの `let`。`{ runs, headSha }`）として保持し
`combineOptinRecordGate` で PR 本文ベースの判定と AND する。
マーカー自体が sha に束縛されているため、この AND は主たる防御ではなく多層防御であり、
`fixOptin.headSha` が `optinRecordVerifyPrompt` の検証済み headRefOid と一致する場合のみ働く
（不一致＝HEAD がさらに進んだ場合は override せず、PR 本文側の sha 束縛判定にそのまま委ねる —
古い実測で新しい HEAD の PR を永久に止めない可用性上の配慮。安全性は失わない: gate 自身の
sha 束縛判定はそのまま効くため）。**ただしこれは「headSha を確定できた上で HEAD が進んだ」場合
限定の可用性配慮であり、「そもそも headSha を確定できなかった」場合は別扱いにする**（詳細は次段落の
`unbound` を参照）。

プロセスローカル変数は monitoring/blocked からの再開（別プロセス起動）で失われて `null`
に戻るため、それだけでは post-push fix が非 pass を報告した直後に再開すると、PR 本文更新
（`optinRecordUpdateInstructions`）が失敗・省略されているケースで古い pass マーカーだけで
マージ前ゲートを通過し得る（`combineOptinRecordGate(gate, null, gateHeadSha)` は「fix 未実施」
として `gate` をそのまま返すため）。そこで post-push fix が `pushed: true`
を報告したラウンドごとに `updateState` で状態ファイルへ
`optinFixState: { attempted: true, runs: [...], headSha }` を永続化し（`fixCount` /
`baseMergeCount` と同じ非終端 updateState 呼び出し 1 箇所に相乗り）、monitoring 再開時は
`restoreOptinFixState` がこれを読んで `runMergeLoop` の `initialFixOptin` として引き継ぐ。
`attempted: true` なのに `runs` を復元できない（状態ファイル破損・キー欠落）、または `headSha`
自体が `sanitizeSha` を通らない（未報告・形式不正・旧形式の永続化）場合は宣言コマンド全件を
`not-run` とみなす合成配列を返し、`unbound: true` を立てる。
`unbound: true` は `combineOptinRecordGate` の headSha 一致判定そのものをスキップさせ、現在の
HEAD が何であれ無条件で override して不合格にする（fail-closed）。これは前段落の「headSha が
確定していて HEAD が進んだために不一致」ケース（override せず PR 本文側へ委ねる）とは別の扱い
であり、「そもそも headSha を確定できなかった」場合まで同じ「一致し得ないので無介入」にすると
古い pass 実測がマージ前ゲートで見逃され得る fail-open になる。ライブ実行側（post-push fix が
`optinHeadSha` を報告しなかった・不正値だった場合）も同じ `unbound: true` 経路を通り、
`optinFixState` として永続化される値も `unbound` を含むため、復元後も不合格が維持される。
宣言が無い・`attempted` が無い（post-push fix を一度も実行していない再開）場合は `null` を返して
PR 本文のみで判定する（既定無効の意味を壊さないため）。

**永続化の書込み自体の失敗にも対処する**: 上記の
`updateState` 呼び出しは戻り値（成否）を確認し、`optinFixStatePatch` が設定されているラウンド
（宣言テストがあり今回 push した）に限り、失敗時は `cleanupWorktree` を付けずに 1 回再試行する。
それでも失敗すれば `failMergeTerminal` で `blocked` 終端する（この実測を次回復元できないと、
PR 本文更新の失敗・省略時に古い記録だけでマージ前ゲートを通過し得るため）。`failMergeTerminal`
自身の終端 `updateState` にも `lastFixOptin` から合成した `optinFixState` を含める
（`fixCount` / `baseMergeCount` だけを永続化すると、fix 実行後だが monitor 起動前に別経路で
終端したラウンドの実測が失われるため）。復旧手順は
`references/recovery.md`「opt-in テスト記録不足による blocked からの復旧」節を参照
（PR 本文の更新は「現在の HEAD sha で」書き直す必要がある。
`optinFixState` の実測が残っている場合は、宣言テストが実際に pass する新しいコミットを push
して置き換えるか、人間が内容を確認して GitHub 上で手動マージする — 状態ファイルの
`optinFixState` を削除・改変して迂回する手順は存在しない。次節「opt-in 記録 latch は
fail-closed で停止する」参照）。

### opt-in 記録 latch は fail-closed で停止する（PR #503 4 巡目 codex P1 → 5 巡目 codex P0）

`combineOptinRecordGate` の override（`lastFixOptin` の非 pass・`unbound` による強制不合格）が
実際に働いている状態を **latch** と呼ぶ。latch は「PR 本文を人間が編集する」「テストを実行して
同じ args で再実行し、次回 monitoring の再監視を待つ」だけでは解除できない — `lastFixOptin`
（プロセスローカル）も永続化された `optinFixState` も、現在の HEAD が変わらない限り毎ラウンド
同じ override 判定を再生産し、`combineOptinRecordGate` 自身は false→true の書き換えを一切
行わないため gate 自身の再判定でも解除できない。

**判定は `isOptinLatchActive` が行うが、マージ許可には一切影響させない。** `optinGateHeadSha`
（このラウンドで `optinRecordVerifyPrompt` が観測した現在の headRefOid）が `sanitizeSha` を
通らない場合は常に `false` を返す。確定していれば、`lastFixOptin.unbound === true`、または
`lastFixOptin.headSha` が `optinGateHeadSha` と一致し、かつ `runs` に非 pass が 1 件でもあれば
latch と判定する。この判定結果は**終端メッセージの出し分けにのみ**使い、latch と判定された
場合はマーカー編集・再監視を案内する汎用メッセージではなく、latch 固有の説明（下記）を出す。
それ以外（マージ経路への影響）は一切無い — 常に `blockedReason: quality` の `blocked` で
終端する。

**latch を自己申告で自動解除する経路は設けない。** latch 検出時に `fixCount` 予算内で同一周回
fix へ再ディスパッチし、`pushed: false`（コード変更なし）で終わった場合でも fix 自身の自己申告
`optinTestRuns`/`optinHeadSha` を、ホストが別コンテキストで独立観測した head との一致だけを
根拠に latch から解除する方式は採らない。**SHA が一致することは「そのテストを実際に実行した」
ことの証明にはならない**（期待 SHA 自体が fix プロンプトへ提示されるため、バグ・悪意いずれの
経路でも一致する結果だけを整えて latch を解除し得る）。ホストは fix エージェントのテスト実行
そのものを直接観測できない以上、no-push 経路からの自動解除は fail-open の余地を残すため、
オーナー方針としてこの経路自体を設けない。

**latch は「設計上意図した fail-closed」であり、これが停止性と自動解除の安全性の
両方の懸念への回答になる**: ホストが直接観測できないテスト実行結果に依存する
判定を、観測できないまま自動で緩める経路を作らないことが安全側であり、latch による停止は
バグではなく意図した挙動である。停止性の懸念（「PR 本文編集や再監視だけでは解除されない」）は
事実だが、その解決策は「ホストが観測できる形で latch を確実に解除する 2 つの経路」に限定する:

1. **新しいコミットを push する**（既存経路）: Merge ループの post-push fix が宣言テストを
   再実行して pass し、push が成立すれば、新 HEAD の sha に束縛された記録へ `optinFixState` が
   置き換わり（`f.pushed === true` 分岐。本節冒頭のとおり不変）、latch は新 HEAD で自動的に
   解消する。
2. **人間が内容を確認して GitHub 上で手動マージする。**

**状態ファイルの `optinFixState` を手で削除・`attempted: false` へ書き換えて latch を迂回する
手順は一切存在しない（安全弁の迂回になるため意図的に用意しない）。**
終端メッセージ・`references/recovery.md`・`SKILL.md` のいずれにもこの手順は書かない。

**(2) の復旧経路は、従来は正しく機能していなかった（Issue #509）。** 人間が GitHub 上で手動
マージした直後の monitor ラウンドは PR の `state: MERGED` を検出して `ready` を返すが、
`allowMerge` は `!recoveryOnly` のみで決まっていたため `true` のままで、opt-in ゲートが
記録不足を理由に再び `failMergeTerminal(..., 'blocked')` で終端していた。その結果、`merge-exec`
の already-merged 判定・イシュークローズ確認まで到達できず、latch 復旧手段 (2) が名目上あるだけで
実際には機能しない状態だった。修正後は、新規マージ経路（`!recoveryOnly`）かつ opt-in 宣言が
あるときに限り、opt-in ゲートより前に `mergeVerifyPrompt` / `MERGE_VERIFY_SCHEMA`（`merge-exec`
の merged 自己申告を裏付けるためにすでに使っている読み取り専用契約。新しいプロンプト・スキーマは
追加しない）を再利用して PR の現在状態を独立確認する。この結果が `MERGED` であれば
`prAlreadyMerged` として `allowMerge` をさらに `false` へ狭め、opt-in ゲート用エージェントを
起動せずに `recoveryOnly` と同じ回復専用文面（`gh pr merge` 等の変更系コマンドを含まない）で
`merge-exec` を呼ぶ。これにより already-merged 経路（クローズ確認のみ）へ正しく合流するようになり、
(2) の復旧が実際に機能する。判定不能（例外・`MERGED` 以外の値）はすべて `prAlreadyMerged = false`
に倒し、ゲートは従来どおり起動する（fail-closed。新規マージの許可条件は一切広げない）。

**宣言コマンドの許可形式を厳格化する理由（A03）と、承認一覧（`args.optinTestCommands`）を
唯一の実行許可根拠にした理由**: 宣言はイシュー本文（非信頼データ）由来
であり、それを実装エージェントがそのまま実行する構造になる。宣言値そのものへの形式検証
（文字集合・パストラバーサル・許可ランナー・サブコマンド制約等）だけでは、`OPTIN_TEST_RUNNERS`
に含まれるランナー自体が `make` / `npm run` / `yarn run` / `deno task` のような**任意タスクの
ディスパッチャー**であるため、形式が正しい `make deploy`・`npm run release`・
`go test -exec=x ./...` のような値も本文だけで通ってしまい、任意タスク起動を構造的に閉じられない。
そのため実行許可の根拠は「形式が正しいか」ではなく「ラン起動時に人間が明示した承認一覧
（`args.optinTestCommands`。最大 20 件）に正規化後の文字列が完全一致で含まれているか」とする。承認一覧の各要素は起動時に `validateOptinCommandForm`（文字集合・
改行拒否・`.` に隣接しない `..` 拒否。`hasParentPathTraversal` は `/(^|[^.])\.\.([^.]|$)/` で
判定する。区切り文字を列挙する方式では `make -C..`・`pytest -I../x` のような短オプション
接着形がすり抜けるため、「`..` の前後が `.` でなければ拒否」という直接判定とする。
`go test ./...` は `..` の前後どちらかが必ず `.` になるため誤検出しない・`//` 拒否・先頭
トークンの許可ランナー・一部ランナーの第 2 トークン制約）で検証し、1 件でも不合格なら**起動
時エラーで停止**する（`args.externalChecks` と同じ厳格さ。誤記を黙って読み替えない）。`mvn`
（GAV 形式ゴール指定。`:` を 2 個以上含むトークンを拒否）と `deno`（`npm:` / `jsr:` /
`http:` / `https:` リモート指定子を拒否）は、第 2 トークン制約だけでは塞げない任意プラグイン
実行・外部コード取得の迂回経路があるため専用の追加拒否（`hasMavenGavGoal` /
`hasDenoRemoteSpecifier`）を持つ（いずれも
`validateOptinCommandForm` に集約済みで承認一覧側の検証に一律で効く）。

イシュー本文側 `parseOptinTestDeclarations` は承認一覧を渡された時点で形式検証済みの値
とだけ照合すればよいため、宣言値の正規化（水平空白の畳み込み）と承認一覧との**文字列完全
一致**判定のみを行う（形式検証の再実施はしない）。一致しない宣言・承認一覧が未指定 / `[]`
の状態での宣言・宣言件数上限（10 件）超過はすべて不合格として実装起動前に `blocked` で
停止する（fail-closed。不合格値を捨てて宣言なし扱いにすると、ゲートが黙って無効化され
既定無効の裏をかく形で fail-open になる）。

**`recoveryOnly`、または新規マージ経路であっても PR が既に `MERGED` と独立確認できた場合
（`prAlreadyMerged`。Issue #509）ではこのゲート用エージェントを起動しない**（前者は新規マージを
しない経路にゲートを課しても意味がないため、後者は latch 復旧手段 (2) を機能させるため）。
宣言がある場合はホストが終端 note へ確認依頼のログを残すのみで、追加のエージェント呼び出しは
行わない。
