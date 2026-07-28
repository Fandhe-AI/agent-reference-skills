---
name: android-background-work
description: >
  Android アプリ開発 (Kotlin) のバックグラウンド・非同期処理リファレンス。
  Jetpack androidx WorkManager: Worker, CoroutineWorker, WorkRequest,
  Constraints, WorkInfo, WorkContinuation, expedited work, テスト。
  Service: フォアグラウンドサービス, バウンドサービス, AIDL, Messenger。
  AlarmManager, PendingIntent, BroadcastReceiver, JobScheduler, Doze。
  Kotlin コルーチン, Flow, StateFlow, SharedFlow, Channel。
user-invocable: false
---

# Android バックグラウンド処理リファレンス

Android (Kotlin/Jetpack) 公式ドキュメントのバックグラウンド処理 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/android-background-work/
  SKILL.md
  references/
    workmanager/
      README.md
      worker.md
      coroutineworker.md
      workrequest.md
      periodicworkrequest.md
      workmanager.md
      constraints.md
      backoffpolicy.md
      data.md
      workinfo.md
      workcontinuation.md
      existingworkpolicy.md
      foreground-work.md
      outofquotapolicy.md
      configuration.md
      worker-factory.md
      threading.md
      testing.md
    services/
      README.md
      service.md
      service-manifest.md
      start-command-return-values.md
      start-stop-service.md
      foreground-service.md
      foreground-service-types.md
      foreground-service-restrictions.md
      foreground-service-timeout.md
      bound-service.md
      messenger.md
      aidl.md
      processes-and-threads.md
    alarms-broadcasts/
      README.md
      alarmmanager.md
      alarm-types.md
      exact-alarm-permissions.md
      pendingintent.md
      doze-app-standby.md
      broadcastreceiver.md
      registering-receivers.md
      implicit-broadcast-restrictions.md
      sending-broadcasts.md
      boot-completed.md
      jobscheduler.md
    coroutines-flow/
      README.md
      suspend-functions.md
      coroutine-scope.md
      launch-async-await.md
      dispatchers-withcontext.md
      job-cancellation.md
      exception-handling.md
      flow-basics.md
      flow-operators.md
      stateflow.md
      sharedflow.md
      callbackflow-channelflow.md
      combine-zip-flatmaplatest.md
      channel.md
      testing-coroutines-flow.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Worker / CoroutineWorker で永続的なバックグラウンドタスクを実装したい | workmanager | [references/workmanager/README.md](references/workmanager/README.md) |
| WorkRequest / PeriodicWorkRequest / Constraints で実行条件・スケジュールを組みたい | workmanager | [references/workmanager/README.md](references/workmanager/README.md) |
| WorkContinuation でワークをチェーンしたい、WorkInfo で状態を監視したい | workmanager | [references/workmanager/README.md](references/workmanager/README.md) |
| expedited work / OutOfQuotaPolicy を使いたい、WorkManager をテストしたい | workmanager | [references/workmanager/README.md](references/workmanager/README.md) |
| Service のライフサイクル・onStartCommand の戻り値を実装したい | services | [references/services/README.md](references/services/README.md) |
| フォアグラウンドサービスと foregroundServiceType / 起動制限 / 時間制限を扱いたい | services | [references/services/README.md](references/services/README.md) |
| バウンドサービス・Messenger・AIDL でプロセス間通信 (IPC) をしたい | services | [references/services/README.md](references/services/README.md) |
| AlarmManager で時刻指定・正確なアラームをスケジュールしたい | alarms-broadcasts | [references/alarms-broadcasts/README.md](references/alarms-broadcasts/README.md) |
| PendingIntent / BroadcastReceiver でブロードキャストを送受信したい | alarms-broadcasts | [references/alarms-broadcasts/README.md](references/alarms-broadcasts/README.md) |
| Doze / App Standby / JobScheduler / BOOT_COMPLETED を扱いたい | alarms-broadcasts | [references/alarms-broadcasts/README.md](references/alarms-broadcasts/README.md) |
| Kotlin コルーチン (launch, async, Job, Dispatchers) の基本を知りたい | coroutines-flow | [references/coroutines-flow/README.md](references/coroutines-flow/README.md) |
| Flow / StateFlow / SharedFlow / Channel でリアクティブなデータストリームを扱いたい | coroutines-flow | [references/coroutines-flow/README.md](references/coroutines-flow/README.md) |
| コルーチンの例外処理・キャンセル・テストを行いたい | coroutines-flow | [references/coroutines-flow/README.md](references/coroutines-flow/README.md) |

viewModelScope / repeatOnLifecycle は android-architecture、通知は android-platform-core、Compose の副作用 API (LaunchedEffect 等) は android-compose-ui が担当する。
