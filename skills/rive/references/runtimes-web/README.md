# runtimes-web

| Name | Description | Path |
| --- | --- | --- |
| packages | Package selection: @rive-app/webgl2 vs canvas vs canvas-lite | [packages.md](./packages.md) |
| Rive (constructor) | RiveParameters — all constructor options including src, canvas, autoplay, autoBind, callbacks | [rive-constructor.md](./rive-constructor.md) |
| Rive instance methods | play/pause/stop/reset, resize, stateMachineInputs, on/off, cleanup | [rive-methods.md](./rive-methods.md) |
| Layout / Fit / Alignment | Layout class, Fit enum (Contain/Cover/Fill/…), Alignment enum | [layout.md](./layout.md) |
| State Machine Playback | stateMachineInputs, StateMachineInput (boolean/number/trigger), onStateChange | [state-machine-playback.md](./state-machine-playback.md) |
| Data Binding | ViewModel, ViewModelInstance, property accessors, lists, images, artboard swap, observability | [data-binding.md](./data-binding.md) |
| Loading Assets | assetLoader callback, embedded/hosted/referenced strategies, decodeFont, decodeImage | [loading-assets.md](./loading-assets.md) |
| Fonts | Dynamic font loading, RiveFont.setFallbackFontCallback for missing glyphs | [fonts.md](./fonts.md) |
| Audio | volume property, embedded vs referenced audio, browser autoplay restriction | [audio.md](./audio.md) |
| Events | EventType, RiveEventType, on/off API, RiveEvent payload, OpenUrl handling | [events.md](./events.md) |
| RiveFile | Pre-parse and share a .riv file across multiple Rive instances | [rive-file.md](./rive-file.md) |
| Preloading WASM | RuntimeLoader.setWasmUrl — self-host the WASM binary for faster startup | [preloading-wasm.md](./preloading-wasm.md) |
