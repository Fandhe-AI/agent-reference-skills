# Assigning Footprints

Footprints define the physical PCB land pattern for a schematic symbol. They must be assigned before updating the PCB. Three methods are available.

## Method 1: Symbol Properties

Open the symbol properties dialog (**E** or double-click), then edit the **Footprint** field.

- Type the footprint directly in the format `library:footprint_name`
- Or click the library icon button to open the **Footprint Chooser** dialog for browsing and preview

The Footprint field "defines which footprint will correspond to the symbol in the board design." All symbol fields propagate to the corresponding footprint when the PCB is updated from the schematic.

### Footprint Filtering

If a symbol defines footprint filters, only matching footprints appear in the dropdown in the chooser. This prevents assigning incompatible footprints.

## Method 2: During Symbol Placement

When placing a symbol via the symbol chooser dialog, if the symbol specifies a default footprint it is previewed in the lower-right corner. You can verify or change the footprint assignment before placing the symbol.

## Method 3: Footprint Assignment Tool

Access via **Tools** → **Assign Footprints** (or the cvpcb standalone tool). This dedicated interface lists all symbols and allows batch footprint assignment across the entire design. Useful for assigning footprints to many symbols at once.

## Footprint Field Format

```
<library_nickname>:<footprint_name>
```

Example: `Resistor_SMD:R_0402`

## Notes

- A symbol without a footprint assigned will generate an ERC warning and will appear unmatched during PCB update.
- Footprint filters on a symbol are defined in the symbol editor and restrict which footprints are offered in the chooser.
- The `KICAD_FOOTPRINT_DIR` environment variable points to the default footprint library location.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Forward and Back Annotation](./06-forward-and-back-annotation.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
