# tags-modifier

| Name | Description | Path |
|------|-------------|------|
| @abstract | Modifier tag that marks a method or property as abstract in the generated documentation, regardless of its actual TypeScript implementation state. | [abstract.md](./abstract.md) |
| @alpha | Modifier tag marking a member intended for eventual use by third-party developers, but not yet stable enough to follow semantic versioning. | [alpha.md](./alpha.md) |
| @beta | Modifier tag marking a member intended for eventual use by third-party developers, but not yet stable enough to follow semantic versioning. | [beta.md](./beta.md) |
| @class | Modifier tag that documents a variable declaration as a class, expanding "dynamic" properties into actual properties. | [class.md](./class.md) |
| @enum | Modifier tag that documents a variable holding string or numeric literal values as an enum instead of an ordinary variable. | [enum.md](./enum.md) |
| @event | Modifier tag that classifies a reflection into the "Events" group. Equivalent to specifying `@group Events`. | [event.md](./event.md) |
| @eventProperty | Modifier tag that classifies a reflection into the "Events" group. Equivalent to specifying `@group Events`. Conforms to the TSDoc specification. | [eventProperty.md](./eventProperty.md) |
| @expand | Modifier tag that causes TypeDoc to inline-expand a type alias or interface's declaration at every location where the type is referenced. | [expand.md](./expand.md) |
| @experimental | Modifier tag marking a member intended for eventual use by third-party developers, but not yet stable enough to follow semantic versioning. | [experimental.md](./experimental.md) |
| @function | Modifier tag that documents a callable variable declaration as a function. | [function.md](./function.md) |
| @hidden | Modifier tag that completely removes a reflection from the generated documentation. | [hidden.md](./hidden.md) |
| @hideconstructor | Modifier tag that hides a class's constructor from the generated documentation. Provided as a workaround for TypeScript issue #58653. | [hideconstructor.md](./hideconstructor.md) |
| @ignore | Modifier tag that completely removes a reflection from the generated documentation. Equivalent to `@hidden`. | [ignore.md](./ignore.md) |
| @inline | Modifier tag that causes TypeDoc to inline-expand a type alias or interface's definition at the location where it is referenced. | [inline.md](./inline.md) |
| @interface | Modifier tag that documents a type alias as an interface, expanding "dynamic" properties into actual properties. | [interface.md](./interface.md) |
| @internal | Modifier tag that marks a reflection as not intended for API consumers. Can be excluded from output with `--excludeInternal`. | [internal.md](./internal.md) |
| @namespace | Modifier tag that documents a variable as a namespace, resolving its properties as exported variables and functions. | [namespace.md](./namespace.md) |
| @override | Modifier tag indicating a member overrides an implementation from a parent class. Parsed for TSDoc compatibility. | [override.md](./override.md) |
| @overload | Modifier tag for declaring function overloads in JavaScript projects. Recognized from TypeScript 5.0 onward. | [overload.md](./overload.md) |
| @packageDocumentation | Modifier tag that marks a comment block as documentation for the entire file, rather than for the declaration that immediately follows it. | [packageDocumentation.md](./packageDocumentation.md) |
| @primaryExport | Modifier tag that controls how re-exports are processed, forcing TypeDoc to convert a symbol immediately. | [primaryExport.md](./primaryExport.md) |
| @private | Modifier tag that overrides a reflection's visibility to private. Its use is generally discouraged. | [private.md](./private.md) |
| @protected | Modifier tag that overrides a reflection's visibility to protected. Its use is generally discouraged. | [protected.md](./protected.md) |
| @public | Modifier tag that overrides a reflection's visibility to public. Its use is generally discouraged. | [public.md](./public.md) |
| @readonly | Modifier tag that documents a reflection as read-only regardless of its actual TypeScript writability. | [readonly.md](./readonly.md) |
| @reexport | Modifier tag applied to a type alias or variable declaration that references another symbol, telling TypeDoc to treat it as a re-export. | [reexport.md](./reexport.md) |
| @sealed | Modifier tag parsed for TSDoc compatibility, but with no specific meaning in TypeDoc. | [sealed.md](./sealed.md) |
| @useDeclaredType | Modifier tag that converts a type alias using its declared type instead of its type-node representation. Useful for improving the documentation of derived types. | [useDeclaredType.md](./useDeclaredType.md) |
| @virtual | Modifier tag parsed for TSDoc compatibility, but with no specific meaning in TypeDoc. | [virtual.md](./virtual.md) |
