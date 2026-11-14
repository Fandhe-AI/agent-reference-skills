---
name: editorconfig
description: >
  EditorConfig (エディタ設定統一フォーマット) リファレンス。
  .editorconfig ファイル、glob パターン、root、
  indent_style / indent_size / tab_width、end_of_line, charset、
  trim_trailing_whitespace, insert_final_newline, max_line_length,
  spelling_language。
user-invocable: false
---

# EditorConfig リファレンス

EditorConfig ファイルフォーマットの全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切なリファレンスファイルを読むこと。

## ディレクトリ構成

```text
skills/editorconfig/
  SKILL.md
  references/
    README.md
    specification.md
    properties.md
    glob-patterns.md
    indentation.md
    best-practices.md
  samples/
    README.md
    basic-setup.md
    web-project.md
    python-project.md
    go-project.md
    multi-language-project.md
    nested-editorconfig.md
    unset-override.md
    glob-patterns.md
  scripts/
    README.md
    install.md
    cli.md
    validate.md
    generate.md
    editor-plugins.md
```

## 対象バージョンと出典

- 仕様: spec.editorconfig.org（取得日 2026-11-14）。サイトは「version 0.17.2」と表示するが、master `f580513` からビルドされており、最新タグ v0.17.2（`329077a`）より 15 コミット先（空ファイル節・ファイル名の大文字小文字節・Indentation 節・`{num1..num2}` の `num1 < num2` 要件・値省略時の空文字列などが master のみ）。master のみの記述は各ページ Notes に明記
- プロパティ補足: wiki の EditorConfig-Properties（`max_line_length` は仕様外の限定サポート）、editorconfig.org トップページ（取得日 2026-11-14）
- scripts: editorconfig-checker v4.0.2（`0adfdb0`、Go モジュールは `/v4/`）、editorconfig-core-js v4.0.0（`63b38ab`）、editorconfig-vim v1.2.1、editorconfig-core-py v0.17.1（いずれも取得日 2026-11-14）
- 追跡トリガー: `editorconfig/specification` に v0.17.3 / v0.18.0 以降のタグ、editorconfig-checker / editorconfig-core-js の新リリースが出た時点で `/update-skill editorconfig check`

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| プロパティの意味・値・設定方法を知りたい | references | [references/README.md](references/README.md) |
| ファイルマッチングパターン・ワイルドカードを知りたい | references | [references/README.md](references/README.md) |
| ファイル検索順・優先順位・パース仕様を知りたい | references | [references/README.md](references/README.md) |
| indent_style / indent_size / tab_width の組み合わせ・実際のインデント | references | [references/README.md](references/README.md) |
| よくある設定例・FAQ・ベストプラクティスを知りたい | references | [references/README.md](references/README.md) |
| 典型的な .editorconfig の使い方・プロジェクト別設定例を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・バリデーション方法を知りたい | scripts | [scripts/README.md](scripts/README.md) |
