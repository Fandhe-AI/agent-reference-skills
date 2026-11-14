---
source: https://typedoc.org/documents/Development.Third_Party_Symbols.html
---

# Third Party Symbols

Linking `{@link}` references to symbols from third party packages, via the `externalSymbolLinkMappings` option or a plugin using `Converter.addUnknownSymbolResolver`.

## Signature / Usage

```jsonc
// typedoc.json
{
    "externalSymbolLinkMappings": {
        // For these you should probably install typedoc-plugin-mdn-links instead
        "global": {
            // Handle {@link !Promise}
            "Promise": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
        },
        "typescript": {
            // Handle type X = Promise<number>
            "Promise": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
        },
    },
}
```

A wildcard can be used to provide a fallback link to any unmapped type.

```jsonc
// typedoc.json
{
    "externalSymbolLinkMappings": {
        "external-lib": {
            "SomeObject": "https://external-lib.site/docs/SomeObject",
            "*": "https://external-lib.site/docs",
        },
    },
}
```

### Plugin resolver

Plugins can add support for linking to third party sites by calling `Converter.addUnknownSymbolResolver`. The following plugin resolves a few types from React to links on the official React documentation site.

```ts
import { Application, type DeclarationReference } from "typedoc";

const knownSymbols = {
    Component: "https://reactjs.org/docs/react-component.html",
    PureComponent: "https://reactjs.org/docs/react-api.html#reactpurecomponent",
};

export function load(app: Application) {
    app.converter.addUnknownSymbolResolver((ref: DeclarationReference) => {
        if (
            // TS defined symbols
            ref.moduleSource !== "@types/react" &&
            // User {@link} tags
            ref.moduleSource !== "react"
        ) {
            return;
        }

        // If someone did {@link react!}, link them directly to the home page.
        if (!ref.symbolReference) {
            return "https://reactjs.org/";
        }

        // Otherwise, we need to navigate through the symbol reference to
        // determine where they meant to link to. Since the symbols we know
        // about are all a single "level" deep, this is pretty simple.

        if (!ref.symbolReference.path) {
            // Someone included a meaning, but not a path.
            // https://typedoc.org/guides/declaration-references/#meaning
            return;
        }

        if (ref.symbolReference.path.length === 1) {
            const name = ref.symbolReference.path[0].path;
            if (knownSymbols.hasOwnProperty(name)) {
                return knownSymbols[name as never];
            }
        }
    });
}
```

Since TypeDoc 0.23.26, plugins may also return an object for more control over the displayed link. The returned `caption` is used if the user does not specify the link text.

```ts
import { Application, type DeclarationReference } from "typedoc";

const documentedExports = [
    "chunk",
    "compact",
    "concat",
    "difference",
    "differenceBy",
    "differenceWith",
];

export function load(app: Application) {
    app.converter.addUnknownSymbolResolver((ref: DeclarationReference) => {
        if (
            // TS defined symbols
            ref.moduleSource !== "@types/lodash" &&
            // User {@link} tags
            ref.moduleSource !== "lodash"
        ) {
            return;
        }

        // If someone did {@link lodash!}, link them directly to the home page.
        if (!ref.symbolReference) {
            return "https://lodash.com/";
        }

        if (!ref.symbolReference.path) {
            // Someone included a meaning, but not a path.
            // https://typedoc.org/guides/declaration-references/#meaning
            return;
        }

        if (ref.symbolReference.path.length === 1) {
            const name = ref.symbolReference.path[0].path;
            if (documentedExports.includes(name)) {
                return {
                    target: `https://lodash.com/docs/4.17.15#${name}`,
                    caption: name,
                };
            }
        }
    });
}
```

## Notes

- TypeDoc 0.22 added support for linking to third party sites by associating a symbol name with npm packages. Since 0.23.13, some mappings can be defined without a plugin via `externalSymbolLinkMappings`.
- `externalSymbolLinkMappings` is an object whose keys are package names and whose values map the `.` joined qualified name of the third party symbol to a URL. If the link was defined with a user created declaration reference, the key may also have a `:meaning` at the end. TypeDoc does not do fuzzy matching to remove the meaning from keys, so if meanings may be used, a URL must be listed multiple times.
- Global external symbols are supported but may behave surprisingly: TypeDoc assumes a symbol referenced from a package was exported from that package, so packages relying on `@types` are linked according to that `@types` package.
- Types defined in the TypeScript lib files (including `Array`, `Promise`) are detected as belonging to the `typescript` package rather than `global`. To support both `{@link !Promise}` and references within source code, both `global` and `typescript` must be set (the official example notes `typedoc-plugin-mdn-links` as the better choice for these).
- A resolver may return `undefined` (no link unless another resolver provides one) or the string `"#"` to mark the symbol as externally resolved without producing a link, which keeps the link for VSCode usage but omits it from the documentation.
- A resolver is also passed the reflection containing the link and, if the link was defined by the user, the `Models.CommentDisplayPart` parsed into the `DeclarationReference` given as the first argument. With `useTsLinkResolution` on (the default), it may also be passed a `Models.ReflectionSymbolId` referencing the symbol TypeScript resolves the link to.
- Source: https://typedoc.org/documents/Development.Third_Party_Symbols.html (TypeDoc v0.28.20, fetched 2026-11-14)

## Related

- [Options: Comments](../options/comments.md)
- [Plugin Development](./plugin-development.md)
- [Converter](../api/converter.md)
- [Declaration References](../guides/declaration-references.md)
