# winml sys

Inspect your machine — devices, EPs, and runtime versions at a glance. Run it before any export or build workflow to confirm the required ML libraries are installed and the target hardware is visible; it is also the first command to run when diagnosing an unexpected export failure.

## Signature / Usage

```powershell
winml sys [options]
```

Treat the report as an inventory of this machine, not proof that a specific model can run on every listed provider. Device LUIDs identify physical adapters for commands that support `--device-luid`. Runtime provider initialization may require installed drivers or provider acquisition; use the reported errors to investigate missing devices.

```powershell
# Full human-readable system report
winml sys
```

```text
+------------------------------------+
|   winml-cli System Information     |
+------------------------------------+

Environment
  Python Version    3.11.9
  Python Executable C:\...\python.exe
  OS                Windows 11
  Machine           AMD64
  Display Version   24H2
  Current Build     26100
  UBR               4946
  Build Branch      ge_release
  BuildLabEx        26100.1.amd64fre.ge_release.240331-1435

ML Libraries
  Library        Version   Status
  torch          2.4.0     OK
  transformers   4.44.0    OK
  onnx           1.16.1    OK
  ...

Available Devices (priority order)
  #1  NPU   Qualcomm(R) Hexagon NPU
             LUID: 0x00000000_0x00018393 | Driver: 1.0.0 | Manufacturer: Qualcomm
             Dedicated memory: 0 MiB | Shared memory: 8192 MiB
  #2  GPU   Qualcomm(R) Adreno GPU
             LUID: 0x00000000_0x00018394 | Driver: 1.0.0 | Manufacturer: Qualcomm
             Dedicated memory: 1024 MiB | Shared memory: 8192 MiB
  #3  CPU   Snapdragon(R) X Elite
             LUID: N/A | Cores: 12 | Threads: 12 | Architecture: ARM64

Available Execution Providers
  QNNExecutionProvider           -> NPU/GPU
  DmlExecutionProvider           -> GPU
  CPUExecutionProvider           -> CPU
```

```powershell
# Compact one-liner — useful for CI logs
winml sys --format compact
```

```powershell
# Machine-readable JSON — pipe to jq or save for later comparison
winml sys --format json > env.json
```

The full JSON report includes a schema version and installed physical memory:

```json
{
  "schema_version": 1,
  "platform": {
    "system": "Windows",
    "release": "11",
    "machine": "ARM64"
  },
  "memory": {
    "physical_total_mib": 16384
  }
}
```

```powershell
# Only list devices — skip everything else
winml sys --list-device
```

```powershell
# List EPs as JSON — useful for scripting EP selection
winml sys --list-ep --format json
```

## Options / Props

| Flag | Short | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `--format` | `-f` | `text` \| `json` \| `compact` | `text` | Output format. `text` renders rich tables, `json` emits machine-readable JSON, `compact` prints a single-line summary. |
| `--list-device` | — | flag | `false` | List available compute devices (NPU, GPU, CPU) in priority order instead of showing the full system report. |
| `--list-ep` | — | flag | `false` | List available ONNX Runtime execution providers instead of showing the full system report. Can be combined with `--list-device`. |
| `--verbose` | `-v` | flag | `false` | Surface additional diagnostic sections: backend availability and Export Readiness. |
| `--help` | `-h` | flag | — | Show help and exit. |

`winml sys` takes no `--model`, `--device`, `--ep`, `--task`, or `--precision` arguments. It describes the host environment, not a specific model.

## Notes

- Memory capacity uses MiB. If the host does not expose the physical memory total, the field is `null` and `winml sys` emits a warning while preserving the rest of the system report.
- `--no-color` is accepted by every `winml` command (see the command overview).

### How it works

`winml sys` queries Python's `platform` and `importlib.metadata` modules to report library versions. On Windows, it also reads the native `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion` registry key to report the display version, build, update build revision (UBR), build branch, and build lab. It then probes PyTorch for CUDA availability and GPU device names. Backend availability checks use the installed runtime environment. GPU and NPU enumeration uses DXCore as the source of adapter identity and LUID, then enriches those native rows with WMI/PnP driver and manufacturer details. NPU and GPU rows also report DXCore's 64-bit dedicated adapter memory and shared system memory capacities in MiB. CPU enumeration uses WMI. Devices remain in NPU > GPU > CPU priority order, and EP enumeration merges the WinML EP registry with ONNX Runtime's `get_available_providers()`. When `--format json` is used the full report — including devices and EPs — is emitted as a single JSON object, making it easy to capture in CI pipelines.

Within the GPU class, devices are ordered by ONNX Runtime hardware metadata `DxgiHighPerformanceIndex` numerically (0 first), with LUID as a stable tie-breaker. This is the Windows DXGI high-performance preference, not DXCore enumeration order. The preference is joined to native DXCore rows by LUID; EP metadata never adds or removes physical adapters. Missing or invalid ranks sort after ranked GPUs, in LUID order. If EP probing cannot supply ranks, all native GPUs fall back to LUID order.

Unpinned runtime GPU selection uses the same ordering within the selected EP source's exposed devices. An EP that exposes only a subset of installed GPUs can therefore select a different GPU from the first system-wide row. An explicit `--device-luid` on `winml perf` overrides that preference.

### Common pitfalls

- **`--list-device` and `--list-ep` suppress the full report.** When either flag is present, only the requested section is printed. Omit both flags to see the complete system report.
- **`--format compact` omits device and EP tables.** The compact format is designed for single-line log entries and does not include device or EP details. Use `text` or `json` when you need the full picture.
- **CUDA shown as unavailable on a machine with a GPU.** PyTorch must be installed with CUDA support (`torch+cuXXX`). A CPU-only torch wheel will always report `cuda_available: false`.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/commands/sys (retrieved 2026-11-14)

## Related

- [Windows ML CLI command reference](./winml-cli-commands-overview.md)
- [winml perf](./winml-cli-cmd-perf.md)
- [winml eval](./winml-cli-cmd-eval.md)
- [winml build](./winml-cli-cmd-build.md)
