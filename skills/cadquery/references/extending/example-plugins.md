# CadQuery Example Plugins

The CadQuery standard library includes reference plugin implementations that demonstrate common plugin patterns. Studying these is the recommended starting point when writing a new plugin.

## Notes

Reference implementations to examine:

- `cadquery.Workplane.polygon()` — demonstrates creating a closed wire shape at stack points
- `cadquery.Workplane.cboreHole()` — demonstrates a compound operation (counterbore hole) combining multiple geometric steps in one plugin

Both plugins follow the conventions described in the [Plugins](./plugins.md), [The Stack](./stack.md), and [Preserving the Chain](./preserving-chain.md) pages.

## Related

- [Plugins](./plugins.md)
- [Plugin Example](./plugin-example.md)
- [Linking in your plugin](./linking.md)
