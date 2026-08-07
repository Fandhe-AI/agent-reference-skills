# RecognizeDocumentsRequest

An image-analysis request that scans a document image and provides information about its structure (text, tables, lists, barcodes).

## Signature / Usage

```swift
let request = RecognizeDocumentsRequest()
let handler = ImageRequestHandler(cgImage, orientation: nil)
let observations = try await handler.perform(request)

for document in observations {
    print(document.document.text.transcript)
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `textRecognitionOptions` | `TextRecognitionOptions` | Configuration for recognizing text in the document |
| `barcodeDetectionOptions` | `BarcodeDetectionOptions` | Configuration for detecting machine-readable codes in the document |
| `supportedRecognitionLanguages` | `[Locale.Language]` | The identifiers of the languages the request supports |
| `supportedBarcodeSymbologies` | `[BarcodeSymbology]` | The collection of barcode symbologies the request supports |
| `revision` | `RecognizeDocumentsRequest.Revision` | The request's configured revision |

## Notes

- iOS 26.0+ / iPadOS 26.0+ / macOS 26.0+ / tvOS 26.0+ / visionOS 26.0+
- Returns `DocumentObservation`, exposing document structure grouped by words, lines, paragraphs, tables, and lists.
- Useful for receipts, nutrition labels, textbook pages, forms, and other structured documents.
- No legacy VN-prefixed equivalent; this API has no pre-Swift-concurrency counterpart.

## Related

- [RecognizeTextRequest](./recognizetextrequest.md)
- [DetectBarcodesRequest](./detectbarcodesrequest-modern.md)
- [ImageRequestHandler](./imagerequesthandler.md)
