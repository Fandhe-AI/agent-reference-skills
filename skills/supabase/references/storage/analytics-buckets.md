# Storage Analytics

Apache Iceberg 形式でストレージの利用状況を分析する Analytics バケット機能。

## 概要

Supabase Storage の Analytics バケットは、ストレージのアクセスログやメトリクスを Apache Iceberg 形式で保存し、SQL ベースで分析できる機能を提供する。Apache Spark、DuckDB、PyIceberg などのツールでクエリが可能。

**主な特徴:**
- ストレージのアクセスログを Iceberg テーブルとして保存
- 標準的なデータ分析ツールでクエリ可能
- 帯域幅の分析、アクセスパターンの把握に有用
- S3 互換エンドポイント経由でデータにアクセス

**保存されるログの主なフィールド:**
- `timestamp` — アクセス日時
- `method` — HTTP メソッド（GET, PUT, DELETE 等）
- `path` — アクセスされたオブジェクトのパス
- `status_code` — レスポンスステータスコード
- `bytes_sent` — 送信バイト数
- `user_agent` — ユーザーエージェント
- `referer` — リファラー

## コード例

```typescript
// ===== Analytics バケットの作成（ダッシュボードまたは Management API） =====

// Management API で Analytics バケットを作成
// POST /v1/projects/{project_ref}/analytics/warehouse/collections
/*
{
  "name": "storage_logs",
  "type": "STORAGE"
}
*/

// ===== DuckDB でクエリ =====
/*
-- DuckDB で Iceberg テーブルをクエリ
INSTALL iceberg;
LOAD iceberg;

SELECT
  timestamp,
  method,
  path,
  status_code,
  bytes_sent
FROM iceberg_scan('s3://<analytics_bucket>/storage_logs')
WHERE timestamp >= '2024-01-01'
ORDER BY timestamp DESC
LIMIT 100;

-- 日別のアクセス数と帯域幅
SELECT
  DATE_TRUNC('day', timestamp) AS day,
  COUNT(*) AS request_count,
  SUM(bytes_sent) AS total_bytes
FROM iceberg_scan('s3://<analytics_bucket>/storage_logs')
GROUP BY day
ORDER BY day DESC;

-- 最もアクセスの多いファイル Top 10
SELECT
  path,
  COUNT(*) AS access_count,
  SUM(bytes_sent) AS total_bytes
FROM iceberg_scan('s3://<analytics_bucket>/storage_logs')
WHERE method = 'GET'
GROUP BY path
ORDER BY access_count DESC
LIMIT 10;
*/

// ===== Python（PyIceberg）でクエリ =====
/*
from pyiceberg.catalog import load_catalog

catalog = load_catalog("supabase", **{
    "type": "rest",
    "uri": "https://<project_ref>.supabase.co/storage/v1/s3",
    "s3.access-key-id": "<service_role_key>",
    "s3.secret-access-key": "<service_role_key>",
    "s3.endpoint": "https://<project_ref>.supabase.co/storage/v1/s3",
})

table = catalog.load_table("storage_logs")
df = table.scan().to_pandas()
print(df.head())
*/

// ===== Node.js からの利用例 =====
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

// S3 互換エンドポイント経由で Analytics データにアクセス
const s3Client = new S3Client({
  forcePathStyle: true,
  region: 'ap-northeast-1',
  endpoint: `https://<project_ref>.supabase.co/storage/v1/s3`,
  credentials: {
    accessKeyId: '<service_role_key>',
    secretAccessKey: '<service_role_key>',
  },
})

// Analytics バケット内のデータを取得
const { Body } = await s3Client.send(new GetObjectCommand({
  Bucket: '<analytics_bucket>',
  Key: 'storage_logs/data/part-00000.parquet',
}))
```

## 注意点

- Analytics バケットは Pro プラン以上で利用可能
- ログの反映にはリアルタイムではなくバッチ処理によるわずかな遅延がある
- Iceberg テーブルのスキーマは Supabase 側で管理されるため、ユーザーが変更することはできない
- 大量のログデータを分析する場合、DuckDB のようなカラムナーエンジンが効率的
- ストレージの容量を消費するため、不要になったログは定期的にクリーンアップすることを推奨
- Analytics データ自体も S3 互換エンドポイント経由でアクセスする

## 関連

- [Storage 概要](./overview.md)
- [CDN](./cdn.md)
- [S3 プロトコル](./s3-protocol.md)
- [デバッグ](./debugging.md)
