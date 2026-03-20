# TypeScript

Better Auth は型安全な認証ライブラリとして設計されており、クライアントとサーバーの両方が TypeScript で構築されている。strict モードの有効化と `$Infer` プロパティによる型推論の使用が推奨される。

## TypeScript 設定要件

### Strict モード（推奨）

`tsconfig.json` で TypeScript の strict モードを有効化:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

strict モードが有効にできない場合、最低限以下を設定:

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

**重要:** `strict` が `true` の場合、`strictNullChecks` は自動的に有効になる。`strictNullChecks` を明示的に `false` に設定すると、型推論の問題が発生する可能性がある。

### コンパイラ設定の警告

TypeScript 推論が最大シリアライゼーション長を超える問題が発生した場合、`declaration` と `composite` オプションの両方が**有効になっていない**ことを確認する。

## `$Infer` による型推論

クライアントとサーバーの両方の実装が、auth 設定から型を抽出するための `$Infer` プロパティを公開する。

### サーバー側の型推論

```typescript
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("database.db"),
});

type Session = typeof auth.$Infer.Session;
```

`Session` 型は `session` と `user` プロパティの両方を含み、`user` プロパティはユーザーオブジェクト型を表す。

### クライアント側の型推論

```typescript
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export type Session = typeof authClient.$Infer.Session;
```

## 追加フィールドの設定

Better Auth ではユーザーとセッションオブジェクトを適切に型付けされたカスタムフィールドで拡張できる。

### 追加フィールドの定義

```typescript
export const auth = betterAuth({
  database: new Database("database.db"),
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
});
```

追加フィールドは推論された `Session` 型に自動的に表示される。

### `input` プロパティ

`input` プロパティは登録などのユーザー操作時にフィールドを設定できるかを制御:

- **`input: true`（デフォルト）**: 操作時のユーザー入力にフィールドが含まれる
- **`input: false`**: ユーザー入力からフィールドを除外

**セキュリティ注意:** `role` のようなユーザーが設定すべきでないフィールドは、セキュリティ脆弱性を防ぐため `input: false` に設定することが重要。

## クライアント側の追加フィールド推論

### モノレポ / 単一プロジェクトセットアップ

`inferAdditionalFields` プラグインを型インポートと共に使用:

```typescript
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/client";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
```

### クライアント-サーバー分離プロジェクト

追加フィールドを手動で指定:

```typescript
import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
        },
      },
    }),
  ],
});
```

## 注意点

- strict モードは型推論の問題を防ぎ、Better Auth 開発に必須
- `$Infer` プロパティはセッションとユーザー型への型安全なアクセスを提供
- 追加フィールドにはセキュリティ上重要なプロパティに `input: false` の明示的設定が必要
- クライアント側のフィールド推論はプロジェクトアーキテクチャに依存（モノレポ vs 分離プロジェクト）
