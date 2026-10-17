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

**Symbol fields and attributes** (resolve only inside the symbol's own text and fields, or as `${<refdes>:<FIELD>}` elsewhere):

| Variable | Value |
|----------|-------|
| `${SYMBOL_NAME}` | Symbol name from library |
| `${SYMBOL_LIBRARY}` | Library the symbol originates from |
| `${DNP}` | "DNP" if Do Not Populate is set, otherwise empty |
| `${EXCLUDE_FROM_BOARD}` | "Excluded from board" if the attribute is set, otherwise empty |
| `${EXCLUDE_FROM_SIM}` | Friendly attribute name if set, otherwise empty |
| `${EXCLUDE_FROM_BOM}` | Friendly attribute name if set, otherwise empty |

**Sheet variables** (title block):
- `${TITLE}`, `${ISSUE_DATE}`, `${REVISION}`, `${COMPANY}`, `${COMMENT1}` ... `${COMMENT9}`
- `${SHEETNAME}`, `${SHEETPATH}`, `${SHEETFILE}`, `${#}` (sheet number), `${##}` (total sheet count)
- `${PROJECTNAME}`, `${FILENAME}`, `${FILEPATH}`
- `${CURRENT_DATE}`, `${CURRENT_TIME_HH_MM_SS}`, `${CURRENT_TIME_LOCALE}`, `${VCSHASH}`, `${VCSSHORTHASH}`

**Variant variables:**
- `${VARIANT}` — current active variant name (empty string when the default variant is active)
- `${VARIANT_DESC}` — description of the active variant (empty when default or no description)

### Usage Example

In a symbol field, or as a virtual field name in the Symbol Fields Table:
```
${SYMBOL_LIBRARY}:${SYMBOL_NAME}
```
Renders as `Device:R` for a resistor from the Device library. From a label or the title block, address the symbol explicitly (e.g. `${R1:SYMBOL_LIBRARY}:${R1:SYMBOL_NAME}`).

## Text Expressions

Text expressions are evaluated inside text objects (graphic text, symbol and footprint text and fields, drawing sheet fields) using the `@{expression}` syntax. The whole `@{...}` is replaced by the result; if it cannot be evaluated, the original text is kept.

### Syntax

```
@{1 + 1}           → 2
@{1mm + 1in}       → 26.4
@{upper("string")} → STRING
@{max(abs(${var}), 5)}
```

Supported:
- Arithmetic operators: `+`, `-`, `*`, `/`, `%` (modulo), `^` (exponentiation, right-associative); `+` also concatenates strings
- Parentheses for grouping; nested evaluations; scientific notation (`2e3`)
- Unit suffixes; results are printed in SI units without the unit
- Functions such as `abs`, `sqrt`, `pow`, `max`, `upper`, `concat`; text variables can be combined (`${var}`)

## Database Libraries

Database libraries allow symbols to be sourced from an external database via ODBC, enabling integration with component management systems (PDM, PLM, etc.).

### Configuration

Database libraries are configured via a `.kicad_dbl` JSON file (Adapted (not in the official docs): simplified from the manual's template; see Notes):

```json
{
  "meta": { "version": 0 },
  "name": "My Database Library",
  "description": "Parts from internal database",
  "globally_unique_keys": false,
  "source": {
    "type": "odbc",
    "dsn": "MyComponentDB",
    "username": "",
    "password": "",
    "timeout_seconds": 2,
    "connection_string": ""
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
| `connection_string` | Alternative to DSN; passed directly to the ODBC driver and must start with a `Driver` key (`dsn`, `username`, `password` are then ignored) |
| `globally_unique_keys` | Optional, default `false`. `true`: library link is `LIB_NAME:KEY`; `false`: `LIB_NAME:SUB_LIB_NAME/KEY`. Changing it on an existing library breaks placed links |
| Field options | `visible_on_add`, `visible_in_chooser`, `show_name`, `inherit_properties` (all default `false`) |
| `properties` | Maps `description`, `keywords`, `exclude_from_bom`, `exclude_from_board`, `exclude_from_sim` (numeric 0/1 columns) to columns; `footprint_filters` is reserved |

Add the `.kicad_dbl` file to the global symbol library table using the Configure Symbol Libraries dialog (opened with **Preferences** → **Manage Symbol Libraries…**; the database-library section of the manual calls it the Configure Symbol Libraries dialog). Only ODBC connections are supported. Parts placed from the database use the Symbol Chooser and can be refreshed with Update Symbols from Library.

## HTTP Libraries

HTTP libraries source symbol data from a REST API endpoint, enabling cloud-hosted component databases.

### Configuration

HTTP libraries are configured via a `.kicad_httplib` JSON file:

```json
{
  "meta": { "version": 1.0 },
  "name": "KiCad HTTP Library",
  "description": "A KiCad library sourced from a REST API",
  "source": {
    "type": "REST_API",
    "api_version": "v1",
    "root_url": "http://localhost:8000/kicad-api",
    "token": "usertokendatastring",
    "timeout_parts_seconds": 60,
    "timeout_categories_seconds": 600
  }
}
```

Replace the `root_url` and `token` values with your own. Save the file with the `.kicad_httplib` extension and add it to the global symbol library table via **Preferences** → **Manage Symbol Libraries…**. `timeout_parts_seconds` (default 60) and `timeout_categories_seconds` (default 600) set how long part and category data stay valid. HTTP libraries are read only. Categories are cached once when the Symbol Chooser opens; server-side category changes need a KiCad restart. For the server protocol, the manual refers to the APIs and Bindings section at dev-docs.kicad.org.

### Authentication

Authentication is by access token only (the `token` value in the configuration file); ask the library administrator to issue a valid token.

## Custom Netlist and BOM Formats

### Generator Scripts

KiCad writes an intermediate XML netlist file, then runs a generator command that transforms it into the target netlist or BOM format. Python and XSLT are commonly used; any tool works if a command line can be specified.

Command-line placeholders: `%I` (intermediate netlist, `<project path>/<project name>.xml`), `%O` (output path without extension), `%B` (output base name without path or extension), `%P` (project directory). Quote arguments.

```
/usr/bin/python3 /usr/share/kicad/plugins/bom_csv_grouped_by_value.py "%I" "%O.csv"
```

### Managing Scripts

- **Netlist export** dialog — **Add Generator…** adds a generator (name + command); the name becomes the tab label.
- **Legacy BOM tool** (**Tools** → **Generate Legacy Bill of Materials…**) — add scripts to the BOM generator scripts list with the add button; the remove button deletes, and the edit button opens the script in a text editor. A script header comment containing `@package` supplies the description shown in the dialog.
- **Tools** → **Generate Bill of Materials…** opens the Export tab of the Symbol Fields Table (the current, non-script BOM tool).

### Installed Generator Script Locations

| OS | Path |
|----|------|
| Windows | `C:\Program Files\KiCad\10.0\bin\scripting\plugins\` |
| Linux | `/usr/share/kicad/plugins/` |
| macOS | `/Applications/KiCad/KiCad.app/Contents/SharedSupport/plugins/` |

## Notes

- Database and HTTP libraries require read access to the external data source at library load time. HTTP libraries keep part / category data for `timeout_parts_seconds` / `timeout_categories_seconds`; offline behavior is not described in the 10.0 manual.
- Not found in the 10.0 manual: the Preference Categories table (the manual's "Configuration and Customization" section is marked not yet written), the case-sensitivity of text variable names, database-library "Filtering" with SQL WHERE and a local cache, and a user scripting directory (`.../10.0/scripting/plugins/`).
- Removed as not found in the 10.0 manual: "XSLT transforms require an external processor unless built-in support is used" and the earlier "BOM / netlist script API" descriptions; the manual only describes the intermediate XML file and generator command lines.
- Generator command example for XSLT: `xsltproc -o "%O.net" "/usr/share/kicad/plugins/netlist_form_pads-pcb.asc.xsl" "%I"`.
- Deviation from source: the manual's xsltproc example leaves `%O` / `%I` unquoted; they are quoted here per the manual's own recommendation, because they expand to absolute paths that may contain spaces.
- XSLT is not recommended for new exporters; xsltproc is no longer installed with KiCad since KiCad 7 (install it separately).
- Adapted from the manual's `.kicad_dbl` template: `dsn`, column names (`Symbol` / `Footprint`), field entries and the `properties` map were changed for illustration; see the manual for the full template (including `visible_in_chooser`, `show_name`, `inherit_properties`, `footprint_filters`, `exclude_from_bom`, `exclude_from_board`).
- Adapted from the manual's Virtual fields example; symbol fields are accessible only within their parent object (use `${<refdes>:<FIELD>}` from labels or the title block).
- Not found in the 10.0 manual: use an `https://` `root_url` for non-local servers, since the token is sent with each request; keep real tokens out of version-controlled `.kicad_httplib` files.

## Related

- [Generating Outputs](./07-generating-outputs.md)
- [Design Variants](./08-design-variants.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
