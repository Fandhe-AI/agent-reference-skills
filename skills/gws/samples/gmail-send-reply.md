# Gmail Send, Reply, and Triage

Send and reply to Gmail messages, triage the inbox, and watch for new mail using `gws gmail` helpers.

```bash
# Prerequisites: authenticate with gmail scope
gws auth login -s gmail

# Send a new email
gws gmail +send --to alice@example.com --subject "Q1 Report" --body "Please review the attached report."

# Reply to a message (reply-to-sender only)
gws gmail +reply --message-id MESSAGE_ID --body "Thanks, noted."

# Reply to all recipients
gws gmail +reply-all --message-id MESSAGE_ID --body "Thanks everyone, noted."

# Forward a message to another recipient
gws gmail +forward --message-id MESSAGE_ID --to manager@example.com

# Show an interactive unread inbox summary (triage)
gws gmail +triage

# Stream new incoming emails as NDJSON (live watch)
gws gmail +watch

# Preview a send without delivering (dry-run)
gws gmail +send --to alice@example.com --subject "Test" --body "Hello" --dry-run
```

## Notes

- `MESSAGE_ID` is the Gmail message ID — obtain it from `gws gmail users messages list` or the output of `+triage`.
- `+triage` presents an interactive summary of unread messages; `+watch` streams new arrivals as NDJSON until interrupted.
- `--dry-run` prints the HTTP request that would be sent without executing it — useful for verifying recipients before delivery.
- Exit code `2` means auth failed; run `gws auth login -s gmail` to re-authenticate.
