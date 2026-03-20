# Database Branching

## 概要

Database Branching は PR ごとにプレビュー用のデータベースブランチを自動作成する機能。開発中の変更を本番環境に影響を与えずにテストできる。

## Preview Branch

### 仕組み

1. GitHub に PR を作成すると、Supabase が自動的にプレビューブランチを作成
2. プレビューブランチには独自の API URL とキーが割り当てられる
3. マイグレーションが自動的に適用される
4. PR がマージまたはクローズされるとブランチは削除される

### 前提条件

- Pro プラン以上
- GitHub Integration が有効
- `supabase/migrations/` にマイグレーションファイルが存在

## 構成ファイル

### supabase/config.toml

```toml
[project]
id = "<project-ref>"

# ブランチング設定
[db.branching]
enabled = true
```

### supabase/seed.sql

プレビューブランチ作成時にシードデータが自動適用される。

```sql
-- supabase/seed.sql
INSERT INTO public.profiles (id, name)
VALUES ('00000000-0000-0000-0000-000000000001', 'Test User');
```

## GitHub Integration

### セットアップ

1. ダッシュボードの **Project Settings → Integrations → GitHub** に移動
2. **Connect GitHub** をクリック
3. リポジトリを選択
4. ブランチング機能を有効化

### GitHub Actions との連携

```yaml
# .github/workflows/supabase-preview.yml
name: Supabase Preview
on:
  pull_request:
    paths:
      - 'supabase/**'

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
      - run: supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
      - run: supabase db push
```

## ダッシュボード管理

### ブランチの確認

ダッシュボードのプロジェクト選択メニューからブランチの一覧を確認できる。

### ブランチの詳細

各ブランチで以下の情報が確認可能:
- API URL
- Anon Key / Service Role Key
- データベース接続文字列
- マイグレーション適用状況

## マイグレーション適用

### 自動適用

PR に含まれる `supabase/migrations/` 配下のファイルが自動的に適用される。

### マイグレーションの順序

ファイル名のタイムスタンプに基づいて順序どおりに適用される。

```
supabase/migrations/
  20240101000000_create_users.sql
  20240102000000_add_profiles.sql
  20240103000000_create_posts.sql
```

## トラブルシューティング

### ブランチが作成されない

- GitHub Integration が正しく設定されているか確認
- `supabase/config.toml` に正しいプロジェクト ID が設定されているか確認
- マイグレーションファイルに構文エラーがないか確認

### マイグレーションエラー

- PR のチェックでエラー詳細を確認
- ローカルで `supabase db reset` を実行してマイグレーションをテスト

```bash
# ローカルでマイグレーションをテスト
supabase db reset
```

### ブランチの手動削除

通常は PR クローズ時に自動削除されるが、手動で削除する場合:

1. ダッシュボードでブランチを選択
2. **Settings → Delete Branch** をクリック

### シードデータが適用されない

- `supabase/seed.sql` がリポジトリに含まれているか確認
- SQL の構文エラーがないか確認

## 関連

- [環境管理](../deployment/managing-environments.md) — 環境管理戦略
- [マイグレーション](../deployment/database-migrations.md) — マイグレーション運用
- [Management API ブランチ](../management-api/branches.md) — API でのブランチ管理
