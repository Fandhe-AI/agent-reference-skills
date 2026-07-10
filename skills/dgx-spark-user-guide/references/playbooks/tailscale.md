# Set up Tailscale on Your Spark

Establish an encrypted peer-to-peer mesh network (Tailscale) to remotely SSH into a DGX Spark device without manual firewall configuration.

## Signature / Usage

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

## Notes

- Requires internet connectivity on both devices and an auth account (Google/GitHub/Microsoft)
- Also configures SSH key authentication after Tailscale connects
- Duration: 15-30 minutes; Risk: Medium (potential SSH configuration conflicts); rollback via package removal

## Related

- [Set Up Local Network Access](./connect-to-your-spark.md)
- [Register DGX Spark to Brev](./register-to-brev.md)
