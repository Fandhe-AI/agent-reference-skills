# SSL とネットワークセキュリティ

## SSL 強制

### 概要

Supabase のデータベースはデフォルトで SSL 接続をサポートする。本番環境では SSL を強制することを推奨。

### SSL 強制の有効化

ダッシュボードの **Project Settings → Database → SSL Configuration** から設定。

### SSL モード

PostgreSQL の SSL モードは接続文字列で指定する。

| モード | 説明 | セキュリティレベル |
|--------|------|-------------------|
| disable | SSL を使用しない | なし |
| allow | サーバーが要求すれば SSL を使用 | 低 |
| prefer | SSL を優先するが必須ではない（デフォルト） | 中 |
| require | SSL を強制（証明書検証なし） | 高 |
| verify-ca | SSL + CA 証明書の検証 | 非常に高 |
| verify-full | SSL + CA 証明書 + ホスト名の検証 | 最高 |

### 接続文字列での指定

```bash
# require モード
postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres?sslmode=require

# verify-full モード（証明書ファイルを指定）
postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres?sslmode=verify-full&sslrootcert=/path/to/ca-cert.pem
```

### CA 証明書のダウンロード

ダッシュボードの **Project Settings → Database → SSL Configuration** から CA 証明書をダウンロード可能。

### アプリケーションでの設定

```typescript
// supabase-js はデフォルトで HTTPS を使用（SSL は自動）

// 直接接続の場合（Node.js + pg）
import { Pool } from 'pg'
import fs from 'fs'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('/path/to/ca-cert.pem').toString(),
  },
})
```

## ネットワーク制限

### データベースへのアクセス制限

直接接続（ポート 5432/6543）を特定の IP アドレスに制限できる。

```
# 設定場所: Project Settings → Database → Network Restrictions

# 許可する IP を追加
203.0.113.10/32     # 単一 IP
10.0.0.0/24         # サブネット
```

### API（PostgREST）のアクセス制限

API エンドポイントにはネットワーク制限は適用されない。API のセキュリティは RLS と API キーで担保する。

### 制限の適用

- 設定後すぐに有効になる
- 許可リストにない IP からの接続は拒否される
- ダッシュボードからのアクセスは常に許可される

## PrivateLink

### 概要

AWS PrivateLink を使用して、パブリックインターネットを経由せずにプライベートネットワーク経由で Supabase に接続できる。

### 前提条件

- Enterprise プラン
- AWS アカウント
- 同一リージョンの VPC

### メリット

- トラフィックがパブリックインターネットを経由しない
- レイテンシの削減
- セキュリティの強化
- コンプライアンス要件への対応

### セットアップ

1. Supabase サポートに PrivateLink の有効化を依頼
2. VPC エンドポイントサービス名を受け取る
3. AWS で VPC エンドポイントを作成

```bash
aws ec2 create-vpc-endpoint \
  --vpc-id vpc-xxxxxxxx \
  --service-name com.amazonaws.vpce.<region>.vpce-svc-xxxxxxxx \
  --vpc-endpoint-type Interface \
  --subnet-ids subnet-xxxxxxxx \
  --security-group-ids sg-xxxxxxxx
```

4. Supabase 側で接続を承認
5. プライベート DNS を設定

### 接続

```bash
# プライベートエンドポイント経由
psql "postgresql://postgres:<password>@<private-endpoint>:5432/postgres?sslmode=require"
```

## セキュリティグループとファイアウォール

### 推奨設定

- データベースポート（5432）は必要な IP のみに開放
- Supavisor ポート（6543）も同様に制限
- API ポート（443）はアプリケーションからのアクセスのみ

### 複数層の防御

```
ユーザー → CloudFlare/WAF → Supabase API → RLS → データベース
         → ネットワーク制限 → SSL → データベース（直接接続）
```

## ベストプラクティス

- 本番環境では SSL を `require` 以上に設定する
- 可能であれば `verify-full` を使用する
- データベースへの直接接続はネットワーク制限で保護する
- 高セキュリティ要件がある場合は PrivateLink を使用する
- 定期的にアクセスログを確認する
- 不要な接続元 IP は速やかに削除する

## 関連

- [ネットワーク制限](../platform/network.md) — プラットフォームのネットワーク設定
- [セキュリティ概要](./overview.md) — セキュリティ全体像
- [Management API ネットワーク](../management-api/network.md) — API でのネットワーク管理
