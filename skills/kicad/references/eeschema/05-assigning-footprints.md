# Assigning Footprints

Footprints define the physical PCB land pattern for a schematic symbol. They must be assigned before updating the PCB. Four methods are available.

## Method 1: Symbol Properties

Open the symbol properties dialog (**E** or double-click), then edit the **Footprint** field.

- Type the footprint directly in the format `library:footprint_name`
- Or click the library icon button to open the **Footprint Chooser** dialog for browsing and preview

The Footprint field "defines which footprint will correspond to the symbol in the board design." Symbol fields are copied to footprints by Update PCB from Schematic only when **Update footprint fields from symbols** is checked (see Forward and Back Annotation).

### Footprint Filtering

If a symbol defines footprint filters, the **apply footprint filters** option in the Footprint Chooser hides non-matching footprints; the **filter by pin count** option lists only footprints matching the symbol's pin count. The search field accepts `*` and `?` wildcards.

## Method 2: During Symbol Placement

When placing a symbol via the symbol chooser dialog, a symbol with a default footprint is preassigned that footprint and shows a preview; otherwise the dropdown reads "No default footprint". If footprint filters are defined, matching footprints appear in the dropdown and the selected one is assigned when the symbol is placed. Footprint options appear only after footprint libraries are loaded (first opening of the Footprint Editor or Footprint Library Browser in a session).

## Method 3: Footprint Assignment Tool

Access via **Tools** → **Assign Footprints…** or the top-toolbar icon. Three panes: footprint libraries (left), schematic symbols (center), footprints (right). Double-click a footprint to assign it to the selected symbol; the next unassigned symbol is selected automatically. Click **OK** to save, **Cancel** to discard, or **Apply, Save Schematic & Continue** to save without exiting. Filters: symbol footprint filters, pin count, selected library, and a text box.

**Equivalence files (`.equ`):** **Preferences** → **Manage Footprint Association Files** (in the tool) manages them; the toolbar button runs automatic association. Symbols that already have a footprint are not updated; the last matching file wins. Line format: `'<symbol value>' '<footprint library>:<footprint name>'`, lines starting with `#` are comments.

## Method 4: Symbol Fields Table

Edit the Footprint field of every symbol in one place in the Symbol Fields Table (top-toolbar button). The manual also names the menu entry **Tools** → **Edit Symbol Fields…** here, while the variants chapter and the actions reference use **Bulk Edit Symbol Fields…**.

## Footprint Field Format

```
<library_nickname>:<footprint_name>
```

Example: `Resistor_SMD:R_0402_1005Metric`

## Notes

- ERC "Footprint link issue" (default Warning) covers an invalid footprint identifier, a footprint library that is not in the enabled library table, or a footprint missing from its library. ERC "Assigned footprint doesn't match footprint filters" is also a Warning by default.
- Footprint filters on a symbol are defined in the symbol editor and restrict which footprints are offered in the chooser.
- Not found in the 10.0 manual: the cvpcb standalone tool, a warning for symbols with an empty Footprint field, the `KICAD_FOOTPRINT_DIR` environment variable (the lower-right preview position is stated in the Placing symbols section, not in this chapter).
- The footprint example is not from the 10.0 schematic manual; `R_0402_1005Metric` is the name used in the KiCad standard library (and in the PCB Editor manual).

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Forward and Back Annotation](./06-forward-and-back-annotation.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
