# Notifications

Proxmox VE routes system alerts to configurable notification targets using matchers. Targets and matchers are managed in the web UI under Datacenter → Notifications.

## Signature / Usage

```ini
# Example notification target (sendmail)
[sendmail: admin-mail]
    mailto-user root@pam
    from-address pve@example.com

# Example matcher
[matcher: errors-only]
    target admin-mail
    match-severity error
    match-field type=vzdump
```

## Options / Props

### Notification target types

| Type | Description |
|------|-------------|
| `sendmail` | Deliver via system `sendmail` binary (Postfix); queues on failure |
| `smtp` | Send directly to a mail relay; no retry on failed delivery |
| `gotify` | Push notifications via self-hosted Gotify server |
| `webhook` | HTTP POST/PUT/GET to any URL; supports Handlebars templating |

### Sendmail / SMTP options

| Option | Description |
|--------|-------------|
| `mailto` | Direct recipient email addresses |
| `mailto-user` | Proxmox user accounts to notify (uses their email) |
| `from-address` | Sender address |
| `server` | SMTP server hostname (smtp only) |
| `port` | SMTP port (smtp only) |
| `username` / `password` | SMTP auth credentials (smtp only) |

### Gotify options

| Option | Description |
|--------|-------------|
| `server` | Gotify base URL |
| `token` | Application token from Gotify UI |

### Webhook options

| Option | Description |
|--------|-------------|
| `url` | Target URL (supports Handlebars: `{{title}}`, `{{message}}`) |
| `method` | HTTP method: `post`, `put`, `get` |
| `header` | Additional HTTP headers |
| `body` | Request body template |

### Matcher filter options

| Option | Description |
|--------|-------------|
| `target` | Notification target name |
| `match-severity` | Alert severity: `info`, `notice`, `warning`, `error`, `unknown` |
| `match-field` | Metadata field match: `type=vzdump`, `hostname=pve1`, etc. (exact or regex) |
| `match-calendar` | Time-based schedule: e.g. `mon-fri 9-17` |
| `mode` | `all` (all matchers run) or `first-match` (stop at first match) |

### Built-in notification event types

| Event | Description |
|-------|-------------|
| `vzdump` | Backup job success or failure |
| `replication` | Storage replication failure |
| `fencing` | Node fencing event |
| `package-updates` | Pending package updates |
| `system-mail` | Generic system mail forwarding |

## Notes

- A matcher with no filter rules always triggers for every event
- Multiple matchers targeting the same notification target will not send duplicate messages
- SMTP target has no retry mechanism; use `sendmail`/Postfix for reliable delivery
- Webhook bodies support Handlebars helpers: URL encoding, JSON escaping, and metadata field injection
- Common webhook integrations: Discord, Slack, ntfy.sh

## Related

- [user-access.md](./user-access.md)
- [backup-restore.md](./backup-restore.md)
