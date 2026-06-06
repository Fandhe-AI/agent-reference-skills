# Extending

| Name | Description | Path |
|------|-------------|------|
| Coordinate Systems | CadQuery users can define workplanes with arbitrary orientations, creating local coordinate systems. | [coordinate-systems.md](./coordinate-systems.md) |
| CadQuery Example Plugins | The CadQuery standard library includes reference plugin implementations that demonstrate common plugin patterns. | [example-plugins.md](./example-plugins.md) |
| Helper Methods | `Workplane` exposes a set of internal helper methods intended for use inside plugin implementations. | [helper-methods.md](./helper-methods.md) |
| Linking in your plugin | To make a standalone function available as a CadQuery plugin, attach it to the `Workplane` (or `CQ`) class after definition. | [linking.md](./linking.md) |
| Using OpenCascade Methods | The simplest way to extend CadQuery is to use OpenCascade (OCP) scripting directly within build methods. | [opencascade-methods.md](./opencascade-methods.md) |
| Plugin Example | A complete working plugin that creates unit cubes at every point on the current stack. | [plugin-example.md](./plugin-example.md) |
| Extending CadQuery: Plugins | A CadQuery plugin is a function attached to the `cadquery.CQ()` or `cadquery.Workplane()` class, making it callable as part of the fluent method chain just like any built-in method. | [plugins.md](./plugins.md) |
| Preserving the Chain | CadQuery's fluent API requires every plugin to return a valid CadQuery object so the chain can continue. | [preserving-chain.md](./preserving-chain.md) |
| Extending CadQuery: Special Methods | Special methods provide an alternative to monkey-patching the `Workplane` class. | [special-methods.md](./special-methods.md) |
| The Stack | Every CadQuery `Workplane` object maintains a local stack that holds the currently selected geometric objects. | [stack.md](./stack.md) |
