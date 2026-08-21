---
name: implement-issue-tree
description: >
  親イシュー配下のサブイシュー（孫含む）を依存順を保ちつつ worktree で並列に自動実装・push 前 review・PR 作成・CI 監視・マージ可能状態化まで一括自動化。
  「イシューツリーを並列実装」「配下のサブイシューをまとめて実装」「ツリー全体を並列で実装して」「イシュー階層を自動開発」で使用。
  per-issue 計画立案（Plan: セッション継承モデル）→実装（Implement: sonnet）の分業。push 前 review（Review 通過後にのみ push・PR 作成して CI を 1 回だけ起動）。
  外部チェック構成は args の externalChecks で明示（{"app", "context"} の組で宣言。[] で「なし」を確定して不要待機なし・未指定なら自動マージ停止・slug のみの旧形式は自動マージ fail-closed）。
  自動 squash merge は autoMerge: true + externalChecks 明示（全 App の信頼済み context 宣言込み）の opt-in で実行（merge-exec の自己取得再検証 + サーバー側 branch protection 実測が前提。既定 false はマージ可能状態で停止し人間がマージ。サーバー側 workflow サンプル（upstream の docs/implement-issue-tree/auto-merge-sample.yml 参照）+ branch protection への委譲も可）。並列度（parallel）と依存（dependsOn）で実行順を制御。
  単一イシューの実装は implement-issue、PR レビューは implement-review-pr を参照。
model: sonnet
user-invocable: true
argument-hint: "<親イシュー番号> [マージ先ブランチ（省略時 main）] [並列度（省略時 3）]"
---

# implement-issue-tree

親イシュー番号を指定し、配下のサブイシュー（孫含む）を依存順を保ちつつ worktree で並列に自動実装・ローカル diff レビュー・push + PR 作成・CI 監視・マージ可能状態化まで自動化する Workflow を起動する。squash merge は `autoMerge: true` + `externalChecks` 明示（全 App の信頼済み check context 宣言込み）の opt-in ランでのみクライアント側で実行する（references/automerge-design.md の「クライアント側自動マージの設計」節参照）。既定（`autoMerge` 未指定 / `false`）ではマージせず停止し、マージは GitHub 上で人間が行う。

CI リソース節約のため「push 前 review」設計を採用している。Implement フェーズではローカルブランチにコミットのみ積み、Review が全通過した後にはじめて push・PR 作成を行う。Review が収束失敗した場合は push も PR も作らないため、CI が一切起動しない。

末端の実装イシューは post-order DFS の順序を優先度として空きスロットへ貪欲投入し、最大 `parallel`（既定 3）件まで並列実行する。各 implement / fix は独立した git worktree で隔離実行されるため、並列でもブランチ・working copy が衝突しない。機能的依存（`dependsOn`）と親子関係（親は全子の完了を待つ verify-close）だけが待機条件となる。

## 前提条件

- `gh` CLI がインストールされ、認証済みであること（`gh auth status` で確認）
- `jq` CLI がインストールされていること（`command -v jq` で確認）。「全チェックが pass に見えるのにマージが進まない場合（cancel された run の残存 check）」節の人間の診断専用コマンド (B) は `gh api --paginate --slurp` の生 JSON を外部の `jq` へパイプして平坦化・集約するため、`gh --jq` だけでは代替できない。未導入の場合はそのコマンドを実行せず（rerun もせず）`blocked` として扱う
- `awk` CLI がインストールされていること（`command -v awk` で確認）。同節のエージェント実行可能コマンド (A) は `--jq` がページ単位にしか適用できないため、ページ跨ぎの重複を集約する際にシェル側 `awk` へ依存する。未導入の場合はそのコマンドを実行せず `UNDETERMINED`（判定不能）として扱う
- git working tree が clean であること（`git status` で確認）
- マージ先ブランチが CI green の状態であること（`autoMerge` 運用ではランの完了後にも確認する。後述の strict = false 前提により、古い base に対して成功したチェックのままマージされ得るため）。**この確認はマージ先ブランチへの push で CI が起動することに依存する**。push トリガの workflow が無い、または `paths` フィルタで該当 head では起動しないリポジトリでは前提確認・完了後確認のいずれも検証不能であり、`autoMerge: true` は非推奨とする。成立可否の確認手順（対象（マージ先）ブランチを検査するプローブ。`branch` 未指定時のみ既定ブランチへフォールバック）と不成立時の扱いは references/automerge-design.md の「補償策の成立確認（base CI プローブ）」節を参照
- （`autoMerge: true` で使う場合）ベースブランチの ruleset で **required status checks の strict（マージ前の base 最新化必須 = `strict_required_status_checks_policy`）を `false` にしていること**。`true` だと 1 件マージするたびに他の open PR の base が陳腐化し、並列ラン（`parallel >= 2`）が収束しない。G0 は strict を要件にしないため `false` でも自動マージは成立する（references/automerge-design.md の「strict を G0 の要件にしない理由」節）
- 対象リポジトリへの書き込み権限があること
- 親イシューと子イシューが GitHub の sub-issues API で紐付いていること（紐付けは `create-issue` / `create-issue-tree` を参照）

## 使い方

Workflow ツールで `scriptPath` にこのスキルディレクトリ内の `scripts/implement-issue-tree.js` を指定して起動する。パスは導入形態で異なり、後述の merge-guard hook のパスと**同じ導入形態なら同じルート配下**にある（js と hook は必ず同一のスキルディレクトリに同居する）。3 レイアウト:

- **upstream `skills/` レイアウト**（本リポジトリ `Fandhe-AI/agent-cli-skills` のソース）: `skills/implement-issue-tree/scripts/implement-issue-tree.js`
- **`.agents/skills/` に vendored**（`npx skills add Fandhe-AI/agent-cli-skills` で導入した downstream リポジトリ）: `.agents/skills/implement-issue-tree/scripts/implement-issue-tree.js`
- **`.claude/skills/` symlink 経由**（本リポジトリが内部参照に使うレイアウト。実体は `skills/` を指す symlink）: `.claude/skills/implement-issue-tree/scripts/implement-issue-tree.js`

```json
{
  "scriptPath": "<このスキルディレクトリ>/scripts/implement-issue-tree.js",
  "args": {
    "parent": "<親イシュー番号>",
    "branch": "<マージ先ブランチ（省略時 main）>",
    "parallel": "<並列度 1〜8（省略時 3）>",
    "externalChecks": "<外部チェック App と信頼済み required check context の組の配列（例: [{\"app\": \"cursor\", \"context\": \"Cursor Bugbot\"}]。使用しない場合は []。slug 文字列のみの旧形式も受理するが、context 未宣言のためクライアント側自動マージは fail-closed で停止する）>",
    "autoMerge": "<boolean。true + externalChecks 明示（確定。全 App の信頼済み context 宣言込み）でクライアント側 squash merge を実行する（opt-in。references/automerge-design.md の「クライアント側自動マージの設計」節参照）。既定 false / externalChecks 未確定時はマージ可能状態で停止し、マージは GitHub 上で人間が行うか、サーバー側 auto-merge workflow（upstream の docs/implement-issue-tree/auto-merge-sample.yml）+ branch protection に委ねる>",
    "maxResidualWorktrees": "<残置 worktree 総数の上限（0 以上の整数。省略時 100、0 でこの軸のみ上限なし）>",
    "maxResidualWorktreeBytes": "<残置 worktree ディスク使用量の上限（バイト。0 以上の整数。省略時 2147483648 ＝ 2 GiB、0 でこの軸のみ上限なし。件数軸とは独立、Issue #348）>"
  }
}
```

例: 親イシュー `#42` の配下を `main` へ、並列度 3・Cursor Bugbot 導入済みで実行する場合（マージ可能状態まで自動で進み、マージは GitHub 上で人間が行う）:

```json
{
  "scriptPath": ".claude/skills/implement-issue-tree/scripts/implement-issue-tree.js",
  "args": { "parent": 42, "branch": "main", "parallel": 3, "externalChecks": [{"app": "cursor", "context": "Cursor Bugbot"}] }
}
```

### 引数

| 引数 | 必須 | 既定 | 説明 |
|------|------|------|------|
| `parent` | 必須 | — | 親（ルート）イシュー番号。`issue` でも可 |
| `branch` | 任意 | `main` | マージ先ブランチ。不正な文字を含む場合はエラー |
| `parallel` | 任意 | `3` | 並列実行数（1〜8）。`1` を指定すると実質的に直列実行になる |
| `externalChecks` | 任意 | 未指定 | GitHub Actions 以外の外部チェック宣言の配列（最大 10 件）。要素は `{"app": "<slug>", "context": "<required check context>"}` の組で宣言する（slug は英小文字・数字・ハイフン。複数 context は `contexts` 配列。slug 文字列のみの旧形式も受理するが context 未宣言としてクライアント側自動マージは fail-closed で停止する）。**未指定と `[]` は意味が異なる** |
| `autoMerge` | 任意 | `false` | **`true` + `externalChecks` 明示（確定。全 App の信頼済み context 宣言込み）の opt-in ランでクライアント側 squash merge を実行する**（references/automerge-design.md の「クライアント側自動マージの設計」節参照。マージは merge-exec の自己取得再検証（HEAD sha・checks・スレッド・外部チェック）+ G0（ベースブランチのサーバー側強制の実測 = required status checks の bypass 不能性（ruleset は `bypass_actors` 空。classic branch protection のみのリポジトリは非対応 — bypass 不能性の検証に必要な protection 読取が admin 権限を要求し write トークンで証明できないため `classic-unsupported` で辞退）+ strict 適用（マージ前の base 最新化必須）+ レビュースレッド解消の必須化 + 手順 3 の合格判定対象チェック context の required 化（client-only チェックの不在）+ 外部チェック App の宣言 context + App ID 組（`context` + `integration_id`）束縛の required 化 + required checks 全エントリの発行元 `integration_id` 束縛（同名 commit status 偽装の遮断。検証できなければ `issuer-unbound`）。確認できなければ `server-enforcement-missing` で `blocked` 終端）+ `--match-head-commit` + merge-verify の独立確認を経る。monitor の出力はマージ経路の入力に使われない）。既定 `false`・`externalChecks` 未確定時・信頼済み context 未宣言時（slug のみの旧形式）は従来どおりマージせず、PR はマージ可能状態の `blocked` で停止する（実装・push 前 Review・PR 作成・CI 監視・fix ループは値によらず自動で進む）。opt-in を使わない場合、auto-merge はサーバー側 workflow（upstream の `docs/implement-issue-tree/auto-merge-sample.yml`）+ branch protection への委譲、または GitHub 上での人間マージで行う（対象ブランチに branch protection を設定することを推奨）。注意: merge-guard hook 導入リポでは subagent の `gh pr merge` が deny されるため opt-in マージと hook は併用できない。boolean 以外はエラーで停止（誤記を黙って読み替えない） |
| `maxResidualWorktrees` | 任意 | `100` | 残置 worktree 総数の上限（DoS 防止ゲートの件数軸。バイト軸 `maxResidualWorktreeBytes` と独立に併用され、判定は OR＝どちらか一方でも超過すれば新規着手を止める）。ラン開始時に横断スキャンで観測した worktree の**物理総数**（メイン worktree のみ除外。状態ファイル追跡済み＝使用中の worktree も数える。使用中かどうかはディスク消費を変えないため。PR #185 codex P1 第 5 ラウンド）がこの値を**超過**（`>`）していたら、ディスク枯渇を防ぐため**新規イシューの着手を停止**する（fail-closed。既に走行中のイシュー・monitoring の継続は停止しない）。dispatch ループは新規着手の直前に毎回「開始時観測 + 本ラン積み増し（`ephemeralWorktrees.length`。implement / review / pr-create / fix-routing-error の新規作成台帳）」を再評価し、本ランの積み増しで上限を超えた時点でも以降の新規着手を停止する（PR #185 codex P1。バイト軸にも同種の途中経過再評価があるが、算出方法が異なるため後述）。さらに並列投入済みでまだ記録に到達していないタスク分を見込み、新規着手 1 件あたり最大 6 件（implement ×1 + review ×3 + pr-create ×1 + fix-routing-error ×1。`EPHEMERAL_KIND_MAX` テーブルから導出）、monitoring 再開 1 件あたり最大 1 件（fix-routing-error 分）を予約計上し、「実測 + 予約 + 着手候補分」が上限を超える投入を止める。**monitoring 再開自体もこの予約込み判定の対象**（ただし `item.kind === 'implement'` の再開に限る。verify-close ノードとして到達した再開は `runVerifyClose` が Merge ループへ入らず fix-routing-error を積み増さないため予約 0 で対象外。PR #185 Bugbot Medium と同じ線引き）であり、開始前に同じ projected 判定を適用して超過が見込まれる場合は当該イシューの再開をこの周回に限り defer する（恒久停止はしない。次周回・次回実行で予約解放後に再評価。pet-hub PR #1062 codex-review P1 対応。修正前は monitoring 再開自身の開始を無条件で許可しており、monitoring 項目を順次再開し続けると上限を無視して残置数を際限なく増やせた）。予約起因の超過見込みは今周回の投入見送り（defer）に留め、予約が解放されれば再開する。実測超過は従来どおり恒久停止する（PR #185 codex P1 第 2 ラウンド。ただしこの恒久停止＝`newStartSuppressed` は monitoring 再開の開始自体は妨げない設計を維持しており、上記の monitoring 再開専用 defer とは独立したゲート）。ラン開始時の横断スキャン自体が失敗した場合も、いずれかの軸が有効（`maxResidualWorktrees > 0 || maxResidualWorktreeBytes > 0`）なら残置総数を確認できないとみなして新規着手を停止する（fail-closed。両軸とも `0` 指定時のみ観測失敗でも続行。観測失敗時（`residualObserved === false`）も monitoring 再開（`item.kind === 'implement'` の再開に限る）は fail-closed で defer する — 観測できない状態での worktree 積み増しを許す fail-open を避けるため、`monitoringResumeGateDeferred` へ理由を記録してこの周回の再開を見送る（恒久停止ではない。次周回・次回実行で再評価する））。スキャン一覧が非空でも、独立取得したレコード総数との件数照合に不一致（転記の一部脱落の疑い）があれば同様に観測失敗として停止する（PR #185 codex P1 第 4 ラウンド）。使い捨て worktree は削除しない設計（references/recovery.md の「worktree の自動削除」節）のため、この上限超過時は `git worktree list` で確認し不要な worktree を `git worktree remove` で**手動削除**してから再実行する。`0` は「この件数軸のみ上限なし（チェック無効）」の明示オプトアウト（バイト軸の fail-closed には影響しない）。**負値・非整数はエラーで停止**（マージゲート入力と同じ厳格さ。誤記を黙って読み替えない）。既定値は 100（旧既定 20 では 1 イシュー消化あたり実測 4〜6 件の積み増しで 1 ラン 3 件着手が頭打ちになったため Issue #348 で引き上げ。linked worktree は object store を共有し working tree 分のみディスク消費のため 100 件でも過大ではないが、根拠は本リポジトリ 1 件のみの実測〔≈ 3.4 MB/件〕であり、配布先ごとに追跡ファイル量が異なるため、リポジトリ非依存の絶対閾値として `maxResidualWorktreeBytes` を必ず併用する。codex-review 指摘・PR #390）。**ただし `maxResidualWorktreeBytes: 0` でバイト軸を明示オプトアウトし、かつ本引数を未指定のままにした場合はこの補強が働かないため、既定値を安全側の旧既定 `LEGACY_DEFAULT_MAX_RESIDUAL_WORKTREES`（20）へ自動的に引き下げる**（`parseMaxResidualWorktrees` の `bytesAxisDisabled` 引数。codex-review 指摘・PR #390 第 2 ラウンド: 件数軸だけを緩和した既定値を、リポジトリ非依存の絶対閾値という補強なしに残さない）。利用者が本引数へ明示的に値を指定した場合はこのフォールバックの対象外（指定値をそのまま使う） |
| `maxResidualWorktreeBytes` | 任意 | `2147483648`（2 GiB） | 残置 worktree ディスク使用量の上限（DoS 防止ゲートのバイト軸。バイト単位。件数軸 `maxResidualWorktrees` と独立に検証・無効化でき、判定は OR）。**ラン開始時のみの観測ではない**（旧記載の訂正。codex-review 指摘・PR #390 第 2 ラウンド: 実装は当初からラン中の再評価を持っていたが本節がそれを反映していなかった）。ラン開始時に、残置パス一覧全件へ `du -sk` を実行して KiB を単純合計する観測に加え、共有 `.git` object store を除いたメイン worktree の working tree 相当サイズ（`measureMainWorktreeContentBytes`）を新規 1 worktree あたりの安全側予約 `perWorktreeByteReserve` として確定する（PR #390 codex-review P1・Cursor Bugbot High: 素の `du` 値は object store 全量を含み過大予約になるため除外する）。件数軸の「本ラン積み増し再評価」「予約計上」と同じ形で、`perWorktreeByteReserve × (台帳件数 − 直近基準確定時点の台帳件数)` の projection をラン中の新規着手・monitoring 再開の両方の直前に毎回再評価し、超過見込みで新規着手を止める（`projectResidualBytes`。基準確定時点までの積み増しは実測基準値に既に含まれているため、そこを差し引かないと二重計上になる。K8Dc 対応・PR #390）。**さらに** `perWorktreeByteReserve` は開始時に確定する下限 floor 値であり、ビルド成果物等で 1 worktree が floor を超えて成長した場合 projection だけでは過小評価し得るため、使い捨て worktree 台帳が `BYTE_REMEASURE_LEDGER_INTERVAL`（3 件）積み増されるごとに残置パス一覧＋台帳パスの合計を実際に `du` し直し（`remeasureResidualBytesIfDue`）、実測が上限を超えていれば独立に新規着手を止める。**加えて、新規着手（implement）の直前には台帳増分ゲートを介さず必ず実測し直す**（`remeasureResidualBytesNow`。台帳が 3 件増えない間も実行中 worktree はビルド成果物等で成長し得るため、台帳増分だけを契機にすると容量超過後の着手を止められない fail-open が残る — PR #390 codex-review P1 第 4 ラウンド。測定コストは「同一 dispatch 周回内は 1 回」の間引きで有界化する）。**この実測し直しは以後の projection の基準（`residualBytesAtStart`・台帳オフセット `byteBaselineLedgerCount`）を同一代入で更新する**（実測結果を上限超過の即時判定にのみ使って破棄すると、以後の判定が古い基準のまま容量超過の新規着手を許す fail-open になる。K8Dc 対応）。合計（直近の実測基準・projection・実測し直しのいずれか）が上限を**超過**していたら新規イシューの着手を停止する（fail-closed。既に走行中のイシュー・monitoring の継続は停止しない。件数軸で既に停止済みの場合は追加の抑止はせず観測値のみログへ記録する）。測定不能（`du` が 1 件でも失敗・非0終了・許可文字集合外のパス混入）は 0 で補わず観測失敗として扱い、この軸が有効なら新規着手を停止する（`countResidualWorktrees` の「検証不可」計上と同じ fail-closed の理由。実測し直しの失敗も projection へフォールバックせず新規着手を停止する。存在しないパス〔並行 cleanup による削除〕のみ 0 として許容し、`du` 自体の実エラーのみ測定失敗とする）。**エージェントの `worktreePath` 省略・空文字で台帳に未検証エントリが生じた場合は、この時点で `git worktree list --porcelain` の物理一覧（メイン除く全件・独立レコードカウントとの件数照合付き）へフォールバックして実測を継続し、フォールバックも失敗した場合（一覧取得不成立・件数不一致・パス検証不可）のみ従来どおり fail-closed で新規着手を停止する**（`buildPhysicalByteMeasureTargets`。review / pr-create / fix 系 worktree は隔離 worktree 内で detach するため branch 照合による帰属特定ができず、フォールバックは測定専用（削除経路へは流さない）で物理一覧を丸ごと差し替える。Issue #404）。ラン開始時観測が失敗したまま（`residualBytesObserved === false`）の場合は、monitoring 再開の projected 判定（前述の `item.kind === 'implement'` 限定の projection）自体も件数軸と同じ fail-closed 方針で defer し、観測が回復するまでそのランの monitoring 再開全体を待機させる（観測不能のまま fix-routing-error worktree の新規作成を許すと容量を確認できないまま超過し得るため）。`0` は「このバイト軸のみ上限なし（チェック無効）」の明示オプトアウト（件数軸の fail-closed には影響しない。件数軸の既定値フォールバックについては `maxResidualWorktrees` 行を参照）。**負値・非整数はエラーで停止**。既定 2 GiB は Issue #348 の検討案 B（実バイト数上限）を採用したもので、配布先リポジトリのファイル量に依存しない絶対閾値として件数軸既定値 100 の妥当性を補強する |

**`externalChecks` の 4 状態（Issue #147 → 下流 sync PR codex P0 で context 束縛へ拡張）:**

| 指定 | 意味 | マージ挙動 |
|------|------|-----------|
| 未指定 | 外部チェック構成が**未確定** | 観測結果にかかわらず自動マージを停止し `blocked` で終端する（実装・PR 作成・CI までは進む） |
| `[]` | 「外部チェックを使用しない」と人間が**確定** | 外部レビュー待機をスキップして CI green と未解決スレッドなしのみで判定する |
| `[{"app": "cursor", "context": "Cursor Bugbot"}]` 等 | 指定 App + 信頼済み required check context を正とする（観測結果より優先） | 指定した**全 App** について HEAD sha に対する起動を検証する。cursor は「レビューが 1 件以上到着し、かつ CHANGES_REQUESTED が 0 件であること」（Issue #146。個別指摘はレビュースレッドとして残るため「未解決スレッド 0 件」ゲートが内容非依存に遮断する。監視側の内容評価は修正ループ用 advisory でありマージ可否の入力ではない）、それ以外の App は check-run が 1 件以上ならその全件が許容 conclusion であること、check-run が 0 件のときに限りフォールバックとして「APPROVED レビューが 1 件以上かつ否定的レビュー 0 件」であることをマージ条件とする（Issue #155）。opt-in マージでは G0 が宣言 `context` + App ID の組で required 化を照合する |
| `["cursor"]` 等（slug のみの旧形式） | App は確定するが信頼済み context が**未宣言** | 監視・外部レビュー待機は上と同じ。ただしクライアント側自動マージは fail-closed で停止する（`autoMerge: true` でもマージせず `blocked` 終端。App ID だけの照合では同一 App の無関係な context の required 化でも G0 を通過してしまうため — 下流 sync PR codex P0 変種 1） |

観測ベースの検出は直近 3 件の merged PR しか見ないため、新規導入 App・条件付き起動 App・直近 3 件で実行されなかった App を取りこぼす。「検出なし」が不在の証明にならないのはもちろん、**「検出あり」も集合としての完全性を保証しない**（例: 観測で `sonarcloud` だけを拾い、実際には必須の `cursor` を取りこぼしたまま「確定済み」として cursor[bot] レビューの再検証を省いてしまう）。したがって観測結果は確定情報として扱わず、参考値としてログ・停止理由・返却値に残すだけにする。`externalChecks` が配列でない・slug / context の形式不正（context は 1〜255 文字で、制御文字（改行・タブ等）と前後空白のみ不可。GitHub の context には文字種契約がないため文字種は制限せず、matrix 由来の `build [ubuntu]` や日本語を含む context もそのまま宣言できる — シェル / jq への埋め込み安全性は単一引用符リテラル + `jq --arg` の値渡しで保証する）・11 件以上の場合は既定値へフォールバックせずエラーで停止する（`parallel` は性能ノブのため不正値を既定 3 へ落とすが、`externalChecks` はマージゲートの入力であり、誤記を黙って「未指定」や「なし確定」に読み替えるとゲートが静かに弱まるため）。

### 自動マージのサーバー側委譲と merge-guard hook（deny 専用・best-effort）

**クライアント側の自動マージは `autoMerge: true` + `externalChecks` 確定（全 App の信頼済み context 宣言込み）の opt-in ランでのみ実行する**（次節「クライアント側自動マージの設計」参照。opt-out 既定では従来どおりマージしない。auto-merge の予約（arm）は引き続き提供しない）。merge-guard hook は deny 専用（承認境界ではなく、迂回可能な best-effort の攻撃面削減）。

詳細: [references/automerge-design.md](references/automerge-design.md)

### クライアント側自動マージの設計（重要）

opt-in ランのクライアント側マージは、PR #182 / PR #222 codex P0（未信頼のレビュー本文を読む monitor の虚偽出力による未承認マージ誘導）に対して次の 3 層で対処する: monitor 出力のマージ経路からの分離・merge-exec の自己取得再検証・G0 サーバー側強制の実測（required checks の bypass 不能性に加え、レビュースレッド解消の必須化・合格判定対象チェック context の required 化（client-only チェックの不在）・外部チェック App の宣言 context + App ID 組束縛の required 化・required checks 全エントリの発行元 integration_id 束縛（同名 commit status 偽装の遮断 — `issuer-unbound` で辞退）まで確認し、共有 gh 認証のどのエージェントが直接マージを試みてもサーバーが同条件で拒否する構成を前提化）、の 3 層。

詳細: [references/automerge-design.md](references/automerge-design.md)

### branch protection（マージ判定の本体。人間マージ・サーバー側 auto-merge の両運用で必要）

対象ベースブランチには**サーバー側 branch protection / ruleset を設定することを強く推奨**する（ランタイムゲートではなく運用推奨）。compromised なローカルエージェントもサーバー側ルールは迂回できない。

詳細: [references/automerge-design.md](references/automerge-design.md)

## フロー

### Step 1: ツリーを取得して依存グラフ付き実行キューを構築する（Tree）

gh CLI の sub-issues API で親イシュー配下の全ツリーを再帰取得し、post-order DFS で実行キューを構築する。各 open イシューは本文を読んで機能的依存（`dependsOn`）を抽出する。

ツリー取得に続いて、直前 3 件の merged PR の check-runs から GitHub Actions 以外の外部チェック App（例: Cursor Bugbot）を観測する。**観測結果は参考値であり構成の確定情報ではない**。構成の確定は `args.externalChecks` の明示入力で行い、明示がない限り「確定不能」として後続の Merge ステップで自動マージを停止する（Issue #147）。

```bash
# 親イシューのサブイシューを取得（--paginate で 100 件超も全ページ自動取得）
gh api --paginate "repos/{owner}/{repo}/issues/<parent>/sub_issues?per_page=100"

# 各 open イシューの本文を読み、機能的依存を抽出
gh issue view <N>

# 外部チェック観測（直前 3 件の merged PR の check-runs を確認。結果は参考値）
REPO=$(gh repo view --json owner,name --jq '"\(.owner.login)/\(.name)"')
# SHA は位置引数 $1、REPO は位置引数 $2、jq フィルタは位置引数 $3 で渡す
# （REPO を子シェル内で "${REPO}" と展開すると非 export の変数は sh -c に渡らず空になり、
#  gh api が必ず失敗して常に apps: [] へフォールバックする）
gh pr list --state merged --limit 3 --json headRefOid --jq '.[].headRefOid' \
  | xargs -I{} sh -c 'gh api "repos/$2/commits/$1/check-runs" --jq "$3" 2>/dev/null' \
      _ {} "$REPO" '[.check_runs[] | select(.app.slug != "github-actions") | .app.slug] | .[]' \
  | sort -u
```

実行キューと依存グラフの構築ルール:
- 同一親内のサブイシューは sub_issues API 返却順（`siblingIndex`）で並べる
- 子イシューがすべて完了してから親イシューを処理する（親ノードは verify-close）
- closed 済みイシューは自動でスキップする
- `dependsOn` には「機能的に先行完了が必須」のイシュー番号のみを入れる（本文の明示的な依存記述・前提実装に限る。単なる関連やコンフリクトの可能性だけなら含めない）
- 祖先イシューへの `dependsOn` は無視する（親は子の完了を待つ側のため）
- 依存グラフに循環がある場合は DFS で検出し、循環を構成する非ツリー辺（`dependsOn`）を除去してデッドロックを防ぐ

### Step 2: 中断作業の回復可否を per-issue で判断する（Recover）

各末端イシューに着手する前に、残骸 worktree / ブランチが存在するかを確認する。**既存作業がなければ Recover をスキップして Plan へ進む**。既存作業がある場合は Recover phase（セッション継承モデルのエージェント）が「途中作業を継続できるか」を判断し、その結果に応じて以下のどちらかへ分岐する。

- **continue（継続）**: 既存 branch をそのまま checkout し、回復ブリーフ（done / remaining / broken の要約）を Implement へ渡して続きから実装する。Plan はスキップされる。Recover が直接 Review へ進むことはなく、継続作業は必ず Implement → Review → Merge を経由する。旧 worktree の削除は **WIP 退避の完了が検証できた場合のみ**実行する（後述の削除ゲート）。検証できない場合は残骸を削除せず `failed` で保全する（退避されていない未コミット変更を欠いたまま継続すると不完全な実装になるため、削除だけを飛ばして継続することはしない）。加えて、旧 worktree の掃除と `implementing` / `reviewing` 遷移の完了を状態更新の戻り値で確認できなかった場合も先へ進まず `failed` で保全する（旧 worktree が branch を掴んだままだと新 worktree が同一 branch を checkout できず、`reviewing` 未永続化のまま続行すると重複実装につながるため。discard 側の掃除完了確認と対）。
- **discard（破棄）**: 既存 worktree と branch を削除し、通常の Plan → Implement（新規 branch）で再実行する。削除は **WIP 退避の完了が検証できた場合のみ**実行する（後述の削除ゲート）。検証できない場合は残骸を削除せず `failed` で保全し、次回ランの Recover に委ねる。加えて、worktree / branch の掃除完了を状態更新の戻り値で確認できなかった場合も Plan へ進まず `failed` で保全する（branch 残存下で再 Plan すると `git checkout -B` が WIP commit を orphan 化するため）。

**Recover の判断軸は Review とは別**である。Review は「実装が正しいか・マージできるか」を判定するのに対し、Recover は「この途中作業から継続するのが妥当か」を判断する。動かない・未完成でも方向が妥当なら continue（残りは Implement が完成させる）。

**未 commit 変更は WIP commit として branch へ退避してから worktree を削除する**ため、continue / discard どちらの経路でもデータを失わない。discard の場合は WIP commit を残した状態で branch を削除するため、誤判定時に reflog から救出できる。

**削除ゲート（continue / discard 共通）**: Recover エージェントの返す `wipCommitted` は自己申告値であり、誤判定・異常応答・プロンプトインジェクションで真を騙られ得る。加えて Recover は「フック失敗等で退避できなかった場合は `wipCommitted: false` を返して続行する」契約のため、`continue` も退避失敗時に返り得る。そのため **continue / discard いずれの経路でも** worktree の削除は次の 2 条件を**両方**満たす場合にのみ実行する。

1. **申告ゲート**: Recover エージェントが `wipCommitted: true` を返している（退避した場合、および退避すべき未 commit 変更が最初から無かった場合に true。フック失敗等で退避できなかった場合は false）
2. **事実ゲート**: ホストが起動する読み取り専用の安全確認エージェントが、対象 worktree に未 commit 変更が残っていないこと（`git status --porcelain` の出力が空であること）を確認できている

どちらか一方でも満たさない場合、あるいは安全確認自体が失敗した場合は worktree / branch を削除せず `failed` で保全する（fail-safe）。保全された残骸は次回ランの Recover が再度判断する。worktree が無い branch のみの残骸は削除対象も未 commit 変更も存在しないため、このゲートの対象外とする。

### Step 3: イシューごとに実装計画を立案する（Plan）

各 末端イシューを実装する前に、セッション継承モデルのエージェントで実装計画を立案する（worktree なし・読み取りのみ）。計画は Implement エージェントへ引数で渡す（worktree 跨ぎのファイル参照を避けるため）。

**Recover phase で continue 判定が出た場合は Plan をスキップ**し、回復ブリーフを受け取った Implement エージェントが既存 branch から直接実装を続行する。

計画には以下を含める:
- 背景・目的（イシューが解決する課題）
- 対象ファイル・変更箇所（パスと変更内容の概要）
- 実装ステップ（順番に実行可能な具体的手順）
- 検証方法（ビルド・lint・テスト・動作確認の手順）
- OWASP Top 10 観点のセキュリティ考慮事項

計画エージェントが異常終了または計画本文が空の場合は、該当イシューを `failed` として記録して次へ進む。

### Step 4: 末端イシューを worktree 隔離で並列実装する（Implement）

末端の実装イシューを post-order DFS 順を優先度として空きスロットへ貪欲投入し、最大 `parallel`（既定 3）件まで並列実行する。各 implement / fix エージェントは**独立した git worktree** で隔離実行されるため、並列でもブランチ・working copy が衝突しない。

**ここでは push も PR 作成も行わない**。CI リソース節約のため、Review 通過後にまとめて 1 回だけ push・PR 作成する設計になっている。

各イシューの処理内容（Step 3 で立案した計画に従って実装する）:
0. **worktree routing ガード**（最初に実行）: `git remote get-url origin` とイシュータイトル照合でカレント worktree が正しいリポ・イシューに配置されているか確認する
0b. **既存 PR・リモートブランチを確認する**（中断再開・重複 PR 防止）:
   - 0b-a（open PR 検索）: `gh pr list --state open` でイシュー番号に対応する open PR が既に存在するか確認する。見つかれば新規 PR を作らずそのブランチを取得して続きから作業し、そのブランチ名を返す（PR 番号は返さない。同じブランチの open PR は後続の PR Create フェーズが再検出して再利用する）。**手順 2 のブランチ作成はスキップする**（`origin/<base>` から `checkout -B` し直すとその PR のコミットを失うため）
   - 0b-b（リモートブランチ再利用）: open PR が見つからない場合、`git ls-remote --heads origin` でイシュー番号を含むリモートブランチ（命名規約: `<type>/<N>-<short-name>`）が残っていないか確認する。「push 成功・PR 作成失敗」で残ったブランチを検出し、`git fetch origin <branch> && git checkout -B <branch> origin/<branch>` で取得して push 済みコミットを保持したまま続きを実装する（`origin/<base>` から新規作成し直さない）。branch 名として返し、prNumber は 0 のまま（PR は後続の PR Create フェーズが作成）
   - 0b-c: open PR もリモートブランチも存在しない場合のみ手順 1・2 で新規ブランチを作成する
1. 隔離 worktree で `git status` が clean か確認し、差分があれば作業せず失敗を返す
2. （0b-a で既存 open PR のブランチを取得した場合・0b-b でリモートブランチを再利用した場合はスキップ）指定ブランチ（デフォルト: `main`）から作業ブランチを作成する（並列時のブランチ名衝突を防ぐためブランチ名にイシュー番号を含める）
3. **渡された計画に従って実装する**（計画立案は Plan フェーズで完了済み）。実装は対象リポジトリの delegation ルール・専門サブエージェントがあればそれに従い役割単位で委譲する

   コメント方針（実装時）:
   - コードコメントは「何をするか」より「なぜ存在するか／パッケージ・サービスから見た対象の役割」を書く
   - 後続の読み手（Claude を含む）は渡された情報からしか判断できないため、他ファイル・他サービス・呼び出し元/呼び出し先からの観点を明示する（このシンボルがどこから呼ばれ、どの境界を担うか）
   - 詳細は対象リポジトリの `.claude/rules/code-comment-style.md`（`init-claude` が配備）に従う

4. 対象リポジトリの CLAUDE.md・rules・テスト実行規約に従いビルド・lint・テストを通す。テストが失敗した場合は根本原因を調査してから修正する（`.claude/rules/debugging.md` の4フェーズを順に踏む。同一箇所で3回失敗したらアーキテクチャ問題と判断し、該当イシューを `blocked` として記録してユーザーに状況を報告する）
5. 実装後に OWASP Top 10 観点でセキュリティチェックを実施する（API キーのハードコード・インジェクション等）。問題が見つかった場合は修正してから次へ進む
6. 実装が完了したら `create-commit` スキルに従い Conventional Commits で**実装コミットを 1 つ**作成する。
   コミット前に対象リポの commitlint 設定（`commitlint.config.*` / `.commitlintrc*` / `package.json` の
   `commitlint` フィールド）を**読み取って** `type-enum` / `scope-enum` を確認し、許可された値のみを使う。
   該当する scope が無ければ scope ごと省略する（`feat: 実装内容`）。**scope にイシュー番号を置かない**
   （`scope-enum` を設定したリポでは必ず落ち、Review 3 巡を消費した後の push で初めて検出される）。
   イシューとの紐付けは footer の `Refs #<N>` と PR 本文の `Closes #<N>` で行う
7. **push・PR 作成はここでは行わない**。ローカルブランチにコミットを積んだ状態で終了し、後続の Review フェーズへ渡す

```bash
# 作業ブランチ作成例（並列時の衝突回避のためイシュー番号を含める）
git fetch origin && git checkout -B feat/<N>-<short-name> origin/<base-branch>

# 実装コミット（push しない）
# scope はイシュー番号ではなく変更対象のモジュール・ディレクトリ名。
# 対象リポの commitlint の scope-enum に該当する値が無ければ scope ごと省略する。
git commit -m "$(cat <<'EOF'
feat(<module>): 実装内容

Refs #<N>
EOF
)"
# → push・PR 作成は Review 全通過後に行う
```

### Step 5: push 前のローカル diff を独立レビューする（Review）

Implement 完了後・push 前に、worktree 隔離で独立 Review エージェントを起動してローカル diff をレビューする。**push・PR 作成は行わず**、ローカルコミットだけを対象にレビューする。Review エージェントは**修正を行わず判定のみ**を担う。

**CI リソース節約の目的**: Review が収束失敗した場合は push も PR 作成も行わないため、CI が一切起動しない。fix のたびに push → CI 実行を繰り返すコストを削減する。

レビューは以下の2段階で実施する。

**①仕様準拠レビュー**（先に実施）:
- イシューの要件・受け入れ条件を充足しているか確認する
- out-of-scope の実装が混入していないか確認する
- Plan フェーズの計画どおりに実装されているか確認する

**②コード品質レビュー**（①通過後に実施）:
- 可読性・重複・設計（アーキテクチャ準拠・命名規則）を確認する
- OWASP Top 10 セキュリティ（API キーのハードコード・インジェクション・認証認可等）を確認する

詳細は `implement-review` スキルを参照。

レビュー条件:
- `git checkout --detach <branch>` でローカルブランチを detached HEAD として取得する（`origin/<branch>` は push 前のため存在しない）
- レビュー直前に `git fetch origin <base-branch>:refs/remotes/origin/<base-branch>` を **必ず 1 回実行**して比較基準を最新化する（ref の存在有無で分岐しない）。**保存先を明示した refspec を使う** — `git fetch origin <base-branch>` のように取得元だけを与えた形は `FETCH_HEAD` を更新するだけで `refs/remotes/origin/<base-branch>` の作成・更新を保証せず、fetch 成功後の解決に失敗して実施可能なレビューを `blocked` で落とす（Issue #361）
- `git diff origin/<base-branch>...HEAD` でローカル diff を確認する（`origin/<base-branch>`（直前に取得し直した remote-tracking ref）が比較基準。3 点ドットのため比較点は `merge-base(origin/<base-branch>, HEAD)` ＝ブランチの分岐点に固定され、以降ラン中に origin が進んでも比較点は不変。既存 ref があっても古ければ merge-base が実際の分岐点より手前に落ち、base 側の無関係なコミットが差分へ混入するため「ref があること」を新しさの根拠にしない。fetch に失敗した場合、および fetch 後も解決できない場合はレビューを実施せず `state: "blocked"` / `highestSeverity: "none"` で fail-closed 終端する。`blocked` は環境要因でレビュー自体が実施不能だったことを表す専用状態で、コード指摘を表す `needs-fix` とは呼び出し元の扱いが異なり fix エージェントを起動せず即座に終端する — `needs-fix` / `critical` は使わない。無関係なコードへの修正試行で修正予算を消費させないため）
- **Low（要改善）含む指摘が 1 件でも `needs-fix`**。指摘なしなら `ok`

`ok` の場合は push + PR 作成（Step 4.5）を経て Merge ステップへ進む。`needs-fix` の場合は fix エージェントで**ローカルに再コミット**し再レビューする（push しない）。**Review は最大 3 回**実施し、最終回（残り 0 回）の `needs-fix` では再レビューできないため fix を行わず収束失敗とする（修正後に必ず再レビューする原則を守るため。fix は実質最大 2 回）。3 回で収束しない場合は**push も PR 作成も行わず** `blocked` として記録して次のイシューへ進む。

Review / Merge の fix は `fixCount`（上限 6）を共有する。

### Step 5.5: Review 通過後に push + PR を作成する（PR Create）

Review が全通過（`ok`）した後にのみ実行する。この push が CI トリガーになる（push は 1 回のみ）。

```bash
# Review 通過後にはじめて push する（CI がここで起動する）
git push origin <branch>

# PR 作成（Closes でイシューと紐付け）
gh pr create \
  --base <branch> \
  --title "feat: イシュータイトル" \
  --body "$(cat <<'EOF'
## Summary
- 実装内容の要約

Closes #<N>
EOF
)"
```

**既存 open PR の再利用（Issue #135）:** push 成功後・`gh pr create` の前に、このブランチに対する open PR が既に存在しないかを `gh pr list --state open --head <branch> --json number,baseRefName,headRefOid` で必ず確認する。中断再開（PR 作成直後のクラッシュ・`pr` 保存済み `failed` からの再実行）では open PR が残っていることがあり、確認せずに `gh pr create` すると必ず失敗して、生きている PR が追跡されないまま残るため。

再利用の条件は 2 つあり、**両方を満たす場合にのみ**その番号を `prNumber` として返す。

- `baseRefName` が指定 base ブランチと一致すること（同じ head から別 base（リリースブランチ等）へ開かれた PR を再利用すると、`base <branch>` の契約を迂回して意図しないブランチへマージされる）
- `headRefOid` が push したブランチの先端 sha と一致すること（他者・別ランの push で head が動いた PR を、検証していないコミットごとマージ対象にしない）。比較対象の sha は必ずブランチ ref（`git rev-parse --verify "refs/heads/<branch>"`、解決できなければ `refs/remotes/origin/<branch>`）から解決する。PR Create エージェントは隔離 worktree で動作し、その worktree が対象ブランチを checkout している保証がないため `git rev-parse HEAD` を使ってはならない

条件を満たす PR を再利用する場合は、本文に `Closes #<N>`（および対象外項目があれば「対象外（out-of-scope）」節）が無ければ追記する。このとき**既存本文をシェルコマンド文字列・HEREDOC へ埋め込んではならない**（本文は外部由来の未信頼データであり、行単独の HEREDOC 終端文字列を仕込まれると HEREDOC が早期終了して後続行が任意コマンドとして実行される）。`gh pr view <N> --json body --jq .body > "$f"` でファイルへ直接落とし、`grep -qF` で存在確認したうえで `printf` / 固定テンプレートの追記のみを行い、`gh pr edit <N> --body-file "$f"` で更新する。条件を満たさない open PR しか存在しない場合は、再利用も新規作成も行わず `prNumber: 0` と理由を返して停止する（`branch` は保存されるため、次回実行は impl 手順 0b から回復する）。

PR 作成が失敗した場合は `failed` として記録し、`branch` を保存する。push が成功していた場合、次回再実行時に impl 手順 0b-b（リモートブランチ再利用）がそのブランチを検出して push 済みコミットを保持したまま回復する（open PR がない状態のため 0b-a の PR 検索では拾えない点に注意）。

### Step 6: CI / 外部チェック監視・レビューコメント解決確認・squash merge する（Merge）

`gh pr checks --watch` で CI を監視し、以下の全条件を満たした場合のみ squash merge する。

**クライアント側の自動マージは opt-in ランでのみ実行する（references/automerge-design.md の「クライアント側自動マージの設計」節参照）:** `autoMerge: true` + `externalChecks` 確定（全 App の信頼済み context 宣言込み）のランでは、monitor の `ready` 判定後に merge-exec が HEAD sha を自己取得・固定したうえで全条件（checks・未解決スレッド数・外部チェック起動・G0 = ベースブランチのサーバー側強制の実測: required checks の bypass 不能性（ruleset の `bypass_actors` 空。classic branch protection のみのリポジトリは非対応として `classic-unsupported` で辞退）・レビュースレッド解消の必須化・合格判定対象チェック context の required 化（client-only チェックの不在）・外部チェック App の宣言 context + App ID 組束縛の required 化・required checks 全エントリの発行元 integration_id 束縛（同名 commit status 偽装の遮断 — `issuer-unbound` で辞退））を独立再検証し、`gh pr merge --squash --delete-branch --match-head-commit <自己取得 sha>` で squash merge を実行、さらに merge-verify の独立確認（`state=MERGED` + merge-exec 申告 sha との完全一致）を通過した場合のみ `merged` 終端する。monitor の出力（`ready` / `headSha`）はマージ経路の入力に使われない（`ready` は起動タイミングのみ。PR #222 codex P0 対応）。G0 を確認できないリポジトリでは `server-enforcement-missing`（classic branch protection のみのリポジトリは `classic-unsupported`）で `blocked` 終端する（fail-closed。ruleset ベースの branch protection を構成して再実行すれば継続する）。opt-out（既定 `false`）・`externalChecks` 未確定・信頼済み context 未宣言（slug のみの旧形式）のランでは従来どおり新規マージを実行せず、PR をマージ可能状態のまま `blocked`（`blockedReason: quality`）+ `pr` 保持で終端する。opt-out 時は monitor が `ready`（虚偽含む）を返しても merge-exec は `gh pr merge` を含まない回復専用経路に固定される（既存 Issue #168 機構。recoveryOnly。opt-in 判定はホストの決定的コード = args パースのみ。モデル出力・未信頼テキストに依存しない）。マージ済み PR のクローズ回復（already-merged 経路）は両モードで通る。この経路は「前回ランでマージ済みだが状態記録に失敗した PR」に加えて、**サーバー側 auto-merge workflow（upstream の `docs/implement-issue-tree/auto-merge-sample.yml`）が監視中に PR をマージした場合**も同様にカバーし、いずれも正常完了（merged）として終端する。`blocked` + `pr` は次回ランの monitoring 再開対象で、マージは **GitHub 上で人間が行う**か、サーバー側 auto-merge workflow + branch protection に委ねる（references/automerge-design.md の「自動マージのサーバー側委譲と merge-guard hook」節参照）。

**クライアント側自動マージの経緯と現契約**: 当初は host が発行する grant（正規マージコマンド全文 = `expectedCommand`）を merge-guard hook が完全一致照合する allow 経路で承認境界を作ろうとした。しかし monitor は未信頼のレビュー本文を読みつつ merge-exec と同じ Bash・`gh` 認証・FS を共有し、`gh pr view` で HEAD を取得して任意 nonce の grant を自作できる（**grant 偽造 P0**）。hook 専用の秘密注入経路がなく、hook が検証でき subagent が読めない鍵を持てないため署名 / MAC も実装不能で、偽造不能なマージ認可を hook で実装することは原理的に不可能。その後 PR #206 のクライアント側 arm（agent precheck + hook carve-out）も、carve-out が認可と結び付かず任意 subagent に arm を開放し（codex P0）、precheck が agent 自己申告で捏造可能（codex P0）、`--auto` の即時マージで「予約のみ」前提が虚偽（Bugbot High）と確認され撤回した。この時点では Codex 元指摘（rust-ai-library PR #441）の「境界を実装できるまで自動マージ無効化」に従い、grant / canary / branch-protection ランタイムゲートと precheck / arm / carve-out をすべて撤去し、hook を deny 専用（best-effort・承認境界ではない）とし、クライアント側の自動マージ経路を**いったん閉じた**。**現契約（2026-08-12 の opt-in 再有効化以降）**: 既定（`autoMerge` 未指定 / `false`）は従来どおり新規マージを行わずマージ可能状態の `blocked` で停止する。`autoMerge: true` + `externalChecks` 明示（全 App の信頼済み context 宣言込み）の opt-in ランに限り、monitor 出力のマージ経路からの分離・merge-exec の自己取得再検証・G0（サーバー側強制の実測。確認できなければ `server-enforcement-missing` で fail-closed 辞退）・`--match-head-commit`・merge-verify の独立確認を前提としてクライアント側 squash merge を実行する（本 Step 冒頭の opt-in 説明と references/automerge-design.md「クライアント側自動マージの設計」節参照。残存リスクとその受容記録も同節にある）。grant / canary / precheck / arm / hook carve-out は再有効化後も復活していない。**正規経路の外**（注入に従った monitor 自身の `gh pr merge` 直接実行・REST / GraphQL merge・approve・alias / extension）は merge-guard hook が best-effort で deny するが、これは迂回可能な多層防御の一層にすぎない。**実際にマージを止めるのは opt-out 既定の fail-closed（host が opt-in なしに新規マージ経路を開かない）と、サーバ側 branch protection**（第三者=非 author 承認必須・dismiss stale・通常/force push 禁止・required checks。references/automerge-design.md の「自動マージのサーバー側委譲と merge-guard hook」節参照）であり、opt-in ランでも G0 が同条件のサーバー側強制を実測確認できない限りマージしない。opt-in を使わない auto-merge は同節のサーバー側 workflow（upstream の `docs/implement-issue-tree/auto-merge-sample.yml`）へ委譲する。

**監視とマージ実行の分離（Issue #145）・merged 自己申告の独立確認（Issue #160）:** このステップは監視・マージ実行・独立確認の 3 つのエージェントに分かれる。実行基盤がエージェント単位のツール権限制御を提供しないため、これは権限の剥奪ではなく**コンテキスト分離**（未信頼テキストをマージ実行主体へ入れない）である。残存リスクと必要な基盤対応は「非信頼データの扱い」項目 5 を参照。
- **監視エージェント（monitor）**: CI・外部チェック・レビュースレッドを確認し、`state`（`ready` / `needs-fix` / `unresolved-comments` / `timeout` / `blocked`）と `headSha`（40 桁）を返す助言的判定のみを行う。PR レビュー本文という未信頼データを読むため、`gh pr merge` / `gh issue close` / `gh pr edit` / resolve mutation の実行権限を持たない。
- **マージ実行エージェント（merge-exec）**: 監視が `ready` を返したときにホストが起動する。レビュー本文・Issue 本文・**チェック名**を一切読まず、**リポジトリ内ファイル（CLAUDE.md・`.claude/rules` 等 = PR 側で変更可能な未信頼テキスト）も読まない**（実装系エージェント向けの共通指示 COMMON を挿入せず、merge-verify と同一の最小指示で構成する）。PR の `state` / `headRefOid` / `mergeable`（enum・sha）、チェックの**状態別件数**（`gh pr checks <N> --json state --jq '[.[].state] | group_by(.) | map({state: .[0], count: length})'`。素の `gh pr checks` や `--json name / description / link` は使わない）、未解決レビュースレッドの**件数のみ**（GraphQL から `comments` を外して body を取得しない）、および `args.externalChecks` で確定した外部チェック App について HEAD sha に対する**件数と状態 enum のみ**（`--jq` で正規化。App 名・チェック名・body 等のテキストは取得しない）を自ら再取得して検証し、さらに G0 ゲート（ベースブランチのサーバー側強制の実測: required checks の bypass 不能性（ruleset の `bypass_actors` 空。classic branch protection のみのリポジトリは bypass 不能性を write トークンから証明できないため非対応 — `classic-unsupported` で辞退）・レビュースレッド解消の必須化・合格判定対象チェック context の required 化（HEAD sha 上の check-run / commit status のうち required に含まれないものが 0 件であることを jq の集合差の**件数のみ**で照合。context 文字列は取得しない）・外部チェック App の宣言 context + App ID 組（`context` + `integration_id`）束縛の required 化 + required checks 全エントリの発行元 `integration_id` 束縛（HEAD の check-run の `.app.id` と一致することの件数照合。同名 commit status 偽装の遮断 — 検証できなければ `issuer-unbound` で辞退）。件数・真偽値のみの API 出力で確認し、確認できなければ `server-enforcement-missing` で辞退）を通過した場合にのみ squash merge とイシュークローズを実行する。HEAD sha は自身の `gh pr view` 観測から取得・固定し（monitor から受け取らない。PR #222 codex P0 対応）、マージは `gh pr merge <N> --squash --delete-branch --match-head-commit <自己取得 sha>` で実行して、照合とマージの間に push される競合（TOCTOU）を GitHub 側の条件評価で塞ぐ。
  - チェック名を除外するのは、名称が PR 側の workflow / job / matrix 定義から生成される外部由来テキストであり、マージ権限を持つ実行主体のコンテキストへ命令文を持ち込む経路になるため（PR #150 codex-review P0 対応）。外部チェックの**件数**（非負整数）と `.conclusion` / `.status` の**状態 enum** は任意テキストを注入できる媒体ではないため、この理由づけの対象外として `--jq` 正規化つきの取得のみを許可する（Issue #146 / #155）。App の絞り込みは、`args` 入力時に slug 形式（英小文字・数字・ハイフン、39 文字以内）へ検証済みの値との `app.slug` 一致で行い、App 名・description・output はコンテキストへ入れない。
  - 外部チェックの再検証を監視エージェント側だけに置かないのは、未信頼テキストを読む監視の判定は「マージを試みてよい」という起動条件にすぎず、ゲートの証拠にできないため。
  - 監視の `headSha` はマージ経路の入力に使われない（診断用の記録のみ。PR #222 codex P0 対応。マージ判定用の HEAD sha は merge-exec が自己取得・固定する）。opt-out・外部チェック構成が未確定のラン（`externalChecks` 未指定）・信頼済み context 未宣言のラン（slug のみの旧形式）では merge-exec は回復専用経路（allowMerge=false）で起動し、新規マージは行わず「PR が既に MERGED ならイシュークローズ確認のみ」に限定される（前回ランでマージ済み・状態記録に失敗した PR の回復パスを保ちつつ fail-closed を維持する）。この限定はプロンプト解釈に任せず、マージ実行手順の文面もホスト側で分岐し、回復専用経路のプロンプトには `gh pr merge` / `--match-head-commit` を一切含めずイシュークローズ確認のみを出力する（Issue #161 / #168）。
  - マージ成功でもイシューのクローズを確認できない場合（`issueClosed: false`）は `merged` として終端せず再監視でクローズを再試行し、監視回数を使い切った場合は「PR はマージ済みだがクローズ未確認」として `blocked` で終端する（次回実行の monitoring 再開で回復する）。
- **独立確認エージェント（merge-verify、Issue #160）**: merge-exec が `merged: true` を返しても、ホストはそれを未検証のモデル出力として扱い無条件受理しない。`merged: true` は `reason` が `merged` / `already-merged` と整合する場合のみ受理候補とし（不整合・enum 外は systemic failure として `failed` 終端・halt カウント対象）、さらに merge-exec とは別コンテキストの読み取り専用エージェントが `gh pr view <N> --json state,headRefOid,mergeCommit` の取得値のみを返し、ホストが `state` の完全一致（`MERGED`）と監視時点 HEAD sha との一致（`sanitizeSha` 通過値。前回ランでマージ済み・headSha 未記録の already-merged 回復経路では比較対象がないため state のみ）を厳密再検証する。裏付けられない場合（state 不一致・HEAD 不一致・取得不能・無効応答）は fail-closed で `blocked`（`blockedReason: quality`）で終端し、worktree 削除・`dependsOn` 後続イシューの解放は行わない。`blocked` + `pr` は次回ランの monitoring 再開対象のため、実際にマージ済みなら already-merged 経路で自然回復する。返却 schema は自由文フィールドを持たず、確認エージェントはレビュー本文・Issue 本文・コメント・チェック名を一切読まない（ホストのログ・note には enum 完全一致・`sanitizeSha` 通過済みの検証値のみを合成する）。
  - 辞退理由（`reason`）はホスト側で `head-moved` / `checks-not-green`（許容外 state の存在に加え、チェック総数 0 件・`gh pr checks` 非ゼロ終了の fail-closed 辞退を含む。Issue #159） / `merge-failed` → 再監視、`unresolved-threads` → fix ループ（ただし手元にスレッド内容の構造化一覧がない場合は fix を起動せず再監視し、監視エージェントに内容を収集させる）、`not-mergeable`（コンフリクト等） → fix ループ、`wrong-target`（base 不一致・draft。fix では解消しないため fix 予算を消費しない） → blocked、`pr-closed` → blocked、`external-review-missing` → blocked（Issue #146 / #155。同一ラン内で再監視しても到着を保証できないため fail-open せず終端し、チェック到着後の再実行で monitoring 再開により継続する。終端理由には確定済み slug 一覧と「解消しない場合は slug の誤記・当該 App 未導入を疑い、App の導入状況を確認するか当該 slug を `args.externalChecks` から除外する」旨を添える。合格条件の提示は App 種別で出し分ける: cursor は「HEAD sha に対する cursor[bot] レビューの到着（1 件以上）かつ CHANGES_REQUESTED 0 件（Bugbot は APPROVED を返さないため APPROVED を待たない）」、cursor 以外の slug は「check-run の合格 conclusion、check-run 0 件時のみ APPROVED レビューへフォールバック」を明記する）、enum 外 → systemic failure、へマッピングされる。

**マージ実行条件:**
1. **CI 全 green**: 全チェックが success / neutral / skipped で完了し、failure / cancelled / timed_out が 0 件かつ pending / queued / in_progress が 0 件であること。pending が残るなら監視を継続する。かつ**チェック総数が 1 件以上存在する**こと。0 件は green とみなさず、監視側は最大 10 分の再確認後に `blocked`（quality）で停止する（Issue #159。workflow の `on:` 条件・パスフィルタによる全 job スキップや required workflow 未配置で CI が一度も起動していない PR を自動マージしない fail-closed。merge-exec 側もチェック総数 0 件・`gh pr checks` の非ゼロ終了を `checks-not-green` として辞退する）。
2. **外部チェック指摘なし**（または「外部チェックなし」が `args.externalChecks: []` で確定していること）: `args.externalChecks` と Step 1 の観測結果に基づき後述の待機手順を実施する。構成が確定できない場合・確定済みの外部チェック App について HEAD sha に対する合格の根拠（許容 conclusion の check-run、または APPROVED レビュー）を確認できない場合はマージしない（Issue #155。「指定した App のチェックが緑」ではなく「指定した App のチェックが**存在し**かつ緑」を条件とする）。
3. **未解決レビューコメントなし**: GraphQL API で全スレッドが resolved 済みであること。**resolve を実行してよいのは Merge ループの fix エージェント（push する版）のみ**: 修正の push が成功した後に、自分が修正対応したスレッド（monitor の構造化出力由来・host 検証済みの threadId に限る。fix が自分でスレッド一覧を再取得して対象を広げることは禁止）だけを GraphQL `resolveReviewThread` mutation で resolve し、`required_review_thread_resolution` ゲートを人手なしで解消する（Issue #119 の「全経路 resolve 禁止」をオーナー判断で転換）。monitor / merge-exec / merge-verify / Review ループ（push 前）の fix は引き続き resolve mutation を実行しない。resolve の失敗は致命的ではなく、未解決のまま残ったスレッドは次周回の monitor が unresolved として拾う。fix エージェントが検討した結果 **fix 不能・現イシューのスコープ外と判断したコメント**は、**resolve せず**その場で Issue 化もせず、対応しない理由と対応案を references/out-of-scope-support.md の「実装対象外（out-of-scope）の扱い」節の手順に従い **PR 本文の「対象外（out-of-scope）」節に記録する**（対象外スレッドへの自動フローの責務は記録まで）。記録されたスレッドは未解決のまま残るため、人間が resolve しない限り監視は unresolved-comments → blocked へ落ち、最終レポートでの issue 化承認・手動 resolve の判断に乗る。**P0/P1 相当・セキュリティ上の指摘（脆弱性・認証認可・秘密情報露出・破壊的操作等）は「対応不要・スコープ外」の記録のみで済ませることを禁止する**（修正するか、修正不能なら blocked としてユーザー判断へ委ねる。判断がつかない場合は安全側に倒し P0/P1 相当として扱う）。**Issue 化の要否はユーザー承認前に確定させない**（Issue 化の実行判断は同節の手順 3・4 に従い最終レポート確認時にユーザー承認のうえで実施する）。

`gh pr checks --watch` が終了しても「watch が終わった」だけで合格にしない。`gh pr checks ${prNumber}` の出力で全チェックの結論を列挙して確認する。pending が残る場合は再 watch する。failure 等があれば修正エージェント（fix）へ渡す。

**外部チェック待機の 4 分岐（`args.externalChecks` と Step 1 の観測結果による）:**
- **確定不能（`externalChecks` 未指定）**: 外部レビューを省略してよいか判断できないため、CI の結果にかかわらず `state: blocked` で停止する（Issue #147）。ホスト側にも同じゲートがあり、監視エージェントが `ready` を返しても**新規マージ**は行わず `blocked` で終端する（プロンプト + ホストの二重検証）。停止理由には観測結果（参考値）と再実行用の `args` 例が記録され、`blocked` + `pr` は次回ランの monitoring 再開対象となる。ただし PR が既に `MERGED` の場合（前回ランでマージ済み・状態記録に失敗した PR）のクローズ・状態記録の回復は、回復専用 merge-exec（allowMerge=false。プロンプトに `gh pr merge` を含まない）+ merge-verify の `state=MERGED` 独立確認を経て `merged` 終端できる（Issue #168。新規マージ経路は開かず、PR がマージ済みでなければ従来どおり未確定理由の `blocked` で終端する）。
- **外部チェックなし確定（`externalChecks: []`）**: 外部レビュー待機はスキップする。CI 全 green と未解決スレッドなしのみで判定する。
- **cursor（Cursor Bugbot）**: cursor[bot] によるレビュー待機フローを実行する。**HEAD sha に対するレビューが不在なら `@cursor review` を 1 回だけ催促する**（再投稿はしない）。Bugbot は**自動実行では指摘 0 件のときレビューを投稿せず check-run のみを completed にする**ため、レビュー不在を「指摘なし」と解釈してはならない（この場合に催促しないと指摘なしの PR が恒久的に blocked になる）。明示依頼なら指摘 0 件でも「新規指摘なし」のレビューが投稿される。check-run は催促してよいタイミングの判定（`queued` / `in_progress` なら待つ）と失敗検出（許容外 conclusion なら `needs-fix`）にのみ使い、合格 conclusion を「指摘なし」の根拠にはしない（指摘ありでも `success` / `neutral` の双方が観測される）。HEAD sha に対する cursor[bot] レビューの到着を最大 10 分待ち、到着すれば指摘解決を待ってからマージする。**到着しない場合は「レビューなし」とみなさず `state: blocked` で停止する**（Issue #146。App の障害・遅延・起動失敗時にレビューゲートを迂回させないための fail-closed。レビュー到着後に再実行すれば monitoring 再開で継続する）。
- **cursor 以外の外部チェック（例: sonarcloud）**: `gh pr checks --watch`（CI 監視）は「**存在する**チェックが緑になったか」しか保証せず、App がそもそも起動していなければ何も監視しないまま全 green と判定される。そのため App ごとに **HEAD sha に対する check-run の起動そのもの**を確認する（Issue #155。従来はこの確認がなく、`externalChecks` で `sonarcloud` を明示しても SonarCloud が未起動のままマージできる fail-open だった）。0 件なら最大 10 分待って再確認し、それでも 0 件なら `state: blocked` で停止する。check-run を作らずレビューのみ投稿する App のために `<slug>[bot]` レビューの HEAD sha 一致もフォールバックとして確認する（**レビューは `state` まで検証する**。合格にできるのは「`APPROVED` が 1 件以上、かつ `CHANGES_REQUESTED` / `COMMENTED` / `PENDING` が 0 件」の場合のみで、否定的レビューが `APPROVED` と併存する場合も不合格とする。merge-exec はレビュー本文を読まず内容を評価できないため、評価できないものは fail-closed で不合格とする。`DISMISSED` は GitHub 上で無効化済みのため判定に含めない）。
  - cursor と他 App を併記した構成（例: `[{"app": "cursor", "context": "Cursor Bugbot"}, {"app": "sonarcloud", "context": "SonarCloud Code Analysis"}]`）では、cursor のレビュー到着確認に加えて他 App の起動確認も併せて実施する。
  - `blocked` が再実行でも解消しない場合は slug の誤記、または当該 App が対象リポジトリで動作していない可能性がある。App の導入状況を確認するか、`args.externalChecks` から当該 slug を除外して再実行する。

```bash
# HEAD sha を取得（push のたびに取り直す）
HEAD_SHA=$(gh pr view <pr-number> --json headRefOid -q .headRefOid)

# CI 監視
gh pr checks <pr-number> --watch --interval 60

# watch 完了後、全チェックの結論を列挙して確認する
# failure / cancelled / timed_out が 0 件、pending / queued / in_progress が 0 件であること
gh pr checks <pr-number>

# Bugbot（cursor[bot]）レビューが HEAD sha に対して到着しているか確認する（cursor 確定時のみ）
# commit_id が HEAD_SHA と一致するレビューを探す（30 件超のレビューを取りこぼさないよう --paginate 必須）
gh api --paginate "repos/{owner}/{repo}/pulls/<pr-number>/reviews" \
  --jq "[.[] | select(.user.login == \"cursor[bot]\" and .commit_id == \"${HEAD_SHA}\")] | length"
# → 合計が 0 の場合は最大 10 分待つ（HEAD push から 1 分以上経過後に @cursor review を 1 回だけ催促可）
# → 待機上限を超えても到着しない場合は blocked で停止する（「レビューなし」として先へ進まない）

# cursor 以外の外部チェック App（例: sonarcloud）が HEAD sha に対して起動しているかを確認する
# commits/<sha>/check-runs は sha でスコープ済みのため jq 側で sha 比較は不要
gh api --paginate "repos/{owner}/{repo}/commits/${HEAD_SHA}/check-runs" \
  --jq '[.check_runs[] | select(.app.slug == "sonarcloud") | (.conclusion // .status)] | group_by(.) | map({v: .[0], count: length})'
# → 出力は状態 enum ごとの件数のみ（チェック名・description は取得しない）
# → 全ページの count 合計が 0 なら未起動。最大 10 分待って再確認し、なお 0 なら blocked で停止する
# → 0 件のときは <slug>[bot] レビューをフォールバックとして確認する（state 別件数のみ取得する）
gh api --paginate "repos/{owner}/{repo}/pulls/<pr-number>/reviews" \
  --jq "[.[] | select(.user.login == \"sonarcloud[bot]\" and .commit_id == \"${HEAD_SHA}\") | .state] | group_by(.) | map({v: .[0], count: length})"
# → 合格にできるのは APPROVED が 1 件以上かつ CHANGES_REQUESTED / COMMENTED / PENDING が
#   0 件の場合のみ。否定的レビューが APPROVED と併存する場合も不合格（fail-closed）

# マージ実行エージェント側の再検証も本文を読まず「件数・状態 enum」のみへ正規化して取得する
# （確定済み App ごとに実行する。合格の根拠が 1 件もなければ external-review-missing でマージしない）
gh api --paginate "repos/{owner}/{repo}/pulls/<pr-number>/reviews" \
  --jq '[.[] | select(.user.login == "cursor[bot]" and .commit_id == "<検証した HEAD sha>")] | length'
gh api --paginate "repos/{owner}/{repo}/commits/<検証した HEAD sha>/check-runs" \
  --jq '[.check_runs[] | select(.app.slug == "sonarcloud") | (.conclusion // .status)] | group_by(.) | map({v: .[0], count: length})'
# → --jq はページごとに適用されるため出力はページ数ぶんになる。全ページを合計して判定する

# レビュースレッドの解決確認（GraphQL）— 100 件超はページネーションで全件取得する
# after: $cursor を使い pageInfo.hasNextPage が false になるまでループする
gh api graphql -f query='
  query($owner: String!, $name: String!, $number: Int!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      pullRequest(number: $number) {
        reviewThreads(first: 100, after: $cursor) {
          nodes { isResolved comments(last: 1) { nodes { body author { login } } } }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  }' -F owner="{owner}" -F name="{repo}" -F number=<pr-number> -F cursor=""

# CI 全 green・外部チェック指摘なし・未解決レビューコメントなしの場合のみ squash merge
# （実行するのは監視エージェントではなくマージ実行エージェント。上記条件を自ら再取得して検証したうえで実行する）
gh pr merge <pr-number> --squash --delete-branch --match-head-commit <検証した HEAD sha>
```

**全チェックが pass に見えるのにマージが進まない場合（cancel された run の残存 check）:**

- **フローから観測できる症状**（自動検知は存在しないため、実装されていない挙動は書かない）: `gh pr checks` は全 pass、`mergeable` は `MERGEABLE`、コンフリクトも未解決スレッドもないのに、merge-exec が進まず再監視が繰り返され監視予算だけが減る。この状態では `mergeStateStatus` が `BLOCKED` のまま動かない。**`mergeStateStatus` は現在どのエージェントも取得していない**ため、運用者が `gh pr view <N> --json mergeStateStatus` で確認する。
- **原因**: 同一 head sha に対し concurrency で複数 run が走ると、cancel された run が失敗結論の check run を残す。`gh pr checks` は同名 check の最新のみを表示するため全 pass に見えるが、branch protection の required check 判定は残存 check を拾って BLOCKED になる。同一の変更を多数のリポジトリへ同時投入する運用（後述「一斉同期・大量 PR 投入時の運用ガード」）では concurrency 競合の発生頻度が上がるため、この状態に遭遇しやすい。
- **検知コマンド（エージェントが実行してよいものと、人間の診断専用を明確に分ける）**:

```bash
# (A) エージェントが実行してよい形。取得成否を先に確定してから「件数」のみを返す。
# gh api は HTTP エラーの JSON 本文も stdout へ出す仕様のため、パイプ直結だと認証失敗・404・
# レート制限の出力が uniq -d にヒットせず「重複なし（0）」に化ける
# （.claude/rules/ruleset-policy.md 手順 B と同じ罠）。
# そのため (1) 取得を独立させて終了コードを見る (2) 出力の空判定を行う (3) 集計は shell 側で
# 行う、の 3 段に分ける（--jq はページごとに適用されるため group_by をページ単位で行うと
# ページ跨ぎの重複を見逃す。名前+結論の一覧をシェル側 awk で全ページ分集約する）
if ! command -v awk >/dev/null; then
  # awk 前提条件が未導入。集計不能なため判定不能として扱う（fetch 自体を実行しない。
  # (B) の command -v jq ゲートと同じく前提確認を fetch より先に行う — レート制限下で
  # 無駄な gh api 呼び出しを発生させないため）
  echo "UNDETERMINED"
else
# `rows=$(gh api ...)` を独立した単純コマンドのまま実行すると、呼び出し元 shell で
# `set -e`（errexit）が有効な場合に gh api の非ゼロ終了（認証失敗・404・レート制限等）で
# shell がここで即終了し、次行の status=$? および UNDETERMINED 分岐へ到達できない
# （if/then/else の条件式に置かれたコマンドは errexit の対象外という shell の仕様を利用し、
# 代入自体を条件式へ移すことで errexit 下でも必ず失敗分岐を実行できる形にする）。
if rows=$(gh api --paginate "repos/{owner}/{repo}/commits/${HEAD_SHA}/check-runs?per_page=100" \
  --jq '.check_runs[] | [.name, (.conclusion // "pending")] | @tsv' 2>/dev/null); then
  status=0
else
  status=$?
fi
if [ "${status}" -ne 0 ] || [ -z "${rows}" ]; then
  # 取得失敗、または check-run が 1 件も返らない。この節は「全チェックが pass に見える」状態
  # でのみ参照するため、0 件は前提と矛盾する = 取得できていない可能性が高く、判定不能として扱う
  echo "UNDETERMINED"
else
  printf '%s\n' "${rows}" | awk -F'\t' '
    { n[$1]++
      if ($2 == "success" || $2 == "neutral" || $2 == "skipped") { }
      else if ($2 == "pending") pend[$1] = 1
      else bad[$1] = 1 }
    END { d = 0; b = 0; p = 0
          for (k in n) if (n[k] >= 2) { d++; if (k in bad) b++; if (k in pend) p++ }
          printf "dup=%d bad=%d pend=%d\n", d, b, p }'
fi
fi
# → 出力は次の 2 形のみ（チェック名・エラー本文は出力に現れない）:
#    `UNDETERMINED`               … 判定不能。「重複なし」ではない
#    `dup=<D> bad=<B> pend=<P>`   … 取得成功。D = 重複した check 名の数、
#                                     B = そのうち結論が `success` / `neutral` / `skipped`
#                                     （いずれも required status checks 上は合格・非ブロック扱い）
#                                     でも `pending`（未完了）でもないものを含む数（cancelled /
#                                     failure / timed_out / action_required / startup_failure /
#                                     stale 等、`success`・`neutral`・`skipped` を正常扱いする
#                                     以外は全て bad へ倒す fail-closed 分類）、P = そのうち
#                                     結論が `pending`（未完了。実際の conclusion が null で
#                                     in-progress/queued 中）を含む数
# → 読み方: **取得に成功したうえで** D が 0 なら重複なし。D >= 1 でも B = 0 かつ P = 0 の
#    場合のみ「重複はすべて正常な再実行（success/neutral/skipped 同士）」と読める。B・P は排他ではなく、
#    同じ重複名の中に bad な結論と pending な結論が両方含まれる場合は B・P 双方が 1 になる。
#    上記 2 形（正規表現 `^UNDETERMINED$` / `^dup=[0-9]+ bad=[0-9]+ pend=[0-9]+$`）以外の
#    出力も判定不能として扱う
```

```bash
# (B) 人間の診断専用。重複の内訳をチェック名つきで確認する
# チェック名は PR 側の workflow / job 定義から生成される未信頼テキストのため、
# monitor / merge-exec のコンテキストでは実行しない（権限境界の維持）
# 前提: 外部の `jq` CLI が必要（`gh --jq` はページ単位適用のためここでは使えない）。
# 事前に `command -v jq` で存在確認し、なければ実行せず `blocked` とする
command -v jq >/dev/null || { echo "jq が見つからないため診断を中断し blocked とする" >&2; exit 1; }
# `--paginate` の `--jq` は取得したページごとに個別適用されるため、group_by をそのまま
# 使うとページ単位の集計になり、同名 check-run が別ページに 1 件ずつ分かれて存在する場合に
# 検知できない（各ページ内では件数 1 の group にしかならず、実際は重複していても取りこぼす）。
# `--slurp` を付けると全ページを外側の配列として受け取れるが、gh api は `--slurp` と `--jq` の
# 併用を拒否する（`the --slurp option is not supported with --jq or --template`）ため、
# `--jq` は使わず `--slurp` の生 JSON 出力を外部の `jq` へパイプし、平坦化してから group_by する
# ことでページ跨ぎでも全件を一度に集約してから判定する。
# まず check 名だけで group_by し、件数 2 以上の group（=実際に重複している名前）に絞り込んでから、
# その中で conclusion 別の内訳を出す（name=conclusion のペアで group_by すると、同名 2 件が
# cancelled/success のように conclusion 違いで割れて各 group が件数 1 になり、重複そのものを
# 取りこぼすため、必ず name のみで group_by する）
gh api --paginate --slurp "repos/OWNER/REPO/commits/<sha>/check-runs?per_page=100" \
  | jq -r '[.[] | .check_runs[] | {name, conclusion}]
        | group_by(.name)
        | map(select(length >= 2))
        | map("\(.[0].name): " + ([.[] | .conclusion] | sort | group_by(.) | map("\(.[0]) x\(length)") | join(", ")))
        | join("\n")'
```

- **対処（前提を先に実測してからコマンドを実行する。判断・実行の主体は**ラン運用者／ホスト側**であり、monitor / merge-exec エージェントではない。(B) は人間の診断専用のため、このフロー全体がエージェント自律では完結しない）**:
  - 前提 0（判定不能の扱い）: (A) が `UNDETERMINED` を返した、または上記 2 形以外を返した場合は**判定不能**。rerun せず `blocked`（quality）として最終レポートへ回す。判定不能を「重複なし」と読んで CI 由来を除外してはならない（認証失効・レート制限・sha 誤りが典型原因。人間が原因を確認する場合は stderr を捨てずに同じ gh api を再実行する）。
  - 前提 1（重複と結論の実測）: (A) が `dup=<D> bad=<B> pend=<P>` を返し、D・B・P を実測する。
    - **D >= 1 かつ P >= 1** の場合: 重複の中に `pending`（未完了）の check-run が残っている。この pending 自体が `mergeStateStatus=BLOCKED` の直接原因になり得るため、「重複はすべて正常な再実行」と断定して原因調査を別方向へ進めてはならない。rerun せず、pending の完了を待って再監視する（判断・実行の主体はラン運用者／ホスト側。原因不明のまま前提 2 の rerun フローへ進めない）。
    - **D >= 1 かつ P = 0 かつ B >= 1** の場合のみ、前提 2（rerun 対象の一意化）へ進む。
    - **D >= 1 かつ B = 0 かつ P = 0** の場合、重複はすべて正常な再実行（`success`/`neutral`/`skipped` 同士）由来であり「cancel された run の残存 check」ではない。rerun せず、BLOCKED の別原因（required check の context 名不一致・未解決レビュースレッド・ruleset 構成など。`.claude/rules/ruleset-policy.md` の 3 軸スイープ）へ調査を移す。
  - 前提 2（rerun 対象の一意化）: (B) で重複している check 名を確認し、その名前を発行した cancelled run を job 一覧から特定する（下記コマンド）。
    - cancelled run が**複数**見つかり一意に絞り込めない場合: rerun せず `blocked`（quality）として最終レポートへ回す（誤った run を rerun すると無関係な job まで再実行し、原因不明のまま状態を変える）。
    - cancelled run が **0 件**の場合: rerun 対象が存在しない。B >= 1 の残存は cancel ではなく failure / timed_out / action_required / startup_failure / stale 等の非 cancel 由来である。この残存も cancel 残存と同じ masking を受ける点に注意する — `gh pr checks` は同名 check の最新結論のみを表示するため（前掲「原因」節参照）、より新しい success / neutral / skipped の陰に隠れた古い failure / timed_out 等は `gh pr checks` の出力に現れず、通常の可視 CI 失敗としては検知できない。監視フローの needs-fix 経路（`gh pr checks` ベースの CI 失敗検知）に任せると見逃されるため、rerun はせず `blocked`（quality）として最終レポートへ回す。原因調査が必要な場合は (A)/(B) の生の check-runs 出力（`gh pr checks` ではなく）を根拠に、当該 check-run を発行した run をラン運用者が個別に特定・対処する。cancel 起因と決めつけて `gh run rerun` しない。
  - 上記を満たさないまま rerun しない（rerun は CI を再起動するため、「Review 通過後に CI を 1 回だけ起動する」設計に反する）。

```bash
# cancelled な run を head sha で列挙する（conclusion=cancelled のみに絞る）
gh api --paginate "repos/OWNER/REPO/actions/runs?head_sha=<sha>&per_page=100" \
  --jq '.workflow_runs[] | select(.conclusion == "cancelled") | .id'

# 各 cancelled run が発行した job 名を確認し、(B) で特定した重複 check 名と突き合わせる
# （check-run の名前は `<job名>` または `<job名> / <ステップ>` 形式で job に対応するため、
# jobs API の name で同定できる。複数 run の job 名が同じ重複 check 名にヒットする場合は一意化不可）
gh api --paginate "repos/OWNER/REPO/actions/runs/<cancelled-run-id>/jobs?per_page=100" \
  --jq '.jobs[].name'

# 一意に対応付けられた run に限り、全 job を回して残存 check を上書きする（--failed は付けない）
gh run rerun <run-id> -R OWNER/REPO
```

- **完了ゲート整合**: rerun したこと自体は green の証拠にならない。再実行後に改めて全チェックの結論を列挙し、`failure` / `cancelled` / `timed_out` が 0 件・`pending` / `queued` / `in_progress` が 0 件・チェック総数 1 件以上を確認してから合格と判断する（`.claude/rules/verification.md` の 5 段階ゲート）。解消しない場合は推測で進めず `blocked` として最終レポートへ回す。

CI 失敗・外部チェック指摘・コンフリクト・未解決レビュースレッドがある場合は、修正エージェント（fix）が detached HEAD で対象ブランチを取得して指摘を反映し再 push する。修正エージェントも worktree 隔離で動作するため、他の並列イシューのブランチに干渉しない。fix エージェントは push が成功した後に、自分が修正対応したスレッド（monitor 由来・host 検証済み threadId に限る）のみを `resolveReviewThread` mutation で resolve し、resolve に成功した threadId を `resolvedThreadIds` で報告する（resolve 失敗は致命的ではなく、未解決のまま残ったスレッドは次周回の monitor が unresolved として拾う）。fix 対象外と判断したコメントは resolve せず、references/out-of-scope-support.md の「実装対象外（out-of-scope）の扱い」節の手順に従い PR 本文へ記録する（対象外スレッドへの自動フローの責務は記録まで。人間が GitHub 上で resolve しない限り未解決のまま残り、blocked → 最終レポートで issue 化承認・手動 resolve を判断する）。監視（monitor）は通常予算として最大 7 回まで実行する（後述の「強制スレッド再走査の救済ラウンド」で 1 回だけ延長されるため、実行全体の絶対上限は初期予算 + 1 の 8 回。詳細は同節を参照）。push なしが 2 回連続したイシューは `blocked` として記録する。監視エージェントが `blocked` を返す場合は `blockedReason`（`quality` / `unrecoverable`）の付与を必須とし、ホスト側でも enum を二重検証する。省略・enum 外は `unrecoverable` として扱う（fail-safe）。`quality`（再監視・再実行で解消し得る）のみ状態ファイルへ `blocked` で終端して次回ランの monitoring 再開対象とし、`unrecoverable`（PR の未マージクローズ等）は `failed` で終端して再開対象から外す。修正（fix）の上限は Review と共有（上限 6）。詳細は Review ステップ参照。

**修正上限（6 回）到達時の分類（Issue #141）:** 上限到達で `blocked` へ落ちる際は、上限に達した時点で観測していた状態で再開可否を分類する。`unresolved-comments`（未解決スレッドが実在する）は人間の resolve で解消し得るため `quality`（`blocked` 終端・monitoring 再開対象）、`needs-fix`（CI 失敗等）は修正予算が尽きているため `unrecoverable`（`failed` 終端・再開対象外）とする。後者を再開可能にすると、`fixCount` が上限のまま復元されたランが「即 blocked」を毎回繰り返し、`blocked` は halt の連続カウントに乗らないため停止防御も働かない。

**強制スレッド再走査の救済ラウンド:** merge-exec が `unresolved-threads`（未解決スレッドの「件数」だけを検出）を返し、かつスレッド内容の一覧が手元にない場合、ホストは fix を起動せず `forceThreadRescan` を立てて次ラウンドの monitor に手順 5 の強制再走査を指示する。このとき監視予算がすでに尽きていると救済ラウンドが一度も走らないため、**実行全体で 1 回だけ監視枠を延長する**（2 回目以降は延長せず残り予算で終端する。merge-exec が空一覧を返し続けても監視回数は初期予算 + 1 で有界）。

延長した救済ラウンドは残り予算ゼロで走るため、その回の結果がそのまま終端になる。救済ラウンドの終端分類は、ラウンド末尾での即時判定ではなく**監視ループ退出後の単一地点で 1 回だけ**評価する（`ready` / `needs-fix` 等の有意な結果が得られた場合は通常の分岐処理へ進む）。判定は `timeout` の**出所**で分岐する（Issue #365）: 監視エージェント自身が観測に失敗して返した `timeout`（=同一救済ラウンドで merge-exec の一過性 reason 写像が発生していない）のみを、**終端 status `blocked`（halt 非カウント・次回ランの monitoring 再開対象）**に分類する。救済は「未解決スレッドの内容を取り直すための追加試行」であり、観測に失敗しても「未解決スレッドが残っている」という元の品質ブロックの事実は変わらないため。`lastState` は `timeout` のまま残す（実際に観測できなかったことは終端理由の記録として正しい）。一方、**同一救済ラウンドの merge-exec 由来の `timeout` 写像**（`head-moved` / `checks-not-green` / `merge-failed`）は品質ブロックへ分類せず、既定の `failed`（halt カウント対象）へ進む。救済ラウンドの再走査自体は成立している以上、未解決スレッドが残っているとは断定できず、実体はマージ操作そのものの失敗であるため。この区別を入れる前（#248 修正直後）は出所を問わず一律 `blocked` に分類していたが、恒常的な merge 失敗（特に `merge-failed`）が halt 連続カウントに一切算入されず、同じ救済経路へ再入し続けて halt 防御を迂回する回帰があった（Issue #365 の P1）。詳細な判定表・設計根拠は `references/automerge-design.md` の「救済ラウンドの終端分類」節を参照。

**対象外コメントの省略件数（Issue #133・#141）:** `outOfScopeLog` は本体 20 件 + 省略マーカー行（`（他 N 件省略）`）1 件の最大 21 件で永続化する。マーカーは配列全体で 1 行だけを使い、後続の fix ラウンド・中断再開を跨いで N を累積更新する。あわせて、対象外と申告済みの threadId 集合を `outOfScopeSeen` として状態ファイルへ保存し、再開時に復元する（省略されて `outOfScopeLog` に本文が残らなかった threadId を失うと、再開後の同一スレッド再申告が省略件数へ重複加算されるため）。

### Step 7: 親イシューを検証してクローズする

子を持つノード（親イシュー）は、配下のすべての子イシューが完了した時点で以下を確認してクローズする。

```bash
# 1. 全子イシューが closed か確認（--paginate で 100 件超も全ページ自動取得）
gh api --paginate "repos/{owner}/{repo}/issues/<parent>/sub_issues?per_page=100" --jq '.[].state'

# 2. 受入基準・チェックリストを読む
gh issue view <parent-number>

# 3. 受入基準を満たしていればクローズ
gh issue close <parent-number> --comment "配下のサブイシューがすべて実装・マージ完了。受入基準を確認してクローズ。"
```

open のサブイシューが残っている場合、または受入基準が未達の場合はクローズせず `failed` として記録する。親ノードは全子イシューが完了するまで投入されないため、子の並列実行完了後に検証される。

### Step 8: 最終レポートを生成する

全イシューの処理結果をまとめてレポートを出力する。1 イシューの失敗では即停止せず次へ進むが、**3 イシュー連続で完了できなかった場合は新規着手を停止（halt）**し、ユーザーの判断を待つ。halt 後に着手しなかったイシューは `not-started` として記録される。out-of-scope 項目は各 PR 本文の「対象外（out-of-scope）」節（実装・セルフレビュー由来、**および Merge フェーズの未解決レビューコメント由来の記録を含む**）に記録されているため、レポート確認時にそれらを参照して Issue 化判断（承認後に references/out-of-scope-support.md「実装対象外（out-of-scope）の扱い」手順 3・4 を実行）を行う。あわせて、blocked / fix 対象外の未解決コメント（Merge ループの fixCount 上限到達・blocked 到達で自力解決できなかったレビュースレッド）は `done` 各エントリの `unresolvedComments`（構造化未解決コメント一覧）/ `outOfScope`（fix エージェントが対象外と判断したコメントのログ）フィールドに集約されるため、レポート生成時にそれらを本節へ一覧化する。

レポート出力テンプレート（処理結果サマリー・完了イシュー・失敗/未着手イシュー・対象外/未解決コメントの各節）と返却値フィールドの説明は以下を参照。

詳細: [references/report-format.md](references/report-format.md)

## 検証

各実装エージェントはテストコマンドを新規実行し、出力全体と終了コードを確認してから完了を宣言する（詳細は `.claude/rules/verification.md`）。「〜のはず」「たぶん通る」等の推測語での完了主張は禁止。テスト出力・終了コードを証拠として引用してから完了を宣言する。

最終レポートの「完了イシュー」に全対象イシューが列挙され、「停止イシュー」が空であることを確認する。`scripts/implement-issue-tree.js` を変更した場合の非信頼データ境界・残置 worktree 上限ゲート・merge-guard hook の適用確認手順（grep コマンド・期待結果）は以下を参照。

詳細: [references/verification.md](references/verification.md)

## よくある失敗

| 問題 | 回避策 |
|------|--------|
| テスト失敗の原因を調査せず当て推量で修正を繰り返す | `.claude/rules/debugging.md` の4フェーズ（調査→分析→仮説→修正）を踏む。3回失敗したら `blocked` にしてユーザーへ報告 |
| `gh pr checks --watch` 終了だけで CI 合格と判断する | watch 後に `gh pr checks <pr-number>` で全チェックの結論を列挙して確認する |
| 仕様準拠を確認せずにコード品質レビューへ移行する | Step 5 のレビューは①仕様準拠→②コード品質の順に実施する |
| Review 前に push・PR 作成を行う | push・PR 作成は Review 全通過後の Step 5.5 で行う。Review 失敗時に CI を起動させないための設計 |
| Review fix で push してしまう | Review ループの fix はローカルコミットのみ。push は Step 5.5 のみで行う |
| 状態ファイルが壊れたまま再実行して重複 PR を作成する | パースエラー時は即停止。`cat _/issue-trees/<N>.json` で確認してから再実行する |
| 中断後に手動で worktree を削除してから再実行する | 再実行時に Recover phase が自動処理するため手動削除は不要。手動削除してしまうと Recover が残骸なしと判定し、中断前の作業を引き継がずに Plan から新規実行する |
| fix 以外のエージェントがレビュースレッドを resolve する / fix が対象外スレッドまで resolve する | resolve mutation を実行してよいのは Merge ループの fix（push する版）だけで、対象は push 成功後の「自分が修正対応したスレッド」（monitor 由来・host 検証済み threadId）に限る。monitor / merge-exec / merge-verify / Review ループの fix は実行しない。対象外（out-of-scope）スレッドは resolve せず記録までで停止し、人間が resolve しない限り blocked → 最終レポートへ |
| 実装コミットの scope にイシュー番号を置く（例: `feat` の scope に `42` を入れる） | `scope-enum` を持つリポでは commitlint が必ず落ちる。Review 3 巡を消費した後の push で初めて検出され、`--no-verify` は禁止のため回避もできない。scope はモジュール・ディレクトリ名にするか省略し、イシューの紐付けは `Refs #<N>` / `Closes #<N>` で行う |
| P0/P1 相当・セキュリティ指摘を対象外扱いにする | fix エージェントは単独で対象外と判定して記録のみで済ませてはならない。修正するか、ユーザーまたは指摘者の承認を得るまで `blocked` として扱う（安全側ガード） |
| 全チェックが pass に見えるので CI 起因を除外し、PR の差分を疑って調査を続ける | 同名 check-run の重複件数を実測する（Step 6 の該当分岐）。cancel された run の残存 check が BLOCKED の原因になり得る |
| (A) の出力を検証せず `0` を「重複なし」と読む | 取得失敗・空出力・形式不一致は `UNDETERMINED`。CI 由来を除外せず `blocked`（quality）に倒す |
| 重複の bad を cancelled / failure / timed_out のみに限定し、pending・action_required・startup_failure・stale を「正常な重複」に含める | `success`・`neutral`・`skipped`（required status checks 上は合格・非ブロック扱い）以外は正常扱いしない。pending（未完了）は別枠の `pend` で検知し、それ自体が BLOCKED の原因になり得るため rerun 対象探索へ進まず待機する |
| `neutral`・`skipped` を bad（通常の CI 失敗）として rerun 対象探索へ進める | `neutral`・`skipped` は GitHub の required status checks 判定で合格扱いになる conclusion であり fail-closed 対象ではない。`success`・`neutral`・`skipped` の重複は正常な再実行として扱い、BLOCKED の別原因を疑う |
| 差分と無関係なテスト失敗を確認せず flaky と決めつけて rerun する | main での同ジョブ green と差分スコープの 2 点を実測してから rerun する（下記「一斉同期・大量 PR 投入時の運用ガード」参照） |

## 一斉同期・大量 PR 投入時の運用ガード

同一の変更を多数のリポジトリへ同時に投入する運用（skill 同期など）では、差分内容と無関係な CI 由来の失敗が出る。以下は誤診しやすい 3 類型と切り分け手順。

| 事象 | 症状 | 対処 |
|------|------|------|
| 並列負荷による OOM | リンク中に `ld terminated with signal 9 [Killed]` | runner のメモリ逼迫が原因のため、混雑中に rerun しても同じ結果になる。キューが空くまで待つ |
| 新規 CI 導入リポのラベル不足 | CI を新規導入したリポでは `dependencies` / `automated` ラベルが無く `gh pr create --label` が exit 1 になり、PR がそもそも作られない | 投入前にラベルを作成する |
| flaky の誤判定 | 差分と無関係なテストが落ちる | 「main で同じジョブが green」「差分が当該テストに影響しえない（変更パスを実測）」の 2 点を確認してから rerun する。前者は `gh run list --branch main` を単独では使わない（別 workflow の成功や skip されたジョブが紛れ込み、肝心の failing job が実は main でも失敗・未実行のまま green と誤認し得る）。失敗した PR 上の workflow ファイル名と job 名を特定したうえで、`gh run list --branch main --workflow <workflow-file> --json databaseId,conclusion --limit 1 --jq '.[0].databaseId'` で直近 run の ID を取得し、`gh api repos/OWNER/REPO/actions/runs/<run-id>/jobs --jq '.jobs[] | select(.name == "<job名>") | .conclusion'` で同一 job 名の conclusion が `success` であることを実測する。推測で flaky 扱いにしない |

**推奨投入単位**: 1 バッチあたり 5 リポジトリ以下に分割し、前バッチの run がすべて完了（`gh run list` で `in_progress` / `queued` が 0）してから次バッチを投入する（バッチ数は `ceil(対象リポジトリ数 / 5)` で導出する）。これは「注意事項」にある `parallel` の並列度指針（並列度を上げるほど CI キューが逼迫する）のリポジトリ横断版にあたる。

一斉投入時に BLOCKED が出た場合は Step 6 の「全チェックが pass に見えるのにマージが進まない場合」の分岐を参照する。

## モデル / effort 割り当て

| エージェント | model | effort | 根拠 |
|------------|-------|--------|------|
| `plan:issue-tree`（Tree 取得・依存抽出） | sonnet | medium | 本文読解・依存判断 |
| `detect:external-checks`（外部チェック判定） | haiku | low | 定型コマンド集計 |
| `state:load` / `state:update` / `state:init-all` | haiku | low | jq の機械処理 |
| `nonce:seed`（境界トークン用 seed 生成） | haiku | low | `/dev/urandom` 読み出しのみ（driver に乱数源が無いため。下記「非信頼データの扱い」2 を参照） |
| `recover:#N`（中断作業の継続可否判断） | （指定なし＝セッション継承） | medium | 計画判断相当（Plan と同じ軸で判断） |
| `plan:#N`（per-issue 計画立案） | （指定なし＝セッション継承） | high | 最も複雑な計画立案 |
| `impl:#N`（実装） | sonnet | medium | 計画に沿った実装（コスト最適化） |
| `review:#N`（独立 Review） | sonnet | medium | 品質・セキュリティ判定 |
| `fix:#N`（修正） | sonnet | medium | 実装系・コスト最適化 |
| `merge:#N`（CI/レビュー監視・マージ） | sonnet | medium | CI/レビュー判定・マージ可否ゲート |
| `close:#N`（受入基準確認・クローズ） | sonnet | medium | 受入基準確認・クローズ |

## 中断・失敗からの再開

実行中の状態は `_/issue-trees/<親イシュー番号>.json` に自動保存される。セッションが中断・強制終了した場合でも、**同じ `args` で再実行するだけで再開できる**。状態ファイルの `status` 遷移表・worktree の自動削除・実装エージェントによる既存 PR / リモートブランチの再利用手順は以下を参照。

詳細: [references/recovery.md](references/recovery.md)

## 実装対象外（out-of-scope）の扱い

各サブイシューの実装およびセルフレビュー（処理内容の手順 7: implement-review）の過程で、対応すべきだが現スコープ外と判断した事項（未対応の改善・別機能・技術的負債・後続作業）が発生した場合は、放置せず必ず追跡する。**Merge フェーズ（Step 6）で fix エージェントが検討した未解決レビューコメントのうち、fix 不能・現イシューのスコープ外と判断したもの**も同様に検出源として扱う。手順・非信頼データの扱い（プロンプトインジェクション緩和）は以下を参照。

詳細: [references/out-of-scope-support.md](references/out-of-scope-support.md)

## 注意事項

- **ユーザー承認なしで PR 作成まで自動実行する**ため、事前に親イシュー番号・ブランチ・並列度を慎重に確認する。**クライアント側の自動マージは `autoMerge: true` + `externalChecks` 確定（全 App の信頼済み context 宣言込み）の opt-in ランでのみ実行される**（references/automerge-design.md の「クライアント側自動マージの設計」節参照。opt-in するとユーザーの都度承認なしに squash merge まで進むため、opt-in の指定は同節の残存リスク — 特に非 author 承認を必須としない branch protection 構成では人間の追加承認なしにマージが成立すること — を理解のうえ行うこと）。opt-out（既定）ではマージ条件を満たした PR はマージ可能状態の `blocked` で停止し、マージは **GitHub 上で人間が行う**か、**サーバー側 auto-merge workflow（upstream の `docs/implement-issue-tree/auto-merge-sample.yml`）+ branch protection** に委ねる。**merge-guard hook と autoMerge opt-in（クライアント側マージ）は併用できない**（hook を導入したリポでは subagent の `gh pr merge` が deny されるため。references/automerge-design.md の「自動マージのサーバー側委譲と merge-guard hook」節参照）。運用は次のいずれかを選ぶ: (a) `autoMerge: true` の opt-in ランを使う場合は merge-guard hook を導入せず、サーバー側 branch protection（第三者=非 author 承認必須・dismiss stale・通常/force push 禁止・required checks）のみで強制する、(b) merge-guard hook を導入する場合は自動マージを行わず（既定 `autoMerge: false`）、マージは人間またはサーバー側 auto-merge workflow へ委譲し、hook と branch protection を併用する（Step 6・「自動マージのサーバー側委譲と merge-guard hook」・「非信頼データの扱い」項目 5 参照）
- `parallel` は 1〜8 の整数のみ有効。整数以外・範囲外は既定の 3 にフォールバックする。並列度を上げるほど API レート制限・CI キューの逼迫に注意する
- レビュースレッドの resolve（解決済み化）を実行するのは Merge ループの fix エージェントのみ: 修正の push が成功した後、自分が修正対応したスレッド（monitor の構造化出力由来・host 検証済み threadId）だけを `resolveReviewThread` mutation で resolve する（Issue #119 の全経路禁止からの転換）。monitor / merge-exec / merge-verify / Review ループの fix は実行しない。対象外（out-of-scope）と判断したスレッドは resolve されず PR 本文への記録までで停止するため、未解決のまま blocked → 最終レポートで issue 化承認・手動 resolve を判断する。人間の resolve 後の再実行（または監視継続中の resolve）でマージ条件が再判定される
- 各 implement / fix は独立した worktree で隔離実行されるが、メイン working copy のブランチ・共有設定などグローバル状態は変更しない
- 大規模ツリー（数百件）はサブ親単位で複数回に分けて実行する（1 ワークフローのエージェント上限は 1,000）
- `--no-verify` は絶対に使用しない（pre-commit フック回避禁止。詳細は `.claude/rules/conventional-commits.md`）
- シェルコマンドの変数は必ず `"${var}"` でクォートする（コマンドインジェクション対策）。GitHub API から取得した文字列はプロンプト埋め込み前にサニタイズされる
- 1 イシューの失敗では停止せず次へ進むが、3 イシュー連続失敗で新規着手を停止（halt）する
- マージ前に **CI は全チェックが success/neutral/skipped で完了（pending/failure 0 件）であること**を明示確認する（`gh pr checks --watch` が終わっただけでは合格にせず、全チェックの結論を列挙して確認する）
- マージ前に **チェックが 1 件以上存在すること**を確認する。チェック総数 0 件・`gh pr checks` の非ゼロ終了（チェック不在エラー・取得不能を含む）は green とみなさず、監視側は `blocked`（quality）で停止し、merge-exec 側は `checks-not-green` で辞退する（Issue #159。CI 未起動の PR を自動マージしない fail-closed）
- 外部チェック（Cursor Bugbot 等）の構成は `args.externalChecks` で明示する（`{"app": "<slug>", "context": "<required check context>"}` の組で宣言する。slug のみの旧形式は監視・待機は動くがクライアント側自動マージは fail-closed で停止する — 下流 sync PR codex P0 変種 1）。Step 1（Tree フェーズ）の観測（直近 3 件の merged PR 分析）は参考値にすぎず、明示がない限り**新規マージ**を停止する（PR が既に `MERGED` の場合のクローズ・状態記録回復のみ、回復専用 merge-exec + merge-verify 経由で `merged` 終端できる。Issue #168）。Bugbot 待機・`@cursor review` 催促を省略できるのは `externalChecks: []` で「外部チェックなし」を確定した場合のみ
- `args.externalChecks` で明示した外部チェック App は、slug を問わず **HEAD sha に対する起動の確認**をマージの必須条件とする（Issue #155。cursor だけでなく sonarcloud 等も検証する）。cursor はレビューが 1 件以上到着し、かつ CHANGES_REQUESTED が 0 件であること（Bugbot は APPROVED を出さないため APPROVED は要求しない。個別指摘は inline レビュースレッドとして投稿されるため「未解決スレッド 0 件」ゲートが内容非依存の機械強制として働く。監視側の needs-fix 判定は修正ループ用 advisory でありマージ可否の入力ではない）、cursor 以外は check-run が 1 件以上ならその全件が許容 conclusion であること（failure・未完了があれば APPROVED レビューが存在しても不合格）、check-run が 0 件のときに限り「APPROVED レビューが 1 件以上かつ CHANGES_REQUESTED / COMMENTED / PENDING が 0 件」であることを条件とする。待機上限（最大 10 分）内に起動を確認できなければ「チェックなし」とみなさず `blocked` で停止する（App の障害・遅延・起動失敗時にゲートを迂回しない fail-closed）。マージ実行エージェント側でも App ごとに件数・状態 enum のみを再取得して独立に検証する
- マージ前に **レビューコメントが全て解決済みであること**を確認する（未解決コメントがある場合はマージしない）
- **merged 終端は独立確認を通過した場合のみ**確定する。merge-exec の `merged: true` は `reason`（`merged` / `already-merged`）との整合を必須とし（不整合は systemic failure として `failed` 終端）、さらに読み取り専用の merge-verify エージェントで `state=MERGED` と監視時点 HEAD sha の一致を独立確認できた場合にのみ merged として扱う。確認不能・不一致は `blocked`（quality）で fail-closed し、実際にマージ済みなら次回ランの monitoring 再開（already-merged 経路）で回復する（Issue #160）
- コミット・PR 作成は Conventional Commits に従う（`.claude/rules/conventional-commits.md`）。セキュリティ問題を検出した場合は修正してから進む（`.claude/rules/security.md`）
- CI が全 green に見えるのにマージが進まない場合は、cancel された run の残存 check を疑い Step 6 の「全チェックが pass に見えるのにマージが進まない場合」の分岐に従って切り分ける（`mergeStateStatus` は自動フローでは取得していない）
- **中断・失敗後に手動で worktree を削除したり削除確認に答えたりする必要はない**。再実行時に Recover phase が per-issue で継続可否を判断し、作業のある worktree は continue（Implement で継続）または discard（削除 → Plan から新規）に振り分ける。continue / discard いずれの worktree 削除も WIP 退避の完了を検証できた場合のみ実行され、検証できない場合は残骸を保全して `failed` にする（データ損失より停滞を選ぶ fail-safe）。なお review / pr-create の使い捨て worktree は自動削除しない方針のため、ラン終了時のログ一覧を見て必要に応じ手動で掃除する

## sandbox 環境での実行

このスキルはネットワーク越しの GitHub 操作（`git fetch` / `git push` / PR 作成・マージ）を必須とする。該当コマンドはコマンド単位で sandbox 無効にして実行する。ネットワーク遮断を解除できない環境では実行できない。
