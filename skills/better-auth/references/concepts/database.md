# Database

Better Auth はユーザー、セッション、アカウント、検証レコードを保存するためにデータベースに接続する。複数のデータベースアダプターをサポートし、ステートレスセッション管理ではデータベースなしでも動作可能。

## コアスキーマテーブル

### User テーブル

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (pk) | 一意の識別子 |
| `name` | string | ユーザー名 |
| `email` | string | メールアドレス |
| `emailVerified` | boolean | メール検証状態 |
| `image` | string (optional) | プロフィール画像 URL |
| `createdAt` | timestamp | 作成日時 |
| `updatedAt` | timestamp | 更新日時 |

### Session テーブル

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (pk) | 一意の識別子 |
| `userId` | string (fk) | 関連ユーザー ID |
| `token` | string | セッショントークン |
| `expiresAt` | timestamp | 有効期限 |
| `ipAddress` | string (optional) | クライアント IP アドレス |
| `userAgent` | string (optional) | ブラウザ/クライアント情報 |
| `createdAt` | timestamp | 作成日時 |
| `updatedAt` | timestamp | 更新日時 |

### Account テーブル

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (pk) | 一意の識別子 |
| `userId` | string (fk) | 関連ユーザー ID |
| `accountId` | string | プロバイダー内アカウント ID |
| `providerId` | string | 認証プロバイダー ID |
| `accessToken` | string (optional) | アクセストークン |
| `refreshToken` | string (optional) | リフレッシュトークン |
| `scope` | string | トークンスコープ |
| `idToken` | string (optional) | ID トークン |
| `password` | string (optional) | ハッシュ化パスワード |
| `createdAt` | timestamp | 作成日時 |
| `updatedAt` | timestamp | 更新日時 |

### Verification テーブル

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (pk) | 一意の識別子 |
| `identifier` | string | 検証識別子 |
| `value` | string | 検証値 |
| `expiresAt` | timestamp | 有効期限 |
| `createdAt` | timestamp | 作成日時 |
| `updatedAt` | timestamp | 更新日時 |

## サポートデータベース/アダプター

- SQLite / D1
- PostgreSQL
- MySQL
- MSSQL
- MongoDB
- Prisma ORM
- Drizzle ORM
- Kysely（ビルトイン）

## 主要機能

### CLI ツール

```bash
npx auth@latest migrate    # マイグレーション適用
npx auth@latest generate   # スキーマ生成
```

### セカンダリストレージ

Redis などのキーバリューストアをセッションデータや短命レコードに実装し、プライマリデータベースの負荷を軽減。

### カスタムスキーマ

テーブル名、カラム名のカスタマイズ、`additionalFields` 設定によるユーザー/セッションスキーマの拡張が可能。

### ID 生成オプション

3つのアプローチ: データベース管理、カスタム関数、一貫した生成器（UUID または数値シリアル）。

### データベースフック

ユーザー、セッション、アカウント操作の before/after ライフサイクルフックで検証やカスタムロジックを実装。

### 実験的 Joins

パフォーマンス最適化: 単一リクエストで複数クエリを実行（50 以上のエンドポイントで対応）。

## コード例

### カスタムフィールド

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: db,
  user: {
    additionalFields: {
      role: {
        type: ["user", "admin"],
        required: false,
        defaultValue: "user",
      },
    },
  },
});
```

## 注意点

- プログラマティックマイグレーションは Kysely アダプターのみ対応（Prisma/Drizzle は非対応）
- PostgreSQL はスキーマパスを自動検出
- データベースフックで `APIError` をスローすることで操作を中止可能
- クライアント側でカスタムフィールドの型推論を行うには追加設定が必要
