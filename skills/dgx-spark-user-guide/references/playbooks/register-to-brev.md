# Register DGX Spark to Brev

Register a DGX Spark device to NVIDIA Brev, making it visible and remotely accessible as a managed GPU environment via Brev's Launchables.

## Signature / Usage

```bash
brev login
brev register  # follow CLI flow, enable SSH
```

## Notes

- Requires an active NVIDIA Brev account and sudo access on the DGX Spark
- Verify status shows "Connected" in the Brev UI after registration
- `brev deregister` reverses the registration

## Related

- [Set Up Local Network Access](./connect-to-your-spark.md)
- [Tailscale](./tailscale.md)
