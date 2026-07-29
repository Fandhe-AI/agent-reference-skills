# SpeechRecognitionModel

An on-device speech-to-text model that transcribes spoken audio into text, either in one pass from a complete audio file (`BatchRecognition`) or continuously in real time from a microphone (`StreamingRecognition`). Runs entirely on-device with no network dependency.

## Signature / Usage

```csharp
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Speech;

if (SpeechRecognitionModel.GetReadyState() != AIFeatureReadyState.Ready)
{
    await SpeechRecognitionModel.EnsureReadyAsync();
}

var speechModelResult = await SpeechRecognitionModel.TryCreateAsync();
if (speechModelResult.SpeechModel == null)
{
    throw new InvalidOperationException(
        $"Failed to create SpeechRecognitionModel: {speechModelResult.ExtendedError}");
}

var speechModel = speechModelResult.SpeechModel;

// Batch: transcribe a complete audio file in one pass
var batchRecognition = new BatchRecognition(speechModel);
string transcription = await batchRecognition.RecognizeFromFile("path/to/audio.wav");
Console.WriteLine($"Transcription: {transcription}");
```

## Options / Props

| Member | Description |
|------|-------------|
| `GetReadyState()` / `EnsureReadyAsync()` | Static readiness check and model install, same pattern as other Windows AI APIs. On CPU-only devices the model is not preinstalled and downloads on first `EnsureReadyAsync` call; on Copilot+ PCs it is preinstalled. |
| `TryCreateAsync()` | Asynchronously creates the model. Unlike most other `ai-apis` classes, returns a result object (not the model directly) — read `.SpeechModel` and, on failure, `.ExtendedError`. |
| `BatchRecognition(SpeechRecognitionModel)` | Constructor. Transcribes a complete pre-recorded audio file in one pass. |
| `BatchRecognition.RecognizeFromFile(string path)` | Transcribes the audio file at `path` and returns the full transcription as a `string`. |
| `AudioConfiguration.FromAudioDevice(string deviceName)` | Static factory. Creates an `AudioConfiguration` bound to a microphone/audio input device, for use with `StreamingRecognition`. |
| `StreamingRecognition(AudioConfiguration, SpeechRecognitionModel)` | Constructor. Continuous real-time transcription from a microphone or audio stream. |
| `StreamingRecognition.Recognized` | Event raised with `args.Text` each time a complete phrase is recognized. |
| `StreamingRecognition.StartContinuousRecognitionAsync()` | Begins real-time transcription. |
| `StreamingRecognition.StopContinuousRecognition()` | Stops real-time transcription (no `Async` suffix — synchronous call). |

## Notes

- Namespace: `Microsoft.Windows.AI.Speech`. Distinct from the legacy platform Speech Recognition APIs (`Windows.Media.SpeechRecognition`) — this on-device model is a separate, newer API surface; no page for the legacy platform API currently exists in this skill family.
- Supported hardware: NPU (Copilot+ PC, preinstalled model) and CPU (downloaded on demand); **not supported on GPU**. Hardware selection is automatic — there is no developer/user opt-in.
- For a good CPU experience, target 4+ physical cores, 3 GHz+ base clock, 32 MB+ L3 cache; see Video Super Resolution's CPU-spec check sample, which applies the same recommended-spec pattern.
- Apps must be packaged as MSIX with the `systemAIModels` capability declared in `Package.appxmanifest`, and `MaxVersionTested` set to a recent Windows version (e.g. `10.0.26226.0`+).
- Requires Windows 11 version 24H2 (build 26100)+ and WinAppSDK 1.7.1+.

## Related

- [Device requirements and fallback](./device-requirements.md)
- [VideoScaler](./video-scaler.md)
