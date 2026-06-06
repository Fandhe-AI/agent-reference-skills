# Gmail Helpers

Hand-crafted Gmail helper commands for sending, replying, forwarding, triaging, and monitoring email. All are prefixed with `+`.

## +send

Send an email.

### Usage

```bash
gws gmail +send --to alice@example.com --subject "Hello" --body "Hi there"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--to` | Yes | Recipient email address(es), comma-separated |
| `--subject` | Yes | Email subject |
| `--body` | Yes | Email body (plain text, or HTML with `--html`) |
| `--from` | No | Sender address for send-as/alias; omit to use account default |
| `-a, --attach` | No | Attach a file (repeatable) |
| `--cc` | No | CC email address(es), comma-separated |
| `--bcc` | No | BCC email address(es), comma-separated |
| `--html` | No | Treat `--body` as HTML content |
| `--draft` | No | Save as draft instead of sending |
| `--dry-run` | No | Show the request without executing it |

---

## +reply

Reply to a message with automatic thread handling.

### Usage

```bash
gws gmail +reply --message-id MESSAGE_ID --body "Thanks!"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--message-id` | Yes | Gmail message ID to reply to |
| `--body` | Yes | Reply body (plain text, or HTML with `--html`) |
| `--from` | No | Sender address for send-as/alias |
| `--to` | No | Additional To address(es), comma-separated |
| `-a, --attach` | No | Attach a file (repeatable) |
| `--cc` | No | CC email address(es), comma-separated |
| `--bcc` | No | BCC email address(es), comma-separated |
| `--html` | No | Treat `--body` as HTML content |
| `--draft` | No | Save as draft instead of sending |
| `--dry-run` | No | Show the request without executing it |

---

## +reply-all

Reply to all recipients of a message with automatic thread handling.

### Usage

```bash
gws gmail +reply-all --message-id MESSAGE_ID --body "Noted, thanks!"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--message-id` | Yes | Gmail message ID to reply to |
| `--body` | Yes | Reply body (plain text, or HTML with `--html`) |
| `--from` | No | Sender address for send-as/alias |
| `--to` | No | Additional To address(es), comma-separated |
| `--remove` | No | Exclude recipients from the outgoing reply (comma-separated) |
| `-a, --attach` | No | Attach a file (repeatable) |
| `--cc` | No | CC email address(es), comma-separated |
| `--bcc` | No | BCC email address(es), comma-separated |
| `--html` | No | Treat `--body` as HTML content |
| `--draft` | No | Save as draft instead of sending |
| `--dry-run` | No | Show the request without executing it |

---

## +forward

Forward a message to new recipients.

### Usage

```bash
gws gmail +forward --message-id MESSAGE_ID --to bob@example.com
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--message-id` | Yes | Gmail message ID to forward |
| `--to` | Yes | Recipient email address(es), comma-separated |
| `--from` | No | Sender address for send-as/alias |
| `--body` | No | Optional note to include above the forwarded message |
| `-a, --attach` | No | Attach a file (repeatable) |
| `--cc` | No | CC email address(es), comma-separated |
| `--bcc` | No | BCC email address(es), comma-separated |
| `--html` | No | Treat `--body` as HTML content |
| `--no-original-attachments` | No | Do not include file attachments from the original message |
| `--draft` | No | Save as draft instead of sending |
| `--dry-run` | No | Show the request without executing it |

---

## +triage

Show unread inbox summary (sender, subject, date). Fetches from multiple endpoints concurrently.

### Usage

```bash
gws gmail +triage
gws gmail +triage --max 50 --query "is:unread label:INBOX"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--max` | No | Maximum messages to show (default: 20) |
| `--query` | No | Gmail search query (default: `is:unread`) |
| `--labels` | No | Include label names in output |

---

## +watch

Watch for new emails and stream them as NDJSON. Sets up a Pub/Sub subscription internally.

### Usage

```bash
gws gmail +watch --project MY_PROJECT_ID
gws gmail +watch --subscription projects/MY_PROJECT/subscriptions/MY_SUB
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--project` | No | GCP project ID for Pub/Sub resources |
| `--subscription` | No | Existing Pub/Sub subscription name (skips setup) |
| `--topic` | No | Existing Pub/Sub topic with Gmail push permission already granted |
| `--label-ids` | No | Comma-separated Gmail label IDs to filter (e.g., `INBOX,UNREAD`) |
| `--max-messages` | No | Max messages per pull batch (default: 10) |
| `--poll-interval` | No | Seconds between pulls (default: 5) |
| `--msg-format` | No | Gmail message format: `full`, `metadata`, `minimal`, `raw` (default: `full`) |
| `--output-dir` | No | Write each message to a separate JSON file in this directory |
| `--once` | No | Pull once and exit |
| `--cleanup` | No | Delete created Pub/Sub resources on exit |

## Notes

- Threading in `+reply` and `+reply-all` is handled automatically — no need to supply thread IDs.
- `+triage` fetches from multiple endpoints concurrently, making it a multi-API composition helper.
- `+watch` is a long-running process by default; use `--once` for single-pull mode.

## Related

- [helpers-overview.md](./helpers-overview.md)
- [workflow-helpers.md](./workflow-helpers.md)
