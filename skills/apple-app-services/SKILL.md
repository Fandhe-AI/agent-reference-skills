---
name: apple-app-services
description: >
  Apple アプリサービスリファレンス。StoreKit 2、CloudKit、WidgetKit、ActivityKit、
  User Notifications、Core Location、MapKit、HealthKit、Sign in with Apple。
  Product, Transaction, CKRecord, Widget, TimelineProvider, CLLocationManager,
  Map, HKHealthStore, ASAuthorizationController, UNUserNotificationCenter。
user-invocable: false
---

## ディレクトリ構成

```text
skills/apple-app-services/
  SKILL.md
  references/
    storekit/
      README.md
      appstore.md
      apptransaction.md
      message.md
      product-promotioninfo.md
      product-purchaseerror.md
      product-purchaseoption.md
      product-purchaseresult.md
      product-subscriptioninfo.md
      product-subscriptioninfo-renewalstate.md
      product-subscriptioninfo-status.md
      product-subscriptionrelationship.md
      product.md
      storeview.md
      subscriptionstoreview.md
      transaction.md
      transaction-currententitlements.md
      transaction-updates.md
      verificationresult.md
    cloudkit/
      README.md
      ckcontainer.md
      ckdatabase.md
      ckrecord.md
      ckrecord-id.md
      ckrecord-reference.md
      ckquery.md
      ckqueryoperation.md
      ckfetchrecordsoperation.md
      ckmodifyrecordsoperation.md
      cksubscription.md
      ckquerysubscription.md
      ckasset.md
      ckshare.md
      ckerror.md
      ckrecordzone.md
      cksyncengine.md
    widgetkit/
      README.md
      widget.md
      widgetconfiguration.md
      staticconfiguration.md
      appintentconfiguration.md
      timelineprovider.md
      appintenttimelineprovider.md
      timelineentry.md
      timeline.md
      timelinereloadpolicy.md
      timelineprovidercontext.md
      widgetcenter.md
      widgetbundle.md
      widgetfamily.md
      controlwidget.md
      staticcontrolconfiguration.md
      activityconfiguration.md
      activitykit-activity.md
    notifications/
      README.md
      UNCalendarNotificationTrigger.md
      UNLocationNotificationTrigger.md
      UNMutableNotificationContent.md
      UNNotification.md
      UNNotificationAction.md
      UNNotificationAttachment.md
      UNNotificationCategory.md
      UNNotificationContent.md
      UNNotificationContentProviding.md
      UNNotificationRequest.md
      UNNotificationResponse.md
      UNNotificationServiceExtension.md
      UNNotificationSettings.md
      UNNotificationSound.md
      UNNotificationTrigger.md
      UNPushNotificationTrigger.md
      UNTextInputNotificationAction.md
      UNTextInputNotificationResponse.md
      UNTimeIntervalNotificationTrigger.md
      UNUserNotificationCenter.md
      UNUserNotificationCenterDelegate.md
      requestAuthorization.md
    location-maps/
      README.md
      Annotation.md
      CLAuthorizationStatus.md
      CLBackgroundActivitySession.md
      CLGeocoder.md
      CLLocation.md
      CLLocationCoordinate2D.md
      CLLocationManager.md
      CLLocationManagerDelegate.md
      CLLocationUpdate.md
      CLMonitor.md
      CLPlacemark.md
      CLRegion.md
      LookAroundPreview.md
      Map.md
      MapCameraPosition.md
      MapCircle.md
      MapPolyline.md
      MapStyle.md
      Marker.md
      MKCoordinateRegion.md
      MKMapItem.md
    health-auth/
      README.md
      asauthorizationappleidcredential.md
      asauthorizationappleidprovider.md
      asauthorizationappleidrequest.md
      asauthorizationcontroller.md
      asauthorizationcontrollerdelegate.md
      aswebauthenticationsession.md
      hkauthorizationstatus.md
      hkhealthstore.md
      hkobjecttype.md
      hkobserverquery.md
      hkquantitysample.md
      hkquantitytype.md
      hkquery.md
      hksamplequery.md
      hksampletype.md
      hkstatisticscollectionquery.md
      hkstatisticsquery.md
      hkstateofmind.md
      hkunit.md
      signinwithapplebutton.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| In-App Purchase の実装・購入フローを知りたい | storekit | [references/storekit/README.md](references/storekit/README.md) |
| サブスクリプションの状態・更新情報を確認したい | storekit | [references/storekit/README.md](references/storekit/README.md) |
| StoreKit UI（StoreView / SubscriptionStoreView）を使いたい | storekit | [references/storekit/README.md](references/storekit/README.md) |
| Transaction の検証・権利確認を行いたい | storekit | [references/storekit/README.md](references/storekit/README.md) |
| プロモーション表示・購入エラーハンドリング・関連サブスクリプション判定を行いたい | storekit | [references/storekit/README.md](references/storekit/README.md) |
| CloudKit でレコードを読み書き・クエリしたい | cloudkit | [references/cloudkit/README.md](references/cloudkit/README.md) |
| iCloud データをデバイス間で同期したい | cloudkit | [references/cloudkit/README.md](references/cloudkit/README.md) |
| CloudKit のプッシュ通知サブスクリプションを設定したい | cloudkit | [references/cloudkit/README.md](references/cloudkit/README.md) |
| CKSyncEngine で継続的な双方向同期を実装したい | cloudkit | [references/cloudkit/README.md](references/cloudkit/README.md) |
| ホーム画面ウィジェットを作成・更新したい | widgetkit | [references/widgetkit/README.md](references/widgetkit/README.md) |
| Live Activity / Dynamic Island を実装したい | widgetkit | [references/widgetkit/README.md](references/widgetkit/README.md) |
| コントロールセンター用 ControlWidget を作りたい | widgetkit | [references/widgetkit/README.md](references/widgetkit/README.md) |
| TimelineProvider でウィジェットの更新スケジュールを制御したい | widgetkit | [references/widgetkit/README.md](references/widgetkit/README.md) |
| ローカル通知をスケジュールしたい | notifications | [references/notifications/README.md](references/notifications/README.md) |
| 通知の権限リクエスト・設定状態を確認したい | notifications | [references/notifications/README.md](references/notifications/README.md) |
| 通知アクションボタン・カテゴリ・テキスト入力アクションを定義したい | notifications | [references/notifications/README.md](references/notifications/README.md) |
| 地理領域トリガーで通知を送りたい | notifications | [references/notifications/README.md](references/notifications/README.md) |
| リモート通知のコンテンツを配信前に加工したい（Notification Service Extension） | notifications | [references/notifications/README.md](references/notifications/README.md) |
| 現在地の取得・位置情報の許可を管理したい | location-maps | [references/location-maps/README.md](references/location-maps/README.md) |
| SwiftUI の Map ビューにマーカー・アノテーションを表示したい | location-maps | [references/location-maps/README.md](references/location-maps/README.md) |
| 座標からジオコーディング・逆ジオコーディングしたい | location-maps | [references/location-maps/README.md](references/location-maps/README.md) |
| Look Around や地図スタイルを設定したい | location-maps | [references/location-maps/README.md](references/location-maps/README.md) |
| ジオフェンス・ビーコン領域や継続的なバックグラウンド位置取得を実装したい | location-maps | [references/location-maps/README.md](references/location-maps/README.md) |
| HealthKit でヘルスデータの読み書き権限を要求したい | health-auth | [references/health-auth/README.md](references/health-auth/README.md) |
| 歩数・心拍数・State of Mind などのサンプルを照会・統計集計したい | health-auth | [references/health-auth/README.md](references/health-auth/README.md) |
| Sign in with Apple を実装したい | health-auth | [references/health-auth/README.md](references/health-auth/README.md) |
| OAuth / OpenID Connect の Web 認証フローを実装したい | health-auth | [references/health-auth/README.md](references/health-auth/README.md) |
