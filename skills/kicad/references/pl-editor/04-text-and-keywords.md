# Text and Keywords

Text items in drawing sheets support static strings and dynamic keyword substitution using the `${KEYWORD}` syntax.

## Signature / Usage

```
${KEYWORD}
```

Example: `Size: ${PAPER}` displays `Size: A4` when the paper size is A4.

## Supported Keywords

| Keyword | Description |
|---------|-------------|
| `KICAD_VERSION` | Version number of KiCad |
| `#` | Sheet number |
| `##` | Total number of sheets |
| `COMMENT1` – `COMMENT9` | Contents of the Comment<n> field in Page Setup |
| `COMPANY` | Contents of the Company field in Page Setup |
| `FILENAME` | Filename of the schematic or PCB design file, with extension |
| `ISSUE_DATE` | Contents of the Issue Date field in Page Setup |
| `LAYER` | Name of the current PCB layer (blank in the Schematic and Board Editors; only shown in plots of PCB designs) |
| `PAPER` | Current sheet's paper size (set in Page Setup) |
| `REVISION` | Contents of the Revision field in Page Setup |
| `SHEETNAME` | Sheet name of the current sheet (blank in board editor) |
| `SHEETPATH` | Sheet path of the current sheet (blank in board editor) |
| `TITLE` | Contents of the Title field in Page Setup |

## Multi-line Text

Two methods are available for inserting line breaks in text items:

1. Insert the `\n` two-character sequence (mainly in the Page Setup dialog in KiCad)
2. Insert a new line directly in the Drawing Sheet Editor design window

Keywords behave like text variables in the Schematic and Board Editors, but their values are set automatically by the editor or by the user in Page Setup. In Preview display mode, keywords are replaced with values (configurable in the Page Preview Settings dialog); in Edit mode, they are shown unreplaced.

## Multi-line Text in Page Setup Dialog

The Page Setup dialog's text controls do not natively accept Enter for line breaks. Use the `\n` sequence instead. To display a literal `\n` (backslash + n), enter `\\n`.

## Related

- [Properties Editor](./08-properties-editor.md)
- [Constraints](./05-constraints.md)
