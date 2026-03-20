# Edge Functions デプロイ

Edge Functions の本番環境へのデプロイ方法と設定。

## 概要

Edge Functions は Supabase CLI を使って本番環境にデプロイする。`supabase functions deploy` コマンドで個別または一括デプロイが可能。`config.toml` で関数ごとの設定（JWT 検証、Import Map）を管理する。CI/CD パイプラインでの自動デプロイも GitHub Actions 等で構築できる。

### CLI でのデプロイ

```bash
# 特定の関数をデプロイ
supabase functions deploy hello-world

# すべての関数を一括デプロイ
supabase functions deploy

# JWT 検証を無効化してデプロイ
supabase functions deploy hello-world --no-verify-jwt

# Import Map を指定してデプロイ
supabase functions deploy hello-world --import-map ./supabase/functions/import_map.json
```

### config.toml での関数設定

```toml
# supabase/config.toml

[functions.hello-world]
verify_jwt = false         # JWT 検証を無効化
import_map = "./import_map.json"  # Import Map を指定

[functions.protected-function]
verify_jwt = true          # JWT 検証を有効化（デフォルト）
```

## コード例

### GitHub Actions での自動デプロイ

```yaml
# .github/workflows/deploy-functions.yml
name: Deploy Edge Functions

on:
  push:
    branches:
      - main
    paths:
      - 'supabase/functions/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: supabase/setup-cli@v1
        with:
          version: latest

      - run: supabase functions deploy --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

### 特定の関数のみデプロイする GitHub Actions

```yaml
name: Deploy Specific Function

on:
  push:
    branches:
      - main
    paths:
      - 'supabase/functions/hello-world/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: supabase/setup-cli@v1
        with:
          version: latest

      - run: supabase functions deploy hello-world --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

### 関数の削除

```bash
supabase functions delete hello-world
```

## 注意点

- `--no-verify-jwt` を使うと、認証なしで関数にアクセス可能になるため、Webhook 受信やパブリック API 用途に限定すること
- `config.toml` での設定は CLI フラグより優先される
- デプロイ時にバンドルサイズの制限（圧縮後 20MB）がある
- `_shared/` ディレクトリ内のファイルは関数としてデプロイされない
- アンダースコア `_` で始まるディレクトリは関数として扱われない
- デプロイには `SUPABASE_ACCESS_TOKEN` が必要（`supabase login` で取得）
- `--project-ref` を省略した場合、`supabase link` でリンク済みのプロジェクトが使われる

## 関連

- [クイックスタート](./quickstart.md)
- [シークレット管理](./secrets.md)
- [認証・CORS](./auth.md)
- [実装例](./examples.md)
