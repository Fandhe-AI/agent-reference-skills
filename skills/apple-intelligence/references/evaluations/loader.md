---
source: https://developer.apple.com/documentation/evaluations/loader, https://developer.apple.com/documentation/evaluations/arrayloader, https://developer.apple.com/documentation/evaluations/jsonloader, https://developer.apple.com/documentation/evaluations/streamloader
---

# Loader / ArrayLoader / JSONLoader / StreamLoader

A protocol for types that supply a dataset for evaluation, plus three built-in concrete loaders. Implement `Loader` directly for custom data sources.

## Signature / Usage

### Loader

```swift
protocol Loader<Sample> : Sendable
```

```swift
var dataset: any Loader<ModelSample<String>> {
    ArrayLoader(samples: [
        ModelSample(prompt: "One plus one is...", expected: "Two."),
        ModelSample(prompt: "Swift is...", expected: "A powerful language."),
    ])
}
```

### ArrayLoader

```swift
struct ArrayLoader<Sample> where Sample : SampleProtocol
```

```swift
let loader: ArrayLoader = [
    ModelSample(prompt: "What is 2+2?", expected: "4"),
    ModelSample(prompt: "What is the capital of France?", expected: "Paris"),
]
```

### JSONLoader

```swift
struct JSONLoader<Sample> where Sample : SampleProtocol
```

```swift
let url = Bundle.main.url(forResource: "samples", withExtension: "jsonl")!
let loader = JSONLoader<ModelSample<String>>(url: url)
```

### StreamLoader

```swift
struct StreamLoader<Sample> where Sample : SampleProtocol
```

```swift
let loader = StreamLoader(stream: AsyncThrowingStream { continuation in
    continuation.yield(ModelSample(prompt: "What is 2+2?", expected: "4"))
    continuation.finish()
})
```

## Options / Props

| Name | Owner | Description |
|------|-------|-------------|
| Sample | Loader | Associated type. |
| stream | Loader | The async sequence for iteration during an evaluation run. |
| init(samples:) | ArrayLoader | Creates a loader backed by the given array of samples. |
| init(arrayLiteral:) | ArrayLoader | Creates a loader from an array literal of samples. |
| init(url:) | JSONLoader | Creates a loader backed by the JSON or JSONL file at the given URL. |
| init(stream:) | StreamLoader | Creates a loader backed by the given async sequence. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- `JSONLoader` detects the format from file contents: if the first non-whitespace character is `[`, the file is a JSON array decoded in one pass; otherwise it is JSONL, decoding each non-empty line as a sample.
- `JSONLoader`: malformed entries are logged using `OSLog` and skipped. A failure to open the file propagates as a thrown error.

## Related

- [ModelSample](./model-sample.md)
- [SampleGenerator](./sample-generator.md)
- [Evaluation](./evaluation.md)
