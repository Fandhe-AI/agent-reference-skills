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
| autoSolveChallenge | boolean | `true` | Automatically solve PoW challenges. |
| kvTimeout | number | `1000` | Deprecated alias for `identifyOptions.timeout`. |
| onChallengeReceived | (reason: string) => void | — | Called when a PoW challenge is received. |
| onChallengeSolved | (solveTimeMs: number) => void | — | Called after a successful solve. |
| onChallengeFailed | (error: Error) => void | — | Called if solving fails. |

`sentinelNativeClient` (from `@better-auth/infra/native`) takes the same options plus `storage: { getItem, setItem }` (default: Async Storage when installed); on `423` with `X-PoW-Challenge` it solves and retries once with `X-PoW-Solution`.

## Notes

- Compromised password check uses k-anonymity: only the first 5 characters of the password hash are sent.
- Email normalization lowercases, strips plus-address tags on common providers, removes dots in Gmail-style addresses, and maps `googlemail.com` to `gmail.com`. Control it separately from `emailValidation`.
- The client sends a visitor ID via the `X-Visitor-Id` header (used for credential stuffing, free trial abuse, device tracking); solved challenges are sent via `X-PoW-Solution`.
- Expo / React Native: install `@react-native-async-storage/async-storage` and `react-native-get-random-values` (async storage optional; without it the visitor ID is session-only in memory). For Expo also `expo-constants expo-device expo-crypto`, and follow the Expo integration before adding infrastructure plugins.
- Security events are the `security_*` event types listed in Audit Logs; they appear in the Security dashboard and audit logs.
- Best practices: start with "log" actions, tune thresholds, prefer challenges before blocks, enable client auto-solve, monitor security events.
- Troubleshooting: warning `[Sentinel] Missing BETTER_AUTH_API_KEY. Security checks may fall back to allow mode.` means the API key is not set. If challenges are not solved, verify the correct client plugin (`sentinelClient()` web / `sentinelNativeClient()` native), `autoSolveChallenge` is `true`, and the client can reach the server.
- Pro plan or above is required for `sentinel()` (per Getting Started).
- Source: https://www.better-auth.com/docs/infrastructure/plugins/sentinel (better-auth v1.7.10 docs)

## Related

- [Getting Started](./getting-started.md)
- [Audit Logs](./audit-logs.md)
- [Dashboard Plugin (dash)](./dashboard.md)
