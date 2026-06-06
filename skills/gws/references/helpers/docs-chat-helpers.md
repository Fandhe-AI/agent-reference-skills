# Docs and Chat Helpers

Hand-crafted helper commands for appending text to Google Docs and sending messages to Google Chat spaces.

## docs +write

Append plain text to a Google Docs document. Internally converts plain text to the Docs `batchUpdate` JSON format.

### Usage

```bash
gws docs +write --document DOC_ID --text "Hello, world!"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--document` | Yes | Document ID |
| `--text` | Yes | Text to append (plain text) |

## Notes

- Content is inserted at the end of the document body.
- For advanced formatting (headings, tables, inline styles), use the raw `gws docs documents batchUpdate --params '{...}'` API.

---

## chat +send

Send a message to a Google Chat space.

### Usage

```bash
gws chat +send --space spaces/AAAAxxxx --text "Hello team!"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--space` | Yes | Space name (e.g. `spaces/AAAA...`) |
| `--text` | Yes | Message text (plain text) |

## Notes

- Use `gws chat spaces list` to discover available space names/IDs.
- For cards, threaded replies, or rich formatting, use the raw Chat API via Discovery commands.

## Related

- [helpers-overview.md](./helpers-overview.md)
- [workflow-helpers.md](./workflow-helpers.md)
