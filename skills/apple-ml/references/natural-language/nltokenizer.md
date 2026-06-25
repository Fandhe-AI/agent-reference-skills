# NLTokenizer

A tokenizer that segments natural language text into semantic units (words, sentences, paragraphs, or documents).

## Signature / Usage

```swift
class NLTokenizer: NSObject

// Initialize with a linguistic unit
let tokenizer = NLTokenizer(unit: .word)
tokenizer.string = "Hello world! How are you?"

// Enumerate tokens
tokenizer.enumerateTokens(in: tokenizer.string!.startIndex..<tokenizer.string!.endIndex) { range, _ in
    print(tokenizer.string![range])
    return true
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `string` | `String?` | The text to be tokenized |
| `unit` | `NLTokenUnit` | The linguistic unit used for segmentation |

## Key Methods

| Method | Description |
|--------|-------------|
| `init(unit:)` | Creates a tokenizer for the specified `NLTokenUnit` |
| `tokens(for:)` | Returns `[Range<String.Index>]` for all tokens in range |
| `tokenRange(at:)` | Returns the token range at a given index |
| `tokenRange(for:)` | Returns the enclosing token range for a range |
| `enumerateTokens(in:using:)` | Enumerates tokens; return `false` from block to stop |
| `setLanguage(_:)` | Sets the language hint for improved accuracy |

### NLTokenUnit

| Value | Description |
|-------|-------------|
| `.word` | Individual words |
| `.sentence` | Sentences |
| `.paragraph` | Paragraphs |
| `.document` | Entire document |

## Notes

- Availability: iOS 12.0+, macOS 10.14+, tvOS 12.0+, watchOS 5.0+, visionOS 1.0+
- Not thread-safe — use one instance per thread/queue.

## Related

- [NLTagger](./nltagger.md)
- [NLLanguage](./nllanguage.md)
