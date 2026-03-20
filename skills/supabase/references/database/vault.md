# Vault

シークレットと暗号化データの管理。

## 概要

Supabase Vault は PostgreSQL Extension `pgsodium` を使い、データベース内でシークレット（API キー、接続文字列等）を暗号化して管理する。Transparent Column Encryption (TCE) によりカラムレベルの暗号化も可能。

## コード例

```sql
-- シークレットの保存
select vault.create_secret(
  'my-api-key-value',
  'stripe_api_key',
  'Stripe の API キー'
);

-- シークレットの取得
select * from vault.decrypted_secrets
where name = 'stripe_api_key';

-- シークレットの更新
select vault.update_secret(
  (select id from vault.secrets where name = 'stripe_api_key'),
  new_secret := 'new-api-key-value'
);

-- シークレットの削除
select vault.delete_secret(
  (select id from vault.secrets where name = 'stripe_api_key')
);

-- Database Function 内でシークレットを使用
create or replace function call_external_api()
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  api_key text;
  response json;
begin
  select decrypted_secret into api_key
  from vault.decrypted_secrets
  where name = 'stripe_api_key';
  -- api_key を使って外部 API を呼び出す
  return response;
end;
$$;
```

## 注意点

- Vault はデフォルトで有効（pgsodium Extension に依存）
- シークレットは暗号化されて `vault.secrets` テーブルに保存される
- 復号化されたビューは `vault.decrypted_secrets`
- `security definer` 関数内でシークレットにアクセスするのが安全なパターン
- クライアントサイドから直接シークレットにアクセスしないこと

## 関連

- [./functions.md](./functions.md) — Database Functions
- [./secure-data.md](./secure-data.md) — データセキュリティ
