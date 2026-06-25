---
name: apple-data
description: >
  Apple データ永続化・データフロー・ネットワーク・ユーティリティリファレンス。
  SwiftData / Core Data / Foundation / Combine。
  @Model、ModelContainer、ModelContext、@Query、Predicate、FetchDescriptor、
  NSManagedObject、NSFetchRequest、NSPersistentContainer、NSFetchedResultsController、
  URLSession、JSONEncoder、JSONDecoder、Publisher、@Published、AnyCancellable、sink。
user-invocable: false
model: sonnet
---

# Apple Data リファレンス

Apple のデータ永続化・データフロー関連フレームワーク（SwiftData / Core Data / Foundation / Combine）を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/apple-data/
  SKILL.md
  references/
    swiftdata/
      README.md
      model-macro.md
      persistent-model.md
      model-container.md
      model-context.md
      query-macro.md
      query-struct.md
      predicate.md
      fetch-descriptor.md
      sort-descriptor.md
      schema.md
      model-configuration.md
      attribute-macro.md
      relationship-macro.md
      transient-macro.md
      versioned-schema.md
      schema-migration-plan.md
    coredata/
      README.md
      nsmanagedobject.md
      nsmanagedobjectcontext.md
      nsmanagedobjectmodel.md
      nspersistentcontainer.md
      nspersistentstorecoordinator.md
      nspersistentstoredescription.md
      nsfetchrequest.md
      nsentitydescription.md
      nspredicate.md
      nssortdescriptor.md
      nsfetchedresultscontroller.md
      nsbatchinsertrequest.md
      nsbatchdeleterequest.md
      fetchrequest-swiftui.md
      nsmanaged.md
    foundation/
      README.md
      data.md
      date.md
      datecomponents.md
      calendar.md
      timezone.md
      dateinterval.md
      url.md
      urlcomponents.md
      urlrequest.md
      urlsession.md
      uuid.md
      measurement.md
      locale.md
      numberformatter.md
      dateformatter.md
      iso8601dateformatter.md
      filemanager.md
      bundle.md
      notificationcenter.md
      userdefaults.md
      jsonencoder.md
      jsondecoder.md
      propertylistencoder.md
    combine/
      README.md
      publisher.md
      subscriber.md
      subscription.md
      subject.md
      passthroughsubject.md
      currentvaluesubject.md
      anypublisher.md
      anycancellable.md
      cancellable.md
      published.md
      sink.md
      assign.md
      operators-transforming.md
      operators-filtering.md
      operators-combining.md
      operators-timing.md
      receive-on.md
      erasetoanypublisher.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| @Model でモデルクラスを定義したい | swiftdata | [references/swiftdata/README.md](references/swiftdata/README.md) |
| ModelContainer / ModelContext をセットアップしたい | swiftdata | [references/swiftdata/README.md](references/swiftdata/README.md) |
| @Query / FetchDescriptor でデータを取得したい | swiftdata | [references/swiftdata/README.md](references/swiftdata/README.md) |
| Predicate / SortDescriptor でフィルタ・ソートしたい | swiftdata | [references/swiftdata/README.md](references/swiftdata/README.md) |
| @Attribute / @Relationship / @Transient を設定したい | swiftdata | [references/swiftdata/README.md](references/swiftdata/README.md) |
| VersionedSchema / SchemaMigrationPlan でマイグレーションしたい | swiftdata | [references/swiftdata/README.md](references/swiftdata/README.md) |
| NSManagedObject でエンティティを操作したい | coredata | [references/coredata/README.md](references/coredata/README.md) |
| NSManagedObjectContext で CRUD を実行したい | coredata | [references/coredata/README.md](references/coredata/README.md) |
| NSPersistentContainer でスタックをセットアップしたい | coredata | [references/coredata/README.md](references/coredata/README.md) |
| NSFetchRequest / NSPredicate でデータをフェッチしたい | coredata | [references/coredata/README.md](references/coredata/README.md) |
| NSFetchedResultsController で UI と同期したい | coredata | [references/coredata/README.md](references/coredata/README.md) |
| NSBatchInsertRequest / NSBatchDeleteRequest でバッチ処理したい | coredata | [references/coredata/README.md](references/coredata/README.md) |
| URLSession でネットワークリクエストを送りたい | foundation | [references/foundation/README.md](references/foundation/README.md) |
| JSONEncoder / JSONDecoder で JSON を変換したい | foundation | [references/foundation/README.md](references/foundation/README.md) |
| Date / Calendar / DateComponents で日付を扱いたい | foundation | [references/foundation/README.md](references/foundation/README.md) |
| FileManager でファイル操作をしたい | foundation | [references/foundation/README.md](references/foundation/README.md) |
| UserDefaults / NotificationCenter を使いたい | foundation | [references/foundation/README.md](references/foundation/README.md) |
| UUID / Measurement / Locale を使いたい | foundation | [references/foundation/README.md](references/foundation/README.md) |
| Publisher / Subscriber でリアクティブストリームを構築したい | combine | [references/combine/README.md](references/combine/README.md) |
| @Published でプロパティの変更を購読したい | combine | [references/combine/README.md](references/combine/README.md) |
| PassthroughSubject / CurrentValueSubject でイベントを送信したい | combine | [references/combine/README.md](references/combine/README.md) |
| sink / assign でストリームを購読・バインドしたい | combine | [references/combine/README.md](references/combine/README.md) |
| map / filter / flatMap 等のオペレーターを使いたい | combine | [references/combine/README.md](references/combine/README.md) |
| receive(on:) でスレッドを切り替えたい | combine | [references/combine/README.md](references/combine/README.md) |
| AnyCancellable / eraseToAnyPublisher で型を消去したい | combine | [references/combine/README.md](references/combine/README.md) |
