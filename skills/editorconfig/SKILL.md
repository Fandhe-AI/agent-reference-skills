---
name: editorconfig
description: >
  EditorConfig (エディタ設定統一フォーマット) リファレンス。
  .editorconfig ファイル、glob パターン、root、
  indent_style / indent_size / tab_width、end_of_line, charset、
  trim_trailing_whitespace, insert_final_newline, max_line_length。
user-invocable: false
model: sonnet
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
| よくある設定例・FAQ・ベストプラクティスを知りたい | references | [references/README.md](references/README.md) |
| 典型的な .editorconfig の使い方・プロジェクト別設定例を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・バリデーション方法を知りたい | scripts | [scripts/README.md](scripts/README.md) |
