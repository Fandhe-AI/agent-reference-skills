# Sessions

セッションの一覧・検索・管理・エクスポート。

## 直近セッションの一覧

```bash
hermes sessions list
```

## 対話式セッションピッカー

```bash
hermes sessions browse
```

## セッションのエクスポート（JSONL）

```bash
hermes sessions export <output_file>
hermes sessions export <output_file> --session-id <id>
```

## セッションの削除

```bash
hermes sessions delete <session-id>
```

> **警告**: 削除したセッションは復元できない。

## 古いセッションの一括削除

```bash
hermes sessions prune
```

> **警告**: 対象となる古いセッションはすべて削除される。

## セッション統計の表示

```bash
hermes sessions stats
```

## セッションへのタイトル付与

```bash
hermes sessions rename <session-id> <title>
```

## ゲートウェイクラッシュで失われたターンの破棄

```bash
hermes sessions discard 20250305_091523_a1b2c3d4 --yes
hermes sessions discard "debugging auth flow" --admission a9b59ad3ee914d75967def2a33435c88 --yes
```

gateway 停止で中断されたターンは結果不明（`unknown`）のまま再実行されず、確認するまでセッションを塞ぐ。`--yes` が無いと確認を求め、端末が無い場合は終了コード 2 で拒否される。失われた入力はトランスクリプトに残り、一部の操作が実行済みの場合があるため、再送する前に影響を確認する。

> **警告**: 破棄したターンは再実行されない。

## 終了済みセッションのアーカイブ

```bash
hermes sessions archive --title "Review Hermes" --include-open --yes
```

既定では終了済みセッションのみが対象。`--include-open` で Desktop などの gateway 管理セッションも含める（`prune` は開いたセッションを削除しない）。

## セッションのシステムプロンプトを更新

```bash
hermes sessions refresh-prompts
hermes sessions refresh-prompts --session SESSION_ID
```

継続中のセッションが次のターンで `SOUL.md`・スキル・コンテキストファイルから保存済みシステムプロンプトを再構築する（履歴とセッション ID は維持、gateway 稼働中でも可、再構築したセッションごとにプロンプトキャッシュを 1 回失う）。

## プロファイルの管理

```bash
hermes profile list
hermes profile use <name>
hermes profile create <name>
hermes profile show <name>
hermes profile rename <old> <new>
hermes profile delete <name>
hermes profile export <name>
hermes profile export <name> -o <file>
hermes profile import <archive>
```

> **警告**: `hermes profile delete <name>` はプロファイルのデータを削除する。`-y` フラグを付けると確認をスキップする。

## プロファイルのエイリアス（ラッパースクリプト）管理

```bash
hermes profile alias <name>
hermes profile alias <name> --remove
hermes profile alias <name> --name <alias-name>
```

## 注記

v0.23 の変更: `hermes sessions discard` / `archive` / `refresh-prompts` の追加。gateway 稼働中の `hermes sessions prune` は gateway に選択したセッションの削除を依頼する。`hermes sessions optimize`、および gateway 停止中の `prune` は、他の Hermes プロセス（Desktop・dashboard・cron）が `state.db` を保持している間は拒否される（停止するか `--force`）。

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/sessions (pinned to v0.23.1)
- Source: https://hermes-agent.nousresearch.com/docs/reference/cli-commands (pinned to v0.23.1)
