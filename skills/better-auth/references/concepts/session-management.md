# Session Management

Better Auth は従来の Cookie ベースセッション管理を実装し、セッションは Cookie に保存され、各リクエストで検証される。

## コアセッションテーブルフィールド

- **id**: ユニークセッション識別子
- **token**: セッショントークン（Cookie としても使用）
- **userId**: 関連ユーザー ID
- **expiresAt**: 有効期限タイムスタンプ
- **ipAddress**: クライアント IP アドレス
- **userAgent**: ブラウザ/クライアントユーザーエージェント文字列

## セッション有効期限

デフォルトで 7 日後に期限切れ。アクティブに使用されているセッションで `updateAge` しきい値に達すると、有効期限が現在時刻 + `expiresIn` に延長される。

```typescript
session: {
  expiresIn: 60 * 60 * 24 * 7,  // 7 日
  updateAge: 60 * 60 * 24,       // 1 日後にリフレッシュ
}
```

### リフレッシュの無効化

```typescript
session: {
  disableSessionRefresh: true,
}
```

### 遅延リフレッシュ

有効にすると GET `/get-session` は読み取り専用になり、リフレッシュが必要な場合に `needsRefresh: true` を返す。POST で実際のリフレッシュ操作を実行。

```typescript
session: {
  deferSessionRefresh: true,
}
```

## セッション鮮度

セッションの `createdAt` が `freshAge` 制限内であれば「フレッシュ」と見なされる。デフォルトは 1 日（86,400 秒）。

```typescript
session: {
  freshAge: 60 * 5,  // 5 分
}
```

`freshAge: 0` で無効化。

## セッション管理関数

### セッション取得

```typescript
const { data: session } = await authClient.getSession();
```

### セッション使用（リアクティブ）

```typescript
const { data: session } = authClient.useSession();
```

### セッション一覧

```typescript
const sessions = await authClient.listSessions();
```

### セッション取り消し

```typescript
await authClient.revokeSession({
  token: "session-token",
});
```

### 他のセッション取り消し

```typescript
await authClient.revokeOtherSessions();
```

### 全セッション取り消し

```typescript
await authClient.revokeSessions();
```

### セッション更新

カスタムフィールドのみ（コアフィールドはこのエンドポイントでは更新不可）:

```typescript
await authClient.updateSession({
  theme: "dark",
  language: "en",
});
```

### パスワード変更時のセッション取り消し

```typescript
await authClient.changePassword({
  newPassword: newPassword,
  currentPassword: currentPassword,
  revokeOtherSessions: true,
});
```

## セッションキャッシュ

### Cookie キャッシュ戦略

署名/暗号化された短命 Cookie にセッションデータを保存し、データベースクエリを削減。

```typescript
session: {
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60,  // 5 分キャッシュ
  },
}
```

### エンコーディング戦略

| Strategy | Size | Security | Readable | Use Case |
|----------|------|----------|----------|----------|
| **compact** | 最小 | 良好（署名付き） | はい | パフォーマンス重視、内部利用 |
| **jwt** | 中 | 良好（署名付き） | はい | JWT 互換性、外部システム |
| **jwe** | 最大 | 最高（暗号化） | いいえ | 最大セキュリティ、機密データ |

```typescript
session: {
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60,
    strategy: "compact",  // or "jwt" or "jwe"
  },
}
```

### リクエストで Cookie キャッシュを無効化

```typescript
const session = await authClient.getSession({
  query: { disableCookieCache: true },
});
```

## セカンダリストレージセッション

設定されている場合、デフォルトでセカンダリストレージ（Redis 等）にセッションを保存。

```typescript
betterAuth({
  secondaryStorage: { /* 実装 */ },
});
```

### データベースストレージを強制

```typescript
session: {
  storeSessionInDatabase: true,
}
```

### 取り消されたセッションの保持

```typescript
session: {
  preserveSessionInDatabase: true,
}
```

## ステートレスセッション管理

データベースクエリ不要 — セッションデータは署名/暗号化された Cookie に保存され、署名検証と有効期限チェックが行われる。

### 基本セットアップ（データベースなしで自動有効化）

```typescript
export const auth = betterAuth({
  // データベース設定なし
  socialProviders: { /* ... */ },
});
```

### 手動設定

```typescript
session: {
  cookieCache: {
    enabled: true,
    maxAge: 7 * 24 * 60 * 60,
    strategy: "jwe",
    refreshCache: true,
  },
}
```

### refreshCache の理解

有効期限前の自動 Cookie リフレッシュを制御:
- **false**（デフォルト）: 自動リフレッシュなし。期限切れ時にデータベースフェッチを試行
- **true**: maxAge の 80% でリフレッシュ
- **object**: `updateAge` プロパティでカスタム設定

```typescript
session: {
  cookieCache: {
    enabled: true,
    maxAge: 300,
    refreshCache: {
      updateAge: 60,  // 残り 60 秒でリフレッシュ
    },
  },
}
```

### ステートレスセッションのバージョニング

バージョンを変更して全セッションを無効化:

```typescript
session: {
  cookieCache: {
    version: "2",
  },
}
```

### ステートレス + セカンダリストレージ

最適なパフォーマンスのための組み合わせ:

```typescript
session: {
  cookieCache: {
    maxAge: 5 * 60,
    refreshCache: false,
  },
}
```

検証には Cookie を使用し、リフレッシュ操作には Redis を使用。

## セッションレスポンスのカスタマイズ

### サーバー側

```typescript
import { customSession } from "better-auth/plugins";

plugins: [
  customSession(async ({ user, session }) => {
    const roles = findUserRoles(session.session.userId);
    return {
      roles,
      user: { ...user, newField: "value" },
      session,
    };
  }),
];
```

### クライアント側の推論

```typescript
import { customSessionClient } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

const authClient = createAuthClient({
  plugins: [customSessionClient<typeof auth>()],
});
```

### 重要な注意事項

1. カスタムセッションコールバックは他プラグインからのフィールドを推論しない
2. カスタムフィールドはキャッシュされない — 各セッションフェッチで関数が実行される
3. プロジェクト間セットアップではカスタムフィールドの型推論が不足する場合がある

### List Devices エンドポイントの変更

```typescript
customSession(
  async ({ user, session }, ctx) => ({ user, session }),
  {},
  { shouldMutateListDeviceSessionsEndpoint: true }
);
```

## セキュリティ注意事項

- 取り消されたセッションは Cookie キャッシュが期限切れになるまで他のデバイスでアクティブのままになる可能性がある
- 重要な即時取り消しには `cookieCache` を無効化するか `maxAge` を短縮
- すべての Cookie キャッシュ戦略は暗号署名による改ざん防止を提供
