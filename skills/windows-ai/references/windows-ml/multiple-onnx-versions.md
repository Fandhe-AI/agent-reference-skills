# Use multiple versions of ONNX Runtime in an app

Run Windows ML's ONNX Runtime alongside another ONNX Runtime by running Windows ML in a separate process.

## Signature / Usage

```csharp
// Spin up another process which uses Windows ML
var process = new System.Diagnostics.Process();
process.StartInfo.FileName = @"CSharpConsoleDesktop.exe";
process.StartInfo.Arguments = "--ep_policy CPU --image_path myimage.jpg";
process.StartInfo.RedirectStandardOutput = true;
process.StartInfo.UseShellExecute = false;
process.StartInfo.CreateNoWindow = true;

process.OutputDataReceived += (sender, e) =>
{
    // parse output
};

process.Start();
process.BeginOutputReadLine();
process.WaitForExit();
```

## Notes

- Use when some models require specific ONNX Runtime versions, or the app runs unknown plugins whose developers must control their own ONNX Runtime version.
- The example builds the `CSharpConsoleDesktop` Windows ML sample (SqueezeNet) from `WindowsAppSDK-Samples` (`Samples/WindowsML/cs/CSharpConsoleDesktop`), which takes an image path on the command line and prints its interpretation.
- Effective for single-shot invocations with string input and string output. For a persistent AI worker process or non-string data, use Windows interprocess communication mechanisms.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/multiple-onnx-versions (retrieved 2026-10-16)

## Related

- [ONNX Runtime versions in Windows ML](./onnx-versions.md)
- [Windows ML overview](./overview.md)
