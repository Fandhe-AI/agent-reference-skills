# Known Issues (Community Reports)

Recurring hardware/software issues reported by DGX Spark / GB10 owners on the NVIDIA Developer Forums (accelerated-computing/dgx-spark-gb10 category). These are community-sourced, not confirmed defects unless explicitly attributed to NVIDIA staff below.

## GPU Clock Drop / Slowdown

GPU clock drops and the GPU becomes very slow after extended use. Reported on an ASUS GX10 (DGX Spark partner device).

### Workaround

1. Power off the machine
2. Disconnect the power brick from both the device and the AC outlet
3. Wait ~5 minutes (earlier community reports suggested up to 30 minutes was required)
4. Reconnect and power on
5. Verify GPU clock has recovered

No NVIDIA staff response recorded on this thread; workaround is community-sourced only.

## First-Boot Onboarding: Missing WiFi SSID / Ineffective QR Code

On some units, the advertised local WiFi network (`spark-xxxx`) used for headless first-boot setup never appears, blocking wireless onboarding. Separately, the QR code on the packaging resolves to the general product page rather than setup instructions.

### Workaround

If the Spark's setup SSID does not appear, skip the wireless onboarding path and connect a display and keyboard directly — this reliably triggers the first-boot wizard for user creation and network configuration.

Reported by a single user; another community member reported successfully onboarding four units via the WiFi SSID path with no issues, suggesting the problem is not universal. No NVIDIA staff response recorded.

## MT7925e WiFi: "Failed to set PTK to the driver" / Cannot Connect

The MediaTek MT7925 WiFi adapter (used in some DGX Spark partner devices, e.g. MSI EdgeXpert MS-C931) completes the WPA2 handshake but fails to install the pairwise key (PTK) into hardware, resulting in disconnection. The displayed error "pre-shared key may be incorrect" is misleading — the actual kernel-level failure is "key addition failed" (ENOENT).

- Kernel: `6.17.0-1026-nvidia` (issue also seen on other kernel builds)
- Driver: `mt7925e`
- Cipher: WPA2-PSK AES/CCMP
- Affects both 2.4GHz and 5GHz, multiple access points; Ethernet is unaffected

### Attempted fixes (unresolved)

- Password variations (plaintext, lowercase, pre-hashed PSK)
- Disabling PMF and powersave
- Direct `wpa_supplicant` testing, bypassing NetworkManager
- Kernel/firmware updates via `apt dist-upgrade` and `fwupdmgr`

A related report describes a partial workaround for a similar 5GHz instability: forcing the 2.4GHz BSSID/channel and setting `mt7925_common.disable_clc=1`.

### NVIDIA staff response

An NVIDIA engineer (identified as staff in the thread) confirmed they could not reproduce the issue on their own MSI units and recommended upgrading to kernel `6.17.0-1026-nvidia`. The issue persisted for the reporting user after the upgrade; unresolved as of the last update.

## NVIDIA Sync Overwrites `~/.ssh/config` on Update (macOS)

Updating NVIDIA Sync to version `0.97.6` on macOS overwrote the user's existing `~/.ssh/config` file, replacing its contents with a single `Include` directive pointing to NVIDIA Sync's own generated config. This occurred during an update from an older version, not a fresh install.

### NVIDIA staff response

An NVIDIA moderator confirmed the report was reproduced and stated a fix would ship in the next NVIDIA Sync update. No interim workaround or remediation steps were provided in the thread.

## Random Power-Off After Extended Uptime

Units powered off unexpectedly after around 55 days of continuous operation, with no OOM or thermal log entries explaining the shutdown.

### Suspected causes (community speculation, unconfirmed)

- Thermal paste degradation over months of continuous use, causing uneven core temperatures (one user found compound "dry as a rock" with CPU hitting 95°C despite lower logged readings)
- Power delivery issues (one user saw PDU faults limiting draw to ~35W before shutdown)
- Ambient temperature and unit stacking/spacing

### Suggested mitigations

- Add a UPS for grid power protection
- Use an external watchdog (e.g. Raspberry Pi + GPIO relay) to detect unresponsiveness and force a hard power cycle
- Re-apply thermal paste and improve airflow/cooling
- Power-cycle the PDU (unplug ~30 seconds) as a recovery step

No NVIDIA staff response recorded; discussion is entirely peer-to-peer.

## Field-Tested Deployment Issues (GB10, aarch64 + sm_121)

First-party observations from bringing up LLM / multimodal inference on GB10 (DGX OS, Ubuntu 24.04, aarch64, compute capability sm_121, unified memory ~121 GiB) with `sudo` unavailable. Unlike the sections above, these are not forum reports — they are reproduced on real hardware. Software versions are noted so they can be re-checked as the stack matures.

### `nvidia-smi` reports `memory.total` as `[N/A]` (unified memory)

Because GB10 shares one unified memory pool between CPU and GPU, there is no dedicated VRAM figure and `nvidia-smi --query-gpu=memory.total` returns `[N/A]`. Scripts that gate on total/used VRAM (including some serving-framework health checks) misbehave.

#### Workaround

Observe GPU usage via `nvidia-smi --query-gpu=utilization.gpu,power.draw --format=csv` and `nvidia-smi --query-compute-apps=pid,used_memory --format=csv`. Size models against the shared budget (OS + other processes reduce the usable portion below the nominal capacity), not a dedicated-VRAM assumption.

### pip-installed vLLM/SGLang venv fails at JIT: missing `Python.h`, `ninja`, MoE fp4

Installing vLLM (and SGLang, mistral.rs) into a plain venv and serving on sm_121 hits three blockers in sequence:

1. **`python3-dev` (`Python.h`) is not present on DGX OS**, so Triton's JIT compilation fails at server start.
2. **`ninja` is not on `PATH`**, breaking JIT builds.
3. **The default MoE backend (FlashInfer CUTLASS) cannot compile fp4 templates for sm_121**, so Mixture-of-Experts models fail to load.

#### Workaround (no sudo required)

- Headers without sudo: `apt-get download python3.12-dev libpython3.12-dev`, `dpkg -x` into a user-writable prefix, then export `CPATH` to the extracted `include` path. Alternatively use a self-contained Python distribution that ships headers (e.g. miniforge).
- Add the venv's `bin/` to `PATH` so `ninja` resolves.
- For MoE models (e.g. Qwen3-Coder-30B-A3B), pass `--moe-backend triton`.
- Simpler overall: use the official/NGC container images, which bundle the toolchain and avoid all three issues.

### Multi-node vLLM (Ray) hangs after minutes on the pip stack — use the NGC image

A pip stack (vLLM 0.24.0 + pip Ray 2.56.0 + bundled NCCL 2.28.9) starts and completes NCCL bootstrap, but tensor-parallel serving **hangs 5–6 minutes into sustained decode**: repeated `shm_broadcast` "No available shared memory broadcast block found in 60 seconds", then a `sample_tokens` RPC timeout, then `EngineCore encountered a fatal error`. It reproduces independent of interconnect (QSFP or management NIC) and of concurrency. After the crash a zombie EngineCore can hold the GPU, making the next launch fail with `NCCL error: unhandled cuda error` until it is killed.

#### Workaround

Use the official NGC vLLM container image (e.g. `nvcr.io/nvidia/vllm:26.05.post1-py3`, anonymous pull, no NGC API key required). A 2-node tensor-parallel run on the NGC image sustained 18 minutes / ~1900 requests with zero errors where the pip stack hung. Note: **the NGC vLLM image does not bundle Ray** — install it at container start (`pip install ray==2.56.0`), which requires network egress.

### faster-whisper (CTranslate2) has no CUDA on aarch64

The PyPI aarch64 wheel of CTranslate2 is CPU-only. Requesting GPU STT with faster-whisper raises `ValueError: This CTranslate2 package was not compiled with CUDA support`; only `device="cpu"` works.

#### Workaround

Use a PyTorch-based STT (e.g. openai-whisper), which runs on the GPU on aarch64/sm_121, or build CTranslate2 from source with CUDA. For image/TTS, ComfyUI (+ Stable Diffusion) and Kokoro TTS run on GPU via the CUDA-13 aarch64 PyTorch wheels (`download.pytorch.org/whl/cu130`).

### Three-node direct "triangle" mesh: NCCL/Gloo cannot bootstrap over QSFP

When three Sparks are cabled directly (each pair on its own point-to-point QSFP link), every link is a separate `/30` subnet and **there is no single IP reachable by all three ranks**. Ray/NCCL/Gloo advertise one node's QSFP IP as the rendezvous, and the non-adjacent peer cannot route to it (`SO_ERROR: Connection timed out`). Trying the RoCE data plane instead fails for two further reasons: NCCL assumes every RoCE HCA can reach every peer (true on a switch, false for direct cabling — each HCA only reaches its one cabled neighbor), and the bundled NCCL's libmlx5 is older than the driver (`undefined symbol: mlx5dv_reg_dmabuf_mr, version MLX5_1.25`).

#### Workaround

- **Identity-IP overlay (no switch, needs sudo):** give each node a stable `/32` identity address on a `dummy` interface, then add per-destination static host routes so each peer's identity IP egresses on the correct directly-cabled QSFP interface. Run NCCL/Gloo over TCP (`NCCL_IB_DISABLE=1`); the kernel routing table then sends each peer's traffic over the right link, so all-to-all bootstrap succeeds over QSFP. Persist via netplan (routes) + a systemd unit (the dummy identity address).
- **A 2-node pair needs none of this:** two directly-cabled nodes share one `/30`, so they reach each other directly with no overlay, and RoCE device selection is unambiguous (one peer, one HCA).
- **For full-bandwidth RoCE across 3+ nodes, a QSFP switch is the clean path** (single subnet, NCCL RoCE auto-negotiates) — NVIDIA's own guidance uses a switch for 4+ nodes. Rebuild NCCL for sm_121 (`NVCC_GENCODE="-gencode=arch=compute_121,code=sm_121"`) to resolve the libmlx5 symbol mismatch.

Note: pipeline parallelism (PP) is interconnect-light (only stage activations cross nodes) and runs near-optimally even over a 1 GbE management NIC; tensor parallelism (TP) is all-reduce-heavy and is where QSFP bandwidth actually matters.

### Full-Rust inference (mistral.rs) scales poorly under concurrency vs vLLM

On GB10, mistral.rs (CUDA feature, built for sm_121) is roughly on par with vLLM at a single stream, but throughput **falls** as concurrency rises while vLLM's rises: measured ~102% of vLLM at concurrency 1, dropping to ~3% at concurrency 32 for the same MoE model. For a shared serving tier (where concurrency is the norm) this favors a gateway + vLLM design over full-Rust inference. Useful as an engine-selection data point, not a defect.

## Notes

- Source: NVIDIA Developer Forums, DGX Spark / GB10 community category (`accelerated-computing/dgx-spark-gb10`), except the "Field-Tested Deployment Issues" section, which is first-party and reproduced on GB10 hardware. This is unofficial, user-generated content — always prefer the official DGX Spark documentation and NVIDIA support channels when they cover the same topic.
- Community responses are not validated by NVIDIA except where an NVIDIA staff/moderator reply is explicitly noted above.
- Usernames have been omitted; contributor identity is described only as "user" or "NVIDIA staff/moderator" per role.

## Related

- [troubleshooting.md](./troubleshooting.md)
