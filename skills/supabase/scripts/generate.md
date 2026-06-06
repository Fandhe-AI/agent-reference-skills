# Generate

データベーススキーマからの型定義生成コマンド。

## TypeScript 型定義をローカル DB から生成

```sh
supabase gen types typescript --local > src/types/database.types.ts
```

`supabase start` でローカル環境を起動した状態で実行する。

## TypeScript 型定義をリンク済みリモート DB から生成

```sh
supabase gen types typescript --linked > src/types/database.types.ts
```

## TypeScript 型定義をプロジェクト ID 直接指定で生成

```sh
supabase gen types typescript --project-id <project-ref> > src/types/database.types.ts
```

`SUPABASE_ACCESS_TOKEN` 環境変数が必要。

## TypeScript 型定義を DB URL 直接指定で生成

```sh
supabase gen types typescript --db-url "postgresql://postgres:<password>@<host>:5432/postgres" > src/types/database.types.ts
```

## 複数スキーマを対象に型生成

```sh
supabase gen types typescript --local --schema public,auth > src/types/database.types.ts
```

## JWT 署名鍵の生成

```sh
supabase gen signing-key
```
