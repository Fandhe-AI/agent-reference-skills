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
