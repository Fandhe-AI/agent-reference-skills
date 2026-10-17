---
name: kotlin
description: >
  Kotlin (JetBrains 製プログラミング言語, kotlinlang.org) の言語仕様・標準ライブラリ・ツールチェーン。
  null safety, data class, sealed class, 拡張関数, context parameters, スコープ関数 (let / run / apply / also / with), コレクション,
  Uuid, Duration (kotlin.time), kotlinx.coroutines (suspend, Flow),
  kotlinx.serialization (@Serializable, Json, ProtoBuf, CBOR), KGP, Maven, KSP, kapt, K2, KDoc。
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
- 本文の一次ソース: [kotlinlang.org/docs/llms.txt](https://kotlinlang.org/docs/llms.txt) が列挙する Markdown twin `https://kotlinlang.org/docs/_llms/<slug>.txt`（例: [basic-syntax.txt](https://kotlinlang.org/docs/_llms/basic-syntax.txt)）。URL に版が無いため取得日を記録
- 照合用の原本
  - Kotlin 本体ドキュメント: `JetBrains/kotlin-web-site` commit [`0b10373a150997e9fbcd730a7e00ae8444cc8606`](https://github.com/JetBrains/kotlin-web-site/tree/0b10373a150997e9fbcd730a7e00ae8444cc8606)（リリースタグが無いため SHA で pin）
  - kotlinx.coroutines: `Kotlin/kotlinx.coroutines` commit [`7e0d1b3e9ca83652427ae00dda7d1673f058a743`](https://github.com/Kotlin/kotlinx.coroutines/tree/7e0d1b3e9ca83652427ae00dda7d1673f058a743)（サイトは master から生成され、タグ 1.11.0 の docs は古い構成のため。保存した 14 件に 1.12 / EAP の記述は 0 件）
  - kotlinx.serialization: Writerside ソースが公開されていないため twin のみ。補助として GitHub ガイドをタグ [`v1.11.0`](https://github.com/Kotlin/kotlinx.serialization/tree/v1.11.0/docs) で保存
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
    types/                  # 型システム（10 ページ）
      README.md
      numbers.md  strings.md  arrays.md  generics.md  typecasts.md  type-aliases.md ...
    classes-objects/        # クラス・オブジェクト（15 ページ）
      README.md
      classes.md  data-classes.md  sealed-classes.md  interfaces.md  extensions.md
      delegated-properties.md  object-declarations.md  inline-classes.md ...
    functions/              # 関数・ラムダ・DSL（8 ページ）
      README.md
      functions.md  lambdas.md  inline-functions.md  context-parameters.md
      type-safe-builders.md  operator-overloading.md ...
    collections/            # コレクション・シーケンス・Range（18 ページ）
      README.md
      collections-overview.md  collection-operations.md  sequences.md  ranges.md ...
    stdlib/                 # 標準ライブラリ補足（7 ページ）
      README.md
      scope-functions.md  opt-in-requirements.md  reflection.md  time-measurement.md  uuids.md ...
    java-interop/           # Java 相互運用（7 ページ）
      README.md
      java-interop.md  java-to-kotlin-interop.md  jvm-records.md ...
    coroutines/             # kotlinx.coroutines（14 ページ）
      README.md
      coroutines-basics.md  coroutines-flow.md  channels.md  exception-handling.md ...
    serialization/          # kotlinx.serialization（14 ページ）
      README.md
      serialization-get-started.md  serialization-configure-json-serialization.md
      serialization-polymorphism.md  serialization-protobuf.md ...
    build-tools/            # Gradle・Maven・Kotlin daemon（14 ページ）
      README.md
      gradle-configure-project.md  gradle-compiler-options.md  maven-configure-project.md ...
    compiler/               # コンパイラ・K2・コンパイラプラグイン・KSP・kapt（23 ページ）
      README.md
      compiler-reference.md  k2-compiler-migration-guide.md  ksp-overview.md  ksp-quickstart.md  kapt.md ...
    releases/               # リリース・互換性・What's new（10 ページ）
      README.md
      whatsnew24.md  whatsnew2420.md  compatibility-guide-24.md  components-stability.md ...
  samples/                  # 動く実例 22 件
    README.md
    null-safety-patterns.md  sealed-class-when.md  scope-functions.md
    coroutines-structured-concurrency.md  flow-collect-and-cancel.md
    serialization-json-roundtrip.md  gradle-jvm-project.md ...
  scripts/                  # コマンド集 7 件
    README.md
    install.md  kotlinc.md  gradle.md  maven.md  kotlin-daemon.md  ksp.md  compiler-plugins.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 動く例が必要なら `samples/README.md`、実行コマンドが必要なら `scripts/README.md` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| 基本構文・null safety・if / when / for・例外処理・可視性・KDoc を知りたい | basics | [references/basics/README.md](references/basics/README.md) |
| 数値・String・Array・ジェネリクス・型キャスト・typealias を知りたい | types | [references/types/README.md](references/types/README.md) |
| class・data class・sealed class・interface・拡張・委譲・object を知りたい | classes-objects | [references/classes-objects/README.md](references/classes-objects/README.md) |
| 関数・ラムダ・inline・context parameters・DSL ビルダー・演算子オーバーロード | functions | [references/functions/README.md](references/functions/README.md) |
| List / Set / Map の操作・変換・フィルタ・Sequence・Range | collections | [references/collections/README.md](references/collections/README.md) |
| スコープ関数・opt-in・リフレクション・Duration・Uuid・標準入力 | stdlib | [references/stdlib/README.md](references/stdlib/README.md) |
| Java との相互運用・Java record・Java コレクションとの違い | java-interop | [references/java-interop/README.md](references/java-interop/README.md) |
| suspend 関数・launch / async・Flow・Channel・キャンセル・例外 | coroutines | [references/coroutines/README.md](references/coroutines/README.md) |
| JSON / ProtoBuf / CBOR シリアライズ・カスタムシリアライザ・ポリモーフィズム | serialization | [references/serialization/README.md](references/serialization/README.md) |
| Gradle / Maven 設定・コンパイラオプション・Kotlin daemon | build-tools | [references/build-tools/README.md](references/build-tools/README.md) |
| コンパイラオプション・K2 移行・KSP・kapt・all-open / no-arg 等のプラグイン | compiler | [references/compiler/README.md](references/compiler/README.md) |
| 新バージョンの変更点・互換性ガイド・コンポーネント安定性 | releases | [references/releases/README.md](references/releases/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
