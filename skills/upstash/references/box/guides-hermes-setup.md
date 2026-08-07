# Guide: Hermes Setup

Set up [Hermes](https://github.com/NousResearch/hermes-agent) inside an Upstash Box.

## Signature / Usage

```bash
# 1. Create a keep-alive Medium box (see Quickstart), then connect via SSH
ssh <box-id>@us-east-1.box.upstash.com
# password: your Box API key

# 2. Install Hermes
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# 3. Set as init script (via Upstash Console) for auto-restart on crash
hermes gateway start > gateway.log 2>&1 &
```

## Notes

- Hermes is resource-intensive; a Medium-sized box is recommended for a smooth installation
- Set the gateway start command as the box's init script in the Upstash Console so it restarts automatically if the box crashes

## Related

- [Quickstart](./quickstart.md)
- [Guides: OpenClaw Setup](./guides-openclaw-setup.md)
