# データベースマイグレーション

## マイグレーション戦略

Supabase CLI を使用してマイグレーションを管理する。マイグレーションファイルは `supabase/migrations/` に格納される。

## ローカルでのマイグレーション作成

### 新規マイグレーションの作成

```bash
# 空のマイグレーションファイルを作成
supabase migration new create_posts_table
```

生成されるファイル: `supabase/migrations/<timestamp>_create_posts_table.sql`

```sql
-- supabase/migrations/20240101000000_create_posts_table.sql
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all posts"
  ON public.posts FOR SELECT
  USING (true);

CREATE POLICY "Users can create own posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### diff からマイグレーションを生成

ローカルデータベースの変更を検出してマイグレーションを生成する。

```bash
# Studio UI でスキーマを変更した後
supabase db diff -f add_posts_index
```

生成されたマイグレーションファイルを確認してコミットする。

## リモートへの適用

### supabase db push

```bash
# リンク済みプロジェクトにマイグレーションを適用
supabase db push
```

### 動作の仕組み

1. `supabase_migrations.schema_migrations` テーブルで適用済みマイグレーションを確認
2. 未適用のマイグレーションを順番に実行
3. 各マイグレーションをトランザクション内で実行
4. 失敗した場合はロールバック

### 注意事項

- `supabase db push` はリモートデータベースに直接適用される
- 本番環境への適用は CI/CD パイプラインを通じて行うことを推奨
- `--dry-run` フラグで適用内容を事前確認できる

```bash
supabase db push --dry-run
```

## CI/CD パイプライン

### GitHub Actions

```yaml
# .github/workflows/deploy-migrations.yml
name: Deploy Migrations
on:
  push:
    branches: [main]
    paths:
      - 'supabase/migrations/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: supabase/setup-cli@v1
        with:
          version: latest

      - name: Link project
        run: supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}

      - name: Push migrations
        run: supabase db push
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_DB_PASSWORD: ${{ secrets.SUPABASE_DB_PASSWORD }}
```

### 必要なシークレット

- `SUPABASE_ACCESS_TOKEN`: Supabase のアクセストークン（ダッシュボードの Account → Access Tokens で生成）
- `SUPABASE_PROJECT_REF`: プロジェクトの参照 ID
- `SUPABASE_DB_PASSWORD`: データベースパスワード

## ロールバック

### 手動ロールバック

Supabase CLI には自動ロールバック機能がないため、逆マイグレーションを作成する。

```bash
supabase migration new rollback_posts_table
```

```sql
-- supabase/migrations/20240102000000_rollback_posts_table.sql
DROP TABLE IF EXISTS public.posts;
```

### ロールバックのベストプラクティス

- 各マイグレーションに対応する逆マイグレーションを用意しておく
- 破壊的変更（DROP TABLE, DROP COLUMN 等）は段階的に行う
- データの削除を伴う変更は特に慎重に行う

### 緊急ロールバック

SQL エディタまたは `psql` で直接修正する。

```bash
psql "postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres" \
  -f rollback.sql
```

## ベストプラクティス

- マイグレーションは小さく、アトミックに保つ
- 各マイグレーションは独立して実行可能にする
- 破壊的変更は複数のマイグレーションに分割する（例: カラム名変更 → 新カラム追加 → データ移行 → 旧カラム削除）
- マイグレーションファイルは一度コミットしたら変更しない
- RLS ポリシーはマイグレーションに含める

## 関連

- [CLI migration コマンド](../cli/migration-commands.md) — マイグレーション CLI
- [CLI db コマンド](../cli/db-commands.md) — db diff / push
- [宣言的スキーマ](../local-dev/declarative-schemas.md) — スキーマ管理
