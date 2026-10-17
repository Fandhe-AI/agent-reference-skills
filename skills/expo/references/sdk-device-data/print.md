---
source: https://docs.expo.dev/versions/v58.0.0/sdk/print/
---

# Print

`expo-print` provides printing for Android and iOS (AirPrint); on web it prints the HTML of the current page.

## Signature / Usage

```sh
npx expo install expo-print
```

```jsx
import { Platform } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const html = `
<html>
  <body style="text-align: center;">
    <h1>Hello Expo!</h1>
  </body>
</html>
`;

// On iOS/android prints the given html. On web prints the HTML from the current page.
const printer = Platform.OS === 'ios' ? await Print.selectPrinterAsync() : undefined; // iOS only
await Print.printAsync({ html, printerUrl: printer?.url /* iOS only */ });

const { uri } = await Print.printToFileAsync({ html });
await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
```

## Options / Props

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `Print.printAsync(options: PrintOptions)` | Android, iOS, Web | `Promise<void>` | Prints a document or HTML. Resolves to an empty promise if printing started. |
| `Print.printToFileAsync(options?: FilePrintOptions)` | Android, iOS, Web | `Promise<FilePrintResult>` | Prints HTML to a PDF file saved to the app's cache directory. On Web opens the print dialog. `options` default `{}`. |
| `Print.selectPrinterAsync()` | iOS | `Promise<Printer>` | Chooses a printer for later use in `printAsync`; resolves with `name` and `url`. |
| `Print.Orientation` | Android, iOS, Web | `OrientationType` | Constant: `portrait` / `landscape`. |

`PrintOptions` (all optional):

| Property | Type | Description |
| --- | --- | --- |
| height | `number` | Page height in pixels. Defaults to `792` (US Letter at 72 PPI). Only with `html`. |
| html | `string` | Android, iOS. HTML string to print. |
| margins | `PageMargins` | iOS. Page margins. |
| markupFormatterIOS | `string` | iOS. Deprecated, use `useMarkupFormatter`. Might be removed in future releases. |
| orientation | `OrientationType` | iOS. `Print.Orientation.portrait` or `Print.Orientation.landscape`. |
| printerUrl | `string` | iOS. Printer URL returned from `selectPrinterAsync`. |
| uri | `string` | Android, iOS. URI of a PDF file to print: remote, local (e.g. via `DocumentPicker`), or base64 data URI starting with `data:application/pdf;base64,`. PDF only (no images). |
| useMarkupFormatter | `boolean` | iOS. Uses `UIMarkupTextPrintFormatter` instead of WebView; does not display images. |
| width | `number` | Page width in pixels. Defaults to `612` (US Letter at 72 PPI). Only with `html`. |

`FilePrintOptions` (all optional):

| Property | Type | Description |
| --- | --- | --- |
| base64 | `boolean` | Include a base64 encoded string of the file in the result. |
| height | `number` | Single page height in pixels. Default `792`. |
| html | `string` | HTML string to print into the PDF file. |
| margins | `PageMargins` | iOS. Page margins. |
| textZoom | `number` | Android. Text zoom in percent; default 100. |
| useMarkupFormatter | `boolean` | iOS. Uses `UIMarkupTextPrintFormatter` instead of WebView; no images. |
| width | `number` | Single page width in pixels. Default `612`. |

`FilePrintResult`:

| Property | Type | Description |
| --- | --- | --- |
| base64 (optional) | `string` | Base64 PDF data, without the `data:application/pdf;base64,` prefix. Only when the `base64` option is truthy. |
| numberOfPages | `number` | Pages needed to render the content. |
| uri | `string` | URI to the printed PDF file. |

`PageMargins`: `bottom`, `left`, `right`, `top` (all `number`). `Printer`: `name: string`, `url: string`. `OrientationType`: `landscape: string`, `portrait: string`.

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Web, Included in Expo Go.
- iOS: printing from HTML does not support local asset URLs (`WKWebView` limitation); inline images as base64 strings (e.g. `<img src="data:image/png;base64,${result.base64}" />`).
- iOS: without `printerUrl`, the `printAsync` promise resolves once printing starts in the native print window and rejects if the window is closed without printing. Android resolves immediately after showing the native print window and does not reject on close.
- iOS margins: `margins: { left: 20, top: 50, right: 20, bottom: 100 }`. With `useMarkupFormatter: true`, margins may cause a blank last page; use a well-formed document starting with `<!DOCTYPE html>`.
- Android: margins may be present depending on the WebView engine; override via an `@page { margin: 20px; }` style block.
- In the source, selectedPrinter is React state set from selectPrinterAsync; the condensed example uses a local variable instead.
- selectPrinterAsync is iOS-only; the example guards it with Platform.OS (the source calls it from an iOS-only button handler).
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-print

## Related

- [Sharing](./sharing.md)
- [DocumentPicker](./document-picker.md)
