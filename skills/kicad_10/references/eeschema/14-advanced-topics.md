# Advanced Topics

Configuration, text variables, database libraries, HTTP libraries, and custom output formats.

## Configuration and Customization

Access all preferences via **Preferences** → **Preferences…**

### Preference Categories (Schematic Editor)

| Category | Options |
|----------|---------|
| Hotkeys | Assign/reassign keyboard shortcuts |
| Mouse and Touchpad | Drag gestures, scroll behavior |
| Display Options | Grid appearance, rendering, visual overrides |
| Editing Options | Auto-annotation, wire angles, selection behavior |
| Colors | Color scheme for all schematic object types |

### Hotkey File Location

| OS | Path |
|----|------|
| Windows | `%APPDATA%\kicad\10.0\user.hotkeys` |
| Linux | `~/.config/kicad/10.0/user.hotkeys` |
| macOS | `~/Library/Preferences/kicad/10.0/user.hotkeys` |

Import hotkey files via the **Import Hotkeys** button in the hotkey editor.

## Text Variables

Text variables enable dynamic content substitution in labels, title blocks, and symbol fields using the syntax `${VARIABLE_NAME}`.

### Defining Variables

Project-level variables are defined in **File** → **Schematic Setup** → **Text Variables**.

### Variable Categories

**Project variables** (defined in Schematic Setup):
- Custom key-value pairs available anywhere in the project

**Symbol variables** (auto-available for symbol fields and labels):

| Variable | Value |
|----------|-------|
| `${SYMBOL_NAME}` | Symbol name from library |
| `${SYMBOL_LIBRARY}` | Library the symbol originates from |
| `${DNP}` | "DNP" if Do Not Populate is set, otherwise empty |
| `${EXCLUDE_FROM_BOARD}` | "Exclude from board" attribute state |
| `${EXCLUDE_FROM_SIM}` | "Exclude from simulation" attribute state |
| `${EXCLUDE_FROM_BOM}` | "Exclude from BOM" attribute state |

**Sheet variables** (title block):
- `${TITLE}`, `${DATE}`, `${REV}`, `${COMPANY}`, `${COMMENT1}` ... `${COMMENT9}`
- `${SHEETNAME}`, `${SHEETPATH}`, `${SHEETNUMBER}`, `${SHEETCOUNT}`
- `${PROJECTNAME}`, `${FILENAME}`

**Variant variable:**
- `${VARIANT}` — current active variant name

### Usage Example

In a label or title block:
```
${SYMBOL_LIBRARY}:${SYMBOL_NAME}
```
Renders as `Device:R` for a resistor from the Device library.

## Text Expressions

Numeric fields support basic mathematical expressions for inline calculation.

### Syntax

Enter expressions in property dialogs. The expression evaluates when the dialog is closed.

```
2 * 2mm     → 4mm
1in + 1mm   → 26.4mm
(10 + 5)k   → 15k
```

Supported:
- Basic arithmetic: `+`, `-`, `*`, `/`
- Parentheses for grouping
- Unit suffixes: `mm`, `in`, `mil`, `k`, `M`, `u`, `n`, etc.
- Automatic unit conversion

## Database Libraries

Database libraries allow symbols to be sourced from an external database via ODBC, enabling integration with component management systems (PDM, PLM, etc.).

### Configuration

Database libraries are configured via a `.kicad_dbl` JSON file:

```json
{
  "meta": { "version": 0 },
  "name": "My Database Library",
  "description": "Parts from internal database",
  "source": {
    "type": "odbc",
    "dsn": "MyComponentDB",
    "username": "",
    "password": "",
    "timeout_seconds": 2
  },
  "libraries": [
    {
      "name": "Resistors",
      "table": "Resistors",
      "key": "Part ID",
      "symbols": "Symbol",
      "footprints": "Footprint",
      "fields": [
        { "column": "Manufacturer", "name": "Manufacturer", "visible_on_add": false },
        { "column": "MPN", "name": "MPN", "visible_on_add": true }
      ],
      "properties": {
        "description": "Description",
        "keywords": "Keywords"
      }
    }
  ]
}
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| DSN | ODBC Data Source Name configured at the OS level |
| Table | Database table or view mapped to a symbol category |
| Key | Primary key column identifying each component |
| Field mapping | Maps database columns to KiCad symbol fields |
| Caching | Local cache improves performance for large databases |

Add the `.kicad_dbl` file to the Symbol Library Table as a library.

### Filtering

Database query results can be filtered using SQL WHERE clause syntax within the library configuration to restrict which components appear.

## HTTP Libraries

HTTP libraries source symbol data from a REST API endpoint, enabling cloud-hosted component databases.

### Configuration

HTTP libraries are configured via a `.kicad_httplib` JSON file:

```json
{
  "meta": { "version": 1 },
  "name": "Cloud Component Library",
  "description": "REST API component source",
  "source": {
    "type": "rest",
    "root_url": "https://components.example.com/api/v1",
    "token": "your_api_token_here",
    "timeout_seconds": 10,
    "cache_max_age": 3600
  }
}
```

The REST API must implement the KiCad HTTP library protocol (endpoints for listing libraries, listing symbols, and fetching individual symbol data).

### Authentication

API tokens are passed via HTTP Authorization headers. The token is stored in the library configuration file.

## Custom Netlist and BOM Formats

### Python Scripts

Custom netlist and BOM generators can be written in Python and installed as KiCad plugins.

**BOM script API:** Scripts receive a component list and output to the desired format (CSV, JSON, XML, etc.). Place scripts in the KiCad scripting directory.

**Netlist script API:** Scripts receive the complete netlist data structure and output to any text-based format.

### XSLT Transforms

KiCad can apply XSLT transformations to the intermediate XML netlist format to produce custom output:

1. Export netlist as XML (intermediate format).
2. Apply an XSLT stylesheet via the netlist export dialog.
3. Output is the XSLT-transformed result.

### Managing Scripts

Netlist and BOM scripts are managed in the respective export dialogs:
- **Generate BOM** dialog — select or add a Python BOM script
- **Netlist** export dialog — select or add a netlist script

### Default Script Locations

| OS | Path |
|----|------|
| Windows | `%APPDATA%\kicad\10.0\scripting\plugins\` |
| Linux | `~/.config/kicad/10.0/scripting/plugins/` |
| macOS | `~/Library/Preferences/kicad/10.0/scripting/plugins/` |

## Notes

- Database and HTTP libraries require read access to the external data source at library load time. Offline operation depends on the cache configuration.
- Text variable names are case-sensitive.
- XSLT-based netlist transforms require an external XSLT processor unless KiCad's built-in support is used.

## Related

- [Generating Outputs](./07-generating-outputs.md)
- [Design Variants](./08-design-variants.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
