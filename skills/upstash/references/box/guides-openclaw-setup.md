# Guide: OpenClaw Setup

Set up [OpenClaw](https://docs.openclaw.ai) inside an Upstash Box.

## Signature / Usage

```bash
# 1. Create a keep-alive box, then connect via SSH forwarding the dashboard port
ssh -o ServerAliveInterval=15 -o ServerAliveCountMax=3 -L 18789:127.0.0.1:18789 <box-id>@us-east-1.box.upstash.com

# 2. Install OpenClaw CLI
sudo npm install -g openclaw

# 3. Run onboarding
openclaw onboard --install-daemon

# 4. Start the gateway
openclaw config set gateway.bind lan
nohup openclaw gateway > gateway.log 2>&1 &

# 5. Open http://127.0.0.1:18789/#token=<your-token> locally (via the SSH tunnel)
```

## Notes

- Use the Box API key as the SSH password; the `-L` flag forwards the OpenClaw dashboard port to the local machine
- Set `nohup openclaw gateway > gateway.log 2>&1 &` as the box's init script (Upstash Console) so the gateway restarts automatically on crash
- If SSH freezes during onboarding, retry with `ssh -F /dev/null -o ControlMaster=no -o ServerAliveInterval=15 -o ServerAliveCountMax=3 -L 18789:127.0.0.1:18789 ...` to bypass a stale local `~/.ssh/config` `ControlMaster` socket or NAT/firewall dropping idle connections

## Related

- [Quickstart](./quickstart.md)
- [Guides: Hermes Setup](./guides-hermes-setup.md)
