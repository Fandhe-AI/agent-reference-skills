# Guide: Hermes Setup

Host the Hermes agent (Nous Research) in a keep-alive Upstash Box and use it from Hermes Desktop on your machine over SSH. The agent runs in the box; you chat with it from the desktop app.

## Signature / Usage

Connect to the box with an SSH key (add the key under Box, Settings, SSH Keys in the Upstash Console first):

```bash
ssh -i ~/.ssh/upstash_box <box-id>@us-east-1.box.upstash.com
```

Adapted (not in the official docs): the official page pipes the installer straight into `bash`; download it, inspect it, then run it.

```bash
curl -fsSL -o install.sh https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh
less install.sh
bash install.sh
```

Optional `~/.ssh/config` entry so Hermes Desktop's Saved connections can use the box:

```text
Host hermes-box
  HostName us-east-1.box.upstash.com
  User <box-id>
  IdentityFile ~/.ssh/upstash_box
  IdentitiesOnly yes
```

## Options / Props

Hermes Desktop, Settings, Gateways, This window, Connect via SSH:

| Field | Value |
|-------|-------|
| Host | `us-east-1.box.upstash.com` |
| User | your box ID |
| Identity file | `~/.ssh/upstash_box` |
| Port / Hermes path | leave blank, then Save and reconnect |

## Notes

- Source: https://upstash.com/docs/box/guides/hermes-setup (fetched 2026-11-14; no version pin on the site).
- Create the box with the Fixed (keep-alive) plan and the Small size (the earlier version of the guide recommended Medium)
- Set up an SSH key per the Shell page; the same key is used from Hermes Desktop. The command can also be copied from the SSH tab under Connect on the box page in the Console
- Hermes Desktop connects over SSH and starts Hermes in the box for you; Saved connections has no identity file field, hence the `~/.ssh/config` entry, then use `hermes-box` as the host
- Adapted from the official docs: the installer is downloaded and inspected before running instead of `curl ... | bash`
- Distinct from Hermes Plugin Setup, which runs Hermes through the Upstash Box plugin

## Related

- [Quickstart](./quickstart.md)
- [Shell](./shell.md)
- [Guides: Hermes Plugin Setup](./guides-hermes-plugin-setup.md)
- [Guides: OpenClaw Setup](./guides-openclaw-setup.md)
