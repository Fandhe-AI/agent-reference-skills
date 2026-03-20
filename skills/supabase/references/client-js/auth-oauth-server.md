# Auth OAuth Server

OAuth サーバー管理メソッド群。Supabase を OAuth 2.0 プロバイダーとして使用する際の管理 API。

## メソッド一覧

### `createClient()`

新しい OAuth クライアントを作成する。

**Signature:**
```typescript
supabase.auth.admin.oauth.createClient(params: {
  name: string
  redirect_uris: string[]
  scopes?: string
}): Promise<OAuthClientResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.oauth.createClient({
  name: 'My Third-Party App',
  redirect_uris: [
    'https://myapp.com/callback',
    'http://localhost:3000/callback',
  ],
  scopes: 'openid profile email',
})

// data.client_id — クライアント ID
// data.client_secret — クライアントシークレット（初回のみ取得可能）
```

**Parameters:**
- `name` (string) — OAuth クライアント名
- `redirect_uris` (string[]) — 許可するリダイレクト URI の一覧
- `scopes` (string) — 許可するスコープ（スペース区切り。省略可）

**Returns:** `{ data: { client_id, client_secret, name, redirect_uris, scopes }, error }`

---

### `getClient()`

OAuth クライアントの詳細を取得する。

**Signature:**
```typescript
supabase.auth.admin.oauth.getClient(clientId: string): Promise<OAuthClientResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.oauth.getClient('client-uuid')
```

**Parameters:**
- `clientId` (string) — OAuth クライアント ID

**Returns:** `{ data: { client_id, name, redirect_uris, scopes }, error }`

---

### `listClients()`

登録済みの全 OAuth クライアントを一覧表示する。

**Signature:**
```typescript
supabase.auth.admin.oauth.listClients(): Promise<OAuthClientsResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.oauth.listClients()
```

**Parameters:** なし

**Returns:** `{ data: OAuthClient[], error }`

---

### `updateClient()`

OAuth クライアントの設定を更新する。

**Signature:**
```typescript
supabase.auth.admin.oauth.updateClient(clientId: string, attributes: {
  name?: string
  redirect_uris?: string[]
  scopes?: string
}): Promise<OAuthClientResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.oauth.updateClient('client-uuid', {
  name: 'Updated App Name',
  redirect_uris: ['https://newdomain.com/callback'],
})
```

**Parameters:**
- `clientId` (string) — OAuth クライアント ID
- `attributes.name` (string) — 新しいクライアント名（省略可）
- `attributes.redirect_uris` (string[]) — 新しいリダイレクト URI 一覧（省略可）
- `attributes.scopes` (string) — 新しいスコープ（省略可）

**Returns:** `{ data: OAuthClient, error }`

---

### `deleteClient()`

OAuth クライアントを削除する。

**Signature:**
```typescript
supabase.auth.admin.oauth.deleteClient(clientId: string): Promise<{ error: AuthError | null }>
```

**Usage:**
```typescript
const { error } = await supabase.auth.admin.oauth.deleteClient('client-uuid')
```

**Parameters:**
- `clientId` (string) — 削除する OAuth クライアント ID

**Returns:** `{ error }`

---

### `listGrants()`

現在のユーザーが付与した OAuth グラント一覧を取得する。

**Signature:**
```typescript
supabase.auth.admin.oauth.listGrants(): Promise<OAuthGrantsResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.oauth.listGrants()
```

**Parameters:** なし

**Returns:** `{ data: OAuthGrant[], error }`

---

### `revokeGrant()`

特定の OAuth グラントを取り消す。

**Signature:**
```typescript
supabase.auth.admin.oauth.revokeGrant(grantId: string): Promise<{ error: AuthError | null }>
```

**Usage:**
```typescript
const { error } = await supabase.auth.admin.oauth.revokeGrant('grant-uuid')
```

**Parameters:**
- `grantId` (string) — 取り消すグラントの ID

**Returns:** `{ error }`

---

### `approveAuthorization()`

OAuth 認可リクエストを承認する。

**Signature:**
```typescript
supabase.auth.admin.oauth.approveAuthorization(): Promise<OAuthAuthorizationResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.oauth.approveAuthorization()
```

**Parameters:** なし

**Returns:** `{ data: { redirect_to }, error }`

---

### `denyAuthorization()`

OAuth 認可リクエストを拒否する。

**Signature:**
```typescript
supabase.auth.admin.oauth.denyAuthorization(): Promise<OAuthAuthorizationResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.oauth.denyAuthorization()
```

**Parameters:** なし

**Returns:** `{ data: { redirect_to }, error }`

---

## 注意点
- OAuth Server 機能は Supabase の追加機能であり、Dashboard で有効化が必要
- `createClient` で返される `client_secret` は初回のみ表示される。必ず保存すること
- `service_role` キーでの認証が必要なメソッドが大半
- OAuth 2.0 の Authorization Code Flow + PKCE をサポート
- リダイレクト URI は厳密に一致する必要がある（ワイルドカード不可）

## 関連
- [Auth](./auth.md)
- [Auth Admin](./auth-admin.md)
