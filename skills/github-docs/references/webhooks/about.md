# Webhook 概要

## Webhook とは

Webhook は、特定のイベントが発生した際に外部サーバーへ自動的に HTTP リクエスト（POST）を送信する仕組み。REST API のポーリングと異なり、イベント駆動型で効率的にデータを受信できる。

## Webhook の種類

| 種類 | 説明 | 設定場所 |
|------|------|---------|
| **Repository Webhook** | リポジトリ内のイベントを監視 | リポジトリ Settings > Webhooks |
| **Organization Webhook** | Organization 全体のイベントを監視 | Organization Settings > Webhooks |
| **GitHub App Webhook** | App にインストールされたリソースのイベントを監視 | App の設定画面 |
| **GitHub Marketplace Webhook** | Marketplace の購入・キャンセル等を監視 | Marketplace リスティング管理 |
| **GitHub Sponsors Webhook** | スポンサーシップのイベントを監視 | Sponsors ダッシュボード |

## 仕組み

1. Webhook を作成し、対象イベントとペイロード URL を指定する
2. 指定したイベントが GitHub 上で発生する
3. GitHub が設定されたペイロード URL に HTTP POST リクエストを送信する
4. サーバーがペイロードを受信し、処理を行う

## ユースケース

- **CI/CD パイプラインの起動**: Jenkins、CircleCI などへのトリガー
- **通知の送信**: Slack、Discord などへのメッセージ配信
- **外部イシュートラッカーの更新**: Jira などとの連携
- **本番サーバーへのデプロイ**: プッシュイベントによる自動デプロイ
- **監査ログ**: イベントの記録と監査

## Webhook と REST API の比較

| 観点 | Webhook | REST API ポーリング |
|------|---------|-------------------|
| **リソース消費** | 低い（イベント発生時のみ通信） | 高い（定期的にリクエストが必要） |
| **リアルタイム性** | ほぼリアルタイム | ポーリング間隔に依存 |
| **スケーラビリティ** | 優れている | リソース数に比例してリクエスト増加 |
| **適切な場面** | 継続的な監視 | 一回限り・低頻度の情報取得 |

## 注意事項

- IPv6 はまだサポートされていないが、将来対応予定
- GitHub Services（Service Hooks）は廃止され、Webhook に統合済み

## 公式ドキュメント

- [About webhooks](https://docs.github.com/en/webhooks/about-webhooks)
