# リージョン

## 利用可能なリージョン一覧

| リージョンコード | 場所 | 地域 |
|----------------|------|------|
| us-east-1 | North Virginia, USA | 北米 |
| us-east-2 | Ohio, USA | 北米 |
| us-west-1 | North California, USA | 北米 |
| us-west-2 | Oregon, USA | 北米 |
| ca-central-1 | Montreal, Canada | 北米 |
| eu-west-1 | Ireland | ヨーロッパ |
| eu-west-2 | London, UK | ヨーロッパ |
| eu-west-3 | Paris, France | ヨーロッパ |
| eu-central-1 | Frankfurt, Germany | ヨーロッパ |
| eu-central-2 | Zurich, Switzerland | ヨーロッパ |
| eu-north-1 | Stockholm, Sweden | ヨーロッパ |
| ap-southeast-1 | Singapore | アジア太平洋 |
| ap-southeast-2 | Sydney, Australia | アジア太平洋 |
| ap-northeast-1 | Tokyo, Japan | アジア太平洋 |
| ap-northeast-2 | Seoul, South Korea | アジア太平洋 |
| ap-south-1 | Mumbai, India | アジア太平洋 |
| sa-east-1 | Sao Paulo, Brazil | 南米 |

※ 利用可能なリージョンは随時追加される。最新情報はダッシュボードで確認すること。

## リージョン選択の考慮事項

### レイテンシ

- ユーザーに最も近いリージョンを選択する
- アプリケーションサーバー（Vercel, Netlify, AWS 等）と同じリージョンを選択するとバックエンド間のレイテンシが最小化される

### データ所在地要件

- GDPR: EU 圏内のリージョン（eu-west-1, eu-central-1 等）を選択
- 日本の個人情報保護法: ap-northeast-1（東京）を推奨
- その他の規制: 該当する国・地域のリージョンを選択

### サービスの可用性

- 一部の機能やアドオンは特定のリージョンでのみ利用可能な場合がある
- リードレプリカは異なるリージョンに配置可能

### コスト

- リージョンによるコストの差はない（Supabase の場合）
- ただし、他のクラウドサービスとのデータ転送コストはリージョンに依存する

## リージョンの変更

プロジェクト作成後のリージョン変更はできない。リージョンを変更する場合は以下の手順が必要。

1. 新しいリージョンでプロジェクトを作成
2. データベースを移行（`pg_dump` / `pg_restore`）
3. ストレージのデータを移行
4. Auth のユーザーデータを移行
5. アプリケーションの接続先を更新

```bash
# 旧プロジェクトからダンプ
pg_dump -h db.<old-ref>.supabase.co -U postgres -d postgres -F c -f backup.dump

# 新プロジェクトにリストア
pg_restore -h db.<new-ref>.supabase.co -U postgres -d postgres --clean --if-exists backup.dump
```

## ベストプラクティス

- 主要ユーザー層の地理的位置に基づいてリージョンを選択する
- コンプライアンス要件がある場合は、要件を満たすリージョンを最優先にする
- マルチリージョン展開が必要な場合はリードレプリカを活用する
- 開発環境と本番環境は同じリージョンに配置する

## 関連

- [コンピュートとディスク](./compute-and-disk.md) — コンピュートサイズ
- [リードレプリカ](./read-replicas.md) — レプリカのリージョン配置
