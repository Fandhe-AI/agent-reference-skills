# AudioFrameInputNode

Represents a node in an `AudioGraph` that inputs audio data into the graph from app-implemented code that generates audio samples programmatically (e.g. synthesized tones, procedural audio).

## Signature / Usage

```csharp
AudioFrameInputNode frameInputNode = audioGraph.CreateFrameInputNode();
frameInputNode.AddOutgoingConnection(deviceOutputNode);
frameInputNode.QuantumStarted += (sender, args) =>
{
    AudioFrame frame = GenerateAudioFrame(args.RequiredSamples);
    sender.AddFrame(frame);
};
frameInputNode.Start();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| EncodingProperties | AudioEncodingProperties | The encoding format expected for frames added to this node. |
| QueuedSampleCount | UInt32 | Number of samples currently queued. |
| PlaybackSpeedFactor | Double | Playback speed multiplier. |
| OutgoingGain | Double | Gain applied to this node's output. |
| AddFrame(AudioFrame) | method | Submits an `AudioFrame` of generated samples to the graph. |
| DiscardQueuedFrames() | method | Clears queued but unprocessed frames. |
| QuantumStarted | event | Raised when the graph is ready to process a new quantum; the typical place to call `AddFrame`. |
| AudioFrameCompleted | event | Raised when a submitted frame has finished being consumed. |

## Notes

- Namespace: `Windows.Media.Audio`. Obtain via `AudioGraph.CreateFrameInputNode(...)`. Useful for low-latency programmatic audio generation (synthesizers, sound effects) integrated into the same graph as file/device nodes.

## Related

- [AudioGraph](./audio-graph.md)
