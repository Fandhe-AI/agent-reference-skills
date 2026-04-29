# Advanced Topics

Configuration, text automation, custom design rules, scripting, and other advanced PCB Editor capabilities.

## Configuration and Customization

Access via **Preferences → Preferences…**

| Category | Options |
|----------|---------|
| Mouse and Touchpad | Pan/zoom behavior, scroll direction |
| Hotkeys | Assign or rebind keyboard shortcuts |
| Toolbar | Customize toolbar contents and layout |
| Display | Cross-probing, grid rendering, layer display |
| Editing | Snapping behavior, grid overrides per object type, DRC display |

Hotkey configuration is stored in `user.hotkeys`:
- Windows: `%APPDATA%\kicad\10.0\`
- Linux: `~/.config/kicad/10.0/`
- macOS: `~/Library/Preferences/kicad/10.0/`

## Text Variables

Project-wide variables for dynamic text substitution.

**Definition:** Board Setup → Text Variables

**Usage in text objects:**
```
${VARIABLENAME}
```

**Example:**
- Variable: `VERSION = 1.0`
- Text object: `PCB Rev ${VERSION}` → renders as `PCB Rev 1.0`
- Updating the variable instantly updates all references across the design

Variables defined in either Schematic or Board Setup are accessible project-wide. Built-in system variables (e.g., `${CURRENT_DATE}`, `${BOARD_TITLE}`) are also available.

## Text Expressions

Dynamic calculated content within text objects:
- Mathematical operations
- Conditional logic
- String manipulation
- References to board geometry and object properties

Enables annotations that automatically reflect board state without manual updates.

## Graphical Design Rule Editor

A visual GUI for creating design rules without writing rule syntax manually. Simplifies rule development for users who prefer graphical tools over text-based configuration.

Access via **Board Setup → Custom Rules → Open Graphical Editor**.

## Custom Design Rules

Written in a domain-specific language in **Board Setup → Custom Rules**.

**Key capabilities:**
- Rules apply only when syntax is valid (use **Check Rule Syntax** button to verify)
- Scope rules to component classes: `A.hasComponentClass('ClassName')`
- Combine multiple constraints in one rule
- Reference stackup properties, geometry, and electrical characteristics

**Example rule structure:**
```
(rule high_voltage_clearance
  (condition "A.NetClass == 'HV' || B.NetClass == 'HV'")
  (constraint clearance (min 0.5mm))
)
```

**Rule evaluation order:** Custom rules override net class settings, which override global constraints.

## Scripting

KiCad includes a **Python scripting console** for automation.

**Access:** **Scripting Console** button in the toolbar or **Tools → Scripting Console**

**Capabilities:**
- Programmatic access to all board objects (footprints, tracks, zones, pads)
- Batch operations: rename references, adjust positions, query properties
- Custom analysis and reporting
- Automated design modifications
- Integration with external tools and build systems

**API entry point:**
```python
import pcbnew
board = pcbnew.GetBoard()
footprints = board.GetFootprints()
```

Plugin scripts are loaded from the KiCad scripting path (configurable in Preferences).

## IDF Component Outlines

IDF (Intermediate Design Format) support for mechanical design integration:
- Import `.idb` component outline files for accurate 3D height and keepout data
- Enables coordination between electrical PCB design and mechanical enclosure CAD
- Improves interference checking between components and enclosure features

## Notes

- Custom rules are validated on save; invalid syntax disables the entire custom rules set
- Python scripting changes are applied immediately to the board; use **Edit → Undo** to revert scripted changes
- Text variables are project-scoped; they do not transfer between projects unless Board Setup is imported

## Related

- [04-board-setup.md](./04-board-setup.md)
- [07-inspecting-a-board.md](./07-inspecting-a-board.md)
