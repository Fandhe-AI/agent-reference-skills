# Official Domains & Phishing Safety

How to verify that a site, installer, image or account is a genuine Hermes Agent / Nous Research resource, and how to handle impersonation attempts.

## Signature / Usage

Install from the official host only. Adapted (not in the official docs): the official one-liner pipes the script straight into the shell; split here into download, inspect, run.

```bash
# Linux / macOS / WSL2
curl -fsSLo install.sh https://hermes-agent.nousresearch.com/install.sh
less install.sh
bash install.sh
```

Adapted (not in the official docs): the official Windows one-liner evaluates the downloaded script directly; split here into download, inspect, run.

```powershell
# Windows (native)
Invoke-WebRequest https://hermes-agent.nousresearch.com/install.ps1 -OutFile install.ps1
Get-Content install.ps1
.\install.ps1
```

## Options / Props

Official sources under `nousresearch.com`:

| Address | What it is |
|---|---|
| `hermes-agent.nousresearch.com` | Documentation, Desktop downloads, and the `install.sh` / `install.ps1` installers |
| `hermes-assets.nousresearch.com` | Release artifacts: Desktop packages and updates, the Termux APT repository, installer mirrors |
| `portal.nousresearch.com` | Nous Portal: account sign-in, subscriptions, billing |
| `inference-api.nousresearch.com` | Nous inference API used by the Nous provider (no web page) |
| `nousresearch.com` | Nous Research website |

Outside `nousresearch.com`:

| Source | Official identifier |
|---|---|
| GitHub | `NousResearch` organization and its `hermes-agent` repository (source, releases, Nix flake); `raw.githubusercontent.com/NousResearch/hermes-agent/...` is the same repository |
| Docker Hub | `nousresearch/hermes-agent` (only the `nousresearch` namespace is official) |
| X (Twitter) | `@NousResearch` |
| Discord | `discord.gg/NousResearch` |

## Notes

- Other supported install routes stay on official sources: Desktop packages from the Hermes website, Termux via the signed APT repository on `hermes-assets.nousresearch.com`, Nix from the GitHub repository, Docker from `nousresearch/hermes-agent`. Some guides fetch `install.ps1` from `raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1`; it is the same script.
- Anything hosted elsewhere (installer, download, image, "portal") is untrusted. Read the whole host name: `hermes-agent.nousresearch.com.example.net` is not a Nous Research subdomain.
- Not official: any domain that is not `nousresearch.com` or a subdomain (even with "hermes" in the name), cryptocurrency tokens (there is no Hermes Agent or Nous Research token), GitHub accounts that mass-mention users with URL-shortener links, and unsolicited emails offering credits or partnerships.
- If a suspicious message arrives: do not click shortened or off-domain links, do not enter credentials or connect wallets, report the account to the platform, and check the host name against the rule above. Impersonation is external abuse handled by platform reports, not code changes.
- Hermes Agent is MIT-licensed and free to self-host; nobody legitimate asks payment for the open-source agent itself.
- Adapted from the official docs: the official `install.sh` / `install.ps1` one-liners run the downloaded script directly; the snippets above split them into download, inspect, run.
- Source: https://hermes-agent.nousresearch.com/docs/getting-started/official-domains (pinned to v0.23.1)

## Related

- [Installation](./installation.md)
- [Termux](./termux.md)
- [Nix Setup](./nix-setup.md)
