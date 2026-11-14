# Capture Windows ML diagnostic logs

Capture Windows ML ETW traces with Windows Performance Recorder (WPR) and convert them into a human-readable rundown log, for debugging model loading, execution-provider (EP) selection, driver/hardware compatibility, and inference issues.

## Signature / Usage

```powershell
# 1. Start ETW tracing with the Windows ML profile
wpr -start .\WinML.wprp -filemode

# 2. Run your app / repro scenario, then stop tracing
wpr -stop winml_trace.etl

# 3. Generate the rundown log
.\Get-WinMLRundown.ps1 -EtlFilePath "winml_trace.etl" -WpaProfilePath ".\WindowsMLProfile.wpaProfile" -OutputFolder ".\rundown_output"
```

If the script cannot be run because it is not digitally signed, change the execution policy for the current PowerShell session and re-run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process
```

## Options / Props

Files to download from [WindowsML/Tools/capture-logs](https://github.com/microsoft/WindowsML/tree/main/Tools/capture-logs) (save all three in the same folder):

| File | Description |
|------|-------------|
| `Get-WinMLRundown.ps1` | PowerShell script for generating rundown logs |
| `WinML.wprp` | WPR profile for capturing Windows ML diagnostic data |
| `WindowsMLProfile.wpaProfile` | WPA profile for processing ETL files |

| `Get-WinMLRundown.ps1` parameter | Description |
|------|-------------|
| `-EtlFilePath` | Path to the ETL file captured in Step 6 |
| `-WpaProfilePath` | Path to the WPA profile (use the provided `WindowsMLProfile.wpaProfile`) |
| `-OutputFolder` | Directory where the rundown log is created |

Output: `rundown_output\WinmlRundown.log` (main rundown log, grouped by process). Temporary CSV files are deleted after the log is written; they're kept if the script stops with an error or finds no data.

| Rundown log event | Contents |
|------|-------------|
| Onnx Version | Runtime Version, Is Redist, Framework Name |
| WindowsAppSDK.ML Version | Windows App SDK Windows ML version used by the app (duplicate entries with the same version are suppressed) |
| WinML Runtime State | Logged by Windows ML 2.8 and later when tracing starts and when the trace is saved: WinML Version, ORT Version (after Windows ML loads ONNX Runtime), Registered EPs; each registered EP is listed in a `WinML Registered EP` entry |
| Driver Info | Device Class, Driver Name, Driver Version for GPU/NPU devices |
| EP Library Registration | EP Name and Success for each EP library registered with ONNX Runtime |
| Session Creation | Schema/Session/IR version, ORT Programming Projection, FP16 usage, model weight type, model graph/weight hash, EP ID |
| EP Auto Selection | Selection Policy (e.g. `PREFER_NPU`), Requested EP vs. Available EP |
| EP Device Usage | Device Type (NPU, GPU, CPU) each EP uses in a session and Assigned Nodes; requires ONNX Runtime 1.27 or later |
| CPU Fallback | Per-session summary of EP device usage: `NONE`, `PARTIAL`, `FULL`, `N/A`, `UNKNOWN` |
| Registered Providers | Execution provider packages Windows ML registered (`PackageFamilyName`); only older Windows ML versions log this entry |
| WINML ONNX ERROR / ONNX ERROR | HRESULT, Session ID, Error Code/Category/Message, File, Function, Line |

CPU Fallback results:

| Result | Meaning |
|------|-------------|
| `NONE` | No nodes ran on the CPU. |
| `PARTIAL` | Some nodes ran on the CPU. |
| `FULL` | All nodes ran on the CPU, although a GPU or NPU was requested. |
| `N/A` | The session uses only CPU execution providers, and the trace shows no GPU or NPU request. |
| `UNKNOWN` | The trace doesn't show how many nodes ran on the CPU. |

### Example log entries

```text
EP Auto Selection (2024/01/15 10:30:45.500):
    Schema Version = 0
    Session ID = 1
    Selection Policy = PREFER_NPU
    Requested EP = CPUExecutionProvider
    Available EP = DmlExecutionProvider, CPUExecutionProvider
```

```text
EP Device Usage (2024/01/15 10:30:45.600):
    Schema Version = 1
    Session ID = 1
    Execution Provider = DmlExecutionProvider
    Device Type = GPU
    Assigned Nodes = 1
```

```text
CPU Fallback (2024/01/15 10:30:45.600):
    Session ID = 1
    Result = PARTIAL - 1 of 2 nodes ran on CPU
```

## Notes

- Prerequisites: administrator privileges (Windows Performance Toolkit installation and starting/stopping ETW tracing with WPR), PowerShell 5.1 or later, Windows 10 version 1903 or later (recommended), and an application using Windows ML or a test case to trace.
- The Windows Performance Toolkit (part of the Windows SDK for Windows 11) contains `wpaexporter.exe`, required to process ETL files. If missing, `Get-WinMLRundown.ps1` tries to install it; to install it yourself, install the Windows SDK with the **Windows Performance Toolkit** feature and verify that `wpaexporter.exe` exists under `%ProgramFiles%\Windows Kits\10\Windows Performance Toolkit\` or `%ProgramFiles(x86)%\Windows Kits\10\Windows Performance Toolkit\`.
- Start tracing before you start your application when you can. With Windows ML 2.8 and later, a trace that starts after your application is running still includes the Windows ML runtime state. If you already have an ETL file, skip to the rundown step.
- Keep tracing sessions as short as possible to minimize ETL file size and processing time; `-filemode` writes traces directly to disk.
- Troubleshooting: "wpaexporter.exe not found" means install Windows Performance Toolkit (run PowerShell as Administrator); "wpaexporter.exe failed with exit code" means check that `-EtlFilePath` points to a complete ETL file and `-WpaProfilePath` to `WindowsMLProfile.wpaProfile`; "Access denied" when starting WPR means run PowerShell as Administrator.
- Tips: start tracing just before the scenario and stop immediately after, reproduce specific issues, and close unnecessary applications to reduce noise.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/logs (retrieved 2026-11-14)

## Related

- [Windows ML execution providers](./supported-execution-providers.md)
- [Register execution providers](./register-execution-providers.md)
- [Troubleshoot execution provider errors](./execution-provider-errors.md)
