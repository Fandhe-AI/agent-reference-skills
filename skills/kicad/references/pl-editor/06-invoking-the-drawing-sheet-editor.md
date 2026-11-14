# Invoking the Drawing Sheet Editor

The Drawing Sheet Editor can be launched in two ways.

## From the Command Line

Adapted (not in the official docs): concrete example of the manual's syntax `pl_editor <*.kicad_wks file to open>`.

```sh
pl_editor "path/to/sheet.kicad_wks"
```

Passing a `.kicad_wks` file path opens that file directly.

## From the KiCad Project Manager

Launch it from the KiCad Project Manager (Drawing Sheet Editor launcher, default hotkey `Ctrl+Y`).

## Notes

- The default KiCad drawing sheet is displayed until a different drawing sheet file is opened
- The command-line executable is `pl_editor`
- The manual writes the syntax as `pl_editor <*.kicad_wks file to open>`; the angle brackets are placeholder notation, not shell syntax

## Related

- [Drawing Sheet Editor Files](./02-drawing-sheet-editor-files.md)
- [Drawing Sheet Editor Commands](./07-drawing-sheet-editor-commands.md)
