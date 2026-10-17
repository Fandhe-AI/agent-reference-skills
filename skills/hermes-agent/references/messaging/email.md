# Email

Hermes receives and replies to email over IMAP/SMTP (Python `imaplib` / `smtplib`), threading replies with `In-Reply-To` / `References`. Works with Gmail, Outlook, Yahoo, Fastmail or any IMAP/SMTP provider.

## Signature / Usage

```bash
# ~/.hermes/.env
EMAIL_ADDRESS=hermes@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop    # App password (not your regular password)
EMAIL_IMAP_HOST=imap.gmail.com
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_ALLOWED_USERS=your@email.com,colleague@work.com
EMAIL_AUTHSERV_ID=mx.google.com
```

```bash
hermes gateway setup    # select Email
hermes gateway
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `EMAIL_ADDRESS` | required | Agent's email address |
| `EMAIL_PASSWORD` | required | Password or app password |
| `EMAIL_IMAP_HOST` / `EMAIL_SMTP_HOST` | required | Server hosts |
| `EMAIL_IMAP_PORT` | `993` | IMAP port |
| `EMAIL_SMTP_PORT` | `587` | SMTP port |
| `EMAIL_POLL_INTERVAL` | `15` | Seconds between inbox checks |
| `EMAIL_ALLOWED_USERS` | — | Allowed sender addresses (whole-address match) |
| `EMAIL_AUTHSERV_ID` | required unless sender auth is off | Exact authserv-id on the topmost `Authentication-Results` header |
| `EMAIL_HOME_ADDRESS` | — | Default cron delivery target |
| `EMAIL_ALLOW_ALL_USERS` | `false` | Accept any sender |
| `platforms.email.extra.imap_security` / `smtp_security` | `tls` (SMTP: tls on 465, else starttls) | `tls` / `starttls` / `plain` |
| `platforms.email.extra.imap_tls_verify` / `smtp_tls_verify` | true | Disable only for loopback hosts |
| `platforms.email.skip_attachments` | false | Ignore all incoming attachments |
| `platforms.email.unauthorized_dm_behavior` | — | `pair` (send pairing code) or `decline` (one refusal, then silent 24 h) |
| `platforms.email.require_authenticated_sender` / `EMAIL_TRUST_FROM_HEADER` | true | `false` / `true` trusts `From:` as written |
| `platforms.email.authserv_id` | — | Config form of `EMAIL_AUTHSERV_ID` |

## Notes

- Use a dedicated mailbox; the password is stored in `.env` (`chmod 600`). Gmail requires an App Password (2FA on).
- On startup existing inbox messages are marked seen; only new mail is processed. Self-messages and automated senders (`noreply@`, `mailer-daemon@`, `Auto-Submitted`, `Precedence: bulk`, `List-Unsubscribe`) are ignored.
- Hermes acts only when the `Authentication-Results` header stamped by your receiving server authenticates the `From:` domain (DMARC or aligned SPF/DKIM), even with open access. Without the `authserv_id` pin every message needing an authenticated `From:` is dropped.
- Proton Mail Bridge / local relays: use `imap_security: starttls`, `imap_tls_verify: false`, `EMAIL_IMAP_PORT=1143`, `EMAIL_SMTP_PORT=1025`.
- Outgoing files: put `MEDIA:/path/to/file` in the reply. Replies are plain UTF-8 text.
- Distinct from the bundled Himalaya email skill (terminal CLI mailbox management).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/email (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
