# Integrating React Flow and the Web Audio API

A tutorial building a node-based audio playground by combining React Flow with the Web Audio API, progressing from a simple theremin to a full audio-node editor.

## 詳細説明

- Web Audio fundamentals: `AudioContext`, `OscillatorNode`, `GainNode`, `AudioDestinationNode`
- A Zustand store manages `nodes` / `edges` plus audio-node lifecycle actions (`createNode()`, etc.)
- Graph changes are propagated to the Web Audio graph via an `updateAudioNode()` function so that connecting/disconnecting React Flow edges connects/disconnects the underlying audio nodes
- Custom node components (e.g. `Osc`) expose sliders/selects for frequency, waveform, and gain, using the `nodrag` class so controls remain interactive while the canvas is pannable
- `applyNodeChanges()` / `applyEdgeChanges()` keep the Zustand store in sync with React Flow's change events

## コード例

```typescript
// Creating an AudioContext-backed oscillator whose frequency/volume
// track mouse position, then routing it through a GainNode to the destination
const audioCtx = new AudioContext();
const osc = audioCtx.createOscillator();
const gain = audioCtx.createGain();
osc.connect(gain).connect(audioCtx.destination);
osc.start();
```

## 注意点

- Audio nodes must be created/started only after a user gesture (browser `AudioContext` autoplay policy)
- React Flow edge connect/disconnect events are the source of truth for wiring the actual `AudioNode` graph — the two graphs (React Flow's and the Web Audio API's) are kept in sync manually via `updateAudioNode()`
- Controls inside custom nodes (sliders, selects) need the `nodrag` class to avoid triggering canvas panning

## 関連

- [custom-nodes.md](./custom-nodes.md)
- [state-management.md](./state-management.md)
- [adding-interactivity.md](./adding-interactivity.md)
