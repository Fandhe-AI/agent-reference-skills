# Installation

Step-by-step guide to install and configure Better Auth from package installation through client initialization.

## セットアップ

### 1. パッケージインストール

```bash
npm install better-auth
```

### 2. 環境変数の設定

`.env` ファイルを作成:

```env
BETTER_AUTH_SECRET=your-32-char-secret-here
BETTER_AUTH_URL=http://localhost:3000
```

シークレットの生成: `openssl rand -base64 32`

### 3. Auth インスタンスの作成 (サーバー)

プロジェクトルート、`lib/`、または `utils/` に `auth.ts` を作成:

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: db, // 下記のデータベースオプション参照
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

### 4. データベースの設定

```typescript
// SQLite
import Database from "better-sqlite3";
database: new Database("./sqlite.db")

// PostgreSQL
import { Pool } from "pg";
database: new Pool({ /* connection options */ })

// MySQL
import { createPool } from "mysql2/promise";
database: createPool({ /* connection options */ })

// Drizzle / Prisma アダプターも利用可能
```

### 5. データベースマイグレーション

```bash
npx auth@latest generate    # スキーマ/マイグレーションファイルの生成
npx auth@latest migrate     # マイグレーションの適用（Kysely のみ）
```

### 6. ルートハンドラーのマウント

```typescript
// Next.js App Router
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
export const { GET, POST } = toNextJsHandler(auth);

// Express
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json()); // auth ハンドラーの後にマウント
```

### 7. クライアントインスタンスの作成

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

## 設定オプション

| Option | Type | Description |
|--------|------|-------------|
| `database` | Connection \| Adapter | データベース接続または ORM アダプター |
| `emailAndPassword` | `{ enabled: boolean }` | メール/パスワード認証の有効化 |
| `socialProviders` | Object | OAuth プロバイダー認証情報（プロバイダー名をキーとしたオブジェクト） |
| `baseURL` | string | 認証コールバック用のアプリケーション URL |
| `secret` | string | 暗号化キー（環境変数を上書き） |
| `plugins` | Plugin[] | 認証プラグインの配列 |

## API / 型定義

```typescript
type BetterAuthOptions = {
  database: DatabaseAdapter | Connection;
  emailAndPassword?: { enabled: boolean };
  socialProviders?: Record<string, { clientId: string; clientSecret: string }>;
  baseURL?: string;
  secret?: string;
  plugins?: Plugin[];
};

type Session = { user: User; session: SessionData };
type User = { id: string; name: string; email: string; image?: string };
```

## コード例

### サーバー側 (Node/Express)

```typescript
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());
```

### クライアント側 (React)

```typescript
const { signIn, signUp, useSession } = createAuthClient();
const { data: session } = useSession();
```

### TanStack Start

```typescript
import { tanstackStartCookies } from "better-auth/tanstack-start";
export const auth = betterAuth({
  plugins: [tanstackStartCookies()],
});
```

## 注意点

- Express では `app.use(express.json())` の **前** にハンドラーをマウントすること
- Express v5+ では `/{*any}` ルート構文を使用（`*` の代わり）
- Cloudflare Workers では `nodejs_compat` フラグが必要（AsyncLocalStorage のサポートのため）
- データベースはステートレスセッション管理ではオプションだが、ほとんどのプラグインでは必要
- キーローテーションには `BETTER_AUTH_SECRETS`（複数形、配列）を使用し、既存セッションを無効にせずにシークレットをローテーション可能
- シークレットキーは「高エントロピーで生成」され、32文字以上であること
- クライアントとサーバーを別々にセットアップする場合、個別のインストールが必要
