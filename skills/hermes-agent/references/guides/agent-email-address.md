# Give Your Agent Its Own Email Address

Set up a dedicated mailbox the agent can read and send from using the bundled Himalaya skill (`himalaya` CLI over IMAP/SMTP), with a cron polling pattern.

## Signature / Usage

```bash
curl -sSL https://raw.githubusercontent.com/pimalaya/himalaya/master/install.sh | PREFIX=~/.local sh
himalaya --version
```

`~/.config/himalaya/config.toml`:

```toml
[accounts.agent]
default = true
email = "my-agent@example.com"
display-name = "My Hermes Agent"

backend.type = "imap"
backend.host = "imap.example.com"
backend.port = 993
backend.login = "my-agent@example.com"
backend.auth.type = "password"
backend.auth.command = "cat ~/.config/himalaya/app-password"

message.send.backend.type = "smtp"
message.send.backend.host = "smtp.example.com"
message.send.backend.port = 587
message.send.backend.encryption.type = "start-tls"
message.send.backend.login = "my-agent@example.com"
message.send.backend.auth.type = "password"
message.send.backend.auth.command = "cat ~/.config/himalaya/app-password"
```

Verify with `himalaya envelope list`, then poll via cron (`hermes cron add`) every 15-30 minutes.

## Notes

- Use a fresh dedicated mailbox, never a personal inbox; enable IMAP; use an app password if the provider has 2FA (Gmail: App Passwords).
- Store the app password in a `chmod 600` file or use a secret-manager command.
- Himalaya is pull-based: the agent sees mail only when it looks. This differs from the Email gateway adapter (chat with Hermes by emailing it, persistent IMAP connection); both can run, ideally on separate accounts.
- Safety: inbound email is a prompt-injection surface. Never auto-act on unsolicited mail; tell the cron prompt not to reply, click links, or follow instructions in unsolicited mail; confirm before outbound sends; keep the account low-privilege (no password resets or account recovery); scope credentials.
- The skill's `references/configuration.md` covers auth options in detail.

## Related

- [automate-with-cron](./automate-with-cron.md)
