# AudioDeviceOutputNode

Represents a node in an `AudioGraph` that outputs audio data from the graph to an audio device such as a speaker or external audio interface.

## Signature / Usage

```csharp
CreateAudioDeviceOutputNodeResult result = await audioGraph.CreateDeviceOutputNodeAsync();
if (result.Status == AudioDeviceNodeCreationStatus.Success)
{
    AudioDeviceOutputNode outputNode = result.DeviceOutputNode;
    fileInputNode.AddOutgoingConnection(outputNode);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Device | DeviceInformation | Information about the output audio device. |
| ConsumeInput | Boolean | Whether the node consumes (renders) input audio. |
| OutgoingGain | Double | Gain applied to this node's output. |
| EffectDefinitions | IVector\<IAudioEffectDefinition\> | Effects applied before output. |
| Listener | AudioNodeListener | Position/characteristics of the spatial-audio listener for this output. |
| Start() / Stop() / Reset() | methods | Control node processing state. |

## Notes

- Namespace: `Windows.Media.Audio`. Obtain via `AudioGraph.CreateDeviceOutputNodeAsync()` then `CreateAudioDeviceOutputNodeResult.DeviceOutputNode`. Outputs to the system's default output device unless otherwise configured via `AudioGraphSettings`.

## Related

- [AudioGraph](./audio-graph.md)
