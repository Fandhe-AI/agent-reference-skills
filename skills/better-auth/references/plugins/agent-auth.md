# Agent Auth

The Agent Auth plugin makes a Better Auth server act as an Agent Auth provider implementing the Agent Auth Protocol standard. It enables AI agent service discovery, registration, capability approval, and scoped action execution using short-lived signed JWTs.

**Status**: under active development and not yet stable.

## Signature / Usage

### Installation

```bash
npm install @better-auth/agent-auth
# optional
npm install @auth/agent @auth/agent-cli
```

### Setup (server side)

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

### Discovery document endpoint

Published at `/.well-known/agent-configuration`:

```typescript
// app/.well-known/agent-configuration/route.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
    const configuration = await auth.api.getAgentConfiguration()
    return NextResponse.json(configuration)
}
```

Migration:

```bash
npx auth migrate
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { agentAuthClient } from "@better-auth/agent-auth/client"

export const authClient = createAuthClient({
    plugins: [agentAuthClient()],
})
```

### OpenAPI adapter

Automatically converts an existing OpenAPI 3.x spec into agent capabilities:

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

With upstream authentication:

```typescript
createFromOpenAPI(spec, {
    baseUrl: "https://api.example.com",
    async resolveHeaders({ agentSession }) {
        const token = await getAccessToken(agentSession.user.id)
        return { Authorization: `Bearer ${token}` }
    },
})
```

Default host capabilities:

```typescript
createFromOpenAPI(spec, {
    baseUrl: "https://api.example.com",
    defaultHostCapabilities: ["GET", "HEAD"],
})
```

Approval strength by HTTP method:

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

### Capability configuration

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
            location: "https://api.example.com/v1/issues",  // custom URL (optional)
        },
    ],
    async onExecute({ capability, arguments: args, agentSession }) {
        // capability execution handler
    },
})
```

### Agent session outside onExecute

For custom location routes:

```typescript
// Using the API method
const agentSession = await auth.api.getAgentSession({ headers: request.headers })

// Using the helper
import { verifyAgentRequest } from "@better-auth/agent-auth"
const agentSession = await verifyAgentRequest(request, auth)
```

Checking a grant:

```typescript
const CAP = "create_issue"
const allowed = agentSession.agent.capabilityGrants.some(
    (g) => g.capability === CAP && g.status === "active"
)
```

Agent session object:
- `agentSession.user` - resolved user
- `agentSession.agent` - agent id, name, mode, capabilityGrants, host id, metadata
- `agentSession.host` - host record

### Approval flow

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

Supported methods:
- `device_authorization` - browser-based approval with a user code
- `ciba` - back-channel approval flow

### Events and audit

```typescript
agentAuth({
    onEvent: async (event) => {
        // Captures lifecycle events:
        // - agent creation/revocation
        // - host creation/registration
        // - capability request/approval
        // - capability execution
        console.log(event)
    },
})
```

### getAgentConfiguration()

Returns the discovery document:

```typescript
const configuration = await auth.api.getAgentConfiguration()
```

Response: `issuer`, `endpoints`, `default_location`, provider metadata, supported modes

### getAgentSession()

```typescript
const agentSession = await auth.api.getAgentSession({ headers: request.headers })
```

## Options / Props

| Property | Type | Description |
|---|---|---|
| `providerName?` | string | Display name of the provider |
| `providerDescription?` | string | Description of the provider |
| `modes?` | `("delegated" \| "autonomous")[]` | Supported agent modes |
| `capabilities?` | Capability[] | Array of available capabilities |
| `onExecute?` | function | Capability execution handler |
| `requireAuthForCapabilities?` | boolean | Require auth to list capabilities |
| `approvalMethods?` | string[] | Enabled approval methods |
| `resolveApprovalMethod?` | function | Custom approval method selection |
| `deviceAuthorizationPage?` | string | Path to the device authorization UI |
| `defaultHostCapabilities?` | string[] \| function | Default auto-granted capabilities |
| `allowDynamicHostRegistration?` | boolean \| function | Allow new host registration |
| `onEvent?` | function | Event hook for audit logging |
| `trustProxy?` | boolean | Trust proxy headers for URL validation |

## Notes

- Under active development, not yet stable
- Capability-specific `location` URLs bypass `onExecute`. Grant/constraint checks must be implemented in the custom handler
- No device authorization UI is provided. The page referenced by `deviceAuthorizationPage` must be implemented
- Behind a reverse proxy, set `trustProxy: true` for correct `aud` validation
- JWT signatures are verified on every request
- `jti` (JWT ID) prevents token replay attacks
- Capabilities are cross-validated against both the DB grant and the JWT claims
- The JWT `aud` claim must match the URL being called: without a capability-specific location, use `default_location`/`endpoints.execute`, issuer, or base URL. With a capability-specific location, `aud` must match that absolute URL

### DB schema

Tables created by the plugin:
- `agent` - agent records
- `host` - host records (source of agent registration)
- `capabilityGrant` - user-approved capability grants
- `approval` - approval requests and decisions

## Related

- [device-authorization.md](./device-authorization.md)
