# Deliverable Mode (Artifacts in Chat)

In a messaging gateway (Slack, Discord, Telegram, WhatsApp, Signal, etc.), generated files are delivered as native attachments. The agent only generates the file and mentions its absolute path as plain text; the gateway extracts the path, hides it from the visible message, and uploads the file.

## Signature / Usage

```python
kanban_complete(
    summary="rendered Q3 revenue chart and report",
    artifacts=[
        "~/.hermes/cache/scratch/q3-revenue.png",
        "~/.hermes/cache/scratch/q3-report.pdf",
    ],
)
```

## Supported file extensions

| Category | Extensions | Delivery |
|---|---|---|
| Images | `.png .jpg .jpeg .gif .webp .bmp .tiff .svg` | Inline embed |
| Video | `.mp4 .mov .avi .mkv .webm .3gp` | Inline embed (where supported) |
| Audio | `.mp3 .m2a .wav .ogg .opus .m4a .flac` | Voice / audio attachment |
| Documents | `.pdf .docx .doc .odt .rtf .txt .md .epub` | File upload |
| Data | `.xlsx .xls .ods .csv .tsv .json .xml .yaml .yml` | File upload |
| Geospatial | `.kmz .kml .geojson .gpx` | File upload |
| Presentations | `.pptx .ppt .odp .key` | File upload |
| Archives | `.zip .tar .gz .tgz .bz2 .xz .7z .rar .apk .ipa` | File upload |
| Web | `.html .htm` | File upload |

## Notes

- Any absolute path (`~/.hermes/cache/scratch/...`) or home-relative path (`~/...`) ending in a supported extension is extracted. Paths inside code blocks and inline code are ignored.
- `.py`, `.log` and other source-file extensions are intentionally excluded; send code in a code block.
- File-producing tools: `execute_code` (matplotlib charts), the `docx`, `xlsx`, `pdf`, `latex-pdf-report`, `powerpoint` skills, `image_generate`, `text_to_speech`.
- The agent does not produce artifacts by default; ask explicitly, or add the bias to `AGENTS.md` / `CLAUDE.md` / `.cursorrules`, `~/.hermes/SOUL.md`, or a preset under `agent.personalities` in `~/.hermes/config.yaml` (switch with `/personality`).
- Kanban: artifacts passed to `kanban_complete` are uploaded with the "task completed" notification to subscribers; files that do not exist when the notifier runs are silently skipped.
- Other services (Notion, GitHub, Linear, Slack, Gmail, Salesforce, Snowflake / BigQuery, Google Drive) connect through MCP servers under `mcp_servers` in `~/.hermes/config.yaml`.
- OAuth tokens stay on the user's machine in `auth.json` / `.env`; no hosted token storage.

## Related

- [MCP](./mcp.md)
- [Personality](./personality.md)
