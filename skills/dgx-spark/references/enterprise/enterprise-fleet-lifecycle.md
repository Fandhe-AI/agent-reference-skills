# Enterprise Lifecycle Integration

Lifecycle management strategies for NVIDIA DGX Spark fleets: an agentless, SSH-based operational model using bounded JSON output for automation across procurement, provisioning, monitoring, maintenance, incident response, and retirement.

## Signature / Usage

Standard result envelope returned on stdout by every tool:

```json
{
  "tool": "spark_diagctl.py",
  "ts": "2026-01-12T21:17:00Z",
  "host": "DGX_HOST",
  "status": "ok",
  "rc": 0,
  "duration_ms": 842,
  "summary": { "disk": "ok", "network": "ok", "drivers": "ok" },
  "warnings": [],
  "artifacts": []
}
```

## Lifecycle Backbone

1. **Procurement and Receiving** — SKUs, asset identity expectations, sparing/RMA flows.
2. **Initial Provisioning** — device identity/inventory baseline, first-boot automation via Cloud-init.
3. **Ongoing Monitoring** — health checks, drift detection, reset-reason analysis.
4. **Maintenance Windows** — controlled updates/reboots, staged rollouts (rings/waves).
5. **Incident Response** — targeted evidence or full diagnostics bundles, escalation.
6. **End-of-Life** — factory reset, retirement evidence, chain-of-custody disposition.

## Production Tools (11 total)

| Command | Category | Purpose |
| --- | --- | --- |
| device_identity.py | Collector | Stable identifier via SMBIOS/DMI |
| hardware_config.py | Collector | CPU/GPU/SSD/NIC/memory enumeration |
| firmware_reporter.py | Collector | BIOS/UEFI/NIC/SSD/GPU firmware versions |
| os_build_identity.py | Collector | OS build and DGX identity |
| driver_inventory_reporter.py | Collector | GPU/NIC/storage/USB drivers |
| software_inventory_reporter.py | Collector | dpkg/snap/pip/docker enumeration |
| NVAIAread / NVAIAwrite | Collector | UEFI-backed metadata tags |
| spark_updatectl.py | Controller | Controlled software/firmware updates, reboot coordination, rollback reporting |
| spark_diagctl.py | Controller | Health diagnostics (L1) and deep evidence bundles (L2) |
| reset_reason_reporter.py | Collector | Reboot/reset context explanation |

Installed under `DGX_spark_management/bin/`. Outputs at `/var/lib/dgx_spark_management/{functional_area}/{tool_name}/`; logs at `/var/log/dgx_spark/{functional_area}/{tool_name}/`.

## Reference Scripts (8 Landscape scripts)

Reference implementations for Canonical Landscape "remote script execution" (require Landscape enrollment): `landscape_signing_verification`, `landscape_verified_boot_integrity`, `landscape_recovery_backup_levels`, `landscape_factory_reset_reprovision`, `landscape_health_watchdogs`, `landscape_collect_package`, `landscape_retrieve_logs_stdout`, `landscape_encryption_at_rest`.

## Options / Props

| Concept | Values | Description |
| --- | --- | --- |
| Collectors | read-only | Safe to run frequently at high concurrency; bounded output |
| Controllers | state-changing | Require gated execution in approved change windows with staged rollouts |
| Artifacts | pointer-only | Large evidence stored separately; stdout JSON returns pointers, not payloads |

## Evidence Retention

| Evidence Type | Typical Retention |
| --- | --- |
| Routine health snapshots | 30-90 days |
| Incident diagnostics bundles | 90-180 days |
| Security audit evidence | 180-365+ days |
| Retirement proofs | Per enterprise governance policy |

## Common Failure Classes

| Class | Meaning | First Action |
| --- | --- | --- |
| Transport/auth | SSH unreachable or authentication failed | Fix connectivity/credentials in orchestration layer |
| Privilege | Command requires sudo/privileged access | Grant least-privilege sudo; re-run non-interactively |
| Tool execution | Missing dependency, unexpected OS state, tool error | Check stderr/tool logs; compare against supported baseline |
| Endpoint degraded | Tool succeeded but returned warnings/failures | Collect targeted diagnostics; escalate to L2 bundle |

## Platform Wrapper Patterns

- **Ansible**: SSH-native; example task runs a collector via `shell:` and writes `stdout` to a JSON file.
- **Ubuntu Pro / Landscape enrollment**: register Ubuntu One account, create Landscape account, `sudo pro attach <TOKEN>`, `sudo pro enable landscape`, approve machine in portal, verify with `sudo systemctl status landscape-client`.
- **Tanium**: small JSON as package output, large bundles as attachments.
- **Puppet/Chef**: periodic collector execution and scheduled drift detection; not ideal for interactive incident response.

## Notes

- DGX Spark enterprise manageability is designed and validated against the supported baseline OS image (DGX OS); non-baseline OS or mixed fleet baselines increase variance and support complexity.
- NVIDIA provides the DGX OS baseline image, reference tools, and escalation guidance; enterprise IT owns identity/auth/RBAC, orchestration platform, change management, artifact retention, and network segmentation.
- No resident management agent is required on endpoints; existing platforms orchestrate SSH execution and ingest JSON results.
- Treat stdout truncation as a correctness failure — keep output bounded and use artifacts with pointers for large evidence.

## Related

- [Enterprise Manageability](./enterprise-manageability.md)
- [Custom Installation with Cloud-Init](./enterprise-custom-install.md)
