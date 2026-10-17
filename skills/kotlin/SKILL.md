---
name: kotlin
description: >
  Kotlin (JetBrains 製プログラミング言語, kotlinlang.org) の言語仕様・標準ライブラリ・ツールチェーン。
  null safety, data class, sealed class, context parameters, KGP, Maven, KSP, kapt, K2, KDoc。
user-invocable: false
---

# Kotlin

> 分割 PR の途中段階。現在収録済み: references/{basics, build-tools, classes-objects}。冒頭説明・description に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

## 対象バージョン

| 対象 | 版 | 備考 |
| --- | --- | --- |
| Kotlin | 2.4.21（2026-10-08、languageVersion / apiVersion 2.4） | `docs/v.list` で確認 |
| kotlinx.coroutines | 1.11.0 | |
| kotlinx.serialization | 1.11.0 | |
| KSP | 2.3.10 | |

- 取得日: 2026-10-16
- 本文の一次ソース: [kotlinlang.org/docs/llms.txt](https://kotlinlang.org/docs/llms.txt) が列挙する Markdown twin `https://kotlinlang.org/docs/_llms/<slug>.txt`（例: [basic-syntax.txt](https://kotlinlang.org/docs/_llms/basic-syntax.txt)）。URL に版が無いため取得日を記録
- 照合用の原本
  - Kotlin 本体ドキュメント: `JetBrains/kotlin-web-site` commit [`0b10373a150997e9fbcd730a7e00ae8444cc8606`](https://github.com/JetBrains/kotlin-web-site/tree/0b10373a150997e9fbcd730a7e00ae8444cc8606)（リリースタグが無いため SHA で pin）

## ディレクトリ構成

```text
skills/kotlin/
  SKILL.md
  references/
    basics/                 # 構文・null safety・制御フロー・例外・KDoc・可視性（14 ページ）
      README.md
      basic-syntax.md  null-safety.md  control-flow.md  exceptions.md
      idioms.md  kotlin-doc.md  annotations.md  visibility-modifiers.md ...
    classes-objects/        # クラス・オブジェクト（15 ページ）
      README.md
      classes.md  data-classes.md  sealed-classes.md  interfaces.md  extensions.md
      delegated-properties.md  object-declarations.md  inline-classes.md ...
    build-tools/            # Gradle・Maven・Kotlin daemon（14 ページ）
      README.md
      gradle-configure-project.md  gradle-compiler-options.md  maven-configure-project.md ...
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| 基本構文・null safety・if / when / for・例外処理・可視性・KDoc を知りたい | basics | [references/basics/README.md](references/basics/README.md) |
| class・data class・sealed class・interface・拡張・委譲・object を知りたい | classes-objects | [references/classes-objects/README.md](references/classes-objects/README.md) |
| Gradle / Maven 設定・コンパイラオプション・Kotlin daemon | build-tools | [references/build-tools/README.md](references/build-tools/README.md) |
