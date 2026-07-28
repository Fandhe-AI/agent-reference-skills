# AudioFileInputNode

Represents a node in an `AudioGraph` that inputs audio data into the graph from an audio file.

## Signature / Usage

```csharp
CreateAudioFileInputNodeResult result = await audioGraph.CreateFileInputNodeAsync(storageFile);
AudioFileInputNode fileInputNode = result.FileInputNode;
fileInputNode.LoopCount = null; // loop indefinitely
fileInputNode.AddOutgoingConnection(deviceOutputNode);
fileInputNode.FileCompleted += (s, e) => { /* playback finished */ };
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| SourceFile | StorageFile | The source audio file. |
| Position | TimeSpan | Current playback position. |
| StartTime / EndTime | TimeSpan | Playback range within the file. |
| Duration | TimeSpan | Duration of the input file. |
| LoopCount | Int32? | Number of times to loop (`null` = infinite). |
| PlaybackSpeedFactor | Double | Playback speed multiplier. |
| OutgoingGain | Double | Gain applied to this node's output. |
| EffectDefinitions | IVector\<IAudioEffectDefinition\> | Effects applied to the node's audio data, in list order. |
| AddOutgoingConnection(IAudioNode) | method | Connects this node's output to another node (e.g. output or submix). |
| Seek(TimeSpan) | method | Moves playback position within the file. |
| Start() / Stop() | methods | Start/stop this node. |
| FileCompleted | event | Raised when playback reaches the end of the file or `EndTime`. |

## Notes

- Namespace: `Windows.Media.Audio`. Obtain via `AudioGraph.CreateFileInputNodeAsync` then `CreateAudioFileInputNodeResult.FileInputNode`.
- `MediaSourceAudioInputNode` (via `AudioGraph.CreateMediaSourceAudioInputNodeAsync`) is the alternative for network streams and other `MediaSource`-backed inputs.

## Related

- [AudioGraph](./audio-graph.md)
