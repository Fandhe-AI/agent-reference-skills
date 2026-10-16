# MLModelError

Information about a Core ML model error. Includes the `MLModelError.Code` enumeration and the `MLModelErrorDomain` error domain constant.

## Signature / Usage

```swift
struct MLModelError

enum Code            // MLModelError.Code

let MLModelErrorDomain: String
```

## Options / Props

Error codes (`MLModelError.Code` cases; also exposed as static `MLModelError.Code` properties on `MLModelError`):

| Name | Description |
|------|-------------|
| `featureType` | Problems related to model features |
| `parameters` | Problems related to model parameters |
| `modelCollection` | Problems related to retrieving a model collection from the deployment system |
| `modelDecryptionKeyFetch` | Problems related to retrieving a model's decryption key |
| `modelDecryption` | Problems related to decrypting models |
| `update` | Problems related to on-device model updates |
| `customLayer` | Problems related to custom layers |
| `customModel` | Problems related to custom models |
| `io` | Problems related to the system's input or output |
| `predictionCancelled` | Problems related to canceling the prediction before it completes |
| `generic` | Runtime issues that don't apply to the other error codes |

Error domain:

| Name | Type | Description |
|------|------|-------------|
| `MLModelErrorDomain` | `String` (global) | The domain for Core ML errors |
| `MLModelError.errorDomain` | `static var String` | Error domain accessor on the struct |
| `MLModelError.Code.init(rawValue:)` | `init?(rawValue: Int)` | Creates a code from a raw integer value |

## Notes

- iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+, macOS 10.13+, tvOS 11.0+, visionOS 1.0+, watchOS 4.0+ (also for `MLModelError.Code` and `MLModelErrorDomain`)
- `MLModelError` conforms to `Error`, `CustomNSError`, `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`
- `MLModelError.Code` conforms to `RawRepresentable` (raw type `Int`), `Equatable`, `Hashable`, `BitwiseCopyable`, `Sendable`, `SendableMetatype`
- In Objective-C the code enum is `MLModelError : NSInteger` with constants named `MLModelErrorFeatureType`, `MLModelErrorParameters`, `MLModelErrorModelCollection`, `MLModelErrorModelDecryptionKeyFetch`, `MLModelErrorModelDecryption`, `MLModelErrorUpdate`, `MLModelErrorCustomLayer`, `MLModelErrorCustomModel`, `MLModelErrorIO`, `MLModelErrorPredictionCancelled`, `MLModelErrorGeneric`; the domain is `extern NSString * const MLModelErrorDomain`
- Numeric raw values are not stated on the source pages

## Related

- [MLModel](./mlmodel.md)
- [MLModelCollection](./mlmodelcollection.md)
