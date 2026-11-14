# Passwords & Logins

The agent signs into sites, pays and fills addresses without ever seeing a password. Secrets are encrypted locally and injected straight into the page.

## Signature / Usage

```bash
hermes vault list
hermes vault add
hermes vault rm <handle>
hermes vault sources
hermes vault sources --disable bitwarden
hermes vault key                          # where the key is now, and whether a keychain is reachable
hermes vault key migrate --to keychain    # move it (installs the small `keychain` feature if needed)
hermes vault key migrate --to file        # move it back
```

```yaml
vault:
  key_storage: file        # default; or: keychain
  onepassword:
    enabled: false          # opt OUT of a detected manager (default: on when installed)
    account: ""             # `op --account` shorthand; empty = default
    service_account_token_env: OP_SERVICE_ACCOUNT_TOKEN
  bitwarden:
    enabled: false
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `vault.key_storage` | string | `file` | Where a **new** vault's key goes: `file` (`~/.hermes/vault/vault.key`) or `keychain` (OS keychain). Set by `hermes vault key migrate` |
| `vault.onepassword.enabled` | boolean | on when installed | Set `false` to opt OUT of a detected 1Password manager |
| `vault.onepassword.account` | string | `""` | `op --account` shorthand; empty = default |
| `vault.onepassword.service_account_token_env` | string | `OP_SERVICE_ACCOUNT_TOKEN` | — |
| `vault.bitwarden.enabled` | boolean | on when installed | Set `false` to opt OUT of a detected Bitwarden manager |

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

- Items live encrypted under `~/.hermes/vault/` (default: `vault.key` + `vault.json.enc`, both `0600`), scoped to the profile. Labels, origins and identifiers are visible metadata.
- Managers receive the master password through their non-interactive channel (`op signin` on stdin, `bw unlock --passwordenv`); only the session token is kept in memory.
- Fills happen over the supervised browser session's direct CDP socket and are refused unless the page origin exactly matches the saved origin (checked again inside the page before the write). A manager item with several websites fills on each of those exact origins only.
- Headless sessions (cron, webhooks, API server, `hermes chat -q`): saved local logins work; a locked manager reports `unavailable_in_this_session`; a missing login reports `prompt_unavailable`. 1Password can use `OP_SERVICE_ACCOUNT_TOKEN`.
- Does not protect against the page itself: once a password is typed into a site, that site has it. Origin binding guards against filling the wrong site, not a compromised right one.
- Desktop management: Settings -> Passwords & Logins (add, remove, unlock/lock managers).
- Desktop preview vs managed browser: `browser_vault` (`fill`, `save_login`, `enter_code`) takes `target: "preview"` (the preview open beside the chat; the default in a Desktop session with the in-app browser available) or `target: "browser"` (managed browser). Each operation is bound to that window and page and refused if the target changes or navigates; requests are live-only (not replayed after reconnect); a failed preview fill never switches browsers; filling does not submit the form. Saved authenticator codes are generated only for a page on the login's saved site.
- Real-profile logins: with `browser.use_real_profile: true` the passwords saved in your Chrome / Brave / Edge appear as a read-only login source (**Browser profile**) in the Browser bar key-button picker; the browser itself decrypts and fills, Hermes reads only site and username, and the value is scrubbed from tool results and logs. No separate switch; it disappears when real-profile browsing is turned off.
- Key storage: the default key file is `~/.hermes/vault/vault.key` (`0600`). `hermes vault key migrate --to keychain` writes the key to the OS keychain (macOS Keychain, Windows Credential Manager, Secret Service / KWallet), verifies it decrypts the vault, then deletes `vault.key` (re-run to finish an interrupted move); `--to file` moves it back. With `keychain` and no reachable keychain, a new vault falls back to `vault.key` with a log warning. Each profile has its own entry named in `~/.hermes/vault/vault.keyref` (no secret); `hermes profile create --clone-all` creates its own entry (refused if the keychain is unreachable), a renamed profile switches to its own entry on first open.
- Keychain mode caveats: backups / synced copies of `~/.hermes` hold the vault without its key (run `hermes vault key migrate --to file` before moving a profile to another machine); the OS may prompt, and cron jobs while logged out cannot read the key (local logins fail with a clear error); a deleted keychain entry means lost items (restore the entry or delete `vault.json.enc` to start over). Opt-in, not default.
- Fill channels: with the Camofox browser plugin (no CDP endpoint) the same origin checks run and the fill goes through its REST evaluate endpoint only when `CAMOFOX_URL` is loopback or HTTPS; in the Desktop in-app Browser the fill goes to that exact tab via the Desktop's authenticated preview request channel. Password-manager session tokens stay in Hermes' memory only (dropped after 30 idle minutes or on Lock) and go only to the single `op` / `bw` command that needs them.
- Plugin boundary: a third-party plugin running inside the Hermes process can do anything Hermes can, including filling a saved login; if you save logins and install unreviewed plugins, use `plugins.isolation: host` (and `plugins.host.launcher` for a sandbox). Another user on the machine is blocked by `0600`; anyone with a backup or sync copy of `~/.hermes` can decrypt in file mode but gets only ciphertext in keychain mode; an administrator / root or malware with your privileges can decrypt in either mode.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/credential-vault (pinned to v0.23.1)

## Related

- [Browser](./browser.md)
- [Computer Use](./computer-use.md)
- [Bot Screen](./bot-screen.md)
