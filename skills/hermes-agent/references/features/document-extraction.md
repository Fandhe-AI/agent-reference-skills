# Document Extraction

The `read_file` tool automatically converts common document formats to readable Markdown text so the agent can inspect PDFs and spreadsheets like source code.

## Signature / Usage

```bash
# Render a few unreadable (scanned) PDF pages to images, then inspect with vision_analyze
pdftoppm -jpeg -r 150 -f 92 -l 94 document.pdf $TMPDIR/page
```

## Supported formats

| Format | Extensions | Converter | Availability |
|--------|-----------|-----------|--------------|
| Jupyter notebooks | `.ipynb` | Built-in (stdlib) | Always |
| Word documents | `.docx` | Built-in (stdlib) | Always |
| Excel workbooks | `.xlsx` | Built-in (stdlib) | Always |
| SQLite databases | `.db`, `.sqlite`, `.sqlite3` | Built-in (stdlib) | Always |
| PDF | `.pdf` | Optional `anydoc` converter | Auto-installed on first use |
| Legacy Office | `.doc`, `.ppt`, `.xls`, `.pptx`, and variants | Optional `anydoc` converter | Auto-installed on first use |
| OpenDocument | `.odt`, `.ods`, `.odp` | Optional `anydoc` converter | Auto-installed on first use |
| Rich text / eBooks | `.rtf`, `.epub` | Optional `anydoc` converter | Auto-installed on first use |

## Notes

- The optional converter is the `firecrawl-anydoc` package, installed lazily where permitted (`security.allow_lazy_installs` in `config.yaml`). Without it the three stdlib formats still work; other formats fall back to the binary-file guard.
- SQLite files render as a schema overview (each table's `CREATE` statement, row count, first five rows, plus indexes, views, triggers), opened read-only (`mode=ro&immutable=1`). A non-SQLite `.db` is refused. Hermes's own read denylist applies first.
- `read_file` flags unresolved git merge conflicts with `conflict_blocks: N` when the returned range contains balanced `<<<<<<< ` / `>>>>>>> ` markers.
- Output is Markdown paginated via `offset` / `limit`. East Asian phonetic guides (XLSX `rPh`, DOCX ruby text) are not part of the extracted value. Documents over 50 MB are refused. Notebook cell outputs over 20,000 characters are truncated with a `jq` hint.
- Works with remote terminal backends (Docker, Modal, SSH): bytes are transferred and converted host-side.
- PDF conversion reads the text layer only. When over 20% of pages (or 10+ pages) yield no text, `read_file` prepends an `EXTRACTION COVERAGE WARNING` listing unreadable page ranges, each labeled with the last text extracted before it. Recovery: render a few pages with `pdftoppm` and use `vision_analyze`; for many pages use the `ocr-and-documents` skill (marker-pdf, ~3-5 GB install).
- Detection uses poppler's `pdftotext`; if poppler is missing, extraction still works and the coverage check is silently skipped.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/document-extraction (pinned to v0.22.2)

## Related

- [Tools](./tools.md)
- [Vision](./vision.md)
