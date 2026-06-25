---
name: apple-swift
description: >
  Swift Standard Library・Concurrency・プロトコル/ジェネリクス・Observation リファレンス。
  async/await、actor、Sendable、Task、TaskGroup、AsyncSequence、AsyncStream、
  Equatable、Hashable、Comparable、Codable、Identifiable、Optional、Result、
  generics、some/any opaque types、Observable、@Observable、ObservationRegistrar。
user-invocable: false
model: sonnet
---

# Apple Swift リファレンス

Swift 公式ドキュメントの Standard Library・Concurrency・プロトコル/ジェネリクス・Observation を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/apple-swift/
  SKILL.md
  references/
    standard-library/
      README.md
      int.md
      double.md
      float.md
      bool.md
      string.md
      character.md
      substring.md
      unicode.md
      array.md
      dictionary.md
      set.md
      range.md
      contiguous-array.md
      optional.md
      result.md
      keypath.md
    concurrency/
      README.md
      task.md
      taskgroup.md
      throwingtaskgroup.md
      withtaskgroup.md
      withthrowingtaskgroup.md
      taskpriority.md
      tasklocal.md
      actor.md
      mainactor.md
      globalactor.md
      sendable.md
      asyncsequence.md
      asyncstream.md
      asyncthrowingstream.md
      checkedcontinuation.md
      withcheckedcontinuation.md
    protocols-generics/
      README.md
      equatable.md
      hashable.md
      comparable.md
      identifiable.md
      codable.md
      encodable.md
      decodable.md
      caseiterable.md
      rawrepresentable.md
      sequence.md
      collection.md
      iteratorprotocol.md
      customstringconvertible.md
      error.md
      expressiblebyliteral.md
      generics.md
      some-any-opaque-types.md
    observation/
      README.md
      observable-protocol.md
      observable-macro.md
      observationignored.md
      observationtracked.md
      observationregistrar.md
      withobservationtracking.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Int / Double / Float / Bool の数値型を使いたい | standard-library | [references/standard-library/README.md](references/standard-library/README.md) |
| String / Character / Substring / Unicode を扱いたい | standard-library | [references/standard-library/README.md](references/standard-library/README.md) |
| Array / Dictionary / Set / Range / ContiguousArray を使いたい | standard-library | [references/standard-library/README.md](references/standard-library/README.md) |
| Optional / Result / KeyPath の API を確認したい | standard-library | [references/standard-library/README.md](references/standard-library/README.md) |
| async / await / Task で非同期処理を書きたい | concurrency | [references/concurrency/README.md](references/concurrency/README.md) |
| actor / MainActor / GlobalActor でデータ競合を防ぎたい | concurrency | [references/concurrency/README.md](references/concurrency/README.md) |
| TaskGroup / withTaskGroup で並列処理を構造化したい | concurrency | [references/concurrency/README.md](references/concurrency/README.md) |
| AsyncSequence / AsyncStream / for await in を使いたい | concurrency | [references/concurrency/README.md](references/concurrency/README.md) |
| Sendable 準拠・コールバック API を async に橋渡ししたい | concurrency | [references/concurrency/README.md](references/concurrency/README.md) |
| TaskLocal / TaskPriority を使いたい | concurrency | [references/concurrency/README.md](references/concurrency/README.md) |
| Equatable / Hashable / Comparable を型に準拠させたい | protocols-generics | [references/protocols-generics/README.md](references/protocols-generics/README.md) |
| Codable / Encodable / Decodable で JSON シリアライズしたい | protocols-generics | [references/protocols-generics/README.md](references/protocols-generics/README.md) |
| Identifiable / CaseIterable / RawRepresentable を使いたい | protocols-generics | [references/protocols-generics/README.md](references/protocols-generics/README.md) |
| Sequence / Collection / IteratorProtocol を実装したい | protocols-generics | [references/protocols-generics/README.md](references/protocols-generics/README.md) |
| ジェネリクス関数・型・associatedtype・where 句を書きたい | protocols-generics | [references/protocols-generics/README.md](references/protocols-generics/README.md) |
| some / any opaque types・existential を使いたい | protocols-generics | [references/protocols-generics/README.md](references/protocols-generics/README.md) |
| Error プロトコルでカスタムエラーを定義したい | protocols-generics | [references/protocols-generics/README.md](references/protocols-generics/README.md) |
| @Observable マクロで SwiftUI / UIKit と状態を連携したい | observation | [references/observation/README.md](references/observation/README.md) |
| Observable プロトコルを手動で準拠したい | observation | [references/observation/README.md](references/observation/README.md) |
| @ObservationIgnored で追跡対象外プロパティを設定したい | observation | [references/observation/README.md](references/observation/README.md) |
| withObservationTracking で変更通知を受け取りたい | observation | [references/observation/README.md](references/observation/README.md) |
