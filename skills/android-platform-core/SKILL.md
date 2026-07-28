---
name: android-platform-core
description: >
  Android アプリ開発 (Kotlin) のプラットフォーム基盤リファレンス。
  Activity, Intent, Application, ContentProvider, AndroidManifest, androidx,
  ランタイム権限, NotificationCompat, WindowInsets, スプラッシュスクリーン,
  Glance ウィジェット。
user-invocable: false
---

# Android Platform Core リファレンス

Android プラットフォーム公式ドキュメント（app components / manifest / permissions / notifications / system UI / Glance）の主要 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/android-platform-core/
  SKILL.md
  references/
    app-components/
      README.md
      app-components-overview.md
      activity.md
      activity-lifecycle.md
      component-activity-compose.md
      tasks-and-back-stack.md
      configuration-changes.md
      intent.md
      intent-filters.md
      common-intents.md
      package-visibility.md
      activity-result-contracts.md
      content-provider-basics.md
      content-provider-creating.md
      app-process-priority.md
      application-class.md
    manifest-resources/
      README.md
      manifest-structure.md
      manifest-element.md
      application-element.md
      activity-element.md
      uses-permission-element.md
      uses-feature-element.md
      uses-sdk-element.md
      queries-element.md
      provider-element.md
      receiver-element.md
      service-element.md
      manifest-merging.md
      resource-directories.md
      resource-qualifiers.md
      string-resources.md
      value-resources.md
      style-theme-resources.md
      drawable-resources.md
      adaptive-icons.md
      localization-rtl.md
      compose-resource-access.md
      resource-naming-compression.md
    permissions-privacy/
      README.md
      permission-types-and-protection-levels.md
      declaring-permissions.md
      requesting-runtime-permissions.md
      requesting-permissions-in-compose.md
      evaluating-permission-need.md
      explaining-permission-access.md
      permission-groups-and-one-time-permission.md
      automatic-permission-reset.md
      special-permissions-overview.md
      system-alert-window.md
      manage-external-storage.md
      post-notifications-permission.md
      location-permissions.md
      media-permissions.md
      data-safety-and-privacy-policy.md
      advertising-and-app-set-id.md
    notifications/
      README.md
      notification-builder.md
      notification-channels.md
      notification-manager.md
      notification-permission.md
      notification-actions.md
      expanded-notifications.md
      notification-progress.md
      notification-groups.md
      notification-navigation.md
      full-screen-intent.md
      notification-badges.md
    system-ui/
      README.md
      window-insets.md
      window-insets-modifiers.md
      material3-insets.md
      edge-to-edge.md
      system-bar-appearance.md
      display-cutout.md
      picture-in-picture.md
      pip-setup.md
      app-shortcuts.md
      creating-shortcuts.md
      adaptive-icons.md
      splash-screen.md
      dark-theme.md
      keep-screen-on.md
    glance-widgets/
      README.md
      glance-app-widget.md
      glance-app-widget-receiver.md
      glance-modifier.md
      layout-containers.md
      lazy-lists.md
      text.md
      image.md
      button.md
      progress-indicators.md
      toggle-controls.md
      scaffold-titlebar.md
      glance-theme.md
      actions.md
      state-management.md
      widget-updates.md
      size-modes.md
      composition-locals.md
      remoteviews-legacy.md
```

`glance-widgets` は `androidx.glance` の API であり、モバイル Compose (`androidx.compose`) とは別 API 系統（同名の `Text` / `Image` / `Button` でもシグネチャが異なる）。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Activity のライフサイクル・生成/破棄を扱いたい | app-components | [references/app-components/README.md](references/app-components/README.md) |
| Intent / IntentFilter / ActivityResultContracts で画面遷移・結果受け渡しをしたい | app-components | [references/app-components/README.md](references/app-components/README.md) |
| タスクとバックスタック・構成変更・Application クラスを理解したい | app-components | [references/app-components/README.md](references/app-components/README.md) |
| ContentProvider を実装・利用したい | app-components | [references/app-components/README.md](references/app-components/README.md) |
| AndroidManifest.xml の要素・マニフェストマージを設定したい | manifest-resources | [references/manifest-resources/README.md](references/manifest-resources/README.md) |
| リソースディレクトリ・修飾子・strings/colors/styles/drawable を定義したい | manifest-resources | [references/manifest-resources/README.md](references/manifest-resources/README.md) |
| ローカライズ・RTL 対応をしたい | manifest-resources | [references/manifest-resources/README.md](references/manifest-resources/README.md) |
| ランタイム権限・特別な権限を要求したい | permissions-privacy | [references/permissions-privacy/README.md](references/permissions-privacy/README.md) |
| 位置情報・メディア・通知権限を扱いたい | permissions-privacy | [references/permissions-privacy/README.md](references/permissions-privacy/README.md) |
| パッケージ可視性・プライバシーポリシー対応をしたい | permissions-privacy | [references/permissions-privacy/README.md](references/permissions-privacy/README.md) |
| NotificationCompat / 通知チャンネルで通知を組み立てたい | notifications | [references/notifications/README.md](references/notifications/README.md) |
| 通知アクション・展開スタイル・グループ化・フルスクリーンインテントを使いたい | notifications | [references/notifications/README.md](references/notifications/README.md) |
| WindowInsets・エッジツーエッジ・ディスプレイカットアウトに対応したい | system-ui | [references/system-ui/README.md](references/system-ui/README.md) |
| Picture-in-Picture・ショートカット・スプラッシュスクリーン・ダークテーマを扱いたい | system-ui | [references/system-ui/README.md](references/system-ui/README.md) |
| Glance でアプリウィジェットを作りたい | glance-widgets | [references/glance-widgets/README.md](references/glance-widgets/README.md) |

Service / BroadcastReceiver は `android-background-work`、ディープリンクと予測型戻るは `android-navigation`、ファイル/MediaStore は `android-data`、Compose の UI は `android-compose-ui` / `android-compose-components` の担当。
