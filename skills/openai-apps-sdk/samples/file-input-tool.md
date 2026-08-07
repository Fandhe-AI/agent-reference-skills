# Tool Accepting an Uploaded File

Declare a tool input that accepts a ChatGPT-uploaded/selected file by referencing the four required `OpenAIFile` schema properties and flagging the parameter via `_meta["openai/fileParams"]`.

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

## Notes

- Each file object must declare all four properties (`download_url`, `file_id`, `mime_type`, `file_name`); only `download_url` and `file_id` go in `required`, but the other two must still be present in the schema.
- `_meta["openai/fileParams"]` lists which top-level input properties are file objects so ChatGPT knows to populate them from upload/library selection/download UI.
- Pair `readOnlyHint: true` with file-analysis tools that don't mutate the file, per the tool-annotations convention.
- This is the ChatGPT-app (server/publisher) side of MCP; consuming MCP servers from the Agents SDK is covered by the `openai-agents` skill.

Source: https://developers.openai.com/plugins/reference
