---
source: https://docs.cloud.google.com/confidential-computing/confidential-space/docs/create-customize-workloads
---

# Create and customize Confidential Space workloads

A workload author builds an application, packages it in a Docker container image stored in Artifact Registry, and sets launch policies on the image that restrict what a workload operator can do. A Confidential VM based on the Confidential Space image pulls and runs the image; data collaborators validate the workload's attestations before it can access their data.

## Signature / Usage

### Open inbound ports (Confidential Space image 230600 or higher)

```dockerfile
FROM alpine:latest
EXPOSE 80
EXPOSE 443/tcp
EXPOSE 81/udp
WORKDIR /test
COPY salary /test
ENTRYPOINT ["/test/salary"]
CMD []
```

### Set a launch policy with a label

In a Dockerfile:

```dockerfile
LABEL "tee.launch_policy.allow_cmd_override"="true"
```

In a Bazel BUILD file:

```text
container_image(
    ...
    labels={"tee.launch_policy.allow_cmd_override":"true"}
    ...
)
```

### Signed container image claim

Adapted (not in the official docs): the source example has trailing commas after `"signature_algorithm"` in the 2nd and 3rd entries, which is invalid JSON; removed them (the 1st entry of the same block shows the correct form).

```json
"image_signatures": [
  {
    "key_id": "hexadecimal-sha256-fingerprint-public-key1",
    "signature": "base64-encoded-signature",
    "signature_algorithm": "RSASSA_PSS_SHA256"
  },
  {
    "key_id": "hexadecimal-sha256-fingerprint-public-key2",
    "signature": "base64-encoded-signature",
    "signature_algorithm": "RSASSA_PSS_SHA256"
  },
  {
    "key_id": "hexadecimal-sha256-fingerprint-public-key3",
    "signature": "base64-encoded-signature",
    "signature_algorithm": "RSASSA_PSS_SHA256"
  }
]
```

## Options / Props

### Launch policies (Dockerfile labels)

| Policy | Type | Description |
|--------|------|-------------|
| `tee.launch_policy.allow_capabilities` | Boolean (default `false`) | Operator may add Linux capabilities (`tee-added-capabilities`). |
| `tee.launch_policy.allow_cgroups` | Boolean (default `false`) | Container may include a namespaced cgroup mount at `/sys/fs/cgroup` (`tee-cgroup-ns`). |
| `tee.launch_policy.allow_cmd_override` | Boolean (default `false`) | Operator may override the Dockerfile `CMD` (`tee-cmd`); data collaborators see `container.cmd_override`. |
| `tee.launch_policy.allow_env_override` | Comma-separated string | Environment variable names the operator may set with `tee-env-ENVIRONMENT_VARIABLE_NAME`. |
| `tee.launch_policy.allow_mount_destinations` | Colon-separated string | Permitted mount directories for `tee-mount`, e.g. `/run/tmp:/var/tmp:/tmp`. |
| `tee.launch_policy.log_redirect` | Defined string | Used when `tee-container-log-redirect` is `true`: `debugonly` (default, only with a debug image), `always`, `never`. |
| `tee.launch_policy.monitoring_memory_allow` | Defined string | Used when `tee-monitoring-memory-enable` is `true`: `debugonly` (default), `always`, `never`. If total memory usage could leak sensitive information, block it on production workloads. |
| `tee.launch_policy.nonroot_container` | Defined string | `unrestricted` (default; operator chooses via `tee-nonroot-container`) or `nonrootonly` (operator must set `tee-nonroot-container=true` or the VM fails to launch the workload). Image `confidential-space-261001` and later; earlier images ignore the policy and run as root. |

### Limits and behaviors

| Topic | Detail |
|-------|--------|
| Capabilities | Container runs with default containerd Linux capabilities; add more via `tee-added-capabilities`. |
| Boot disk | Stateful partition is auto-resized, roughly boot disk size minus 5 GB. |
| Memory | Disk integrity tags use about 1% memory per disk byte (100 GB disk needs 1 GB; 10 TB needs 100 GB). Swap is disabled, so excessive memory use can crash the workload. |
| Graceful shutdown | Launcher sends SIGTERM; workload has up to 120 seconds to clean up. Workloads without SIGTERM handling terminate immediately. |
| In-memory scratch | `tee-dev-shm-size-kb` sizes `/dev/shm` (kB); `tee-mount` creates tmpfs mounts (`type` and `source` always `tmpfs`); default tmpfs size is 50% of VM memory. |
| Inbound ports | All inbound ports are blocked by default. `EXPOSE` with optional `tcp` / `udp` (both if omitted); base-image ports can't be blocked. Changing exposed ports changes the image digest, so owners may need to update their workload identity providers. |
| Non-root | User namespace and network namespace; container UIDs/GIDs `0`-`65535` map to unprivileged IDs starting at `100000`. |
| Multiple runs | Restart the VM to rerun (new ephemeral disk key); coding a restart in the workload lowers overhead but raises risk. |
| Signed images | Cosign signatures let collaborators attest to a key instead of an image digest; operators add repos to `tee-signed-image-repos`; updated signatures can take up to one hour to be detected. |
| External resources | For resources not managed by Google Cloud IAM, the workload must specify a custom audience. |

## Notes

- Source: https://docs.cloud.google.com/confidential-computing/confidential-space/docs/create-customize-workloads (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the `image_signatures` example had trailing commas after `"signature_algorithm": "RSASSA_PSS_SHA256",` in the 2nd and 3rd entries; removed (structure unchanged, 1st entry of the same block used as the reference).
- Open ports expand the attack surface (source caution). Operators must also open the exposed ports in their VPC firewall; VPC firewall rules themselves are in the planned `gcp-networking`.
- Debug practice from the source: use the debug image and minimal attestation validation early, then lock down with attestation validation, launch policies and the production image. Don't print private data to `STDOUT` / `STDERR` and keep final output free of sensitive data.
- Ask data collaborators about organization IDs, project numbers, resources and IDs, attestation service (Google Cloud Attestation or Intel Trust Authority), processing, output format and location. Resources outside Google Cloud require the author to implement attestation tokens.
- The source also shows no Terraform or Console forms. Reproducible images can be built with Bazel.
- Confidential Space on Google Cloud; not Apple Private Cloud Compute (`apple-intelligence`).

## Related

- [deploy-workloads.md](./deploy-workloads.md)
- [confidential-space-overview.md](./confidential-space-overview.md)
