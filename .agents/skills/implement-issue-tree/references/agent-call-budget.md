# エージェント呼び出し数の予算

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

Workflow ランタイムは 1 ランあたりのエージェント数に上限を持つ。上限に達したランは `completed` として返るため、
予算を持たないスクリプトは PR 作成直後の未監視のまま終わる（Issue #592）。本書は上限値の根拠、数え方、
新規着手を止める式、止めたあとに返す情報をまとめる。実装は `scripts/implement-issue-tree.src.js` の
`agentBudget` 宣言部（定数・`agentBudgetHold`）と駆動部冒頭の `wrapAgentCounting` による差し替え。

## 上限値 1,000 の根拠

| 根拠 | 内容 |
|------|------|
| ドキュメント | `references/subagents/workflows.md`（anthropic-claude-code-extend スキル）の `Max agents per run \| 1,000` |
| 実測 | 2026-10-11〜12 の `Fandhe-AI/fandhe-container`（`parent` = ルート・total 1,077、`parallel: 5`）。`agent_count` 1000・`agents_done` 1000・`agents_error` 0 で `completed` 終了。最後に起動されたエージェントは `pr-create:#543` で、その後の monitor・merge は起動されなかった |

内訳（ラベル別。上位）: `worktree:residual-bytes` 269・`state:update:#N` 210・`prereq:probe` 106・`state:cleanup:#N` 69・
`merge:#N` 67・`fix:#N` 49。件数そのものの削減（blocked 記録の一括化は #585、残置 worktree 容量の測定回数、
`prereq:probe` のまとめ実行）は別の対応で、本機構は「上限に達しても半端な状態を作らない」ことだけを担う。

定数 `AGENT_RUN_LIMIT` = 1000 はランタイムの上限と同じ値。`args.agentCallLimit` は「新規着手・monitoring 再開を
止める判断に使う、ランタイム上限の想定値」で、**呼び出しそのものは止めない**。開始処理・終了処理・実行中の
issue は値を超えても続行する。実行中の issue の途中で呼び出しを止めると、本機構が防ぎたい半端な状態をスクリプト
自身が作ってしまうためで、ハードキャップはランタイムが持つ。使用数が値を超えた最初の 1 回だけ警告ログを出し、
返却値 `agentBudget.reached` が `true` になる。

値は 81〜1000 の整数に限る。下限 81 = 開始処理 30 + 終了処理の予備（固定）20 + 1 issue の目安 30 + 1。開始処理
（未追跡検査・nonce・`loadState` と照合・ツリー取得・外部チェック観測・依存宣言と祖先とツリー外前提の取得・
`init-all`・孤立スキャン・残置の観測・HEAD 検査）は実測で約 20 回、依存宣言のチャンク数に比例するため余裕 10 を
足した。これ未満の値は 1 件も着手できないか開始処理だけで使い切るため、矛盾する入力として起動時にエラーで停止する。

## 数え方（スクリプトの `agent()` 1 回 = ランタイムのエージェント 1 件）

- 駆動部の冒頭で `agent` を、呼ぶ前に `used` を 1 増やす関数へ再束縛する。呼び出し箇所は書き換えない。
  `runStateAgent` の sonnet フォールバック、`agentRetryOnce` の再試行、fix の再起動はいずれも `agent()` を
  呼び直すので、実際に起動した数と一致する。例外・null を返した呼び出しも「起動した」ので数える。
- `pipeline()` は使わない（使うとスクリプトからは数えられない）。テストが生成物に `pipeline(` が無いことを検査する。
- 再束縛できない実行環境では数えられず、予算ゲートは効かない。その場合は返却値の `agentBudget.enforced` が
  `false` になり、ログにも出す（起動を止めずに、効いていないことを見えるようにする）。`enforced: false` のランでは
  `used` が 0 のままで判定が成り立たないため、新規着手・monitoring 再開の予算判定を適用しない（全件が従来どおり着手する）。

## 新規着手を止める式

新規着手（`monitoring` 再開と `verify-close` を含む）の前に、残り `limit - used` が次を下回れば着手しない。

```text
必要量 = 実行中の件数 × 30 + 候補の目安 + 終了処理の予備
候補の目安 = 実装 30 / monitoring 再開 12 / verify-close 6
終了処理の予備 = 20 + ceil(未完了ノード数 / 100)
```

**前進保証**: このランでまだ 1 件も着手しておらず実行中も 0 の最初の着手には、`ceil(未完了ノード数 / 100)` の項を課さない。
未完了ノードが多いと、この項だけで limit を超え、実行中 0・使用量が少ないのに全件が未着手になるため（例: `agentCallLimit: 81`・
未完了 3,101 件では必要量が 82 になる）。最初の 1 件は固定分（候補の目安 + 20）が残りに収まる限り着手し、2 件目以降は
項を課す。blocked 一括記録が想定上限を超える分は、超過の警告（呼び出しは止めない）が受け止める。

非ラッチ: 実行中の issue が終われば `running` が減り、残りが足りれば再び着手する。判定は `AGENT_CALLS_PER_ISSUE`・
`AGENT_CALLS_TERMINAL_BASE` と `agentBudgetHold`（純粋関数）に集約し、テストが式の境界を固定する。

### 1 issue の目安 30 の内訳（`AGENT_CALLS_PER_ISSUE.implement`）

通常経路の見積り（約 22）に余裕 8 を足した値。

| 段階 | 回数 |
|------|------|
| 状態書込み（開始・planning・implementing・reviewing・unverifiedPr・monitoring・終端・cleanup。フォールバックで +1 し得る） | 約 8 |
| plan・implement | 2 |
| Review 2 回 + fix 1 回（1 往復） | 3 |
| pr-create・PR 照合（`pr-bind`） | 2 |
| monitor 3 回 | 3 |
| マージ後の fix と再 monitor | 2 |
| merge-exec・merge-verify | 2 |

最悪値（fix 6 回・monitor 7 回・Review 往復）は 60 を超えるが、実行中の issue は既にその一部を使っているため、
残り全量を最悪値で見積もると着手を止めすぎる。目安を超えた issue が上限へ達した場合は、下の「未監視の PR」が
受け止める。過剰に見積もったときの代償は未着手が増えること（同じ引数の再実行で着手する）で、
過小に見積もったときの代償は打ち切りなので、前者に倒している。

### 終了処理の予備

ループ後に走るのは `writeBlockedStateBatch`（100 件ごとに 1 エージェント。未完了ノード数から見積もる）、
孤立 worktree のスキャンと終了時の `loadState`、容量の終了時実測、スイープ、メイン worktree の未追跡検査と HEAD 検査（`worktree:head-scan`。終了時の 1 回。予算ゲートの対象ではなく無条件に実行される）で、
再測定の再試行を含めても固定分は約 20 に収まる。

## 止めたあとに返す情報

| 項目 | 内容 |
|------|------|
| ログ | 停止時点の使用量・残り・必要量。終了時に `エージェント呼び出し数: used/limit` |
| 返却値 `agentBudget` | `{ limit, used, enforced, stoppedDispatchAt, starts, reached }`（`starts` は本ランで着手した件数。前進保証の判定に使う） |
| 未着手ノード | `notStarted` に載り、`done` の `not-started` の note が予算不足を示す。状態ファイルには `blocked` で一括記録される |
| monitoring 再開の見送り | `interrupted` に載り、note が予算不足を示す。状態ファイルの `pr` は保持される |
| 返却値 `unmonitoredPrs` | 本ランで PR 番号を得たが、実 monitor が一度も結果を返さなかった `[{ issue, pr, resumable }]`。終了ログにも出す |

`unmonitoredPrs` の PR は、番号を得た時点（照合・状態保存より前）で `resumable: false` として記録するため、その後のどこで
打ち切られても載る。照合を通り、状態ファイルへ `pr` を含む patch を書けた時点で
`resumable: true` へ上がる（`monitoring` 遷移の保存成功、またはその失敗後の `blocked` + `pr` + `branch` の退避保存の成功。
どちらも次回ランの `isActiveMonitoring` が再開対象にする条件〔status が monitoring / blocked、`pr` が正の整数、
branch がその issue の命名〕と同一で、`blockedReason` 等の追加条件は無い）。`resumable: true` は状態ファイルに `pr` が保存されており、同じ引数で再実行すると
monitoring 再開（Recover・Implement・PR 作成は通らない）に乗る。`resumable: false` は再実行しても再開しないため、
返却値の PR 番号を GitHub 上で手動確認する（`unverifiedPr` が保存されていれば再実行で再照合される）。終了ログも
両者で案内を分ける。

## 検証していない点

- 上限到達後にランタイムが `agent()` を何で返すか（null か例外か、スクリプトを止めるか）は実測していない。
  テストは「null を返す」と仮定して `unmonitoredPrs` の経路を確認している。
- 差し替え（識別子の再束縛）が実ランタイムで通ることは、単体テストでは確認できない（テストは `agent` を
  `AsyncFunction` の引数として渡す）。通らない場合は `enforced: false` で表に出る。
