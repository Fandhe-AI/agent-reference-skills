# Troubleshooting (Community Reports)

Setup, clustering, and tooling problems and their community-suggested resolutions, gathered from the NVIDIA Developer Forums DGX Spark / GB10 category. These are user-contributed troubleshooting notes, not official procedures.

## Multi-Node Cluster: NCCL Not Working (3-Node Expansion)

A working 2-node DGX Spark cluster failed NCCL initialization after expanding to 3 nodes, despite OS reinstalls, firmware updates, and manual MTU configuration.

### Symptoms observed

- Inconsistent MTU across nodes (some interfaces showing 1500 instead of the expected 9000)
- SSH connectivity gaps between specific node IP addresses
- "No route to host" errors for certain subnets on each node
- The cluster's automatic NCCL topology setup detected "3 nodes / 2 ports" and recommended a Switch topology instead of Ring

### Suggested steps

- Explicitly configure SSH so hostnames always resolve to the correct IP across all nodes (reported working for a 4-node cluster)
- Verify MTU settings match across all node network interfaces and any intermediate switch
- An NVIDIA staff/moderator pointed to the official documentation "Connect Three DGX Spark in a Ring Topology" on build.nvidia.com for correct 3-node ring configuration

No confirmed resolution was recorded in the thread at last update; for authoritative multi-node topology setup, use the official ring-topology documentation referenced by staff rather than this thread alone.

## Nsight Systems Remote Profiling: "No root access" over SSH

Profiling DGX Spark workloads with the Nsight Systems GUI (host: macOS) over SSH fails with:

```text
No root access: Superuser (sudo) access is required on this target, but is not available.
```

This occurs even when the connecting user account has legitimate local `sudo` privileges (confirmed working with password entry when logged in directly).

### Workaround mentioned (with caveat)

A related forum post suggests SSHing in as `root` avoids the error. The reporting user explicitly did not want to enable remote root login for security reasons, and no alternative solution using a regular sudo-enabled account was documented in the thread.

No NVIDIA staff response was recorded on this thread as of last check.

## DGX OS Upgrade on Partner Devices (e.g. ASUS GX10)

A user on an ASUS GX10 (a DGX Spark partner device) asked whether it was safe to upgrade directly from DGX OS 7.4 to 7.5 using NVIDIA's own update path, or whether to wait for an OEM-provided update.

### Guidance from the community

- One respondent cautioned that applying NVIDIA's update directly (rather than through the OEM) could void OEM support if problems arose
- Another user reported a successful upgrade and shared verification commands:

```bash
apt list -a dgx-release
zgrep -h "status installed dgx-release" /var/log/dpkg.log*
```

These commands show available `dgx-release` package versions and confirm the installed version/date from the dpkg log.

No NVIDIA staff response was recorded on this thread; for partner/OEM hardware (ASUS GX10, MSI EdgeXpert, etc.), check with the OEM's own update channel before applying NVIDIA OS updates directly.

## Notes

- Source: NVIDIA Developer Forums, DGX Spark / GB10 community category (`accelerated-computing/dgx-spark-gb10`). This is unofficial, user-generated content — always prefer the official DGX Spark documentation and NVIDIA support channels when they cover the same topic.
- Where an NVIDIA staff/moderator reply is present, it is explicitly noted; all other guidance here is peer-to-peer community input and unverified by NVIDIA.
- Usernames have been omitted; contributor identity is described only as "user" or "NVIDIA staff/moderator" per role.

## Related

- [known-issues.md](./known-issues.md)
