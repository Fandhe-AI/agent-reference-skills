# AudioGraph

Represents a graph of connected audio input, output, and submix nodes for low-latency audio processing and routing, higher-level than raw XAudio2 COM APIs.

## Signature / Usage

```csharp
var settings = new AudioGraphSettings(AudioRenderCategory.Media);
CreateAudioGraphResult graphResult = await AudioGraph.CreateAsync(settings);
AudioGraph graph = graphResult.Graph;

CreateAudioDeviceOutputNodeResult outResult = await graph.CreateDeviceOutputNodeAsync();
AudioDeviceOutputNode outputNode = outResult.DeviceOutputNode;

CreateAudioFileInputNodeResult inResult = await graph.CreateFileInputNodeAsync(inputFile);
AudioFileInputNode inputNode = inResult.FileInputNode;
inputNode.AddOutgoingConnection(outputNode);

graph.Start();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CreateAsync(AudioGraphSettings) | static Task | Creates an audio graph with the given settings (category, quantum size, output device). |
| CreateFileInputNodeAsync(IStorageFile) | Task | Creates an `AudioFileInputNode` reading from a file. |
| CreateDeviceInputNodeAsync(MediaCategory, ...) | Task | Creates an `AudioDeviceInputNode` reading from a microphone/input device. |
| CreateDeviceOutputNodeAsync() | Task | Creates an `AudioDeviceOutputNode` writing to the default output device. |
| CreateFrameInputNode(...) | AudioFrameInputNode | Creates a node fed by app-generated audio frames. |
| CreateFrameOutputNode(...) | AudioFrameOutputNode | Creates a node that delivers audio frames to app code. |
| CreateSubmixNode(...) | AudioSubmixNode | Creates a node that mixes multiple node outputs into one. |
| CreateMediaSourceAudioInputNodeAsync(MediaSource) | Task | Creates a node fed from a `MediaSource` (e.g. network stream). |
| Start() / Stop() | methods | Start/stop audio graph processing. |
| QuantumStarted / QuantumProcessed / UnrecoverableErrorOccurred | events | Per-quantum processing notifications and fatal error notification. |

## Notes

- Namespace: `Windows.Media.Audio`. Requires the `backgroundMediaRecording` app capability. Cannot be instantiated if no audio devices are available or on N/KN Windows editions without the Media Feature Pack installed.
- The entire graph runs at a single sample rate; sources with a different rate are resampled automatically.
- Node types must be connected via `AddOutgoingConnection` to route audio from inputs through submixes to outputs.

## Related

- [AudioFileInputNode](./audio-file-input-node.md)
- [AudioDeviceOutputNode](./audio-device-output-node.md)
- [AudioFrameInputNode](./audio-frame-input-node.md)
