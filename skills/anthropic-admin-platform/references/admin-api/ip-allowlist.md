<!-- source: https://platform.claude.com/docs/en/manage-claude/ip-allowlist / last verified: 2026-11-14 -->

# IP allowlisting (beta)

IP allowlisting restricts covered requests for an organization to specific IP ranges, so a leaked API key (Claude Platform) or stolen sign-in (Claude Enterprise) is much harder to use. An organization admin or owner configures the list in settings; it covers the whole organization.

## Signature / Usage

Entries are single addresses or CIDR ranges (IPv4 or IPv6):

```text
203.0.113.5
203.0.113.0/24
2001:db8::/32
```

Rejected API requests return a 403 `permission_error` with the message:

```text
Your IP address isn't in this organization's allowed range.
```

Setup steps (settings UI, no API):

1. Turn on the **IP allowlist** toggle (nothing changes until you save). Claude Platform: the Security page in the Claude Console. Claude Enterprise: claude.ai > Organization settings > Organization and access.
2. Click **Add entry** (Claude Console) or **Add IP range** (claude.ai), enter one or more addresses or ranges separated by commas, press Enter, then **Save** and confirm.
3. Watch for 403 `permission_error` responses (including daily or weekly jobs) and add any missed address.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Entry | IPv4 or IPv6 address, or CIDR | Single address (`203.0.113.5`) or CIDR range no broader than `/8` for IPv4 or `/32` for IPv6 |
| Max entries | 1,000 | Maximum number of entries in the list |
| Allow admins to access this settings page from any IP address | checkbox (Claude Console) | Keeps a way back in; recommended |
| Allow owners to access this settings page from any IP address | checkbox (claude.ai) | Keeps a way back in; recommended |

### Where the allowlist applies (Claude Platform organizations)

| Surface | Covered |
|---------|---------|
| Claude Console | UI access is restricted |
| Claude API endpoints | Messages, Message Batches, Token Counting, Models, Files, Skills (with an API key or a Workload Identity Federation token) |
| Claude Managed Agents endpoints | Agents, Sessions, Environments, Vaults, Memory stores (with an API key or a Workload Identity Federation token) |
| Organization APIs | Admin API and Compliance API, with a key that covers only this organization |

### Apps covered (Claude Enterprise organizations)

| Surface | Covered |
|---------|---------|
| Claude in a browser, desktop apps, mobile apps | Yes |
| Claude Code (users signing in with their Claude account) | Yes; blocked users see a 403 API error with the message above |
| Claude in Chrome, Office add-ins, Cowork, Remote Tools | Yes |
| Connectors and artifacts in these apps | Yes, except artifacts a user shared outside the organization |
| Admin API and Compliance API | Yes, with a key that covers only this organization |

## Notes

- Beta, available under your agreement with Anthropic; settings and behavior can change during the beta.
- An allowlist limits where a key works, not for how long; also set a short key expiration or move to Workload Identity Federation.
- Changes can take up to 15 minutes to apply. In Claude Enterprise, changes can take longer to reach connections that are already open, the Office add-ins, and Remote Tools.
- Blocked people see a page titled "Your current network can't access this organization". Blocked users can still use other organizations or a personal account.
- Entries must be public addresses (the addresses your traffic leaves from), not private ranges such as `10.0.0.0/8`. A shared proxy address could let an attacker with a leaked key or stolen sign-in use it through the proxy.
- Some features connect through `bridge.claudeusercontent.com` (Claude in Chrome, Cowork, Remote Tools, work across apps in Office add-ins). If your proxy sends that host out through a different address from `claude.ai` and `api.anthropic.com`, list that address too.
- Lockout: the settings page checks only your current address on save, not servers, teammates, or tomorrow's address. List every network first (data centers, CI, offices, VPNs, proxies, workers of self-hosted sandboxes, with public IPv4 and IPv6). In Claude Enterprise, admins cannot change the list; owners and primary owners can.
- If locked out: reconnect from a listed network and click **Try again**; ask another admin or owner on a listed network; if the way-back checkbox is selected, click **Open IP allowlist**, then **Add it** or turn off the allowlist, **Save** and confirm (up to 15 minutes); otherwise ask Anthropic support to turn off the allowlist.
- Selecting the way-back checkbox means an attacker who compromises an admin's or owner's session could update the allowlist remotely. The Compliance API Activity Feed records allowlist changes if you set up the Compliance API.
- Limitations (Claude Platform): covers requests to Claude Managed Agents endpoints, not the agents themselves, and not networking in the Managed Agents runtime; does not apply to Claude in Amazon Bedrock, Claude Platform on AWS, Claude Models on Google Cloud, or Claude in Microsoft Foundry.
- Limitations (Claude Enterprise): Claude Design, Claude in Slack, and Claude Academy are not covered. A task Claude is working on when a user is blocked can continue for up to 24 hours; the user cannot open or control that chat from outside the list.
- Source: https://platform.claude.com/docs/en/manage-claude/ip-allowlist (retrieved 2026-11-14)

## Related

- [admin-api-keys.md](./admin-api-keys.md)
- [admin-api.md](./admin-api.md)
