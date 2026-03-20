# Agent Auth

Agent Auth プラグインは、Better Auth サーバーを Agent Auth Protocol 標準を実装した Agent Auth プロバイダーとして機能させる。AI エージェントのサービスディスカバリー、登録、ケーパビリティ承認、短期署名 JWT を使用したスコープ付きアクション実行を可能にする。

**ステータス**: 開発中であり、まだ安定していない。

## セットアップ

### インストール

```bash
npm install @better-auth/agent-auth
# オプション
npm install @auth/agent @auth/agent-cli
```

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { agentAuth } from "@better-auth/agent-auth"

export const auth = betterAuth({
    plugins: [
        agentAuth({
            providerName: "Acme",
            providerDescription: "Acme project and deployment APIs for AI agents.",
            modes: ["delegated", "autonomous"],
            capabilities: [
                {
                    name: "deploy_project",
                    description: "Deploy a project to production.",
                    input: {
                        type: "object",
                        properties: { projectId: { type: "string" } },
                        required: ["projectId"],
                    },
                },
                {
                    name: "list_projects",
                    description: "List projects the current user can access.",
                },
            ],
            async onExecute({ capability, arguments: args, agentSession }) {
                switch (capability) {
                    case "list_projects":
                        return [{ id: "proj_123", name: "marketing-site" }]
                    case "deploy_project":
                        return { ok: true, projectId: args?.projectId, requestedBy: agentSession.user.id }
                    default:
                        throw new Error(`Unsupported capability: ${capability}`)
                }
            },
        }),
    ],
})
```

### ディスカバリードキュメントエンドポイント

`/.well-known/agent-configuration` に公開:

```typescript
// app/.well-known/agent-configuration/route.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
    const configuration = await auth.api.getAgentConfiguration()
    return NextResponse.json(configuration)
}
```

マイグレーション:

```bash
npx auth migrate
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { agentAuthClient } from "@better-auth/agent-auth/client"

export const authClient = createAuthClient({
    plugins: [agentAuthClient()],
})
```

## OpenAPI アダプター

既存の OpenAPI 3.x スペックをエージェントケーパビリティに自動変換:

```typescript
import { createFromOpenAPI } from "@better-auth/agent-auth/openapi"

const spec = await fetch("https://api.example.com/openapi.json").then((r) => r.json())

export const auth = betterAuth({
    plugins: [
        agentAuth({
            ...createFromOpenAPI(spec, {
                baseUrl: "https://api.example.com",
            }),
        }),
    ],
})
```

### アップストリーム認証付き

```typescript
createFromOpenAPI(spec, {
    baseUrl: "https://api.example.com",
    async resolveHeaders({ agentSession }) {
        const token = await getAccessToken(agentSession.user.id)
        return { Authorization: `Bearer ${token}` }
    },
})
```

### デフォルトホストケーパビリティ

```typescript
createFromOpenAPI(spec, {
    baseUrl: "https://api.example.com",
    defaultHostCapabilities: ["GET", "HEAD"],
})
```

### HTTP メソッド別承認強度

```typescript
createFromOpenAPI(spec, {
    baseUrl: "https://api.example.com",
    approvalStrength: {
        GET: "session",
        POST: "webauthn",
        PUT: "webauthn",
        DELETE: "webauthn",
    },
})
```

## ケーパビリティ設定

```typescript
agentAuth({
    capabilities: [
        {
            name: "create_issue",
            description: "Create an issue in the current workspace.",
            input: {
                type: "object",
                properties: { title: { type: "string" }, body: { type: "string" } },
                required: ["title"],
            },
            location: "https://api.example.com/v1/issues",  // カスタム URL（任意）
        },
    ],
    async onExecute({ capability, arguments: args, agentSession }) {
        // ケーパビリティ実行ハンドラー
    },
})
```

## onExecute 外でのエージェントセッション

カスタムロケーションルート用:

```typescript
// API メソッド使用
const agentSession = await auth.api.getAgentSession({ headers: request.headers })

// ヘルパー使用
import { verifyAgentRequest } from "@better-auth/agent-auth"
const agentSession = await verifyAgentRequest(request, auth)
```

### グラントの確認

```typescript
const CAP = "create_issue"
const allowed = agentSession.agent.capabilityGrants.some(
    (g) => g.capability === CAP && g.status === "active"
)
```

### エージェントセッションオブジェクト

- `agentSession.user` - 解決されたユーザー
- `agentSession.agent` - エージェント id, name, mode, capabilityGrants, host id, metadata
- `agentSession.host` - ホストレコード

## JWT `aud` 検証

JWT の `aud` クレームは呼び出される URL と一致する必要がある:
- ケーパビリティ固有 location なし: `default_location`/`endpoints.execute`、issuer、または base URL を使用
- ケーパビリティ固有 location あり: `aud` はその絶対 URL と一致
- リバースプロキシの背後: 正しい `Host`/`X-Forwarded-Proto` 処理のため `trustProxy: true` を設定

## 承認フロー

```typescript
agentAuth({
    approvalMethods: ["ciba", "device_authorization"],
    resolveApprovalMethod: ({ preferredMethod, supportedMethods }) => {
        if (preferredMethod && supportedMethods.includes(preferredMethod)) return preferredMethod
        return "device_authorization"
    },
    deviceAuthorizationPage: "/device/capabilities",
})
```

サポートされるメソッド:
- `device_authorization` - ユーザーコード付きのブラウザベース承認
- `ciba` - バックチャネル承認フロー

## イベントと監査

```typescript
agentAuth({
    onEvent: async (event) => {
        // ライフサイクルイベントのキャプチャ:
        // - エージェント作成/取り消し
        // - ホスト作成/登録
        // - ケーパビリティ要求/承認
        // - ケーパビリティ実行
        console.log(event)
    },
})
```

## 設定オプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `providerName?` | string | プロバイダーの表示名 |
| `providerDescription?` | string | プロバイダーの説明 |
| `modes?` | `("delegated" \| "autonomous")[]` | サポートするエージェントモード |
| `capabilities?` | Capability[] | 利用可能なケーパビリティの配列 |
| `onExecute?` | function | ケーパビリティ実行ハンドラー |
| `requireAuthForCapabilities?` | boolean | ケーパビリティ一覧に認証を要求 |
| `approvalMethods?` | string[] | 有効な承認メソッド |
| `resolveApprovalMethod?` | function | カスタム承認メソッド選択 |
| `deviceAuthorizationPage?` | string | デバイス認可 UI のパス |
| `defaultHostCapabilities?` | string[] \| function | デフォルト自動付与ケーパビリティ |
| `allowDynamicHostRegistration?` | boolean \| function | 新規ホスト登録の許可 |
| `onEvent?` | function | 監査ログ用イベントフック |
| `trustProxy?` | boolean | URL 検証用のプロキシヘッダーを信頼 |

## API メソッド

### getAgentConfiguration()

ディスカバリードキュメントを返す:

```typescript
const configuration = await auth.api.getAgentConfiguration()
```

レスポンス: `issuer`, `endpoints`, `default_location`, プロバイダーメタデータ、サポートモード

### getAgentSession()

```typescript
const agentSession = await auth.api.getAgentSession({ headers: request.headers })
```

## DB スキーマ

プラグインが作成するテーブル:
- `agent` - エージェントレコード
- `host` - ホストレコード（エージェント登録ソース）
- `capabilityGrant` - ユーザー承認済みケーパビリティグラント
- `approval` - 承認要求と決定

## 注意点

- 開発中であり、安定していない
- ケーパビリティ固有の `location` URL は `onExecute` をバイパスする。カスタムハンドラーでグラント/制約チェックを実装する必要あり
- デバイス認可 UI は提供されない。`deviceAuthorizationPage` で参照されるページを実装する必要あり
- リバースプロキシの背後では正しい `aud` 検証のため `trustProxy: true` を設定
- JWT 署名はリクエストごとに検証される
- `jti`（JWT ID）でトークンリプレイ攻撃を防止
- ケーパビリティは DB グラントと JWT クレームの両方で交差検証される
