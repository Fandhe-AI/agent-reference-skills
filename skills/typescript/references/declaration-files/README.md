# declaration-files

| Name | Description | Path |
|------|-------------|------|
| Declaration Reference (By Example) | How to write a declaration for common API patterns, given documentation and sample usage of the API. Ordered by increasing complexity. | [by-example.md](./by-example.md) |
| Consumption | How to download and use d.ts files for a JavaScript library in your project. | [consumption.md](./consumption.md) |
| Deep Dive | Declaration file theory: how types, values, and namespaces combine so a module can expose exactly the API shape wanted. Focuses on module (or UMD) libraries. | [deep-dive.md](./deep-dive.md) |
| Do's and Don'ts | Recommendations for writing d.ts files: common mistakes and their fixes. | [dos-and-donts.md](./dos-and-donts.md) |
| Declaration Files Introduction | How to write a high-quality TypeScript Declaration (d.ts) file. Familiarity with types and modules is assumed. | [introduction.md](./introduction.md) |
| Library Structures | How to identify the structure of a library (module, global, UMD) and which declaration template matches it. | [library-structures.md](./library-structures.md) |
| Publishing | How to get declaration files to users: bundle them with the npm package, or publish to the `@types` organization on npm via DefinitelyTyped. | [publishing.md](./publishing.md) |
| Template: global-modifying-module.d.ts | Declaration template for a global-modifying module: a module that alters existing values in the global scope when imported. | [template-global-modifying-module.md](./template-global-modifying-module.md) |
| Template: global-plugin.d.ts | Declaration template for a global plugin: global code that changes the shape of some global (for example adding methods to `Array.prototype`). | [template-global-plugin.md](./template-global-plugin.md) |
| Template: global.d.ts | Declaration template for a global library: one accessed from the global scope without any form of `import`. | [template-global.md](./template-global.md) |
| Template: module-class.d.ts | Declaration template for a module whose export can be constructed with `new`, handling both module and UMD import. | [template-module-class.md](./template-module-class.md) |
| Template: module-function.d.ts | Declaration template for a module whose export is a callable function, handling both module and UMD import. | [template-module-function.md](./template-module-function.md) |
| Template: module-plugin.d.ts | Declaration template for JavaScript code that extends another library (a module plugin), using declaration merging. | [template-module-plugin.md](./template-module-plugin.md) |
| Template: module.d.ts | Declaration template for a module (CommonJS or ES module style) that is neither callable nor constructable. | [template-module.md](./template-module.md) |
| Templates (overview) | Index of the d.ts template examples, one per library structure. | [templates.md](./templates.md) |
