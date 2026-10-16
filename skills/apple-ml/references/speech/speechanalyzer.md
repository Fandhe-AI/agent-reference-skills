# SpeechAnalyzer

Analyzes spoken audio content in various ways and manages the analysis session. Holds the modules, accepts audio input as an `AsyncSequence` of `AnalyzerInput`, and controls the overall analysis.

## Signature / Usage

```swift
import Speech

// Step 1: Modules
guard let locale = await SpeechTranscriber.supportedLocale(equivalentTo: Locale.current) else {
    /* Note unsupported language */
}
let transcriber = SpeechTranscriber(locale: locale, preset: .transcription)

// Step 2: Assets
if let installationRequest = try await AssetInventory.assetInstallationRequest(supporting: [transcriber]) {
    try await installationRequest.downloadAndInstall()
}

// Step 3: Input sequence
let (inputSequence, inputBuilder) = AsyncStream.makeStream(of: AnalyzerInput.self)

// Step 4: Analyzer
guard let audioFormat = await SpeechAnalyzer.bestAvailableAudioFormat(compatibleWith: [transcriber]) else {
    /* No compatible audio format available */
}
let analyzer = SpeechAnalyzer(modules: [transcriber])

// Step 5: Supply audio
let converter = AnalyzerInputConverter(analyzerFormat: audioFormat)
Task {
    defer { inputBuilder.finish() }
    do {
        while /* audio remains */ {
            let buffer = /* Get some audio */
            let inputs = try converter.convert(buffer, at: nil)
            for input in inputs {
                inputBuilder.yield(input)
            }
        }
        let inputs = try converter.flush()
        for input in inputs {
            inputBuilder.yield(input)
        }
    } catch {
        /* Handle conversion error; e.g. await analyzer.cancelAndFinishNow() */
    }
}

// Step 7: Act on results
Task {
    do {
        for try await result in transcriber.results {
            let bestTranscription = result.text // an AttributedString
            let plainTextBestTranscription = String(bestTranscription.characters) // a String
            print(plainTextBestTranscription)
        }
    } catch {
        /* Handle error */
    }
}

// Step 6: Perform analysis
let lastSampleTime = try await analyzer.analyzeSequence(inputSequence)

// Step 8: Finish analysis
if let lastSampleTime {
    try await analyzer.finalizeAndFinish(through: lastSampleTime)
} else {
    await analyzer.cancelAndFinishNow()
}
```

## Options / Props

Declaration: `final actor SpeechAnalyzer`.

| Name | Type | Description |
|------|------|-------------|
| `init(modules:options:)` | initializer | Creates an analyzer. |
| `init(inputSequence:modules:options:analysisContext:volatileRangeChangedHandler:)` | initializer | Creates an analyzer that analyzes the given input sequence autonomously. |
| `init(inputAudioFile:modules:options:analysisContext:finishAfterFile:volatileRangeChangedHandler:)` | initializer | Creates an analyzer that analyzes an audio file autonomously. |
| `Options` | struct | Analysis processing options (`priority`, `ignoresResourceLimits`, `ModelRetention`). |
| `modules` / `setModules(_:)` | property / method | Adds or removes modules. |
| `analyzeSequence(_:)` | `async throws -> CMTime?` | Analyzes an input sequence, returning when the sequence terminates. |
| `analyzeSequence(from:)` | `async throws -> CMTime?` | Analyzes an input sequence created from an `AVAudioFile`, returning when the file has been read. |
| `start(inputSequence:)` / `start(inputAudioFile:finishAfterFile:)` | methods | Perform autonomous analysis in a task managed by the analyzer. |
| `cancelAnalysis(before:)` | method | Stops analyzing audio predating the given time. |
| `finalize(through:)` | `async throws` | Finalizes the modules' analyses. |
| `cancelAndFinishNow()` | `async` | Finishes analysis immediately. |
| `finalizeAndFinishThroughEndOfInput()` | method | Finalizes and finishes at the end of the input. |
| `finalizeAndFinish(through:)` | method | Finishes analysis after finalizing results for a given time-code. |
| `finish(after:)` | method | Finishes analysis after the given time. |
| `static bestAvailableAudioFormat(compatibleWith:)` | `async -> AVAudioFormat?` | Best-quality audio format the modules can work with, from assets installed on the device. |
| `static bestAvailableAudioFormat(compatibleWith:considering:)` | `async -> AVAudioFormat?` | Same, taking the natural format of the audio into account. |
| `prepareToAnalyze(in:)` / `prepareToAnalyze(in:withProgressReadyHandler:)` | methods | Proactively load system resources ("preheat") after setting modules. |
| `setVolatileRangeChangedHandler(_:)` / `volatileRange` | method / property | Monitor analysis. |
| `setContext(_:)` / `context` | method / property | Manage the `AnalysisContext`. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- The analyzer can only analyze one input sequence at a time. Analysis is asynchronous; results come via an `AsyncSequence` on each module.
- Audio supplied through `AnalyzerInput` must already be in a format supported by the modules; the analyzer does not convert audio. Use `AnalyzerInputConverter`, `AssetInputSequenceProvider`, or `CaptureInputSequenceProvider` (the latter three: iOS 27.0+).
- To end a session you must call one of the `finish` methods or deallocate the analyzer. Terminating your input sequence does not generally finish the session.
- When the analyzer or a result stream throws, the session becomes finished and the same error (or `CancellationError`) is thrown from all waiting methods and result streams.
- The system limits simultaneous analyses; exceeding the limit throws `SFSpeechError.Code.insufficientResources`. Creating the analyzer with `Options.ignoresResourceLimits` set to `true` removes the limit, but excess analyzers may fail with unpredictable errors. Test on a variety of devices.
- Select an `Options.ModelRetention` option to keep resources cached for later analyzers; `SpeechModels.endRetention()` releases them.
- Distinct from `SFSpeechRecognizer` (callback / delegate based, older API).
- Usage snippet adapted from the official overview: added `await` / adjusted `try` to match the declarations (`supportedLocale(equivalentTo:)` is `async`, `cancelAndFinishNow()` is `async` non-throwing); `bestAvailableAudioFormat(compatibleWith:)` returns an Optional, so it is unwrapped with `guard let`; the audio-supply `Task` calls `inputBuilder.finish()` via `defer` and wraps conversion in `do` / `catch` so a thrown conversion error does not leave `analyzeSequence` waiting forever.
- Source: https://developer.apple.com/documentation/speech/speechanalyzer

## Related

- [SpeechTranscriber](./speechtranscriber.md)
- [DictationTranscriber](./dictationtranscriber.md)
- [SpeechDetector](./speechdetector.md)
- [SpeechModule](./speechmodule.md)
- [AnalyzerInput](./analyzerinput.md)
- [AnalyzerInputConverter](./analyzerinputconverter.md)
- [AssetInputSequenceProvider](./assetinputsequenceprovider.md)
- [CaptureInputSequenceProvider](./captureinputsequenceprovider.md)
- `AnalysisContext`
- [AssetInventory](./assetinventory.md)
- [SpeechModels](./speechmodels.md)
