---
name: kotlin
description: >
  Kotlin (JetBrains 製プログラミング言語, kotlinlang.org) の言語仕様・標準ライブラリ・ツールチェーン。
  null safety, data class, sealed class, 拡張関数, context parameters, コレクション,
  kotlinx.coroutines (suspend, Flow), kotlinx.serialization (@Serializable), KGP, Maven, KSP, kapt, K2, KDoc。
user-invocable: false
---

# Kotlin

## 対象バージョン

| 対象 | 版 | 備考 |
| --- | --- | --- |
| Kotlin | 2.4.21（2026-10-08、languageVersion / apiVersion 2.4） | `docs/v.list` で確認 |
| kotlinx.coroutines | 1.11.0 | |
| kotlinx.serialization | 1.11.0 | |
| KSP | 2.3.10 | |

- 取得日: 2026-10-16
- 本文の一次ソース: `kotlinlang.org/docs/_llms/<slug>.txt`（公式 llms.txt の Markdown twin）。URL に版が無いため取得日を記録
- 照合用の原本
  - Kotlin 本体ドキュメント: `JetBrains/kotlin-web-site` commit `0b10373a150997e9fbcd730a7e00ae8444cc8606`（リリースタグが無いため SHA で pin）
  - kotlinx.coroutines: `Kotlin/kotlinx.coroutines` commit `7e0d1b3e9ca83652427ae00dda7d1673f058a743`（サイトは master から生成され、タグ 1.11.0 の docs は古い構成のため。保存した 14 件に 1.12 / EAP の記述は 0 件）
  - kotlinx.serialization: Writerside ソースが公開されていないため twin のみ。補助として GitHub ガイドをタグ `v1.11.0` で保存
- 除外した版: Kotlin 2.5.0-Beta1、kotlinx.serialization 1.12.0-RC

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
