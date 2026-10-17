# Client ID Metadata Document (CIMD)

Lets an OAuth client identify itself without registering first. The client's `client_id` is the exact HTTPS URL of a metadata document it hosts. Better Auth validates the document and persists the client through the OAuth Provider's canonical registration path (CIMD draft-02).

## Signature / Usage

```bash
npm install @better-auth/cimd
```

```ts
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { oauthProvider } from "@better-auth/oauth-provider";
import { cimd } from "@better-auth/cimd";
import { fetchClientMetadataResource } from "@better-auth/cimd/node";

export const auth = betterAuth({
  plugins: [
    jwt(),
    oauthProvider({
      loginPage: "/login",
      consentPage: "/consent",
      scopes: ["openid", "profile", "email", "offline_access"],
    }),
    cimd({
      fetchClientMetadataResource,
    }),
  ],
});
```

MCP composition (MCP 2026-07-28 normatively references CIMD draft-00; the explicit profile adds MCP's required `client_name` and `redirect_uris`):

```ts
plugins: [
  mcp({
    resource: "https://mcp.example.com/mcp",
    scopes: ["mcp:tools"],
  }),
  cimd({
    fetchClientMetadataResource,
    metadataProfile: "mcp-2026-07-28",
  }),
];
```

Full configuration:

```ts
cimd({
  fetchClientMetadataResource,
  metadataRevalidationInterval: "10m",
  maxCacheEntries: 1000,
  metadataFetchPolicy: {
    minimumFetchInterval: 1,
    maximumConcurrentFetches: 16,
    maximumConcurrentFetchesPerOrigin: 4,
    maximumFetchesPerMinute: 120,
    maximumFetchesPerOriginPerMinute: 30,
  },
  originBoundFields: ["post_logout_redirect_uris", "client_uri"],
  isMetadataDocumentUrlAllowed(clientIdUrl) {
    return new URL(clientIdUrl).hostname.endsWith(".trusted.example");
  },
  onClientCreated({ client, clientMetadataDocument, context }) {
    // Assign local trust or audit state.
  },
  onClientRefreshed({ client, previousClient, clientMetadataDocument, context }) {
    // Compare the previous and current records and apply operator policy.
  },
});
```

Explicit discovery composition:

```ts
oauthProvider({
  extensions: [
    {
      clientDiscovery: createCimdClientDiscovery({
        fetchClientMetadataResource,
        metadataRevalidationInterval: "60m",
      }),
    },
  ],
});
```

Example metadata document (`https://client.example.com/client-metadata.json`):

```json
{
  "client_id": "https://client.example.com/client-metadata.json",
  "grant_types": ["client_credentials"],
  "token_endpoint_auth_method": "private_key_jwt",
  "jwks_uri": "https://client.example.com/jwks.json"
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| fetchClientMetadataResource | `(input: RequestInfo \| URL, init?: RequestInit) => Promise<Response>` | required | Runtime-owned transport for metadata documents and discovery-owned resources. Must resolve once, reject RFC 6890 special-use addresses, pin the approved address, and refuse redirects. |
| metadataProfile | `"mcp-2026-07-28"` | — | Adds the metadata requirements of MCP 2026-07-28, which normatively pins CIMD draft-00. |
| metadataRevalidationInterval | `number \| string` | `"60m"` | Maximum and fallback cache freshness lifetime. Expired entries are revalidated on next client resolution; no background fetch. Numbers are seconds; strings are duration expressions. |
| maxCacheEntries | `number` | `1000` | Maximum validated metadata documents retained by this plugin instance. |
| metadataFetchPolicy | `{ minimumFetchInterval?; maximumConcurrentFetches?; maximumConcurrentFetchesPerOrigin?; maximumFetchesPerMinute?; maximumFetchesPerOriginPerMinute? }` | `{ minimumFetchInterval: 1, maximumConcurrentFetches: 16, maximumConcurrentFetchesPerOrigin: 4, maximumFetchesPerMinute: 120, maximumFetchesPerOriginPerMinute: 30 }` | Reject-immediately request-amplification limits. Numeric `minimumFetchInterval` is seconds and paces retries after failed fetches. Minute limits use a rolling 60-second window. `0` disables failed-fetch pacing only. |
| originBoundFields | `string[]` | `["post_logout_redirect_uris", "client_uri"]` | Metadata URL fields that must share the `client_id` origin. Redirect URIs are excluded (authorization still requires exact matching). Authority-free private-use URIs such as `com.example.app:/logout` are exempt. |
| isMetadataDocumentUrlAllowed | `(clientIdUrl, context) => boolean \| Promise<boolean>` | always allow | Application policy evaluated before the required transport runs. |
| onClientCreated | `(event: CimdClientCreatedEvent) => void \| Promise<void>` | — | Best-effort notification after initial persistence. |
| onClientRefreshed | `(event: CimdClientRefreshedEvent) => void \| Promise<void>` | — | Best-effort refresh notification. `previousClient` lets operators detect security-relevant metadata changes. |

## Notes

- `fetchClientMetadataResource` is required. The Node.js implementation in `@better-auth/cimd/node` resolves the hostname once, rejects non-public-routable results, pins one approved address, preserves Host and TLS certificate identity, never follows redirects, and supports only `GET` and `HEAD`. Bun, Deno, Workers, and other runtimes must provide an equivalent secure transport.
- Do not perform a DNS check and then call `globalThis.fetch`; that re-resolves the hostname and is vulnerable to DNS rebinding.
- MCP profile requires `client_id`, `client_name`, and a non-empty `redirect_uris` array. DCR remains disabled unless the OAuth Provider explicitly enables it.
- Draft-02 validation: `client_id` must equal the requested metadata URL (simple string comparison; explicit default ports are significant). URLs must be HTTPS without credentials, fragments, dot segments, special-use hosts, and must have an explicit path. `client_name` and `redirect_uris` are optional for generic clients.
- Declaring `client_credentials` grants no machine scopes: new discovered clients persist an empty server-owned `clientCredentialsScopes` ceiling until an administrator assigns scopes; refresh preserves it.
- Supported auth methods for discovered clients: `none` and `private_key_jwt`. Inline `jwks` must be `{ "keys": [...] }`; EC keys P-256/P-384/P-521, OKP keys Ed25519. `backchannel_logout_uri` and `backchannel_logout_session_required` are rejected. Server-owned fields cannot be supplied by the document.
- Discovered clients are stored in `oauthClient` with `clientDiscoveryId: "cimd"`, preventing takeover of managed or DCR clients whose IDs begin with `https://`.
- Cache semantics are shared-cache: `s-maxage` over `max-age` and `Expires`; `no-store`, `private`, and `Vary: *` prevent caching. Refresh is fail closed: a network, validation, or persistence failure preserves previous state but rejects the current OAuth request.
- Limits: five-second timeout, streaming 5 KB metadata-document limit, 64 KiB discovery-owned JWKS limit, JSON / `application/*+json` media types, redirects rejected. Loopback Client Identifier URLs are not supported.
- Source: https://www.better-auth.com/docs/plugins/cimd (better-auth v1.7.10 docs)

## Related

- [OAuth Provider](./oauth-provider.md)
- [MCP](./mcp.md)
