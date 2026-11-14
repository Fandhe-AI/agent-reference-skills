# Set up Tailscale on Your Spark

Establish an encrypted peer-to-peer mesh network (Tailscale) to remotely SSH into a DGX Spark device without manual firewall configuration.

## Signature / Usage

```bash
sudo apt update
sudo apt install -y curl gnupg
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/noble.noarmor.gpg | \
  sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg > /dev/null
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/noble.tailscale-keyring.list | \
  sudo tee /etc/apt/sources.list.d/tailscale.list
sudo apt update
sudo apt install -y tailscale
sudo tailscale up
```

## Notes

- Requires internet connectivity on both devices and an auth account (Google/GitHub/Microsoft)
- Also configures SSH key authentication after Tailscale connects
- Duration: 15-30 minutes; Risk: Medium (potential SSH configuration conflicts); rollback via package removal
- Memory: 128 GB Unified Memory (DGX Spark, DGX OS); install uses the official Tailscale apt repository for Ubuntu noble
- Replaced the earlier `curl ... | sh` install one-liner with the official apt repository steps from the playbook (no pipe-to-shell)
- Last Updated 07/31/2026
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-tailscale/README.md (commit 3088315, 2026-10-23)

## Related

- [Set Up Local Network Access](./connect-to-your-spark.md)
- [Register DGX Spark to Brev](./register-to-brev.md)
