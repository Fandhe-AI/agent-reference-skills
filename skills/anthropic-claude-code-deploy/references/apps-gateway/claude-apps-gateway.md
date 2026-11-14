<!-- source: https://code.claude.com/docs/en/claude-apps-gateway.md / last verified: 2026-11-14 -->

# Claude apps gateway

Self-hosted service that sits between Claude Code clients and a model provider (Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, Microsoft Foundry, or Anthropic API), with SSO sign-in, per-group model access, managed settings delivery, and OTLP telemetry fan-out.

## Signature / Usage

```bash
# Included in the claude binary; run the gateway server:
claude gateway --config gateway.yaml

# Verify the auth surface once running:
curl -s https://claude-gateway.internal.example.com/.well-known/oauth-authorization-server | jq
curl -s -X POST https://claude-gateway.internal.example.com/oauth/device_authorization | jq

# Protocol reference served by a running gateway:
curl https://claude-gateway.internal.example.com/protocol
```

Managed settings file pushed to developer machines via MDM:

```json
{
  "forceLoginMethod": "gateway",
  "forceLoginGatewayUrl": "https://claude-gateway.internal.example.com",
  "parentSettingsBehavior": "merge"
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `forceLoginMethod` / `forceLoginGatewayUrl` | managed settings | Opens `/login` directly on the Cloud gateway screen; set in the managed settings file, macOS plist, Windows HKLM policy, or policy helper |
| `forceLoginMethod` / `forceLoginGatewayUrl` (user settings) | `~/.claude/settings.json` | v2.1.295+ on the developer machine; read only from user settings (not project or local settings) and ignored once any managed source reaches the machine |
| `parentSettingsBehavior: "merge"` | managed settings | Lets Claude Desktop deliver the gateway's egress allowlist (and plugin marketplace allowlist) to the embedded Claude Code sessions it launches |
| `allowManagedPermissionRulesOnly` / `allowManagedMcpServersOnly` / `allowManagedHooksOnly` / `sandbox.network.allowManagedDomainsOnly` / `sandbox.filesystem.allowManagedReadPathsOnly` | managed settings | The five locks restricting what host-supplied parent settings can grant; pair each with its managed allowlist |
| `gatewayInternalNetworks` | managed settings (IPv4 CIDR list) | v2.1.268+ on the developer machine; declares public IPv4 blocks your organization owns so `/login` accepts a gateway inside them (max 4 blocks, `/8` to `/32`, no overlap with private or reserved ranges); ignored in user, project, and server-managed settings |
| `allowedProviders: ["gateway"]` | managed settings | v2.1.285+; refuses sessions not set up for a Cloud gateway; keep it off the gateway host (`claude gateway` refuses to run where it is set) |
| `bootstrapUrl` | Claude Desktop managed config | `<listen.public_url>/user/bootstrap`; requires a `desktop` key in the matching gateway policy (gateway server v2.1.203+) |

## Notes

- Prerequisites: Claude Code v2.1.195+ on both the gateway server and developer machines; Claude Platform on AWS upstream needs v2.1.198+ and the Amazon Bedrock Mantle upstream v2.1.283+ on the gateway server; PostgreSQL 11 or later (11, 12, 13 need v2.1.290+ on the gateway server); OIDC IdP only (SAML and LDAP unsupported); HTTPS (plain `http://` accepted at `/login` only for loopback hosts).
- The gateway server runs only on the native Linux binary (macOS for local development; Windows unsupported as a server platform).
- The gateway's address must resolve only to private addresses (RFC 1918, link-local, CGNAT `100.64.0.0/10`, IPv6 ULA and loopback), or fall inside a block declared in `gatewayInternalNetworks`; otherwise `/login` refuses it. Declared blocks do not make internet exposure safe; set `access_control.allow_cidrs` to the same blocks.
- The CLI pins the gateway's TLS leaf certificate fingerprint per hostname on first connect (`/login` shows the first 16 hex characters); certificate rotation re-prompts every developer.
- Gateway sign-in replaces a Claude for Teams or Enterprise login; gateway sessions do not fetch claude.ai server-managed settings, so deliver policy via the gateway's `managed` block. Leave `forceLoginMethod` and `forceLoginOrgUUID` out of that block.
- No service-token flow: gateway sign-in always runs the browser device flow, so unattended CI pipelines cannot authenticate; a session using `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper` on a machine whose managed settings set the login keys exits at startup.
- Availability: server-side web search (WebSearch), Remote Control, `/design-sync`, `/design-login`, and features needing feature-flag fetching (`/import`) are unavailable on gateway sessions. The 1-hour cache TTL is available only by opt-in in a policy (5 minutes by default). Auto mode follows the third-party-provider rules. 1M context is on by default for Fable models, Sonnet 5 and later, and Opus 4.7 and later (the Fable and Opus default needs v2.1.287+ on the developer machine).
- Not supported: OTLP/gRPC, SAML/LDAP, multiple OIDC issuers per gateway, Windows server, Helm chart. Admin UI covers spend limits only (Claude Desktop 4.23118.0+, members of `admin.admin_groups`); all other configuration is the YAML file.
- Signed-in sessions exit at startup after about 10 seconds if the gateway is unreachable. `/logout` deletes the credential locally; server-side revocation needs the gateway to advertise a `revocation_endpoint` (the built-in server advertises none; use JWT secret rotation).
- Source: https://code.claude.com/docs/en/claude-apps-gateway.md, fetched 2026-11-14

## Related

- [claude-apps-gateway-config.md](./claude-apps-gateway-config.md)
- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
- [claude-apps-gateway-spend-limits.md](./claude-apps-gateway-spend-limits.md)
- [claude-apps-gateway-on-aws.md](./claude-apps-gateway-on-aws.md)
- [claude-apps-gateway-on-gcp.md](./claude-apps-gateway-on-gcp.md)
