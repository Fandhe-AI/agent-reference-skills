# File APIs

ChatGPT supports file upload/download helpers as optional `window.openai` extensions, and a schema convention for declaring file inputs on tool descriptors.

## Signature / Usage

```tsx
// Upload a user-selected file
const { fileId } = await window.openai.uploadFile(file, {
  library: true,
});

// Select files the user already uploaded to ChatGPT
if (window.openai?.selectFiles) {
  const files = await window.openai.selectFiles();
  // [{ fileId, fileName, mimeType }]
}

// Request a temporary download URL
const { downloadUrl } = await window.openai.getFileDownloadUrl({ fileId });
```

```json
{
  "name": "analyze_file",
  "title": "Analyze file",
  "description": "Analyzes a user-provided file without modifying it.",
  "inputSchema": {
    "type": "object",
    "$defs": {
      "OpenAIFile": {
        "type": "object",
        "properties": {
          "download_url": { "type": "string" },
          "file_id": { "type": "string" },
          "mime_type": { "type": "string" },
          "file_name": { "type": "string" }
        },
        "required": ["download_url", "file_id"],
        "additionalProperties": false
      }
    },
    "properties": {
      "file": { "$ref": "#/$defs/OpenAIFile" }
    },
    "required": ["file"]
  },
  "annotations": {
    "readOnlyHint": true,
    "openWorldHint": false,
    "destructiveHint": false
  },
  "_meta": {
    "openai/fileParams": ["file"]
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `window.openai.uploadFile(file, { library?: boolean })` | function | Upload a user-selected file and receive a `fileId`. `{ library: true }` also saves the upload to the user's ChatGPT file library when available. |
| `window.openai.selectFiles()` | function | Open the file library picker for existing files. Returns `[{ fileId, fileName, mimeType }]`. Feature-detect this helper. |
| `window.openai.getFileDownloadUrl({ fileId })` | function | Request a temporary download URL. Works for files uploaded by the widget, selected from the file library, passed via file params, or returned by tool file references. |
| `_meta["openai/fileParams"]` | string[] | List of top-level input fields that represent files, declared on the tool descriptor. |
| `download_url` | string | File object property; required, must be in `required`. |
| `file_id` | string | File object property; required, must be in `required`. |
| `mime_type` | string | File object property; declared but optional (not in `required`). |
| `file_name` | string | File object property; declared but optional (not in `required`). |

## Notes

- The ChatGPT file library is optional and may not be available to every user. Feature-detect `window.openai.selectFiles` and fall back to `window.openai.uploadFile`.
- Every file object schema must declare all four properties (`download_url`, `file_id`, `mime_type`, `file_name`); the **Scan Tools** step and plugin submission reject a schema that omits any property, does not require `download_url`/`file_id`, marks either optional property as required, or requires a property other than those two. Extra optional properties are allowed.
- To accept more than one file, define the top-level field as an array using the same file object schema in `items`.
- At runtime, ChatGPT passes file values with snake_case fields (`download_url`, `file_id`, `mime_type`, `file_name`); it always includes `download_url` and `file_id`, and may omit `mime_type`/`file_name`. Use `file_id` as `fileId` for `window.openai.getFileDownloadUrl({ fileId })`.
- When persisting widget state, use the structured shape (`modelContent`, `privateContent`, `imageIds`) if you want the model to see image IDs during follow-up turns.

## Related

- [window-openai-bridge.md](./window-openai-bridge.md)
- [tool-descriptor-meta.md](./tool-descriptor-meta.md)
