# Passwords & Logins

The agent signs into sites, pays and fills addresses without ever seeing a password. Secrets are encrypted locally and injected straight into the page.

## Signature / Usage

```bash
hermes vault list
hermes vault add
hermes vault rm <handle>
hermes vault sources
hermes vault sources --disable bitwarden
```

## Options / Props

```yaml
vault:
  onepassword:
    enabled: false          # opt OUT of a detected manager (default: on when installed)
    account: ""             # `op --account` shorthand; empty = default
    service_account_token_env: OP_SERVICE_ACCOUNT_TOKEN
  bitwarden:
    enabled: false
```

## Behavior

| Situation | Handling |
|---|---|
| No saved login | Masked prompt in the CLI/TUI, or a "Save your <site> login?" card on Desktop (*Save & sign in* / *Don't save*) |
| Authenticator key saved with the login (setup key or `otpauth://`) | Hermes generates the TOTP code automatically (item shows a *2FA auto* badge) |
| Code sent to phone or email | Prompt for the code; it never enters the conversation |
| Passkeys, hardware keys, app approvals | Agent asks you to complete it on your device |
| 1Password (`op`) / Bitwarden (`bw`) installed and signed in | Auto-detected; unlock with master password once per session (30 minutes idle) |
| Card fills | Every fill asks for approval; headless sessions are refused |
| Address fills | No confirmation |

The tool result the agent sees is `{filled_fields: 1, origin: "https://github.com"}`.

## Notes

- Items live encrypted under `~/.hermes/vault/` (Fernet key + vault file, both `0600`), scoped to the profile. Labels, origins and identifiers are visible metadata.
- Managers receive the master password through their non-interactive channel (`op signin` on stdin, `bw unlock --passwordenv`); only the session token is kept in memory.
- Fills happen over the supervised browser session's direct CDP socket and are refused unless the page origin exactly matches the saved origin (checked again inside the page before the write). A manager item with several websites fills on each of those exact origins only.
- Headless sessions (cron, webhooks, API server, `hermes chat -q`): saved local logins work; a locked manager reports `unavailable_in_this_session`; a missing login reports `prompt_unavailable`. 1Password can use `OP_SERVICE_ACCOUNT_TOKEN`.
- Does not protect against the page itself: once a password is typed into a site, that site has it. Origin binding guards against filling the wrong site, not a compromised right one.
- Desktop management: Settings -> Passwords & Logins (add, remove, unlock/lock managers).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/credential-vault (pinned to v0.22.2)

## Related

- [Browser](./browser.md)
- [Computer Use](./computer-use.md)
- [Bot Screen](./bot-screen.md)
