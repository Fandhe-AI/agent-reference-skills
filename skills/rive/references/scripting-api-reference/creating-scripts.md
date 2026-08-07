# Creating Scripts

How to create and attach a new script asset in the Rive Editor.

## Signature / Usage

Two ways to create a script:

- **Assets Panel**: click `+` → **Script** → select a [Protocol](./protocol-overview.md)
- **Scripts Tool**: dropdown next to the Script button in the Toolbar → select a Protocol

New scripts are saved as Assets in the Assets Panel.

To run [Node](./protocol-node-scripts.md) and [Layout](./protocol-layout-scripts.md) scripts, add them to the scene:

1. Right-click the artboard → select the script from the menu
2. Position the script object (its position determines where it renders)
3. Select the group to set inputs (see [Script Inputs](./script-inputs.md))

## Notes

- Use PascalCase for script names; the script's main type name should match (e.g. script `MyConverter` → type `MyConverter`).
- If the script doesn't appear in the add menu: confirm it's in the Assets Panel, check the [Problems panel](./debugging.md), and ensure the script returns a function returning a table with at least `init` and `draw`.

## Related

- [Protocol Overview](./protocol-overview.md)
- [Script Inputs](./script-inputs.md)
- [Debugging](./debugging.md)
