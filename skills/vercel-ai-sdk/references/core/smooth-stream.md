---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/smooth-stream
---

# smoothStream

`smoothStream` creates a `TransformStream` for the `streamText` `experimental_transform` option. It smooths out text and reasoning streaming by buffering and releasing complete chunks with configurable delays, for a more natural reading experience.

## Signature / Usage

```ts
import { smoothStream, streamText } from 'ai';

const result = streamText({
  model,
  prompt,
  experimental_transform: smoothStream({
    delayInMs: 20, // optional: defaults to 10ms
    chunking: 'line', // optional: defaults to 'word'
  }),
});
```

Import: `import { smoothStream } from "ai"`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| delayInMs | `number \| null` (Optional) | Delay in milliseconds between outputting each chunk. Defaults to 10ms. Set to `null` to disable delays. The delay is skipped while the document is hidden (e.g. browser background tabs), where timer throttling would otherwise stall the stream. |
| chunking | `"word" \| "line" \| RegExp \| Intl.Segmenter \| (buffer: string) => string \| undefined \| null` (Optional) | How text and reasoning content is chunked. `"word"` (default), `"line"`, an `Intl.Segmenter` for locale-aware word segmentation (recommended for CJK languages), or a custom callback or RegExp pattern that does not match the empty string. |

Returns a `TransformStream` that buffers incoming text and reasoning chunks, releases content when the chunking pattern is encountered, adds configurable delays between chunks, and passes through non-text/reasoning chunks (like tool calls, step-finish events) immediately.

Japanese with `Intl.Segmenter`:

```ts
const segmenter = new Intl.Segmenter('ja', { granularity: 'word' });

const result = streamText({
  model,
  prompt: 'Your prompt here',
  experimental_transform: smoothStream({
    chunking: segmenter,
  }),
});
```

Regex chunking (global and sticky expressions are supported):

```ts
// To split on underscores:
smoothStream({
  chunking: /_+/,
});
```

Custom callback chunking:

```ts
smoothStream({
  chunking: text => {
    const findString = 'some string';
    const index = text.indexOf(findString);

    if (index === -1) {
      return null;
    }

    return text.slice(0, index) + findString;
  },
});
```

## Notes

- Word chunking does not work well with languages that do not delimit words with spaces: Chinese, Japanese, Korean, Vietnamese, Thai. Use `Intl.Segmenter` for these.
- `Intl.Segmenter` is available in Node.js 16+ and all modern browsers (Chrome 87+, Firefox 125+, Safari 14.1+).
- The RegExp must not match the empty string.
- `experimental_transform` is an experimental `streamText` option.

## Related

- [streamText](./stream-text.md)
- [Generating Text](./generating-text.md)
