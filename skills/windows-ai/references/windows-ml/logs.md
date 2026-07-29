# Capture Windows ML diagnostic logs

Capture Windows ML ETW traces with Windows Performance Recorder (WPR) and convert them into a human-readable rundown log, for debugging model loading, execution-provider selection, and inference issues.

## Signature / Usage

```powershell
# 1. Start ETW tracing with the Windows ML profile
wpr -start .\WinML.wprp -filemode

# 2. Run your app / repro scenario, then stop tracing
wpr -stop winml_trace.etl

# 3. Generate the rundown log
.\Get-WinMLRundown.ps1 -EtlFilePath "winml_trace.etl" `
    -WpaProfilePath ".\WindowsMLProfile.wpaProfile" `
    -OutputFolder ".\rundown_output"
```

## Options / Props

| File | Description |
|------|-------------|
| `Get-WinMLRundown.ps1` | PowerShell script that generates the rundown log from an ETL file |
| `WinML.wprp` | WPR profile for capturing Windows ML diagnostic ETW data |
| `WindowsMLProfile.wpaProfile` | WPA profile used to process the ETL file |

All three are downloaded from the [WindowsML/capture-logs](https://github.com/microsoft/WindowsAppSDK-Samples/tree/main/Samples/WindowsML/capture-logs) sample folder.

| `Get-WinMLRundown.ps1` parameter | Description |
|------|-------------|
| `-EtlFilePath` | Path to the captured ETL file |
| `-WpaProfilePath` | Path to `WindowsMLProfile.wpaProfile` |
| `-OutputFolder` | Directory where `WinmlRundown.log` is written |

| Rundown log section | Contents |
|------|-------------|
| Onnx Version | ONNX Runtime version, whether it's the redistributable, framework name |
| WindowsAppSDK.ML Version | Windows App SDK Windows ML version in use |
| Driver Info | GPU/NPU device class, driver name/version |
| Session Creation | Schema/session/IR version, FP16 usage, model weight type, model graph/weight hash, selected EP ID |
| EP Auto Selection | Selection policy, requested EP vs. available EPs |
| Registered Providers | Installed EP packages (`PackageFamilyName`) |
| WinML ONNX Error | HRESULT, session ID, error code/category/message, source file/function/line |

## Notes

- Requires Administrator privileges (WPR tracing and Windows Performance Toolkit install), PowerShell 5.1+, and the Windows Performance Toolkit (part of the Windows 11 SDK, provides `wpaexporter.exe`).
- If `Get-WinMLRundown.ps1` fails as unsigned, run `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process` for the current session first.
- Keep tracing sessions as short as possible (start right before, stop right after the repro) to minimize ETL size and processing time.

## Related

- [Windows ML execution providers](./supported-execution-providers.md)
- [Register execution providers](./register-execution-providers.md)
- [Troubleshoot execution provider errors](./execution-provider-errors.md)
