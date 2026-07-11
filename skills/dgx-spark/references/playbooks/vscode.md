# VS Code

Install VS Code directly on DGX Spark (ARM64) for local development, or use NVIDIA Sync to launch a local VS Code connected remotely over SSH.

## Signature / Usage

```bash
sudo apt install ./code_arm64.deb
# or via NVIDIA Sync: launch VS Code from the Sync dashboard
```

## Notes

- Direct install requires admin privileges, internet access, ARM64 GUI support
- NVIDIA Sync approach requires VS Code pre-installed on the client laptop

## Related

- [Set Up Local Network Access](./connect-to-your-spark.md)
- [Vibe Coding in VS Code](./vibe-coding.md)
