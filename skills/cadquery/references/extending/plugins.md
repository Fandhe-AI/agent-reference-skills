# Extending CadQuery: Plugins

A CadQuery plugin is a function attached to the `cadquery.CQ()` or `cadquery.Workplane()` class, making it callable as part of the fluent method chain just like any built-in method.

## Notes

- Plugins wrap OCP scripting into reusable, chainable methods.
- A plugin function must accept `self` as its first parameter (the current `Workplane` object).
- Attach the function to the class after definition to register it as a plugin.
- Plugins have full access to the stack, parent chain, and all helper methods available on `self`.
- The plugin behaves identically to built-in CadQuery methods once attached.

## Related

- [The Stack](./stack.md)
- [Preserving the Chain](./preserving-chain.md)
- [Helper Methods](./helper-methods.md)
- [Linking in your plugin](./linking.md)
- [Plugin Example](./plugin-example.md)
- [CadQuery Example Plugins](./example-plugins.md)
