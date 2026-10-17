# Skills

スキルのブラウズ・インストール・管理。

## スキルレジストリのブラウズ

```bash
hermes skills browse
hermes skills browse --source official
```

## スキルの検索

```bash
hermes skills search <query>
hermes skills search react --source skills-sh
hermes skills search https://mintlify.com/docs --source well-known
```

`--source` は `skills-sh` / `well-known` / `browse-sh` などを指定する。

## スキルのインストール

```bash
hermes skills install <identifier>
hermes skills install official/migration/openclaw-migration
hermes skills install skills-sh/anthropics/skills/pdf --force
hermes skills install https://example.com/SKILL.md --name my-skill
```

`--force` は非 dangerous なポリシーブロックのみ上書きでき、`dangerous` 判定は上書きできない。

> **警告**: サードパーティ・コミュニティのスキルは `--force` 指定前に内容を確認する。

## インストール前にスキル内容を確認（インストールしない）

```bash
hermes skills inspect <name>
```

## インストール済みスキルの一覧

```bash
hermes skills list
```

## ハブスキルの更新確認

```bash
hermes skills check
```

## 変更されたスキルの再インストール

```bash
hermes skills update
```

## ハブスキルの再スキャン

```bash
hermes skills audit
```

## スキルのアンインストール

```bash
hermes skills uninstall <name>
```

## 同梱スキルの user_modified 解除

```bash
hermes skills reset <name>
hermes skills reset <name> --restore
hermes skills reset <name> --restore --yes
```

`reset` は同梱スキルの manifest エントリを消去する。`--restore` は加えてユーザー側のコピーを同梱版に置き換える。

> **警告**: `--restore` はユーザーによる編集を同梱版で上書きする。

## 同梱スキルの配布を止める（opt-out）

```bash
hermes skills opt-out
hermes skills opt-out --remove
hermes skills opt-out --remove --yes
```

`opt-out` は `.no-bundled-skills` マーカーを書き、インストーラー・`hermes update` による同梱スキルの seed を止める（既存ファイルは触らない）。

> **警告**: `--remove` は未変更の同梱スキルを削除する（編集済み・hub 由来・手書きのスキルは削除されない）。実行前にプレビューと確認が出る。`--yes` で確認を省略する。

## 同梱スキルの配布を再開する（opt-in）

```bash
hermes skills opt-in
hermes skills opt-in --sync
```

マーカーを削除し、次回の `hermes update` で seed を再開する。`--sync` は即時に再 seed する。

## スキルの公開

```bash
hermes skills publish
```

## 設定のエクスポート・インポート

```bash
hermes skills snapshot
```

## スキルのプラットフォーム別有効化設定

```bash
hermes skills config
```

## カスタムソース（tap）の管理

```bash
hermes skills tap
```

## 注記

`hermes sync` コマンドの削除は、v0.22.2 の公式ドキュメント内で確認できなかったため記載しない。
