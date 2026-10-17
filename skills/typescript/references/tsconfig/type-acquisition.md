---
source: https://www.typescriptlang.org/tsconfig/#type-acquisition
---

# typeAcquisition

The top-level `typeAcquisition` object controls automatic download of type declarations for JavaScript projects.

## Signature / Usage

```json
{
  "typeAcquisition": {
    "enable": false,
    "include": ["jquery"],
    "exclude": ["jest", "mocha"],
    "disableFilenameBasedTypeAcquisition": true
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `enable` | — | — | Disable the type acquisition for JavaScript projects. |
| `include` | — | — | Specify which types should be used from DefinitelyTyped. |
| `exclude` | — | — | Disable the type acquisition for certain modules in JavaScript projects. |
| `disableFilenameBasedTypeAcquisition` | — | — | Disables inference for type acquisition by looking at filenames in a project. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option. The Description column paraphrases the option text where the page has no one-line summary.
- Type acquisition is only important for JavaScript projects. In TypeScript projects you include the types explicitly. For JavaScript projects the tooling downloads types for your modules in the background, outside of your `node_modules` folder.
- `enable: false` disables automatic type acquisition in JavaScript projects.
- `include`: for JavaScript projects where TypeScript needs additional guidance about global dependencies, or when built-in inference is disabled via `disableFilenameBasedTypeAcquisition`; lists which DefinitelyTyped types to use.
- `exclude`: disables type acquisition for a certain module; useful when testing infrastructure pulls in libraries not needed by the main application.
- `disableFilenameBasedTypeAcquisition`: type acquisition can infer types from filenames, so a `jquery.js` file in the project would automatically download jQuery types from DefinitelyTyped; this option turns that inference off.
- Changed (7.0): the Go-based compiler README states the compiler API is not ready; behavior of automatic type acquisition (an editor/language-service feature) under 7.0 is not documented in the sources used here and is unverified.

## Related

- [javascript-support](./javascript-support.md)
- [editor-support](./editor-support.md)
- [modules](./modules.md)
