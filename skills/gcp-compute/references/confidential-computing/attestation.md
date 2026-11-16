---
source: https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/attestation
---

# Attestation for Confidential VM

Attestation improves confidence that a Confidential VM instance is legitimate and running in an expected state. Attestation reports are the evidence that the VM runs in a TEE; they are signed by a software-based vTPM or a hardware-based Trusted Security Module (TSM), depending on the technology. GPU-based attestation verifies the GPU driver, the GPU device, or both.

## Signature / Usage

### Intel TDX on Ubuntu (kernel 1016 and newer: `tdx_guest` is in `linux-modules-extra`)

```bash
sudo apt-get install linux-modules-extra-gcp
```

If installing fails, update the kernel:

```bash
sudo apt-get upgrade
```

Reboot, or load the module manually:

```bash
sudo modprobe tdx_guest
```

### NVIDIA GPU device attestation: build `nvattest`

Install build dependencies:

```bash
sudo apt-get update && sudo apt-get install -y \
  git gcc pkg-config libxml2-dev curl
```

Download and install Go:

Adapted (not in the official docs): `$PATH` in the last line is quoted as `"/usr/local/go/bin:${PATH}"`.

```bash
GO_VERSION="1.25.0"
curl -fsSL \
  "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" \
  -o go.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go.tar.gz
rm go.tar.gz
export PATH="/usr/local/go/bin:${PATH}"
```

Clone and compile:

```bash
git clone https://github.com/google/go-nvattest-tools.git
cd go-nvattest-tools
go build -o nvattest ./cmd/nvattest
```

### Local GPU device attestation

```bash
sudo ./nvattest attest --device=gpu
```

Optionally separate evidence collection from verification. Generate a 32-byte hex nonce and collect evidence:

```bash
NONCE=$(openssl rand -hex 32)
sudo ./nvattest collect-evidence \
  --device=gpu \
  --nonce="${NONCE}" \
  --evidence_file=gpu_evidence.json
```

Verify the collected evidence locally:

```bash
./nvattest attest \
  --device=gpu \
  --nonce="${NONCE}" \
  --evidence_file=gpu_evidence.json
```

## Options / Props

| Signing source | Type | Report coverage | SEV | SEV-SNP | Intel TDX |
|---|---|---|---|---|---|
| Google-managed vTPM | Software-based vTPM | Boot loader activity, kernel integrity | Yes | Yes | Yes |
| AMD Secure Processor | Hardware-based TSM | Hardware and firmware environment | No | Yes | No |
| Intel TDX module | Hardware-based TSM | Hardware and firmware environment | No | No | Yes |

- TDX: the initial launch component (firmware) is measured into MRTD (Measurement of the Trust Domain); the rest of the boot chain is measured into Runtime Measurement Registers (RTMR). Users can extend RTMR[3] with user space measurements.
- Tools for requesting reports: Go-TPM; Go-TPM tools (version 0.4.4 or later is required for AMD SEV-SNP and Intel TDX support). The `GceNonHostInfo` event in the vTPM event log shows which technology is in use. For hardware reports only: SEV Guest (`go-sev-guest`, AMD SEV-SNP; VCEK certificates are cached on the VM instead of requested from AMD's KDS) and TDX Guest (`go-tdx-guest`, Intel TDX).
- Google Cloud Attestation works with Confidential VM instances that use AMD SEV, or Intel TDX on C3 machine types; it returns a token with VM information to compare against your own policy.

## Notes

- Adapted from the official docs: `export PATH=/usr/local/go/bin:$PATH` is quoted so a `PATH` entry with spaces is not split.
- Source: https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/attestation (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- The AMD Secure Processor is a shared resource: a host can throttle guest access, and firmware updates (host events) can happen at any time.
- GPU driver attestation: enable Secure Boot when creating the instance so only distribution-signed GPU drivers load; the official driver establishes the SPDM session and is the root of trust for GPU device attestation. Device attestation verifies the VBIOS.
- Known issue: GPU attestation might fail with a mismatched measurement record at index 9; do a full stop and restart of the VM (a guest reboot does not fix it).
- The Go tarball in the source is downloaded over HTTPS without a checksum check, and `sudo rm -rf /usr/local/go` removes an existing Go install; run these on a disposable VM first.
- GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`. Confidential VM on Google Cloud; not Apple Private Cloud Compute (`apple-intelligence`).

## Related

- [confidential-vm-overview.md](./confidential-vm-overview.md)
- [supported-configurations.md](./supported-configurations.md)
- [confidential-space-overview.md](./confidential-space-overview.md)
