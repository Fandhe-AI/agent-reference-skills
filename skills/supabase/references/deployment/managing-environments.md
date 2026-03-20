# 環境管理

## 概要

Supabase では、各環境（Local / Staging / Production）を個別のプロジェクトとして管理する。マイグレーションファイルを共通のリポジトリで管理し、各環境に同期する。

## Local → Staging → Production フロー

### 全体の流れ

```
Local Development
  ↓ supabase db diff / migration new
Git Repository (migrations/)
  ↓ CI/CD (staging branch)
Staging Project
  ↓ CI/CD (main branch)
Production Project
```

### 1. ローカル開発

```bash
# ローカルサービス起動
supabase start

# Studio UI でスキーマを変更
# http://localhost:54323

# 変更からマイグレーション生成
supabase db diff -f add_new_feature

# ローカルでリセット＆テスト
supabase db reset
```

### 2. ステージング環境へのデプロイ

```bash
# ステージングプロジェクトにリンク
supabase link --project-ref <staging-project-ref>

# マイグレーション適用
supabase db push
```

### 3. 本番環境へのデプロイ

```bash
# 本番プロジェクトにリンク
supabase link --project-ref <production-project-ref>

# マイグレーション適用
supabase db push
```

## プロジェクト間のマイグレーション同期

### ブランチ戦略

```
main        → Production
staging     → Staging
feature/*   → Local Development
```

### CI/CD 設定例

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main, staging]
    paths:
      - 'supabase/migrations/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1

      - name: Set project ref
        id: project
        run: |
          if [ "${{ github.ref_name }}" = "main" ]; then
            echo "ref=${{ secrets.PROD_PROJECT_REF }}" >> $GITHUB_OUTPUT
            echo "password=${{ secrets.PROD_DB_PASSWORD }}" >> $GITHUB_OUTPUT
          else
            echo "ref=${{ secrets.STAGING_PROJECT_REF }}" >> $GITHUB_OUTPUT
            echo "password=${{ secrets.STAGING_DB_PASSWORD }}" >> $GITHUB_OUTPUT
          fi

      - name: Link and push
        run: |
          supabase link --project-ref ${{ steps.project.outputs.ref }}
          supabase db push
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_DB_PASSWORD: ${{ steps.project.outputs.password }}
```

## 環境変数管理

### アプリケーション側

```bash
# .env.local (ローカル開発)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>

# .env.staging
NEXT_PUBLIC_SUPABASE_URL=https://<staging-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<staging-anon-key>

# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://<prod-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<prod-anon-key>
```

### Supabase CLI 側

```bash
# .env に CLI 用の環境変数を設定
SUPABASE_ACCESS_TOKEN=<access-token>
SUPABASE_DB_PASSWORD=<db-password>
```

### シークレットの管理

```bash
# Edge Functions のシークレットを環境ごとに設定
supabase secrets set --project-ref <staging-ref> MY_SECRET=staging_value
supabase secrets set --project-ref <prod-ref> MY_SECRET=production_value
```

## 環境間の差異管理

### 環境固有の設定

`supabase/config.toml` はローカル開発用。リモート環境の設定はダッシュボードまたは CLI で管理する。

### シードデータ

- `supabase/seed.sql`: ローカル開発とプレビューブランチ用
- ステージング/本番には適用されない

### Edge Functions の環境変数

```typescript
// Edge Function 内で環境を判別
const environment = Deno.env.get('ENVIRONMENT') || 'development'
```

## ベストプラクティス

- すべてのスキーマ変更はマイグレーションファイルとして管理する
- ダッシュボードでの直接変更は避ける（ローカルで作成してプッシュ）
- ステージング環境で十分にテストしてから本番にデプロイする
- 環境変数はバージョン管理に含めない（`.gitignore` に追加）
- CI/CD でマイグレーションの適用を自動化する
- 各環境のプロジェクト参照 ID とパスワードは GitHub Secrets 等で管理する

## 関連

- [Database Branching](../platform/branching.md) — ブランチ環境
- [マイグレーション戦略](./database-migrations.md) — マイグレーション運用
- [CLI ローカル開発](../cli/local-dev.md) — ローカル環境
