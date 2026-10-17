---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#content
---

# Content types

`ContentBlock` and its members (`TextContent`, `ImageContent`, `AudioContent`, `ResourceLink`, `EmbeddedResource`) plus `TextResourceContents` / `BlobResourceContents`, from `@category Content`.

## Signature / Usage

```ts
export type ContentBlock =
  TextContent | ImageContent | AudioContent | ResourceLink | EmbeddedResource;

/** Text provided to or from an LLM. */
export interface TextContent {
  type: "text";
  /** The text content of the message. */
  text: string;
  /** Optional annotations for the client. */
  annotations?: Annotations;
  _meta?: MetaObject;
}

/** An image provided to or from an LLM. */
export interface ImageContent {
  type: "image";
  /** The base64-encoded image data. @format byte */
  data: string;
  /** The MIME type of the image. Different providers may support different image types. */
  mimeType: string;
  annotations?: Annotations;
  _meta?: MetaObject;
}

/** Audio provided to or from an LLM. */
export interface AudioContent {
  type: "audio";
  /** The base64-encoded audio data. @format byte */
  data: string;
  /** The MIME type of the audio. Different providers may support different audio types. */
  mimeType: string;
  annotations?: Annotations;
  _meta?: MetaObject;
}

/**
 * A resource that the server is capable of reading, included in a prompt or tool call result.
 *
 * Note: resource links returned by tools are not guaranteed to appear in the results of {@link ListResourcesRequest | resources/list} requests.
 */
export interface ResourceLink extends Resource {
  type: "resource_link";
}

/**
 * The contents of a resource, embedded into a prompt or tool call result.
 *
 * It is up to the client how best to render embedded resources for the benefit
 * of the LLM and/or the user.
 */
export interface EmbeddedResource {
  type: "resource";
  resource: TextResourceContents | BlobResourceContents;
  annotations?: Annotations;
  _meta?: MetaObject;
}

export interface TextResourceContents extends ResourceContents {
  /** The text of the item. This must only be set if the item can actually be represented as text (not binary data). */
  text: string;
}

export interface BlobResourceContents extends ResourceContents {
  /** A base64-encoded string representing the binary data of the item. @format byte */
  blob: string;
}

/** @internal */
export interface ResourceContents {
  /** The URI of this resource. @format uri */
  uri: string;
  /** The MIME type of this resource, if known. */
  mimeType?: string;
  _meta?: MetaObject;
}
```

Example (`examples/TextContent/text-content.json`):

```json
{
  "type": "text",
  "text": "Tool result text"
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `"text" \| "image" \| "audio" \| "resource_link" \| "resource"` | Discriminator of `ContentBlock` |
| `annotations` | `Annotations` | Audience / priority / lastModified hints |
| `_meta` | `MetaObject` | Extension metadata |

## Notes

- `ToolUseContent` and `ToolResultContent` (type `tool_use` / `tool_result`) are not in `ContentBlock`; they belong to `SamplingMessageContentBlock` and are Deprecated in 2026-07-28 (SEP-2577). See the sampling types page.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. Single-line JSDoc comments are collapsed; `@example` / `{@includeCode}` directives omitted.

## Related

- [Common Types](./common-types.md)
- [tools/* types](./tools-types.md)
- [resources/* types](./resources-types.md)
- [sampling/createMessage types](./sampling-types.md)
