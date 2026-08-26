---
description: 完了ゲート規約。テスト出力・終了コード等の証拠なしに「完了した」「動作する」と宣言しない。implement-issue / implement-issue-tree / implement-review / implement-review-pr / create-pr および実装系 Agent が守る。
applies_to: implement-issue, implement-issue-tree, implement-review, implement-review-pr, create-pr
---

# 完了ゲート規約

テスト出力・終了コード等の証拠なしに「完了した」「動作する」と宣言しない。完了主張は5段階ゲートをすべて通過した後にのみ行う。

## 適用対象

| 区分 | 対象 |
|------|------|
| スキル | implement-issue, implement-issue-tree, implement-review, implement-review-pr, create-pr |
| Agent | 実装・修正を行う全 Agent（implement-issue-tree の worktree 系 Agent を含む） |

applies_to に列挙したスキルは代表例である。コードやファイル・GitHub 状態を自動で生成・修正・実行するなど**副作用を伴う作業を行う全スキル・Agent はこの完了ゲートに従う**（例: project 系の状態変更スキルも対象）。

## 5段階完了ゲート

| # | フェーズ | 内容 |
|---|---------|------|
| 1 | **特定** | 主張を証明するコマンドを具体的に決める（例: `npm test`・`cargo test`・`pytest`） |
| 2 | **実行** | そのコマンドを完全に新規実行する（既存のログ・キャッシュ・前回結果を流用しない） |
| 3 | **読取** | 出力全体・終了コード・失敗数・警告を確認する（一部だけ読まない） |
| 4 | **検証** | 出力が主張を実際に裏付けているか判断する（グリーンか・失敗数ゼロか等） |
| 5 | **宣言** | 証拠を引用して初めて完了を宣言する |

## 禁止事項

- 「〜のはず」「probably」「たぶん」「おそらく」等の推測語での完了主張
- 前回実行結果・ログの流用（新規実行していない結果を根拠にしない）
- subagent の報告のみを根拠とした完了宣言（報告内容が証拠を含む場合を除く）
- 終了コードを確認せずに成功と判断すること
- テストが存在しないまま「テストが通る」と主張すること

## 完了宣言の書き方

証拠を明示して宣言する。例:

```
検証結果: `npm test` を実行。全22件パス、失敗0件（終了コード0）。
```

```
検証結果: `cargo test` を実行。test result: ok. 18 passed; 0 failed。
```

証拠が不十分な場合は「未検証」と明記し、実行が必要なコマンドを列挙する。

## 関連ルール

- `./debugging.md` — 修正前の根本原因調査規約
- `./security.md` — セキュリティ観点での完了条件
- `./conventional-commits.md` — コミット前の品質確認
