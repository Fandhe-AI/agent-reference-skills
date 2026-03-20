# ネットワーク

## ネットワーク制限

データベースへのアクセスを特定の IP アドレスに制限できる。

### 許可 IP リストの設定

1. **Project Settings → Database → Network Restrictions** に移動
2. **Add Restriction** をクリック
3. 許可する IP アドレスまたは CIDR ブロックを入力

```
# 単一 IP
203.0.113.10/32

# サブネット
10.0.0.0/24
```

### 注意事項

- ネットワーク制限はデータベースの直接接続（ポート 5432）に適用される
- API（PostgREST）経由のアクセスには適用されない
- 設定直後から有効になる
- 自分のIPを除外しないよう注意する

## IPv4 アドオン

### 概要

Supabase はデフォルトで IPv6 を使用する。IPv4 が必要な環境（IPv6 非対応のインフラなど）向けにアドオンを提供。

### 有効化

1. **Project Settings → Add-ons → IPv4** に移動
2. **Enable IPv4** をクリック

### 用途

- IPv6 非対応のクラウドプロバイダとの連携
- IPv6 非対応のオンプレミス環境からの接続
- レガシーシステムとの統合

## PrivateLink（AWS）

VPC ピアリングの代替として、AWS PrivateLink を使用してプライベートネットワーク経由で Supabase に接続できる。

### 前提条件

- Enterprise プラン
- AWS アカウント
- 同一リージョンの VPC

### セットアップ手順

1. **Supabase サポートに連絡**して PrivateLink を有効化
2. Supabase から提供される **VPC エンドポイントサービス名** を取得
3. AWS コンソールで VPC エンドポイントを作成

```bash
# AWS CLI でエンドポイント作成
aws ec2 create-vpc-endpoint \
  --vpc-id vpc-xxxxxxxx \
  --service-name com.amazonaws.vpce.<region>.vpce-svc-xxxxxxxx \
  --vpc-endpoint-type Interface \
  --subnet-ids subnet-xxxxxxxx \
  --security-group-ids sg-xxxxxxxx
```

4. Supabase 側で接続を承認
5. プライベート DNS を設定

### 接続方法

PrivateLink 有効化後、プライベートエンドポイント経由で接続する。

```bash
# プライベートエンドポイント経由での接続
psql "postgresql://postgres:<password>@<private-endpoint>:5432/postgres"
```

### メリット

- トラフィックが公衆インターネットを経由しない
- レイテンシの削減
- セキュリティの向上
- コンプライアンス要件の充足

## ベストプラクティス

- 本番環境ではネットワーク制限を設定する
- サーバーレス環境からのアクセスには API（PostgREST）経由を使用する
- 高セキュリティ要件がある場合は PrivateLink を検討する
- IPv4 アドオンは必要な場合のみ有効化する（追加コストあり）

## 関連

- [SSL とネットワーク](../security/ssl-and-network.md) — セキュリティ設定
- [Management API ネットワーク](../management-api/network.md) — API でのネットワーク管理
- [アクセス制御](./access-control.md) — 権限管理
