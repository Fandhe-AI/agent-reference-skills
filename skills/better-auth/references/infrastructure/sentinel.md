# Sentinel

The `sentinel()` plugin provides security and abuse protection: credential stuffing, impossible travel, free trial abuse, compromised passwords, stale accounts, geo-blocking, bots, suspicious IPs, velocity limits, and email validation.

## Signature / Usage

```ts
import { betterAuth } from "better-auth";
import { sentinel } from "@better-auth/infra";

export const auth = betterAuth({
  plugins: [
    sentinel({
      apiKey: process.env.BETTER_AUTH_API_KEY,
      security: {
        credentialStuffing: {
          enabled: true,
          thresholds: { challenge: 3, block: 5 },
          windowSeconds: 3600,
          cooldownSeconds: 900,
        },
        compromisedPassword: { enabled: true, action: "block", minBreachCount: 1 },
        impossibleTravel: { enabled: true, maxSpeedKmh: 1000, action: "challenge" },
        geoBlocking: { denyList: ["XX"], action: "block" },
        botBlocking: { action: "challenge" },
        suspiciousIpBlocking: { action: "block" },
        challengeDifficulty: 18,
      },
    }),
  ],
});
```

Client:

```ts
import { createAuthClient } from "better-auth/client";
import { sentinelClient } from "@better-auth/infra/client";

export const authClient = createAuthClient({
  plugins: [sentinelClient({ autoSolveChallenge: true })],
});
```

## Options / Props

`SentinelOptions`:

| Name | Type | Description |
| --- | --- | --- |
| apiUrl | string | Better Auth infrastructure API URL. Default: `https://dash.better-auth.com` |
| kvUrl | string | Identification infrastructure URL. Default: `https://kv.better-auth.com` |
| apiKey | string | API key. Falls back to `BETTER_AUTH_API_KEY` in env. |
| apiOptions | object | `timeout?: number` (ms, default `3000`), `headers?: Record<string, string>` |
| kvOptions | object | `timeout?: number` (ms, default `1000`), `retry?: { attempts?; baseDelay?; maxDelay? }`, `headers?` |
| apiTimeout | number | Deprecated alias for `apiOptions.timeout`. |
| kvTimeout | number | Deprecated alias for `kvOptions.timeout`. |
| sentinelHeaders | `"legacy" \| "modern"` | PoW challenge headers the server writes. `"modern"` also writes `X-Sentinel-PoW-*` and does not change identify reads. Does not have to match the client. See Protocol headers below. |
| security | SecurityOptions | Security feature configuration. |

```ts
interface SecurityOptions {
  unknownDeviceNotification?: boolean;
  credentialStuffing?: CredentialStuffingConfig;
  impossibleTravel?: ImpossibleTravelConfig;
  geoBlocking?: GeoBlockingConfig;
  botBlocking?: boolean | { action: SecurityAction };
  suspiciousIpBlocking?: boolean | { action: SecurityAction };
  velocity?: VelocityConfig;
  freeTrialAbuse?: FreeTrialAbuseConfig;
  compromisedPassword?: CompromisedPasswordConfig;
  emailValidation?: EmailValidationConfig;
  emailNormalization?: { enabled?: boolean };
  staleUsers?: StaleUsersConfig;
  challengeDifficulty?: number;
}

type SecurityAction = "log" | "challenge" | "block";
```

Feature options shown in the docs:

| Feature | Options |
| --- | --- |
| credentialStuffing | enabled, action, thresholds.challenge, thresholds.block, windowSeconds, cooldownSeconds |
| impossibleTravel | enabled, maxSpeedKmh, action ("log" / "challenge" / "block") |
| freeTrialAbuse | enabled, thresholds.challenge, thresholds.block, maxAccountsPerVisitor, retentionSeconds (default 90 days; platform clamps to 1 to 365 days), action |
| compromisedPassword | enabled, action, minBreachCount |
| staleUsers | enabled, staleDays, action, notifyUser, notifyAdmin, adminEmail |
| geoBlocking | allowList, denyList (ISO 3166-1 alpha-2), action ("challenge" / "block") |
| velocity | enabled, thresholds.challenge, thresholds.block, maxSignupsPerVisitor, maxPasswordResetsPerIp, maxSignInsPerIp, windowSeconds, action |
| emailValidation | enabled, strictness ("low" / "medium" / "high"), action, domainAllowlist |
| emailNormalization | enabled |

`sentinelClient` options:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| identifyUrl | string | `BETTER_AUTH_KV_URL` or `https://kv.better-auth.com` | Base URL for the identify endpoint. |
| identifyOptions | object | `{ timeout: 1000, retry: { attempts: 2, baseDelay: 400, maxDelay: 600 } }` | Identify HTTP timeout and retry policy. |
| sentinelHeaders | `"legacy" \| "modern"` | `"legacy"` | Header names the client sends. `"modern"` sends only `X-Sentinel-*`. Does not have to match the server. Set this on the client when a proxy rewrites `X-Request-Id`. |
| autoSolveChallenge | boolean | `true` | Automatically solve PoW challenges. |
| kvTimeout | number | `1000` | Deprecated alias for `identifyOptions.timeout`. |
| onChallengeReceived | (reason: string) => void | — | Called when a PoW challenge is received. |
| onChallengeSolved | (solveTimeMs: number) => void | — | Called after a successful solve. |
| onChallengeFailed | (error: Error) => void | — | Called if solving fails. |

`sentinelNativeClient` (from `@better-auth/infra/native`) takes the same options plus `storage: { getItem, setItem }` (default: Async Storage when installed); on `423` with a PoW challenge header it solves and retries once with the solution header. It also accepts `sentinelHeaders`.

### Protocol headers (`sentinelHeaders`)

Sentinel carries visitor identity and PoW challenges over HTTP headers. `sentinelHeaders` chooses the names `sentinel()`, `sentinelClient()`, and `sentinelNativeClient()` write. Default: `"legacy"`. Server and client settings are independent.

| Role | `"legacy"` (default) | `"modern"` |
| --- | --- | --- |
| Request id | `X-Request-Id` | `X-Sentinel-Request-Id` |
| Visitor id | `X-Visitor-Id` | `X-Sentinel-Visitor-Id` |
| PoW challenge | `X-PoW-Challenge` | `X-Sentinel-PoW-Challenge` |
| PoW reason | `X-PoW-Reason` | `X-Sentinel-PoW-Reason` |
| PoW solution | `X-PoW-Solution` | `X-Sentinel-PoW-Solution` |

```ts
sentinelClient({
  // When a proxy rewrites X-Request-Id. Independent of the server option.
  sentinelHeaders: "modern",
  autoSolveChallenge: true,
})
```

```ts
sentinelNativeClient({
  sentinelHeaders: "modern",
  autoSolveChallenge: true,
})
```

```ts
sentinel({
  apiKey: process.env.BETTER_AUTH_API_KEY,
  // Optional. Dual-writes challenge headers. Does not change identify reads.
  sentinelHeaders: "modern",
})
```

Cross-origin CORS (exact header names; `*` does not apply to credentialed requests):

| Who writes | Allow on preflight (request) | Expose on response |
| --- | --- | --- |
| Legacy client | `X-Request-Id`, `X-Visitor-Id`, `X-PoW-Solution` | — |
| Modern client | `X-Sentinel-Request-Id`, `X-Sentinel-Visitor-Id`, `X-Sentinel-PoW-Solution` | — |
| Server `"legacy"` | — | `X-PoW-Challenge`, `X-PoW-Reason` |
| Server `"modern"` | — | `X-PoW-Challenge`, `X-PoW-Reason`, `X-Sentinel-PoW-Challenge`, `X-Sentinel-PoW-Reason` |

```ts
{
  // Your real app origin only — not "*"
  // Both families while any browser client or the server is still "legacy".
  origin: "https://app.example.com",
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Request-Id",
    "X-Visitor-Id",
    "X-PoW-Solution",
    "X-Sentinel-Request-Id",
    "X-Sentinel-Visitor-Id",
    "X-Sentinel-PoW-Solution",
  ],
  exposedHeaders: [
    "X-PoW-Challenge",
    "X-PoW-Reason",
    "X-Sentinel-PoW-Challenge",
    "X-Sentinel-PoW-Reason",
  ],
}
```

## Notes

- Protocol headers: clients write only their family, and a request id is sent only after identify succeeds. A `"modern"` server still sends `X-PoW-Challenge` / `X-PoW-Reason` and also `X-Sentinel-PoW-Challenge` / `X-Sentinel-PoW-Reason`, so an older client can read the challenge; a `"legacy"` server sends only `X-PoW-*`. Visitor id, PoW challenge, reason, and solution are read from `X-Sentinel-*` first, then the legacy name. The identify request id is stricter: `X-Sentinel-Request-Id` wins even when the server option is `"legacy"`; `X-Request-Id` is used only when `X-Visitor-Id` is set and `X-Sentinel-Visitor-Id` is not. A bare `X-Request-Id` is ignored, as is `X-Request-Id` beside `X-Sentinel-Visitor-Id` when `X-Sentinel-Request-Id` is missing (the client omitted the id because identify was not stored).
- Proxies such as Envoy often set or replace `X-Request-Id`, and the server cannot tell that apart from a legacy client's value. Leave an incoming `X-Request-Id` unchanged and do not add one when the client omitted it. If the proxy replaces it, set `sentinelHeaders: "modern"` on `sentinelClient()` and `sentinelNativeClient()` (the server option does not fix that, and forwarding the proxy's id is not a substitute). Until every client sends `X-Sentinel-*`, pass the client's `X-Request-Id` (do not replace it), `X-Visitor-Id`, `X-PoW-Solution`, plus `X-Sentinel-Request-Id`, `X-Sentinel-Visitor-Id`, `X-Sentinel-PoW-Solution`; a legacy `X-Request-Id` counts only when `X-Visitor-Id` is also present. Do not strip `X-PoW-*` / `X-Sentinel-PoW-*` on the response, and do not copy a proxy id into `X-Sentinel-Request-Id`. Do not turn security checks off to work around a rewritten `X-Request-Id`.
- CORS: same-origin browser apps and native clients do not need CORS for these headers; cross-origin browser clients do. Allow the request headers your clients send and expose the challenge headers your server returns (a `"legacy"` server does not send `X-Sentinel-PoW-*`). While any browser client or the server is still `"legacy"`, allow and expose both families; a modern-only allow list drops legacy browser clients, and exposing only `X-Sentinel-PoW-*` hides challenges from a `"legacy"` server. After every browser client sends only `X-Sentinel-*`, the legacy names can be dropped from `allowedHeaders`; drop `X-PoW-Challenge` / `X-PoW-Reason` from `exposedHeaders` only when the server is `"modern"` and the `X-Sentinel-PoW-*` names are already exposed. Restrict CORS to origins you control (see reference/security.md trusted origins); do not use `origin: "*"` with credentialed requests, and do not turn off origin or CSRF checks to make these headers succeed.

- Compromised password check uses k-anonymity: only the first 5 characters of the password hash are sent.
- Email normalization lowercases, strips plus-address tags on common providers, removes dots in Gmail-style addresses, and maps `googlemail.com` to `gmail.com`. Control it separately from `emailValidation`.
- The client sends a visitor id on each request (and a request id after identify succeeds). Security checks use the visitor id stored with that identify record, not the visitor header by itself; that record is used for credential stuffing, free trial abuse, device tracking. When auto-solving, the retry sends the solution on `X-PoW-Solution`, or `X-Sentinel-PoW-Solution` when the client uses `"modern"`; the server accepts either name.
- Expo / React Native: install `@react-native-async-storage/async-storage` and `react-native-get-random-values` (async storage optional; without it the visitor ID is session-only in memory). For Expo also `expo-constants expo-device expo-crypto`, and follow the Expo integration before adding infrastructure plugins.
- Security events are recorded as audit events: `security_check` (one event per protected user action; `eventData.outcome` is `passed`, `challenged`, or `blocked`; includes `evaluatedChecks`, `triggeredBy`, and `reason`) and `security_signal` (informational detection detail for the Security dashboard; does not count toward security usage). They appear in the Security dashboard and audit logs. The earlier per-detection types (`security_blocked`, `security_credential_stuffing`, ...) no longer appear in the docs.
- Best practices: start with "log" actions, tune thresholds, prefer challenges before blocks, enable client auto-solve, monitor security events.
- Troubleshooting: warning `[Sentinel] Missing BETTER_AUTH_API_KEY. Security checks may fall back to allow mode.` means the API key is not set. If challenges are not solved, verify the correct client plugin (`sentinelClient()` web / `sentinelNativeClient()` native), `autoSolveChallenge` is `true`, and the client can reach the server. Cross-origin, expose the challenge headers the server returns (`X-PoW-*`, plus `X-Sentinel-PoW-*` when the server is `"modern"`) by exact name, not `*`.
- Pro plan or above is required for `sentinel()` (per Getting Started).
- Source: https://www.better-auth.com/docs/infrastructure/plugins/sentinel (better-auth v1.7.23 docs)

## Related

- [Getting Started](./getting-started.md)
- [Audit Logs](./audit-logs.md)
- [Dashboard Plugin (dash)](./dashboard.md)
