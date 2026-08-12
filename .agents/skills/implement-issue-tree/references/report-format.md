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

### 完了イシュー
- #N: タイトル — PR #M (squash merged)
...

### 失敗・未着手イシュー（要確認）
- #N: タイトル — 理由（CI 失敗 / レビュー未解決 / 依存先失敗 / halt 等）

### 対象外（out-of-scope）— 各 PR 本文の「対象外」節を参照
- #N（PR #M）: 対象外項目あり（詳細は PR 本文。Issue 化は承認のうえ人手で実施、切り出し先 Issue 番号: TBD）
- #N（PR #M）: 未解決レビューコメント由来の対象外あり（fix 対象外と判断・記録済み。Issue 化は承認のうえ人手で実施、切り出し先 Issue 番号: TBD）

### 未解決コメント（issue 化候補）— 該当があるときのみ出力する（0 件ならこの節ごと省略）
- #N（PR #M）: コメント author — 本文要約（スレッド URL）
  Issue 化は本レポート確認 → ユーザー承認のうえ実施する（承認なしに Issue 操作をしない。手順は「実装対象外（out-of-scope）の扱い」手順 3・4 と同様）
```

返却値: `parent` / `baseBranch` / `parallel` / `autoMerge`（クライアント側の実効状態 = `autoMergeRequested && externalChecksConfirmed`。opt-in 再有効化（2026-08-12）以降、opt-in + externalChecks 確定のランではクライアント側マージが実際に動くためこの AND 条件が実効値。サーバー側 auto-merge workflow の有無はこの値に反映されない） / `autoMergeRequested`（要求値。`args.autoMerge` の受理値をそのまま返す。opt-out ランでマージ条件を満たしたイシューは `blocked` + `pr` で終端し、マージ待ち PR 一覧として追跡する。Issue #165） / `mergeGuard`（`{ hookDenyOnly: true }`。hook が deny 専用＝carve-out なしであることの明示。hook 導入リポでは opt-in マージと併用不可） / `externalChecks`（確定した外部チェック App 一覧） / `externalChecksConfirmed`（構成が確定していたか。`false` のイシューはマージ直前に停止する） / `externalChecksObserved`（観測ベースの参考値） / `total` / `done`（各イシューの status。blocked / failed で未解決コメントがあれば `unresolvedComments`、fix 対象外の判断ログがあれば `outOfScope` を含む） / `failures` / `notStarted` / `halted`。
