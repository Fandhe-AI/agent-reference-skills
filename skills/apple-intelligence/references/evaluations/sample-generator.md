---
source: https://developer.apple.com/documentation/evaluations/samplegenerator, https://developer.apple.com/documentation/evaluations/samplegenerator/samplingstrategy-swift.enum
---

# SampleGenerator

An actor that generates evaluation samples using a language model.

## Signature / Usage

```swift
actor SampleGenerator<SampleType> where SampleType : ModelSampleProtocol
```

```swift
enum SamplingStrategy
```

To produce new samples, create an instance, configure its properties, and call `run()`. After iteration completes, access `samples` for the full dataset, or `invalidSamples` for any samples the validator rejected.

## Options / Props

| Name | Description |
|------|-------------|
| init(_:samples:targetCount:sessionProvider:samplingStrategy:validator:) | Two overloads: for custom, generable evaluation samples; for sample values with a generable-expected value type. |
| samplingStrategy | The strategy for selecting existing samples as examples in the prompt. |
| validator | An optional closure that decides whether a generated sample is valid. |
| run() | Runs the generator and returns a stream of newly synthesized samples. |
| samples | All initial and generated samples from the most recent run. |
| invalidSamples | Samples that the validator rejected during the most recent run. |
| SamplingStrategy.random(retries:) | Randomly picks a subset of samples each time a model repeats inference. |
| SamplingStrategy.slidingWindow | Slides a window through the examples, advancing it each batch. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- When a model repeats an inference, `SamplingStrategy` determines whether and how the generator retries with different examples.

## Related

- [ModelSample](./model-sample.md)
- [Loader](./loader.md)
